"use server";

import axios, { AxiosRequestConfig } from "axios";
import { ProductsResponse } from "../types/products.types";

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/products",
    };
    const { data } = await axios.request<ProductsResponse>(options);
    return data;
  } catch (error) {
    throw error;
  }
}
