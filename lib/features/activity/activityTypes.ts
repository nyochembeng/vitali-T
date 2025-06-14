import { Activity } from "@/lib/schemas/activitySchema";

export interface CreateActivityResponse {
  activity: Activity;
}

export interface ActivityResponse {
  activity: Activity;
}

export interface ActivitiesResponse {
  activities: Activity[];
}

export interface UpdateActivityResponse {
  activity: Activity;
}

export interface DeleteActivityResponse {
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export type CreateActivityRequest = Omit<Activity, "activityId">;
export type UpdateActivityRequest = Partial<
  Omit<Activity, "activityId" | "userId">
>;
