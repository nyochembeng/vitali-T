import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const activitySlice = createApi({
  reducerPath: "activityApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Activities"],
  endpoints: (builder) => ({}),
});

export default activitySlice;
