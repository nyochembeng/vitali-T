import { fetalMovementSlice } from "@/lib/features/fetal-movements/fetalMovementsSlice";
import {
  CreateFetalMovementResponse,
  FetalMovementResponse,
  FetalMovementsResponse,
  UpdateFetalMovementResponse,
  DeleteFetalMovementResponse,
  CreateFetalMovementRequest,
  UpdateFetalMovementRequest,
} from "@/lib/features/fetal-movements/fetalMovementsTypes";
import { FetalMovement } from "@/lib/schemas/fetalMovementSchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const fetalMovementApi = fetalMovementSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFetalMovement: builder.mutation<
      FetalMovement,
      CreateFetalMovementRequest
    >({
      query: (data) => ({
        url: "/fetal-movements",
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
              url: "/fetal-movements",
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Fetal movement creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue fetal movement creation.",
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
            text2: "Unable to create fetal movement.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "FetalMovements", id: arg.userId },
      ],
      transformResponse: (response: CreateFetalMovementResponse) =>
        response.fetalMovement,
    }),
    getFetalMovement: builder.query<
      FetalMovement,
      { userId: string; sessionId: string }
    >({
      query: ({ userId, sessionId }) => ({
        url: `/fetal-movements/${userId}/${sessionId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId, sessionId }) => [
        { type: "FetalMovements", id: userId },
        { type: "FetalMovements", id: `${userId}_${sessionId}` },
      ],
      transformResponse: (response: FetalMovementResponse) =>
        response.fetalMovement,
    }),
    getFetalMovements: builder.query<FetalMovement[], string>({
      query: (userId) => ({
        url: `/fetal-movements/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) =>
        result
          ? [
              { type: "FetalMovements", id: userId },
              ...result.map((movement) => ({
                type: "FetalMovements" as const,
                id: `${userId}_${movement.sessionId}`,
              })),
            ]
          : [{ type: "FetalMovements", id: userId }],
      transformResponse: (response: FetalMovementsResponse) =>
        response.fetalMovements,
    }),
    updateFetalMovement: builder.mutation<
      FetalMovement,
      { userId: string; sessionId: string; data: UpdateFetalMovementRequest }
    >({
      query: ({ userId, sessionId, data }) => ({
        url: `/fetal-movements/${userId}/${sessionId}`,
        method: "PATCH",
        data,
      }),
      async onQueryStarted({ userId, sessionId, data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/fetal-movements/${userId}/${sessionId}`,
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Fetal movement update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue fetal movement update.",
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
            text2: "Unable to update fetal movement.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, sessionId }) => [
        { type: "FetalMovements", id: userId },
        { type: "FetalMovements", id: `${userId}_${sessionId}` },
      ],
      transformResponse: (response: UpdateFetalMovementResponse) =>
        response.fetalMovement,
    }),
    deleteFetalMovement: builder.mutation<
      DeleteFetalMovementResponse,
      { userId: string; sessionId: string }
    >({
      query: ({ userId, sessionId }) => ({
        url: `/fetal-movements/${userId}/${sessionId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ userId, sessionId }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/fetal-movements/${userId}/${sessionId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Fetal movement deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue fetal movement deletion.",
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
            text2: "Unable to delete fetal movement.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, sessionId }) => [
        { type: "FetalMovements", id: userId },
        { type: "FetalMovements", id: `${userId}_${sessionId}` },
      ],
    }),
  }),
});

export const {
  useCreateFetalMovementMutation,
  useGetFetalMovementQuery,
  useGetFetalMovementsQuery,
  useUpdateFetalMovementMutation,
  useDeleteFetalMovementMutation,
} = fetalMovementApi;

export default fetalMovementApi;
