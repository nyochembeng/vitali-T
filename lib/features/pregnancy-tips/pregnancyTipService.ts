import { pregnancyTipSlice } from "@/lib/features/pregnancy-tips/pregnancyTipSlice";
import {
  PregnancyTipResponse,
  PregnancyTipsResponse,
  PregnancyTipFilterParams,
} from "@/lib/features/pregnancy-tips/pregnancyTipTypes";
import { PregnancyTip } from "@/lib/schemas/pregnancyTipSchema";
import Toast from "react-native-toast-message";

const pregnancyTipApi = pregnancyTipSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPregnancyTip: builder.query<PregnancyTip, string>({
      query: (tipId) => ({
        url: `/pregnancy-tips/${tipId}`,
        method: "GET",
      }),
      providesTags: (result, error, tipId) => [
        { type: "PregnancyTips", id: tipId },
      ],
      transformResponse: (response: PregnancyTipResponse) => response.tip,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load pregnancy tip details.",
          });
          throw error;
        }
      },
    }),
    getPregnancyTips: builder.query<PregnancyTip[], PregnancyTipFilterParams>({
      query: (params) => ({
        url: "/pregnancy-tips",
        method: "GET",
        params: {
          category: params.category,
          week: params.week,
          trimester: params.trimester,
          keywords: params.keywords?.join(","),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "PregnancyTips", id: "LIST" },
              ...result.map((tip) => ({
                type: "PregnancyTips" as const,
                id: tip.tipId,
              })),
            ]
          : [{ type: "PregnancyTips", id: "LIST" }],
      transformResponse: (response: PregnancyTipsResponse) => response.tips,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load pregnancy tips.",
          });
          throw error;
        }
      },
    }),
  }),
});

export const { useGetPregnancyTipQuery, useGetPregnancyTipsQuery } =
  pregnancyTipApi;

export default pregnancyTipApi;
