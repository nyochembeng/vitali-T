import { vitalSignEducationSlice } from "@/lib/features/vitals-education/vitalSignEducationSlice";
import {
  VitalSignEducationResponse,
  VitalSignEducationsResponse,
  VitalSignEducationFilterParams,
} from "@/lib/features/vitals-education/vitalSignEducationTypes";
import { VitalSignEducation } from "@/lib/schemas/vitalSignEducationSchema";
import Toast from "react-native-toast-message";

const vitalSignEducationApi = vitalSignEducationSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVitalSignEducation: builder.query<VitalSignEducation, string>({
      query: (educationId) => ({
        url: `/vital-sign-education/${educationId}`,
        method: "GET",
      }),
      providesTags: (result, error, educationId) => [
        { type: "VitalSignEducations", id: educationId },
      ],
      transformResponse: (response: VitalSignEducationResponse) =>
        response.education,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load vital sign education details.",
          });
          throw error;
        }
      },
    }),
    getVitalSignEducations: builder.query<
      VitalSignEducation[],
      VitalSignEducationFilterParams
    >({
      query: (params) => ({
        url: "/vital-sign-education",
        method: "GET",
        params: {
          category: params.category,
          type: params.type,
          keywords: params.keywords?.join(","),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "VitalSignEducations", id: "LIST" },
              ...result.map((education) => ({
                type: "VitalSignEducations" as const,
                id: education.educationId,
              })),
            ]
          : [{ type: "VitalSignEducations", id: "LIST" }],
      transformResponse: (response: VitalSignEducationsResponse) =>
        response.educations,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load vital sign educations.",
          });
          throw error;
        }
      },
    }),
  }),
});

export const { useGetVitalSignEducationQuery, useGetVitalSignEducationsQuery } =
  vitalSignEducationApi;

export default vitalSignEducationApi;
