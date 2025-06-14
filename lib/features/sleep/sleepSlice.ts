import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const sleepSlice = createApi({
  reducerPath: "sleepApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Sleeps"],
  endpoints: (builder) => ({}),
});

export default sleepSlice;
