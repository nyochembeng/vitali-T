import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const emergencySymptomSlice = createApi({
  reducerPath: "emergencySymptomApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["EmergencySymptoms"],
  endpoints: (builder) => ({}),
});

export default emergencySymptomSlice;
