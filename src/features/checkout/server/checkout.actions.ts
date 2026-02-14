"use server"
import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { shippingAddress } from '../schemas/checkout.schema';

export async function createCashOrder({cartId, shippingAddress}: {cartId: string, shippingAddress: shippingAddress}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;
    if(!token){
        throw new Error("You are not authorized");
    }
    try {
        const options : AxiosRequestConfig = {
            method: "POST",
            url: `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            headers: {
                "token": token
            },
            data: {
                shippingAddress
            }
        }
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function createOnlineOrder({cartId, shippingAddress, redirectUrl }: {cartId: string, shippingAddress: shippingAddress, redirectUrl: string}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;
    if(!token){
        throw new Error("You are not authorized");
    }
    try {
        const options : AxiosRequestConfig = {
            method: "POST",
            url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${redirectUrl}`,
            headers: {
                "token": token
            },
            data: {
                shippingAddress
            }
        }
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}

