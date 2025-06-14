import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

// Define the profile slice
export const profileSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({}), // Endpoints injected by profileService
});

// Export the profile slice
export default profileSlice;
