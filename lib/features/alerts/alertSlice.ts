import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const alertSlice = createApi({
  reducerPath: "alertApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Alerts"],
  endpoints: (builder) => ({}),
});

export default alertSlice;
