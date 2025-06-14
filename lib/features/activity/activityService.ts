import { activitySlice } from "@/lib/features/activity/activitySlice";
import {
  CreateActivityResponse,
  ActivityResponse,
  ActivitiesResponse,
  UpdateActivityResponse,
  DeleteActivityResponse,
  CreateActivityRequest,
  UpdateActivityRequest,
} from "@/lib/features/activity/activityTypes";
import { Activity } from "@/lib/schemas/activitySchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const activityApi = activitySlice.injectEndpoints({
  endpoints: (builder) => ({
    createActivity: builder.mutation<Activity, CreateActivityRequest>({
      query: (data) => ({
        url: "/activities",
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
              url: "/activities",
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Activity creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue activity creation.",
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
            text2: "Unable to create activity.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Activities", id: arg.userId },
      ],
      transformResponse: (response: CreateActivityResponse) =>
        response.activity,
    }),
    getActivity: builder.query<
      Activity,
      { userId: string; activityId: string }
    >({
      query: ({ userId, activityId }) => ({
        url: `/activities/${userId}/${activityId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId, activityId }) => [
        { type: "Activities", id: userId },
        { type: "Activities", id: `${userId}_${activityId}` },
      ],
      transformResponse: (response: ActivityResponse) => response.activity,
    }),
    getActivities: builder.query<Activity[], string>({
      query: (userId) => ({
        url: `/activities/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) =>
        result
          ? [
              { type: "Activities", id: userId },
              ...result.map((activity) => ({
                type: "Activities" as const,
                id: `${userId}_${activity.activityId}`,
              })),
            ]
          : [{ type: "Activities", id: userId }],
      transformResponse: (response: ActivitiesResponse) => response.activities,
    }),
    updateActivity: builder.mutation<
      Activity,
      { userId: string; activityId: string; data: UpdateActivityRequest }
    >({
      query: ({ userId, activityId, data }) => ({
        url: `/activities/${userId}/${activityId}`,
        method: "PATCH",
        data,
      }),
      async onQueryStarted({ userId, activityId, data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/activities/${userId}/${activityId}`,
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Activity update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue activity update.",
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
            text2: "Unable to update activity.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, activityId }) => [
        { type: "Activities", id: userId },
        { type: "Activities", id: `${userId}_${activityId}` },
      ],
      transformResponse: (response: UpdateActivityResponse) =>
        response.activity,
    }),
    deleteActivity: builder.mutation<
      DeleteActivityResponse,
      { userId: string; activityId: string }
    >({
      query: ({ userId, activityId }) => ({
        url: `/activities/${userId}/${activityId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ userId, activityId }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/activities/${userId}/${activityId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Activity deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue activity deletion.",
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
            text2: "Unable to delete activity.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, activityId }) => [
        { type: "Activities", id: userId },
        { type: "Activities", id: `${userId}_${activityId}` },
      ],
    }),
  }),
});

export const {
  useCreateActivityMutation,
  useGetActivityQuery,
  useGetActivitiesQuery,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = activityApi;

export default activityApi;
