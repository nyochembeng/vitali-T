import { Vital } from "@/lib/schemas/vitalSchema";

// API response types
export interface CreateVitalResponse {
  vital: Vital;
}

export interface VitalResponse {
  vital: Vital;
}

export interface VitalsResponse {
  vitals: Vital[];
}

export interface UpdateVitalResponse {
  vital: Vital;
}

export interface DeleteVitalResponse {
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Request types
export type CreateVitalRequest = Omit<Vital, "vitalId">;
export type UpdateVitalRequest = Partial<Omit<Vital, "vitalId" | "userId">>;
