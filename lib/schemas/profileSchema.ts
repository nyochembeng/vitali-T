import { z } from "zod";
import { userSchema } from "./userSchema";

export const profileSchema = z.object({
  userId: userSchema.shape.userId,
  dateOfBirth: z
    .date()
    .refine((date) => date <= new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .refine(
      (date) => {
        const age = new Date().getFullYear() - date.getFullYear();
        return age >= 13 && age <= 120;
      },
      { message: "Age must be between 13 and 120 years" }
    ),
  height: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+(\.[0-9]+)?$/.test(val), {
      message: "Height must be a valid number",
    })
    .refine((val) => !val || parseFloat(val) > 0, {
      message: "Height must be positive",
    }),
  heightUnit: z.enum(["cm", "ft"]),
  weight: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+(\.[0-9]+)?$/.test(val), {
      message: "Weight must be a valid number",
    })
    .refine((val) => !val || parseFloat(val) > 0, {
      message: "Weight must be positive",
    }),
  weightUnit: z.enum(["kg", "lbs"]),
  phoneNumber: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits" })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  countryCode: z
    .string()
    .regex(/^\+\d{1,4}$/, { message: "Invalid country code" }),
  conceivedDate: z
    .date()
    .refine((date) => date <= new Date(), {
      message: "Conceived date cannot be in the future",
    })
    .refine(
      (date) => {
        const nineMonthsAgo = new Date();
        nineMonthsAgo.setMonth(nineMonthsAgo.getMonth() - 9);
        return date >= nineMonthsAgo;
      },
      { message: "Conceived date must be within the last 9 months" }
    ),
  dueDate: z
    .date()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        const today = new Date();
        return date >= today;
      },
      { message: "Due date must not be in the past" }
    )
    .refine(
      (date) => {
        if (!date) return true;
        // Access parent context dynamically during validation
        const parent = z
          .object({ conceivedDate: z.date().optional() })
          .parse({ conceivedDate: undefined });
        const conceivedDate = parent.conceivedDate;
        if (!conceivedDate) return true;
        const weeksDiff =
          (date.getTime() - conceivedDate.getTime()) /
          (1000 * 60 * 60 * 24 * 7);
        return weeksDiff >= 37 && weeksDiff <= 42;
      },
      { message: "Due date must be 37–42 weeks from conceived date" }
    ),
  profileImage: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type Profile = z.infer<typeof profileSchema>;
