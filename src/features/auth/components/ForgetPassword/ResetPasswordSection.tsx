"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "../../schemas/forget-password.schema";
import { resetPasswordAction } from "../../server/forget-password.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ResetPasswordSection({
  setStep,
  email,
}: {
  setStep: (step: number) => void;
  email: string;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (values) => {
    try {
      const response = await resetPasswordAction(values);
      console.log(response);

      if (response.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faKey}
                  className="text-xl text-primary-600"
                />
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
              Reset Password
            </h1>
            <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed">
              Enter your email address and new password to reset your account
              password.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    disabled
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    {...register("newPassword")}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="text-sm"
                    />
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}

                <div className="mt-2.5 space-y-1.5">
                  <p className="text-xs text-gray-400 font-medium">
                    Password must contain:
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      One uppercase letter
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      One number
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                      className="text-sm"
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Reset Password
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="py-6 text-center border-t border-gray-100 bg-white">
        <p className="text-sm text-gray-500">
          Need help?{" "}
          <Link
            href="#"
            className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
