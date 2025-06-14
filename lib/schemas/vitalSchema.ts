import { z } from "zod";
import { userSchema } from "./userSchema";
import { deviceSchema } from "./deviceSchema";

export const vitalSchema = z.object({
  vitalId: z.string().min(1, { message: "Vital ID is required" }),
  userId: userSchema.shape.userId,
  deviceId: deviceSchema.shape.deviceId,
  type: z.enum(["fhr", "mhr", "bp", "spo2", "bt", "rr", "hrv", "si"], {
    message: "Invalid vital type",
  }),
  value: z.union([z.string(), z.number()], { message: "Value is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  status: z.enum(["normal", "warning", "critical"], {
    message: "Invalid status",
  }),
  chartData: z.array(z.number()).optional(),
  trend: z.enum(["up", "down", "stable"]).optional(),
  hasChart: z.boolean().default(false),
  timestamp: z
    .string()
    .datetime({ message: "Timestamp must be a valid ISO 8601 datetime" }),
});

export type Vital = z.infer<typeof vitalSchema>;
