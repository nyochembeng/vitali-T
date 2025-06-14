import { FetalMovement } from "@/lib/schemas/fetalMovementSchema";

export interface CreateFetalMovementResponse {
  fetalMovement: FetalMovement;
}

export interface FetalMovementResponse {
  fetalMovement: FetalMovement;
}

export interface FetalMovementsResponse {
  fetalMovements: FetalMovement[];
}

export interface UpdateFetalMovementResponse {
  fetalMovement: FetalMovement;
}

export interface DeleteFetalMovementResponse {
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export type CreateFetalMovementRequest = Omit<FetalMovement, "sessionId">;
export type UpdateFetalMovementRequest = Partial<
  Omit<FetalMovement, "sessionId" | "userId">
>;
