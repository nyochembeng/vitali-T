import { notificationSlice } from "@/lib/features/notifications/notificationsSlice";
import {
  NotificationResponse,
  NotificationsResponse,
  NotificationFilterParams,
} from "@/lib/features/notifications/notificationsTypes";
import { Notification } from "@/lib/schemas/notificationSchema";
import Toast from "react-native-toast-message";

const notificationApi = notificationSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<
      Notification,
      { userId: string; id: string }
    >({
      query: ({ userId, id }) => ({
        url: `/users/${userId}/notifications/${id}`,
        method: "GET",
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
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Notifications", id },
        { type: "Notifications", id: "LIST" },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
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
    }),
    deleteNotification: builder.mutation<void, { userId: string; id: string }>({
      query: ({ userId, id }) => ({
        url: `/users/${userId}/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Notifications", id },
        { type: "Notifications", id: "LIST" },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
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
