import { z } from "zod";

export const pregnancyTipSchema = z.object({
  tipId: z.string().min(1, { message: "Tip ID is required" }),
  category: z.enum(
    ["development", "nutrition", "exercise", "wellness", "other"],
    {
      message: "Invalid category",
    }
  ),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  week: z
    .number()
    .int()
    .min(1)
    .max(40, { message: "Week must be between 1 and 40" }),
  trimester: z.enum(["First", "Second", "Third"], {
    message: "Invalid trimester",
  }),
  references: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  priority: z
    .number()
    .int()
    .min(1)
    .max(5, { message: "Priority must be between 1 and 5" })
    .optional(),
});

export type PregnancyTip = z.infer<typeof pregnancyTipSchema>;
