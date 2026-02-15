"use server";
import axios, { AxiosError } from "axios";
import { AxiosRequestConfig } from "axios";
import {
  ForgetPasswordFormValues,
  forgetPasswordSchema,
  ResetPasswordFormValues,
  resetPasswordSchema,
  VerifyResetCodeFormValues,
  verifyResetCodeSchema,
} from "../schemas/forget-password.schema";
import {
  ForgetPasswordResponse,
  ResetPasswordResponse,
  VerifyResetCodeResponse,
} from "../types/forget-password.types";

export async function forgetPasswordAction(values: ForgetPasswordFormValues) {
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
    const { data } = await axios.request<ForgetPasswordResponse>(options);
    console.log(data);

    if (data.statusMsg === "success") {
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

export async function verifyResetCodeAction(values: VerifyResetCodeFormValues) {
  const validationResult = verifyResetCodeSchema.safeParse(values);
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
    console.log(values);

    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      data: values,
    };
    const { data } = await axios.request<VerifyResetCodeResponse>(options);
    console.log(data);

    if (data.status === "Success") {
      return { success: true, message: "verify reset code successfully", data };
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

export async function resetPasswordAction(values: ResetPasswordFormValues) {
  const validationResult = resetPasswordSchema.safeParse(values);
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
      method: "PUT",
      url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      data: restData,
    };
    const { data } = await axios.request<ResetPasswordResponse>(options);
    console.log(data);

    if (data.token) {
      return { success: true, message: "reset password successfully", data };
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
