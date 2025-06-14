import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const notificationSlice = createApi({
  reducerPath: "notificationApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({}),
});

export default notificationSlice;
