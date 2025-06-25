import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import {
  aasAxios,
  dpsAxios,
  ansAxios,
  aisAxios,
  hesAxios,
  ServiceType,
  CustomApiError,
} from "./axiosInstance";

interface ApiErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
  signal?: AbortSignal;
  service: ServiceType;
}

const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, CustomApiError> =>
  async ({ url, method = "GET", data, params, headers, signal, service }) => {
    try {
      // Select the appropriate Axios instance based on service
      const instance = {
        aas: aasAxios,
        dps: dpsAxios,
        ans: ansAxios,
        ais: aisAxios,
        hes: hesAxios,
      }[service];

      if (!instance) {
        throw new Error(`Invalid service type: ${service}`);
      }

      const config: AxiosRequestConfig = {
        url,
        method,
        data,
        params,
        headers,
        signal,
      };

      const response: AxiosResponse = await instance(config);
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response) {
        return {
          error: {
            status: axiosError.response.status ?? 520,
            data: axiosError.response.data ?? {
              status: axiosError.response.status ?? 520,
              message: "An unexpected server error occurred",
            },
          },
        };
      } else if (axiosError.code === "ERR_CANCELED") {
        return {
          error: {
            status: 499, // Custom code for "Client Closed Request"
            data: { status: 499, message: "Request was cancelled by the user" },
          },
        };
      } else if (axiosError.request) {
        return {
          error: {
            status: 503,
            data: { status: 503, message: "No response received from server" },
          },
        };
      } else {
        return {
          error: {
            status: 520,
            data: {
              status: 520,
              message: axiosError.message || "Unknown error occurred",
            },
          },
        };
      }
    }
  };

export default axiosBaseQuery;
