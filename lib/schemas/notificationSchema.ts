import { z } from "zod";
import { userSchema } from "./userSchema";

export const notificationSchema = z.object({
  id: z.string().min(1, { message: "Notification ID is required" }),
  userId: userSchema.shape.userId,
  type: z.enum(["alert", "tip", "report", "reminder"], {
    message: "Invalid notification type",
  }),
  title: z.string().min(1, { message: "Title is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  timestamp: z.string().datetime({ message: "Invalid datetime format" }),
  read: z.boolean().default(false),
  priority: z.enum(["high", "medium", "low"], { message: "Invalid priority" }),
  category: z
    .enum(["Health", "System", "Education", "Other"], {
      message: "Invalid category",
    })
    .optional(),
  action: z
    .object({
      type: z.enum(["navigate", "task", "none"]),
      value: z.string().optional(),
    })
    .optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type Notification = z.infer<typeof notificationSchema>;
