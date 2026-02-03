"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faShieldHalved,
  faUsers,
  faStar,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import loginAction from "../../server/login.actions";
import { toast } from "react-toastify";
import { setToken } from "../../server/auth.actions";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../../store/auth.slice";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await loginAction(values);
      if (response.success) {
        toast.success(response.message);
        await setToken(response.data?.token, values.rememberMe);
        dispatch(setAuthInfo({userInfo:response.data?.userInfo,token:response.data?.token,isAuthenticated:true}))
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(response.message);
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof LoginFormValues, {
              message: response.errors[key as keyof LoginFormValues],
            });
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg shadow-lg rounded-lg p-6">
      {/* Logo & Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          <span className="text-primary-500">Fresh</span>
          <span className="text-gray-800">Cart</span>
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-500 text-sm">
          Sign in to continue your fresh shopping experience
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <FontAwesomeIcon
            icon={faFacebookF}
            className="text-blue-600 text-lg"
          />
          <span className="text-gray-700 font-medium">
            Continue with Facebook
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-400">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Login Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faLock} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">*{errors.password.message}</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        {/* Keep me signed in */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="keepSignedIn"
            checked={keepSignedIn}
            onChange={(e) => setKeepSignedIn(e.target.checked)}
            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="keepSignedIn" className="ml-2 text-sm text-gray-600">
            Keep me signed in
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center mt-6 text-gray-600">
        New to FreshCart?{" "}
        <Link
          href="/signup"
          className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
        >
          Create an account
        </Link>
      </p>

      {/* Trust Badges */}
      <div className="flex justify-center items-center gap-6 mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faShieldHalved} className="text-gray-400" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faUsers} className="text-gray-400" />
          <span>50K+ Users</span>
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
          <span>4.9 Rating</span>
        </div>
      </div>
    </div>
  );
}
