import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const insightsSlice = createApi({
  reducerPath: "insightsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Insights"],
  endpoints: (builder) => ({}),
});

export default insightsSlice;
