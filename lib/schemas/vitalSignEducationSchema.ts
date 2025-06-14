import { vitalSchema } from "@/lib/schemas/vitalSchema";
import { z } from "zod";

export const vitalSignEducationSchema = z.object({
  educationId: z.string().min(1, { message: "Education ID is required" }),
  type: vitalSchema.shape.type, // Reference vital type from vitalSchema
  title: z.string().min(1, { message: "Title is required" }),
  subtitle: z.string().min(1, { message: "Subtitle is required" }),
  body: z.string().min(1, { message: "Educational content is required" }),
  category: z.enum(["Cardiovascular", "Respiratory", "Temperature", "Other"], {
    message: "Invalid category",
  }),
  references: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

export type VitalSignEducation = z.infer<typeof vitalSignEducationSchema>;
