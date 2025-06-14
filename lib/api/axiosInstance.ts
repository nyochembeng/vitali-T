import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetworkStatus } from "@/lib/hooks/useNetworkStatus";
import { offlineQueue } from "@/lib/utils/offlineQueue";

// Define the shape of error responses from your API
interface ApiErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Define a custom error type compatible with RTK Query
export interface CustomApiError {
  status: number;
  data: ApiErrorResponse;
}

// API base URL (replace with your actual URL)
const BASE_URL = "https://api.example.com";

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config): Promise<InternalAxiosRequestConfig> => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to retrieve auth token:", error);
    }
    return config;
  },
  (error: AxiosError): Promise<CustomApiError> => {
    console.error("Request error:", error);
    return Promise.reject({
      status: 0,
      data: {
        status: 0,
        message: error.message || "Failed to send request",
      },
    });
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError<ApiErrorResponse>): Promise<CustomApiError> => {
    const { isOnline } = useNetworkStatus();
    const status = error.response?.status ?? 0;
    const responseData: ApiErrorResponse = error.response?.data ?? {
      status,
      message: "An unexpected error occurred",
    };

    // Handle network errors when offline
    if (
      !isOnline &&
      (!error.response ||
        error.code === "ERR_NETWORK" ||
        error.code === "ECONNABORTED")
    ) {
      const request = error.config;
      if (
        request &&
        ["POST", "PATCH", "DELETE"].includes(
          request.method?.toUpperCase() || ""
        )
      ) {
        try {
          const queueResult = await offlineQueue.enqueueRequest({
            method: request.method?.toUpperCase() as
              | "POST"
              | "PATCH"
              | "DELETE",
            url: request.url || "",
            headers: request.headers as Record<string, string>,
            data: request.data,
          });
          if (queueResult.success) {
            return Promise.reject({
              status: 0,
              data: {
                status: 0,
                message: "Request queued for later processing",
              },
            });
          }
        } catch (queueError) {
          console.error("Failed to queue request:", queueError);
        }
      }
    }

    // Existing error handling
    switch (status) {
      case 401:
        try {
          await AsyncStorage.removeItem("authToken");
        } catch (e) {
          console.error("Error clearing auth token:", e);
        }
        Alert.alert("Session Expired", "Please log in again.", [
          { text: "OK", onPress: () => router.push("/auth/login") },
        ]);
        break;

      case 403:
        Alert.alert(
          "Forbidden",
          "You do not have permission to perform this action."
        );
        break;

      case 404:
        Alert.alert("Not Found", responseData.message || "Resource not found.");
        break;

      case 500:
        Alert.alert("Server Error", "Something went wrong on our end.");
        break;

      default:
        if (responseData?.message) {
          Alert.alert("Error", responseData.message);
        }
        break;
    }

    return Promise.reject({
      status,
      data: responseData,
    });
  }
);

export default axiosInstance;
