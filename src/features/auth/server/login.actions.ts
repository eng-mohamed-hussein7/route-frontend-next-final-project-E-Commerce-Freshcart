"use server";
import axios, { AxiosError } from "axios";
import { AxiosRequestConfig } from "axios";

import { LoginFormValues, loginSchema } from "../schemas/login.schema";

export default async function loginAction(values: LoginFormValues) {
  const validationResult = loginSchema.safeParse(values);
  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    if (validationResult.error) {
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        const message = issue.message;
        if (!errors[field]) {
          errors[field] = message;
        }
      });
    }
    return { success: false, message: "Validation failed", errors };
  }
  try {
    const { rememberMe, ...restData } = values;
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      data: restData,
    };
    const { data } = await axios.request(options);
    if (data.message === "success") {
      return { success: true, message: "login successfully", data };
    }
    return { success: false, message: data.message || "Something went wrong" };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      if (errorMessage === "Incorrect email or password") {
        return {
          success: false,
          message: "Incorrect email or password",
          errors: { password: "Incorrect email or password" },
        };
      }
      return {
        success: false,
        message: errorMessage || "Something went wrong",
      };
    }
    return { success: false, error };
  }
}
