import { deviceSchema } from "@/lib/schemas/deviceSchema";
import { userSchema } from "@/lib/schemas/userSchema";
import { z } from "zod";

export const fetalMovementSchema = z.object({
  sessionId: z.string().min(1, { message: "Session ID is required" }),
  userId: userSchema.shape.userId,
  deviceId: deviceSchema.shape.deviceId,
  kickCount: z.number().min(0, { message: "Kick count must be at least 0" }),
  sessionDuration: z
    .string()
    .min(1, { message: "Session duration is required" }),
  notes: z.string().optional(),
  startTime: z.string().optional(),
  timestamp: z
    .string()
    .datetime({ message: "Timestamp must be a valid ISO 8601 datetime" }),
});

export type FetalMovement = z.infer<typeof fetalMovementSchema>;
