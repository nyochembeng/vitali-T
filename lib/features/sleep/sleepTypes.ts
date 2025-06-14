import { Sleep } from "@/lib/schemas/sleepSchema";

export interface CreateSleepResponse {
  sleep: Sleep;
}

export interface SleepResponse {
  sleep: Sleep;
}

export interface SleepsResponse {
  sleeps: Sleep[];
}

export interface UpdateSleepResponse {
  sleep: Sleep;
}

export interface DeleteSleepResponse {
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export type CreateSleepRequest = Omit<Sleep, "sleepId">;
export type UpdateSleepRequest = Partial<Omit<Sleep, "sleepId" | "userId">>;
