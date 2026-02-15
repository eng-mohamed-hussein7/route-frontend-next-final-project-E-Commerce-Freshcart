import {z} from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string().nonempty("Email is required").pipe(z.email("Invalid email address")),
});

export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;