import { alertSlice } from "@/lib/features/alerts/alertSlice";
import {
  CreateAlertResponse,
  AlertResponse,
  AlertsResponse,
  UpdateAlertResponse,
  DeleteAlertResponse,
  CreateAlertRequest,
  UpdateAlertRequest,
} from "@/lib/features/alerts/alertTypes";
import { Alert } from "@/lib/schemas/alertSchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const alertApi = alertSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAlert: builder.mutation<Alert, CreateAlertRequest>({
      query: (data) => ({
        url: "/alerts",
        method: "POST",
        data,
        service: "ans",
      }),
      async onQueryStarted(data, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: "/alerts",
              headers: { "Content-Type": "application/json" },
              data,
              service: "ans",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Alert creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue alert creation.",
            });
            throw error;
          }
        }
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Creation Failed",
            text2: "Unable to create alert.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Alerts", id: arg.userId },
      ],
      transformResponse: (response: CreateAlertResponse) => response.alert,
    }),
    getAlert: builder.query<Alert, { userId: string; alertId: string }>({
      query: ({ userId, alertId }) => ({
        url: `/alerts/${userId}/${alertId}`,
        method: "GET",
        service: "ans",
      }),
      providesTags: (result, error, { userId, alertId }) => [
        { type: "Alerts", id: userId },
        { type: "Alerts", id: `${userId}_${alertId}` },
      ],
      transformResponse: (response: AlertResponse) => response.alert,
    }),
    getAlerts: builder.query<Alert[], string>({
      query: (userId) => ({
        url: `/alerts/${userId}`,
        method: "GET",
        service: "ans",
      }),
      providesTags: (result, error, userId) =>
        result
          ? [
              { type: "Alerts", id: userId },
              ...result.map((alert) => ({
                type: "Alerts" as const,
                id: `${userId}_${alert.alertId}`,
              })),
            ]
          : [{ type: "Alerts", id: userId }],
      transformResponse: (response: AlertsResponse) => response.alerts,
    }),
    updateAlert: builder.mutation<
      Alert,
      { userId: string; alertId: string; data: UpdateAlertRequest }
    >({
      query: ({ userId, alertId, data }) => ({
        url: `/alerts/${userId}/${alertId}`,
        method: "PATCH",
        data,
        service: "ans",
      }),
      async onQueryStarted({ userId, alertId, data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/alerts/${userId}/${alertId}`,
              headers: { "Content-Type": "application/json" },
              data,
              service: "ans",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Alert update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue alert update.",
            });
            throw error;
          }
        }
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Update Failed",
            text2: "Unable to update alert.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, alertId }) => [
        { type: "Alerts", id: userId },
        { type: "Alerts", id: `${userId}_${alertId}` },
      ],
      transformResponse: (response: UpdateAlertResponse) => response.alert,
    }),
    deleteAlert: builder.mutation<
      DeleteAlertResponse,
      { userId: string; alertId: string }
    >({
      query: ({ userId, alertId }) => ({
        url: `/alerts/${userId}/${alertId}`,
        method: "DELETE",
        service: "ans",
      }),
      async onQueryStarted({ userId, alertId }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/alerts/${userId}/${alertId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
              service: "ans",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Alert deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue alert deletion.",
            });
            throw error;
          }
        }
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Deletion Failed",
            text2: "Unable to delete alert.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, alertId }) => [
        { type: "Alerts", id: userId },
        { type: "Alerts", id: `${userId}_${alertId}` },
      ],
    }),
  }),
});

export const {
  useCreateAlertMutation,
  useGetAlertQuery,
  useGetAlertsQuery,
  useUpdateAlertMutation,
  useDeleteAlertMutation,
} = alertApi;

export default alertApi;
