"use server";

import { cookies } from "next/headers";
import { AuthState } from "../store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";

export async function setToken(
  token: string,
  rememberMe: boolean,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: rememberMe ? 60 * 60 * 24 : 60 * 60 * 24 * 30,
  });
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function removeToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function verifyToken(): Promise<AuthState> {
  const token = await getToken();
  if (!token) {
    return {
      userInfo: null,
      token: null,
      isAuthenticated: false,
    };
  }
  try {
    const options: AxiosRequestConfig = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        method: "GET",
      headers: {
        token,
      },
    };
    const {data} = await axios.request(options);
    
    if(data.message === "verified"){
        return {
            userInfo: data.user,
            token,
            isAuthenticated: true,
        };
    } 
    return {
        userInfo: null,
        token: null,
        isAuthenticated: false,
    };
  } catch (error) {
    return {
      userInfo: null,
      token: null,
      isAuthenticated: false,
    };
  }
}
