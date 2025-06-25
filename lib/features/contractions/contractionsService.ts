import { contractionSlice } from "@/lib/features/contractions/contractionsSlice";
import {
  CreateContractionResponse,
  ContractionResponse,
  ContractionsResponse,
  UpdateContractionResponse,
  DeleteContractionResponse,
  CreateContractionRequest,
  UpdateContractionRequest,
} from "@/lib/features/contractions/contractionsTypes";
import { Contraction } from "@/lib/schemas/contractionSchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const contractionApi = contractionSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContraction: builder.mutation<Contraction, CreateContractionRequest>({
      query: (data) => ({
        url: "/contractions",
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
              url: "/contractions",
              headers: { "Content-Type": "application/json" },
              data,
              service: "dps",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Contraction creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue contraction creation.",
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
            text2: "Unable to create contraction.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Contractions", id: arg.userId },
      ],
      transformResponse: (response: CreateContractionResponse) =>
        response.contraction,
    }),
    getContraction: builder.query<
      Contraction,
      { userId: string; contractionId: string }
    >({
      query: ({ userId, contractionId }) => ({
        url: `/contractions/${userId}/${contractionId}`,
        method: "GET",
        service: "dps",
      }),
      providesTags: (result, error, { userId, contractionId }) => [
        { type: "Contractions", id: userId },
        { type: "Contractions", id: `${userId}_${contractionId}` },
      ],
      transformResponse: (response: ContractionResponse) =>
        response.contraction,
    }),
    getContractions: builder.query<Contraction[], string>({
      query: (userId) => ({
        url: `/contractions/${userId}`,
        method: "GET",
        service: "dps",
      }),
      providesTags: (result, error, userId) =>
        result
          ? [
              { type: "Contractions", id: userId },
              ...result.map((contraction) => ({
                type: "Contractions" as const,
                id: `${userId}_${contraction.contractionId}`,
              })),
            ]
          : [{ type: "Contractions", id: userId }],
      transformResponse: (response: ContractionsResponse) =>
        response.contractions,
    }),
    updateContraction: builder.mutation<
      Contraction,
      { userId: string; contractionId: string; data: UpdateContractionRequest }
    >({
      query: ({ userId, contractionId, data }) => ({
        url: `/contractions/${userId}/${contractionId}`,
        method: "PATCH",
        data,
        service: "dps",
      }),
      async onQueryStarted(
        { userId, contractionId, data },
        { queryFulfilled }
      ) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/contractions/${userId}/${contractionId}`,
              headers: { "Content-Type": "application/json" },
              data,
              service: "dps",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Contraction update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue contraction update.",
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
            text2: "Unable to update contraction.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, contractionId }) => [
        { type: "Contractions", id: userId },
        { type: "Contractions", id: `${userId}_${contractionId}` },
      ],
      transformResponse: (response: UpdateContractionResponse) =>
        response.contraction,
    }),
    deleteContraction: builder.mutation<
      DeleteContractionResponse,
      { userId: string; contractionId: string }
    >({
      query: ({ userId, contractionId }) => ({
        url: `/contractions/${userId}/${contractionId}`,
        method: "DELETE",
        service: "dps",
      }),
      async onQueryStarted({ userId, contractionId }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/contractions/${userId}/${contractionId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
              service: "dps",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Contraction deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue contraction deletion.",
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
            text2: "Unable to delete contraction.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, contractionId }) => [
        { type: "Contractions", id: userId },
        { type: "Contractions", id: `${userId}_${contractionId}` },
      ],
    }),
  }),
});

export const {
  useCreateContractionMutation,
  useGetContractionQuery,
  useGetContractionsQuery,
  useUpdateContractionMutation,
  useDeleteContractionMutation,
} = contractionApi;

export default contractionApi;
