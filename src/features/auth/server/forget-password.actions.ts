"use server";
import axios, { AxiosError } from "axios";
import { AxiosRequestConfig } from "axios";
import { ForgetPasswordFormValues, forgetPasswordSchema } from "../schemas/forget-password.schema";


export default async function forgetPasswordAction(values: ForgetPasswordFormValues) {
  const validationResult = forgetPasswordSchema.safeParse(values);
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
    const { ...restData } = values;
    
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      data: restData,
    };
    const { data } = await axios.request(options);
    console.log(data);
    
    if (data.message === "success") {
      return { success: true, message: "forget password successfully", data };
    }
    return { success: false, message: data.message || "Something went wrong" };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      return {
        success: false,
        message: errorMessage || "Something went wrong",
      };
    }
    return { success: false, error };
  }
}
