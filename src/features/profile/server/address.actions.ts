"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { AddressInput } from "../schemas/address.schema";

export async function addAddress(address: AddressInput) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if(!token){
        throw new Error("Authentication required")
    }

    try {
        const options: AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/addresses",
            method: "POST",
            headers: {
                token,
            },
            data: address,
        };
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getLoggedUserAddress() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if(!token){
        throw new Error("Authentication required")
    }

    try {
        const options: AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/addresses",
            method: "GET",
            headers: {
                token,
            },
        };
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteAddress(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if(!token){
        throw new Error("Authentication required")
    }

    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
            method: "DELETE",
            headers: {
                token,
            },
        };
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateAddress(id: string, address: AddressInput) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if(!token){
        throw new Error("Authentication required")
    }

    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
            method: "PUT",
            headers: {
                token,
            },
            data: address,
        };
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}
