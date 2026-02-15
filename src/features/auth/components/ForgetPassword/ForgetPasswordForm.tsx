"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faPaperPlane,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgetPasswordFormValues, forgetPasswordSchema } from "../../schemas/forget-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import forgetPasswordAction from "../../server/forget-password.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ForgetPasswordForm() {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgetPasswordFormValues>(
    {
      defaultValues: {
        email: "",
      },
      resolver: zodResolver(forgetPasswordSchema),
      mode: "onSubmit",
      reValidateMode: "onChange",
    }
  );

    const onSubmit: SubmitHandler<ForgetPasswordFormValues> = async (values) => {
    try {
      const response = await forgetPasswordAction(values);
      console.log(response);
      
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.message);
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof ForgetPasswordFormValues, {
              message: response.errors[key as keyof ForgetPasswordFormValues],
            });
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faLock}
                className="text-xl text-primary-600"
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Forgot your password?
          </h1>
          <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed">
            No worries! Enter your email address and we&apos;ll send you a link
            to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Your registered email address"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  {...register("email")}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Reset Link
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-5">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-5 flex items-start gap-3 px-5 py-4 bg-white rounded-xl border border-gray-100">
          <FontAwesomeIcon
            icon={faShieldHalved}
            className="text-primary-500 mt-0.5"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Security Notice
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
              For your security, a password reset link will be sent to your
              registered email address. The link will expire after 30 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
