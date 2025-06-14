import { vitalSchema } from "@/lib/schemas/vitalSchema";
import { z } from "zod";

export const emergencySymptomSchema = z.object({
  emergencySymptomId: z
    .string()
    .min(1, { message: "Emergency Symptom ID is required" }),
  type: vitalSchema.shape.type.or(
    z.string().min(1, { message: "Type is required" })
  ), // Reference vital type from vitalSchema
  description: z.string().min(1, { message: "Description is required" }),
  body: z.string().min(1, { message: "Educational content is required" }),
  severity: z.enum(["high", "medium", "low"], {
    message: "Invalid severity level",
  }),
  category: z.enum(
    ["Cardiovascular", "Pregnancy", "Neurological", "Respiratory", "Other"],
    {
      message: "Invalid category",
    }
  ),
  references: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

export type EmergencySymptom = z.infer<typeof emergencySymptomSchema>;
