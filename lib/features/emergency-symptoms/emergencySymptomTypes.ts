import { EmergencySymptom } from "@/lib/schemas/emergencySymptomSchema";

export interface EmergencySymptomResponse {
  symptom: EmergencySymptom;
}

export interface EmergencySymptomsResponse {
  symptoms: EmergencySymptom[];
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface EmergencySymptomFilterParams {
  category?: string;
  type?: string;
  severity?: string;
  keywords?: string[];
}
