import { settingsSlice } from "@/lib/features/settings/settingsSlice";
import {
  CreateSettingsRequest,
  CreateSettingsResponse,
  SettingsResponse,
  UpdateSettingsRequest,
  UpdateSettingsResponse,
  DeleteSettingsResponse,
} from "@/lib/features/settings/settingsTypes";
import { Settings } from "@/lib/schemas/settingsSchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const settingsApi = settingsSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSettings: builder.mutation<Settings, CreateSettingsRequest>({
      query: (data) => ({
        url: "/settings",
        method: "POST",
        data,
      }),
      async onQueryStarted(data, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: "/settings",
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Settings creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue settings creation:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue settings creation.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Settings creation failed:", error);
          Toast.show({
            type: "error",
            text1: "Creation Failed",
            text2: "Unable to create settings.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Settings", id: result?.userId },
      ],
      transformResponse: (response: CreateSettingsResponse) =>
        response.settings,
    }),
    getSettings: builder.query<Settings, string>({
      query: (userId) => ({
        url: `/settings/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Settings", id: userId },
      ],
      transformResponse: (response: SettingsResponse) => response.settings,
    }),
    updateSettings: builder.mutation<
      Settings,
      { userId: string; data: UpdateSettingsRequest }
    >({
      query: ({ userId, data }) => ({
        url: `/settings/${userId}`,
        method: "PATCH",
        data,
      }),
      async onQueryStarted({ userId, data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/settings/${userId}`,
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Settings update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue settings update:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue settings update.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Settings update failed:", error);
          Toast.show({
            type: "error",
            text1: "Update Failed",
            text2: "Unable to update settings.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: "Settings", id: userId },
      ],
      transformResponse: (response: UpdateSettingsResponse) =>
        response.settings,
    }),
    deleteSettings: builder.mutation<DeleteSettingsResponse, string>({
      query: (userId) => ({
        url: `/settings/${userId}`,
        method: "DELETE",
      }),
      async onQueryStarted(userId, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/settings/${userId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Settings deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue settings deletion:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue settings deletion.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Settings deletion failed:", error);
          Toast.show({
            type: "error",
            text1: "Deletion Failed",
            text2: "Unable to delete settings.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, userId) => [
        { type: "Settings", id: userId },
      ],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useCreateSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useDeleteSettingsMutation,
} = settingsApi;

export default settingsApi;
