import AdditionalHelp from "./AdditionalHelp";
import ForgetPasswordForm from "./ForgetPasswordForm";

export default function ForgetPasswordSection({setStep, setEmail}: {setStep: (step: number) => void, setEmail: (email: string) => void}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ForgetPasswordForm setStep={setStep} setEmail={setEmail} />
      <AdditionalHelp />
    </div>
  );
}
