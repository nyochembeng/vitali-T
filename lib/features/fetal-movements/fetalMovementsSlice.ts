import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";

export const fetalMovementSlice = createApi({
  reducerPath: "fetalMovementApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["FetalMovements"],
  endpoints: (builder) => ({}),
});

export default fetalMovementSlice;
