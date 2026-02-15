"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgetPasswordFormValues,
  VerifyResetCodeFormValues,
  verifyResetCodeSchema,
} from "../../schemas/forget-password.schema";
import { forgetPasswordAction, verifyResetCodeAction } from "../../server/forget-password.actions";
import { toast } from "react-toastify";

export default function VerifyResetCodeSection({
  setStep,
  email,
}: {
  setStep: (step: number) => void;
  email: string;
}) {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyResetCodeFormValues>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      resetCode: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<VerifyResetCodeFormValues> = async (values) => {
    try {
      const response = await verifyResetCodeAction(values);
      console.log(response);

      if (response.success) {
        toast.success(response.message);
        setStep(3);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(600); // 10:00
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const joinedCode = code.join("");
    setValue("resetCode", joinedCode, { shouldValidate: true });
  }, [code, setValue]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData) {
      const newCode = [...code];
      pastedData.split("").forEach((char, i) => {
        newCode[i] = char;
      });
      setCode(newCode);
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  const handleResendCode = async () => {
    try {
          const response = await forgetPasswordAction({email});
          console.log(response);
    
          if (response.success) {
            toast.success(response.message);
            setTimeLeft(600);
          } else {
            toast.error(response.message);
           
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="text-xl text-primary-600"
                />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
                Verify Reset Code
              </h1>
              <p className="text-gray-500 text-sm text-center mb-1 leading-relaxed">
                We've sent a verification code to your email address
              </p>
              <p className="text-primary-600 text-sm font-medium text-center mb-8">
                {email}
              </p>

              <p className="text-sm font-medium text-gray-900 text-center mb-4">
                Enter 6-digit verification code
              </p>

              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center mb-6">
                Code expires in{" "}
                <span className="text-primary-600 font-semibold">
                  {formatTime(timeLeft)}
                </span>
              </p>

              {/* {errors.resetCode && (
                <p className="text-red-500 text-sm text-center mb-4">
                  {errors.resetCode.message}
                </p>
              )} */}

              <button
                type="submit"
                disabled={!isCodeComplete}
                className="w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20 active:scale-[0.98] disabled:shadow-none"
              >
                Verify Code
              </button>
            </form>

            <div className="text-center mt-6 space-y-3">
              <p className="text-sm text-gray-500">
                Didn't receive the code?
              </p>
              <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors" onClick={handleResendCode}>
                Resend Code
              </button>
              <div>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
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
