import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
});

export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;

export const verifyResetCodeSchema = z.object({
  resetCode: z.string().regex(/^\d{6}$/, "Code must be 6 digits"),
});

export type VerifyResetCodeFormValues = z.infer<typeof verifyResetCodeSchema>;

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .pipe(z.email("Invalid email address")),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
