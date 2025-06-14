import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const educationSlice = createApi({
  reducerPath: "educationApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Videos", "Articles", "Topics"],
  endpoints: (builder) => ({}),
});

export default educationSlice;
