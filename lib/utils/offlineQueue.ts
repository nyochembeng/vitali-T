import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, isAfter, subHours } from "date-fns";
import { uniqueId, merge } from "lodash";
import {
  aasAxios,
  dpsAxios,
  ansAxios,
  aisAxios,
  hesAxios,
  ServiceType,
} from "@/lib/api/axiosInstance";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { serializeRequest, deserializeRequest } from "./requestSerializer";

const QUEUE_KEY = "@OfflineQueue";
const MAX_QUEUE_SIZE = 50; // Max 50 requests
const MAX_STORAGE_BYTES = 5 * 1024 * 1024; // 5MB limit
const REQUEST_EXPIRY_HOURS = 24; // Expire after 24 hours

interface QueuedRequest {
  id: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  headers: Record<string, string>;
  data?: any;
  timestamp: string;
  attempts: number;
  service: ServiceType; // Store service identifier
}

export const offlineQueue = {
  enqueueRequest: async (
    request: Omit<QueuedRequest, "id" | "timestamp" | "attempts">
  ) => {
    try {
      // Get current queue
      const queue = await AsyncStorage.getItem(QUEUE_KEY);
      let currentQueue: QueuedRequest[] = queue ? JSON.parse(queue) : [];

      // Check queue size
      if (currentQueue.length >= MAX_QUEUE_SIZE) {
        Toast.show({
          type: "error",
          text1: "Queue Full",
          text2: "Cannot queue more actions. Please connect to sync.",
        });
        return { success: false, error: "Queue size limit reached" };
      }

      // Check storage size
      const queueSizeBytes = new Blob([JSON.stringify(currentQueue)]).size;
      if (queueSizeBytes > MAX_STORAGE_BYTES) {
        Toast.show({
          type: "error",
          text1: "Storage Full",
          text2: "Cannot queue more actions due to storage limit.",
        });
        return { success: false, error: "Storage limit reached" };
      }

      // Deduplicate PATCH requests for the same resource and service
      if (request.method === "PATCH") {
        const existingRequestIndex = currentQueue.findIndex(
          (req) =>
            req.method === "PATCH" &&
            req.url === request.url &&
            req.service === request.service
        );
        if (existingRequestIndex !== -1) {
          // Merge data with existing request
          currentQueue[existingRequestIndex].data = merge(
            currentQueue[existingRequestIndex].data,
            request.data
          );
          currentQueue[existingRequestIndex].timestamp = format(
            new Date(),
            "yyyy-MM-dd HH:mm:ss"
          );
          await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(currentQueue));
          return { success: true, id: currentQueue[existingRequestIndex].id };
        }
      }

      // Create new request
      const id = uniqueId(`req_${Date.now()}_`);
      const queuedRequest: QueuedRequest = {
        ...request,
        id,
        timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        attempts: 0,
      };

      const serialized = serializeRequest(queuedRequest);
      currentQueue.push(JSON.parse(serialized));
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(currentQueue));

      return { success: true, id };
    } catch (error) {
      console.error("Failed to enqueue request:", error);
      return { success: false, error: "Failed to enqueue request" };
    }
  },

  processQueue: async () => {
    const state = await NetInfo.fetch();
    const isOnline = !!state.isConnected && state.isInternetReachable !== false;
    if (!isOnline) return { success: false, error: "Device is offline" };

    try {
      const queue = await AsyncStorage.getItem(QUEUE_KEY);
      if (!queue) return { success: true, results: [] };

      let currentQueue: QueuedRequest[] = JSON.parse(queue);
      const results: {
        id: string;
        success: boolean;
        response?: any;
        error?: string;
        attempts?: number;
      }[] = [];

      // Remove expired requests
      const expiryTime = subHours(new Date(), REQUEST_EXPIRY_HOURS);
      currentQueue = currentQueue.filter((req) =>
        isAfter(new Date(req.timestamp), expiryTime)
      );

      // Map service to Axios instance
      const instanceMap = {
        aas: aasAxios,
        dps: dpsAxios,
        ans: ansAxios,
        ais: aisAxios,
        hes: hesAxios,
      };

      for (const request of currentQueue) {
        try {
          const deserialized = deserializeRequest(JSON.stringify(request));
          const instance = instanceMap[request.service];
          if (!instance) {
            throw new Error(`Invalid service type: ${request.service}`);
          }

          const response = await instance({
            method: deserialized.method,
            url: deserialized.url,
            headers: deserialized.headers,
            data: deserialized.data,
          });

          results.push({
            id: request.id,
            success: true,
            response: response.data,
          });
        } catch (error: any) {
          request.attempts += 1;
          results.push({
            id: request.id,
            success: false,
            error: error.message || "Request failed",
            attempts: request.attempts,
          });
        }
      }

      // Update queue: remove successful or max-attempted requests
      const updatedQueue = currentQueue.filter((req) => {
        const result = results.find((res) => res.id === req.id);
        return result && !result.success && req.attempts < 3;
      });

      if (results.some((res) => res.attempts && res.attempts >= 3)) {
        Toast.show({
          type: "error",
          text1: "Sync Issue",
          text2: "Some actions failed after max retries and were removed.",
        });
      }

      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(updatedQueue));
      return { success: true, results };
    } catch (error) {
      console.error("Failed to process queue:", error);
      return { success: false, error: "Failed to process queue" };
    }
  },

  clearQueue: async (requestId?: string) => {
    try {
      if (requestId) {
        const queue = await AsyncStorage.getItem(QUEUE_KEY);
        if (!queue) return { success: true };

        const currentQueue: QueuedRequest[] = JSON.parse(queue);
        const updatedQueue = currentQueue.filter((req) => req.id !== requestId);
        await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(updatedQueue));
      } else {
        await AsyncStorage.removeItem(QUEUE_KEY);
      }
      return { success: true };
    } catch (error) {
      console.error("Failed to clear queue:", error);
      return { success: false, error: "Failed to clear queue" };
    }
  },

  getQueueSize: async () => {
    try {
      const queue = await AsyncStorage.getItem(QUEUE_KEY);
      const currentQueue: QueuedRequest[] = queue ? JSON.parse(queue) : [];
      return currentQueue.length;
    } catch (error) {
      console.error("Failed to get queue size:", error);
      return 0;
    }
  },

  getQueueStorageSize: async () => {
    try {
      const queue = await AsyncStorage.getItem(QUEUE_KEY);
      if (!queue) return 0;
      return new Blob([queue]).size;
    } catch (error) {
      console.error("Failed to get queue storage size:", error);
      return 0;
    }
  },
};
