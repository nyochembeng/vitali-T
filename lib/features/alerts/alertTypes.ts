import { Alert } from "@/lib/schemas/alertSchema";

export interface CreateAlertResponse {
  alert: Alert;
}

export interface AlertResponse {
  alert: Alert;
}

export interface AlertsResponse {
  alerts: Alert[];
}

export interface UpdateAlertResponse {
  alert: Alert;
}

export interface DeleteAlertResponse {
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export type CreateAlertRequest = Omit<Alert, "alertId">;
export type UpdateAlertRequest = Partial<Omit<Alert, "alertId" | "userId">>;
