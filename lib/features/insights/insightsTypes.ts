import { Insights } from "@/lib/schemas/insightsSchema";

export interface InsightsResponse {
  insight: Insights;
}

export interface InsightsListResponse {
  insights: Insights[];
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface InsightsFilterParams {
  startDate?: string; // ISO datetime string
  endDate?: string; // ISO datetime string
  category?: string; // e.g., Vital Signs, Activity
}
