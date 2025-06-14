import { z } from "zod";

export const userSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Full name must not exceed 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Full name must contain only letters and spaces",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must not exceed 255 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must not exceed 128 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const signUpSchema = z
  .object({
    fullname: userSchema.shape.fullname,
    email: userSchema.shape.email,
    password: userSchema.shape.password,
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" })
      .max(128, { message: "Confirm password must not exceed 128 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: userSchema.shape.email,
  password: userSchema.shape.password,
});

export const forgotPasswordSchema = z.object({
  email: userSchema.shape.email,
});

export type User = z.infer<typeof userSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type Login = z.infer<typeof loginSchema>;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
