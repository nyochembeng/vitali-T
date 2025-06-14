import { z } from "zod";

export const themePreferencesSchema = z.object({
  mode: z
    .enum(["light", "dark", "system"], { message: "Invalid theme mode" })
    .default("light")
    .optional(),
});

export const notificationPreferencesSchema = z.object({
  monitoringAlerts: z.boolean().default(true).optional(),
  dailyHealthTips: z.boolean().default(true).optional(),
  weeklyReports: z.boolean().default(true).optional(),
  symptomReminders: z.boolean().default(true).optional(),
});

export const monitoringPreferencesSchema = z.object({
  alertSensitivity: z
    .enum(["standard", "sensitive"], { message: "Invalid alert sensitivity" })
    .default("standard")
    .optional(),
  notificationFrequency: z
    .enum(["daily", "weekly", "monthly"], {
      message: "Invalid notification frequency",
    })
    .default("daily")
    .optional(),
  reminderNotifications: z.boolean().default(true).optional(),
  healthEducationUpdates: z.boolean().default(true).optional(),
  insightsFromDataTrends: z.boolean().default(true).optional(),
});

export const settingsSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  themePreferences: themePreferencesSchema,
  notificationPreferences: notificationPreferencesSchema,
  monitoringPreferences: monitoringPreferencesSchema,
  language: z
    .string()
    .min(2, { message: "Language code must be at least 2 characters" })
    .default("en"),
  dataSharing: z
    .object({
      analytics: z.boolean().default(true),
      research: z.boolean().default(false),
    })
    .optional(),
  lastUpdated: z
    .string()
    .datetime({ message: "Invalid datetime format" })
    .optional(),
});

export type Settings = z.infer<typeof settingsSchema>;
export type ThemePreferences = z.infer<typeof themePreferencesSchema>;
export type NotificationPreferences = z.infer<
  typeof notificationPreferencesSchema
>;
export type MonitoringPreferences = z.infer<typeof monitoringPreferencesSchema>;
