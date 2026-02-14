// "use server";

import axios, { AxiosRequestConfig } from "axios";
import { OrdersResponse } from "../types/order.types";
import { verifyToken } from "@/features/auth/server/auth.actions";

export async function getOrders() : Promise<OrdersResponse | null> {
  try {
    const { userInfo } = await verifyToken();

    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userInfo?.id}`,
    };
    const { data } = await axios.request<OrdersResponse>(options);
    return data;
  } catch (error) {
    return null;
  }
}
