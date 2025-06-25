import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const vitalsSlice = createApi({
  reducerPath: "vitalsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Vitals"],
  endpoints: (builder) => ({}),
});

export default vitalsSlice;
