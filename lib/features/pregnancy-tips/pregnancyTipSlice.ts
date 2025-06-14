import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const pregnancyTipSlice = createApi({
  reducerPath: "pregnancyTipApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["PregnancyTips"],
  endpoints: (builder) => ({}),
});

export default pregnancyTipSlice;
