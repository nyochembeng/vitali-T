import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const symptomsSlice = createApi({
  reducerPath: "symptomsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Symptoms"],
  endpoints: (builder) => ({}),
});

export default symptomsSlice;
