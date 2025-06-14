import { deviceSchema } from "@/lib/schemas/deviceSchema";
import { userSchema } from "@/lib/schemas/userSchema";
import { z } from "zod";

export const contractionSchema = z.object({
  contractionId: z.string().min(1, { message: "Contraction ID is required" }),
  userId: userSchema.shape.userId,
  deviceId: deviceSchema.shape.deviceId,
  duration: z.string().min(1, { message: "Duration is required" }),
  interval: z.string().min(1, { message: "Interval is required" }),
  totalTime: z.string().optional(),
  notes: z.string().optional(),
  timestamp: z
    .string()
    .datetime({ message: "Timestamp must be a valid ISO 8601 datetime" }),
});

export type Contraction = z.infer<typeof contractionSchema>;
