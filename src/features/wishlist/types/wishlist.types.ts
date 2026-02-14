import { Product } from "@/features/products/types/products.types";

export type WishlistResponse = {
  status: string;
  message?: string;
  count?: number;
  data: string[] | Product[];
};
