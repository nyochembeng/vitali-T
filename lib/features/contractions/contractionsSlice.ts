import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const contractionSlice = createApi({
  reducerPath: "contractionApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Contractions"],
  endpoints: (builder) => ({}),
});

export default contractionSlice;
