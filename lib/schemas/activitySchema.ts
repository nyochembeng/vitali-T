import { deviceSchema } from "@/lib/schemas/deviceSchema";
import { userSchema } from "@/lib/schemas/userSchema";
import { z } from "zod";

export const activitySchema = z.object({
  activityId: z.string().min(1, { message: "Activity ID is required" }),
  userId: userSchema.shape.userId,
  deviceId: deviceSchema.shape.deviceId,
  type: z.string().min(1, { message: "Activity type is required" }),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.string().optional(),
  notes: z.string().optional(),
  feeling: z.enum(["Tired", "Low", "Neutral", "Good", "Energetic"]).optional(),
  timestamp: z
    .string()
    .datetime({ message: "Timestamp must be a valid ISO 8601 datetime" }),
});

export type Activity = z.infer<typeof activitySchema>;
