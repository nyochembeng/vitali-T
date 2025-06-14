import { z } from "zod";
import { userSchema } from "./userSchema";

export const trendSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  lastUpdated: z.string().min(1, { message: "Last updated is required" }),
  icon: z.enum(["trending-up", "favorite"], { message: "Invalid icon" }),
  source: z.enum(["Wearable", "Manual Input", "Other"]).optional(),
  category: z.enum(["Vital Signs", "Activity", "Sleep"]).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const patternSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  confidence: z
    .number()
    .min(0)
    .max(100, { message: "Confidence must be between 0 and 100" }),
  icon: z.enum(["timeline", "directions-run"], { message: "Invalid icon" }),
  source: z.enum(["Wearable", "Manual Input", "Other"]).optional(),
  category: z.enum(["Vital Signs", "Activity", "Sleep"]).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const predictionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  confidence: z.enum(["High", "Medium", "Low"], {
    message: "Invalid confidence level",
  }),
  icon: z.enum(["warning", "child-care"], { message: "Invalid icon" }),
  source: z.enum(["Wearable", "Manual Input", "Other"]).optional(),
  category: z.enum(["Vital Signs", "Pregnancy", "Health"]).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const weeklySummarySchema = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  value: z.string().min(1, { message: "Value is required" }),
  source: z.enum(["Wearable", "Manual Input", "Other"]).optional(),
  category: z.enum(["Vital Signs", "Activity", "Sleep"]).optional(),
});

export const nextStepSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  icon: z.enum(["water-drop", "monitor-heart"], { message: "Invalid icon" }),
  source: z.enum(["Wearable", "Manual Input", "Other"]).optional(),
  category: z.enum(["Vital Signs", "Activity", "Hydration"]).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const insightsSchema = z.object({
  insightId: z.string().min(1, { message: "Insight ID is required" }),
  userId: userSchema.shape.userId,
  timestamp: z.string().datetime({ message: "Invalid datetime format" }),
  trends: z.array(trendSchema).optional(),
  patterns: z.array(patternSchema).optional(),
  predictions: z.array(predictionSchema).optional(),
  weeklySummary: z.array(weeklySummarySchema).optional(),
  nextSteps: z.array(nextStepSchema).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type Insights = z.infer<typeof insightsSchema>;
export type Trend = z.infer<typeof trendSchema>;
export type Pattern = z.infer<typeof patternSchema>;
export type Prediction = z.infer<typeof predictionSchema>;
export type WeeklySummary = z.infer<typeof weeklySummarySchema>;
export type NextStep = z.infer<typeof nextStepSchema>;
