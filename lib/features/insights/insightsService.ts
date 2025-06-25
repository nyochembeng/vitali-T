import { insightsSlice } from "@/lib/features/insights/insightsSlice";
import {
  InsightsResponse,
  InsightsListResponse,
  InsightsFilterParams,
} from "@/lib/features/insights/insightsTypes";
import { Insights } from "@/lib/schemas/insightsSchema";
import Toast from "react-native-toast-message";

const insightsApi = insightsSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInsight: builder.query<Insights, { userId: string; insightId: string }>({
      query: ({ userId, insightId }) => ({
        url: `/users/${userId}/insights/${insightId}`,
        method: "GET",
        service: "ais",
      }),
      providesTags: (result, error, { insightId }) => [
        { type: "Insights", id: insightId },
      ],
      transformResponse: (response: InsightsResponse) => response.insight,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load insight details.",
          });
          throw error;
        }
      },
    }),
    getInsights: builder.query<
      Insights[],
      { userId: string; params?: InsightsFilterParams }
    >({
      query: ({ userId, params }) => ({
        url: `/users/${userId}/insights`,
        method: "GET",
        params: {
          startDate: params?.startDate,
          endDate: params?.endDate,
          category: params?.category,
        },
        service: "ais",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Insights", id: "LIST" },
              ...result.map((insight) => ({
                type: "Insights" as const,
                id: insight.insightId,
              })),
            ]
          : [{ type: "Insights", id: "LIST" }],
      transformResponse: (response: InsightsListResponse) => response.insights,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load insights.",
          });
          throw error;
        }
      },
    }),
  }),
});

export const { useGetInsightQuery, useGetInsightsQuery } = insightsApi;

export default insightsApi;
