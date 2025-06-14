import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

// Define the settings slice
export const settingsSlice = createApi({
  reducerPath: "settingsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Settings"],
  endpoints: (builder) => ({}), // Endpoints injected by settingsService
});

// Export the settings slice
export default settingsSlice;
