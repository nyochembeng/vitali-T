import { notificationSlice } from "@/lib/features/notifications/notificationsSlice";
import {
  NotificationResponse,
  NotificationsResponse,
  NotificationFilterParams,
} from "@/lib/features/notifications/notificationsTypes";
import { Notification } from "@/lib/schemas/notificationSchema";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";

const notificationApi = notificationSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<
      Notification,
      { userId: string; id: string }
    >({
      query: ({ userId, id }) => ({
        url: `/users/${userId}/notifications/${id}`,
        method: "GET",
        service: "ans",
      }),
      providesTags: (result, error, { id }) => [{ type: "Notifications", id }],
      transformResponse: (response: NotificationResponse) =>
        response.notification,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load notification details.",
          });
          throw error;
        }
      },
    }),
    getNotifications: builder.query<
      Notification[],
      { userId: string; params?: NotificationFilterParams }
    >({
      query: ({ userId, params }) => ({
        url: `/users/${userId}/notifications`,
        method: "GET",
        params: {
          type: params?.type,
          priority: params?.priority,
          category: params?.category,
          read: params?.read,
        },
        service: "ans",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Notifications", id: "LIST" },
              ...result.map((notification) => ({
                type: "Notifications" as const,
                id: notification.id,
              })),
            ]
          : [{ type: "Notifications", id: "LIST" }],
      transformResponse: (response: NotificationsResponse) =>
        response.notifications,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load notifications.",
          });
          throw error;
        }
      },
    }),
    markNotificationAsRead: builder.mutation<
      void,
      { userId: string; id: string }
    >({
      query: ({ userId, id }) => ({
        url: `/users/${userId}/notifications/${id}/read`,
        method: "PATCH",
        service: "ans",
      }),
      async onQueryStarted({ userId, id }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/users/${userId}/notifications/${id}/read`,
              headers: { "Content-Type": "application/json" },
              data: {},
              service: "ans",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2:
                  "Marking notification as read will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue mark notification as read.",
            });
            throw error;
          }
        }
        try {
          await queryFulfilled;
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Notification marked as read.",
          });
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to mark notification as read.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Notifications", id },
        { type: "Notifications", id: "LIST" },
      ],
    }),
    deleteNotification: builder.mutation<void, { userId: string; id: string }>({
      query: ({ userId, id }) => ({
        url: `/users/${userId}/notifications/${id}`,
        method: "DELETE",
        service: "ans",
      }),
      async onQueryStarted({ userId, id }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/users/${userId}/notifications/${id}`,
              headers: { "Content-Type": "application/json" },
              data: {},
              service: "ans",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Notification deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue notification deletion.",
            });
            throw error;
          }
        }
        try {
          await queryFulfilled;
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Notification deleted.",
          });
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to delete notification.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Notifications", id },
        { type: "Notifications", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;

export default notificationApi;
