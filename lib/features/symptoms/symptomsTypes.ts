import { Symptom } from "@/lib/schemas/symptomSchema";

export interface CreateSymptomResponse {
  symptom: Symptom;
}

export interface SymptomResponse {
  symptom: Symptom;
}

export interface SymptomsResponse {
  symptoms: Symptom[];
}

export interface UpdateSymptomResponse {
  symptom: Symptom;
}

export interface DeleteSymptomResponse {
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export type CreateSymptomRequest = Omit<Symptom, "symptomId">;
export type UpdateSymptomRequest = Partial<
  Omit<Symptom, "symptomId" | "userId">
>;
