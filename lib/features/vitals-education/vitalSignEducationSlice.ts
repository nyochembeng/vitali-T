import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const vitalSignEducationSlice = createApi({
  reducerPath: "vitalSignEducationApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["VitalSignEducations"],
  endpoints: (builder) => ({}),
});

export default vitalSignEducationSlice;
