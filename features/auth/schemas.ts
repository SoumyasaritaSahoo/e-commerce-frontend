import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    full_name: z.string().min(1, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirm: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirm: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
