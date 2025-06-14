import { VitalSignEducation } from "@/lib/schemas/vitalSignEducationSchema";

export interface VitalSignEducationResponse {
  education: VitalSignEducation;
}

export interface VitalSignEducationsResponse {
  educations: VitalSignEducation[];
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface VitalSignEducationFilterParams {
  category?: string;
  type?: string;
  keywords?: string[];
}
