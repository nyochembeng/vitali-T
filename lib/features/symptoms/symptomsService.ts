import { symptomsSlice } from "@/lib/features/symptoms/symptomsSlice";
import {
  CreateSymptomResponse,
  SymptomResponse,
  SymptomsResponse,
  UpdateSymptomResponse,
  DeleteSymptomResponse,
  CreateSymptomRequest,
  UpdateSymptomRequest,
} from "@/lib/features/symptoms/symptomsTypes";
import { Symptom } from "@/lib/schemas/symptomSchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const symptomsApi = symptomsSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSymptom: builder.mutation<Symptom, CreateSymptomRequest>({
      query: (data) => ({
        url: "/symptoms",
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
              url: "/symptoms",
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Symptom creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue symptom creation.",
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
            text2: "Unable to create symptom.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Symptoms", id: arg.userId },
      ],
      transformResponse: (response: CreateSymptomResponse) => response.symptom,
    }),
    getSymptom: builder.query<Symptom, { userId: string; symptomId: string }>({
      query: ({ userId, symptomId }) => ({
        url: `/symptoms/${userId}/${symptomId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId, symptomId }) => [
        { type: "Symptoms", id: userId },
        { type: "Symptoms", id: `${userId}_${symptomId}` },
      ],
      transformResponse: (response: SymptomResponse) => response.symptom,
    }),
    getSymptoms: builder.query<Symptom[], string>({
      query: (userId) => ({
        url: `/symptoms/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) =>
        result
          ? [
              { type: "Symptoms", id: userId },
              ...result.map((symptom) => ({
                type: "Symptoms" as const,
                id: `${userId}_${symptom.symptomId}`,
              })),
            ]
          : [{ type: "Symptoms", id: userId }],
      transformResponse: (response: SymptomsResponse) => response.symptoms,
    }),
    updateSymptom: builder.mutation<
      Symptom,
      { userId: string; symptomId: string; data: UpdateSymptomRequest }
    >({
      query: ({ userId, symptomId, data }) => ({
        url: `/symptoms/${userId}/${symptomId}`,
        method: "PATCH",
        data,
      }),
      async onQueryStarted({ userId, symptomId, data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/symptoms/${userId}/${symptomId}`,
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Symptom update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue symptom update.",
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
            text2: "Unable to update symptom.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, symptomId }) => [
        { type: "Symptoms", id: userId },
        { type: "Symptoms", id: `${userId}_${symptomId}` },
      ],
      transformResponse: (response: UpdateSymptomResponse) => response.symptom,
    }),
    deleteSymptom: builder.mutation<
      DeleteSymptomResponse,
      { userId: string; symptomId: string }
    >({
      query: ({ userId, symptomId }) => ({
        url: `/symptoms/${userId}/${symptomId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ userId, symptomId }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/symptoms/${userId}/${symptomId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Symptom deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue symptom deletion.",
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
            text2: "Unable to delete symptom.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId, symptomId }) => [
        { type: "Symptoms", id: userId },
        { type: "Symptoms", id: `${userId}_${symptomId}` },
      ],
    }),
  }),
});

export const {
  useCreateSymptomMutation,
  useGetSymptomQuery,
  useGetSymptomsQuery,
  useUpdateSymptomMutation,
  useDeleteSymptomMutation,
} = symptomsApi;

export default symptomsApi;
