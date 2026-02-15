"use client";
import { useState } from "react";
import ForgetPasswordSection from "../components/ForgetPassword/ForgetPasswordSection";
import ResetPasswordSection from "../components/ForgetPassword/ResetPasswordSection";
import VerifyResetCodeSection from "../components/ForgetPassword/VerifyResetCodeSection";

export default function ForgetPasswordScreen() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  return (
    <>
      {step === 1 && (
        <ForgetPasswordSection setStep={setStep} setEmail={setEmail} />
      )}
      {step === 2 && <VerifyResetCodeSection setStep={setStep} email={email} />}
      {step === 3 && <ResetPasswordSection setStep={setStep} email={email} />}
    </>
  );
}
