import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

// Define the vitals slice
export const vitalsSlice = createApi({
  reducerPath: "vitalsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Vitals"],
  endpoints: (builder) => ({}), // Endpoints injected by vitalsService
});

// Export the vitals slice
export default vitalsSlice;
