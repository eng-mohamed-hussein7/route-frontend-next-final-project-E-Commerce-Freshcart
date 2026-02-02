"use server";
import axios, { AxiosError } from "axios";
import { AxiosRequestConfig } from "axios";

import { SignupFormValues, signupSchema } from "../schemas/signup.schema";

export default async function signupAction(values: SignupFormValues) {
  const validationResult = signupSchema.safeParse(values);
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
    const { terms, ...restData } = values;
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data: restData,
    };
    const { data } = await axios.request(options);
    if (data.message === "success") {
      return { success: true, message: "Account created successfully", data };
    }
    return { success: false, message: data.message || "Something went wrong" };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      if (errorMessage === "Account Already Exists") {
        return {
          success: false,
          message: "User already exists",
          errors: { email: "User already exists" },
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
