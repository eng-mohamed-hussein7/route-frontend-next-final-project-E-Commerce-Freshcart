import { z } from "zod";

export const addressSchema = z.object({
    name: z.string().min(1, "Address name is required"),
    details: z.string().min(10, "Address details must be at least 10 characters"),
    phone: z.string().regex(/^01\d{9}$/, "Phone must be a valid Egyptian phone number"),
    city: z.string().min(3, "City name must be at least 3 characters"),
});

export type AddressInput = z.infer<typeof addressSchema>;