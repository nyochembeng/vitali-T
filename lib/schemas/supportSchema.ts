import { z } from "zod";
import { userSchema } from "./userSchema";

export const supportSchema = z.object({
  supportId: z.string().min(1, { message: "Support ID is required" }),
  userId: userSchema.shape.userId,
  category: z.string().min(1, { message: "Category is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  screenshot: z
    .object({
      uri: z.string().optional(),
      name: z.string().optional(),
      type: z.string().optional(),
    })
    .optional(),
  contact: z.string().email({ message: "Invalid email format" }).optional(),
  status: z
    .enum(["Open", "In Progress", "Resolved"], { message: "Invalid status" })
    .default("Open")
    .optional(),
  timestamp: z.string().datetime({ message: "Invalid datetime format" }),
  priority: z
    .enum(["High", "Medium", "Low"], { message: "Invalid priority" })
    .optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type SupportRequest = z.infer<typeof supportSchema>;
