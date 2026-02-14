import {
  Subcategory,
  ProductCategory,
  ProductBrand,
} from "@/features/products/types/products.types";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderProduct {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: ProductCategory;
  brand: ProductBrand;
  ratingsAverage: number;
  id: string;
}

export interface OrderCartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export type OrdersResponse = Order[];
