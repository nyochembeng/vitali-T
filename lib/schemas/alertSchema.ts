import { z } from "zod";
import { userSchema } from "./userSchema";
import { deviceSchema } from "./deviceSchema";

export const alertSchema = z.object({
  alertId: z.string().min(1, { message: "Alert ID is required" }),
  userId: userSchema.shape.userId,
  deviceId: deviceSchema.shape.deviceId,
  alertType: z.string().min(1, { message: "Alert type is required" }),
  value: z.string().min(1, { message: "Value is required" }),
  timestamp: z
    .string()
    .datetime({ message: "Timestamp must be a valid ISO 8601 datetime" }),
  safeRange: z.string().min(1, { message: "Safe range is required" }),
  riskLevel: z.enum(["Low", "Moderate", "High"], {
    message: "Invalid risk level",
  }),
  recommendedAction: z
    .string()
    .min(1, { message: "Recommended action is required" }),
  notes: z.string().optional(),
  acknowledged: z.boolean().default(false),
});

export type Alert = z.infer<typeof alertSchema>;
