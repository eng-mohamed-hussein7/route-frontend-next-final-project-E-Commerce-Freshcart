import z from "zod";

export const shippingAddressSchema = z.object({
  details: z
    .string()
    .nonempty("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be at most 200 characters"),

  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(
      /^(\+2)?01[0125][0-9]{8}$/,
      "Phone must be a valid Egyptian phone number",
    ),

  city: z
    .string()
    .nonempty("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters"),
});

export type shippingAddress = z.infer<typeof shippingAddressSchema>;
