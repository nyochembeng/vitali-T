import { Settings } from "@/lib/schemas/settingsSchema";

// API response types
export interface CreateSettingsResponse {
  settings: Settings;
}

export interface SettingsResponse {
  settings: Settings;
}

export interface UpdateSettingsResponse {
  settings: Settings;
}

export interface DeleteSettingsResponse {
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Request types
export type CreateSettingsRequest = Omit<Settings, "userId">;
export type UpdateSettingsRequest = Partial<Omit<Settings, "userId">>;
