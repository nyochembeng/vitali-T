import { emergencySymptomSlice } from "@/lib/features/emergency-symptoms/emergencySymptomSlice";
import {
  EmergencySymptomResponse,
  EmergencySymptomsResponse,
  EmergencySymptomFilterParams,
} from "@/lib/features/emergency-symptoms/emergencySymptomTypes";
import { EmergencySymptom } from "@/lib/schemas/emergencySymptomSchema";
import Toast from "react-native-toast-message";

const emergencySymptomApi = emergencySymptomSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmergencySymptom: builder.query<EmergencySymptom, string>({
      query: (emergencySymptomId) => ({
        url: `/emergency-symptoms/${emergencySymptomId}`,
        method: "GET",
        service: "hes",
      }),
      providesTags: (result, error, emergencySymptomId) => [
        { type: "EmergencySymptoms", id: emergencySymptomId },
      ],
      transformResponse: (response: EmergencySymptomResponse) =>
        response.symptom,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load emergency symptom details.",
          });
          throw error;
        }
      },
    }),
    getEmergencySymptoms: builder.query<
      EmergencySymptom[],
      EmergencySymptomFilterParams
    >({
      query: (params) => ({
        url: "/emergency-symptoms",
        method: "GET",
        params: {
          category: params.category,
          type: params.type,
          severity: params.severity,
          keywords: params.keywords?.join(","),
        },
        service: "hes",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "EmergencySymptoms", id: "LIST" },
              ...result.map((symptom) => ({
                type: "EmergencySymptoms" as const,
                id: symptom.emergencySymptomId,
              })),
            ]
          : [{ type: "EmergencySymptoms", id: "LIST" }],
      transformResponse: (response: EmergencySymptomsResponse) =>
        response.symptoms,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load emergency symptoms.",
          });
          throw error;
        }
      },
    }),
  }),
});

export const { useGetEmergencySymptomQuery, useGetEmergencySymptomsQuery } =
  emergencySymptomApi;

export default emergencySymptomApi;
