import { Contraction } from "@/lib/schemas/contractionSchema";

export interface CreateContractionResponse {
  contraction: Contraction;
}

export interface ContractionResponse {
  contraction: Contraction;
}

export interface ContractionsResponse {
  contractions: Contraction[];
}

export interface UpdateContractionResponse {
  contraction: Contraction;
}

export interface DeleteContractionResponse {
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export type CreateContractionRequest = Omit<Contraction, "contractionId">;
export type UpdateContractionRequest = Partial<
  Omit<Contraction, "contractionId" | "userId">
>;
