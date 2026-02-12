"use server";

import axios, { AxiosRequestConfig } from "axios";
import { ProductsResponse, SingleProductResponse } from "../types/products.types";

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

export async function getSingleProduct({productId}: {productId: string}) : Promise<SingleProductResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
            method: "GET",
        };
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getProductsByCategory({category}: {category: string}) : Promise<ProductsResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${category}`,
            method: "GET",
        };
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}
