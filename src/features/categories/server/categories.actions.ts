"use server";

import axios, { AxiosRequestConfig } from "axios";
import { CategoriesResponse } from "../types/Category.types";

export async function getAllCategories(): Promise<CategoriesResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/categories",
    };
    const { data } = await axios.request<CategoriesResponse>(options);
    return data;
  } catch (error) {
    throw error;
  }
}
