import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

// Define the user slice
export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({}), // Endpoints injected by userService
});

// Export the user slice
export default userSlice;
