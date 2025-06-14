import { deviceSchema } from "@/lib/schemas/deviceSchema";
import { userSchema } from "@/lib/schemas/userSchema";
import { z } from "zod";

export const symptomSchema = z.object({
  symptomId: z.string().min(1, { message: "Symptom ID is required" }),
  userId: userSchema.shape.userId,
  deviceId: deviceSchema.shape.deviceId,
  symptom: z.string().min(1, { message: "Symptom is required" }),
  severity: z.enum(["0", "1", "2", "3", "4"]),
  notes: z.string().optional(),
  timestamp: z
    .string()
    .datetime({ message: "Timestamp must be a valid ISO 8601 datetime" }),
});

export type Symptom = z.infer<typeof symptomSchema>;
