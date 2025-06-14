import { vitalsSlice } from "@/lib/features/vitals/vitalsSlice";
import {
  CreateVitalResponse,
  VitalResponse,
  VitalsResponse,
  UpdateVitalResponse,
  DeleteVitalResponse,
  CreateVitalRequest,
  UpdateVitalRequest,
} from "@/lib/features/vitals/vitalsTypes";
import { Vital } from "@/lib/schemas/vitalSchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const vitalsApi = vitalsSlice.injectEndpoints({
  endpoints: (builder) => ({
    createVital: builder.mutation<Vital, CreateVitalRequest>({
      query: (data) => ({
        url: "/vitals",
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
              url: "/vitals",
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Vital creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue vital creation:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue vital creation.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Vital creation failed:", error);
          Toast.show({
            type: "error",
            text1: "Creation Failed",
            text2: "Unable to create vital.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Vitals", id: arg.userId },
      ],
      transformResponse: (response: CreateVitalResponse) => response.vital,
    }),
    getVital: builder.query<Vital, { userId: string; vitalId: string }>({
      query: ({ userId, vitalId }) => ({
        url: `/vitals/${userId}/${vitalId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId, vitalId }) => [
        { type: "Vitals", id: userId },
        { type: "Vitals", id: `${userId}_${vitalId}` },
      ],
      transformResponse: (response: VitalResponse) => response.vital,
    }),
    getVitals: builder.query<Vital[], string>({
      query: (userId) => ({
        url: `/vitals/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) =>
        result
          ? [
              { type: "Vitals", id: userId },
              ...result.map((vital) => ({
                type: "Vitals" as const,
                id: `${userId}_${vital.vitalId}`,
              })),
            ]
          : [{ type: "Vitals", id: userId }],
      transformResponse: (response: VitalsResponse) => response.vitals,
    }),
    updateVital: builder.mutation<
      Vital,
      { userId: string; vitalId: string; data: UpdateVitalRequest }
    >({
      query: ({ userId, vitalId, data }) => ({
        url: `/vitals/${userId}/${vitalId}`,
        method: "PATCH",
        data,
      }),
      async onQueryStarted({ userId, vitalId, data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/vitals/${userId}/${vitalId}`,
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Vital update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue vital update:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue vital update.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Vital update failed:", error);
          Toast.show({
            type: "error",
            text1: "Update Failed",
            text2: "Unable to update vital.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, vitalId }) => [
        { type: "Vitals", id: userId },
        { type: "Vitals", id: `${userId}_${vitalId}` },
      ],
      transformResponse: (response: UpdateVitalResponse) => response.vital,
    }),
    deleteVital: builder.mutation<
      DeleteVitalResponse,
      { userId: string; vitalId: string }
    >({
      query: ({ userId, vitalId }) => ({
        url: `/vitals/${userId}/${vitalId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ userId, vitalId }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/vitals/${userId}/${vitalId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Vital deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue vital deletion:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue vital deletion.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Vital deletion failed:", error);
          Toast.show({
            type: "error",
            text1: "Deletion Failed",
            text2: "Unable to delete vital.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, vitalId }) => [
        { type: "Vitals", id: userId },
        { type: "Vitals", id: `${userId}_${vitalId}` },
      ],
    }),
  }),
});

// Export auto-generated hooks
export const {
  useCreateVitalMutation,
  useGetVitalQuery,
  useGetVitalsQuery,
  useUpdateVitalMutation,
  useDeleteVitalMutation,
} = vitalsApi;

export default vitalsApi;
