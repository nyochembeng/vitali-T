import { sleepSlice } from "@/lib/features/sleep/sleepSlice";
import {
  CreateSleepResponse,
  SleepResponse,
  SleepsResponse,
  UpdateSleepResponse,
  DeleteSleepResponse,
  CreateSleepRequest,
  UpdateSleepRequest,
} from "@/lib/features/sleep/sleepTypes";
import { Sleep } from "@/lib/schemas/sleepSchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const sleepApi = sleepSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSleep: builder.mutation<Sleep, CreateSleepRequest>({
      query: (data) => ({
        url: "/sleep",
        method: "POST",
        data,
        service: "dps",
      }),
      async onQueryStarted(data, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: "/sleep",
              headers: { "Content-Type": "application/json" },
              data,
              service: "dps",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Sleep creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue sleep creation.",
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
            text2: "Unable to create sleep record.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Sleeps", id: arg.userId },
      ],
      transformResponse: (response: CreateSleepResponse) => response.sleep,
    }),
    getSleep: builder.query<Sleep, { userId: string; sleepId: string }>({
      query: ({ userId, sleepId }) => ({
        url: `/sleep/${userId}/${sleepId}`,
        method: "GET",
        service: "dps",
      }),
      providesTags: (result, error, { userId, sleepId }) => [
        { type: "Sleeps", id: userId },
        { type: "Sleeps", id: `${userId}_${sleepId}` },
      ],
      transformResponse: (response: SleepResponse) => response.sleep,
    }),
    getSleeps: builder.query<Sleep[], string>({
      query: (userId) => ({
        url: `/sleep/${userId}`,
        method: "GET",
        service: "dps",
      }),
      providesTags: (result, error, userId) =>
        result
          ? [
              { type: "Sleeps", id: userId },
              ...result.map((sleep) => ({
                type: "Sleeps" as const,
                id: `${userId}_${sleep.sleepId}`,
              })),
            ]
          : [{ type: "Sleeps", id: userId }],
      transformResponse: (response: SleepsResponse) => response.sleeps,
    }),
    updateSleep: builder.mutation<
      Sleep,
      { userId: string; sleepId: string; data: UpdateSleepRequest }
    >({
      query: ({ userId, sleepId, data }) => ({
        url: `/sleep/${userId}/${sleepId}`,
        method: "PATCH",
        data,
        service: "dps",
      }),
      async onQueryStarted({ userId, sleepId, data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/sleep/${userId}/${sleepId}`,
              headers: { "Content-Type": "application/json" },
              data,
              service: "dps",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Sleep update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue sleep update.",
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
            text2: "Unable to update sleep record.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, sleepId }) => [
        { type: "Sleeps", id: userId },
        { type: "Sleeps", id: `${userId}_${sleepId}` },
      ],
      transformResponse: (response: UpdateSleepResponse) => response.sleep,
    }),
    deleteSleep: builder.mutation<
      DeleteSleepResponse,
      { userId: string; sleepId: string }
    >({
      query: ({ userId, sleepId }) => ({
        url: `/sleep/${userId}/${sleepId}`,
        method: "DELETE",
        service: "dps",
      }),
      async onQueryStarted({ userId, sleepId }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/sleep/${userId}/${sleepId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
              service: "dps",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Sleep deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue sleep deletion.",
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
            text2: "Unable to delete sleep record.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, sleepId }) => [
        { type: "Sleeps", id: userId },
        { type: "Sleeps", id: `${userId}_${sleepId}` },
      ],
    }),
  }),
});

export const {
  useCreateSleepMutation,
  useGetSleepQuery,
  useGetSleepsQuery,
  useUpdateSleepMutation,
  useDeleteSleepMutation,
} = sleepApi;

export default sleepApi;
