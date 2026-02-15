import ForgetPasswordForm from "../components/ForgetPassword/ForgetPasswordForm";
import AdditionalHelp from "../components/ForgetPassword/AdditionalHelp";

export default function ForgetPasswordScreen() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ForgetPasswordForm />
      <AdditionalHelp />
    </div>
  );
}
