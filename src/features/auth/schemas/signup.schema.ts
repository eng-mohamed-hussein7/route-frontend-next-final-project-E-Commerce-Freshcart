import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be at most 25 characters"),
    
  email: z.string().nonempty("Email is required").pipe(z.email("Invalid email address")),
  
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    
  rePassword: z
    .string()
    .nonempty("Confirm Password is required"),
  
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(/^(\+2)?01[0125][0-9]{8}$/, "Only Egyptian phone numbers are allowed"),
    

  terms: z
    .boolean()
    .refine((value) => value, "You must agree to the terms and conditions"),
}).refine((data) => data.password === data.rePassword, {
  message: "Password and Confirm Password must match",
  path: ["rePassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;