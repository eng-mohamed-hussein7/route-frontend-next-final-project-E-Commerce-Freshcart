import LoginForm from "../components/login/LoginForm";
import LoginHero from "../components/login/LoginHero";

export default function LoginScreen() {
  return (
    <main className="py-12">
      <div className="container grid lg:grid-cols-2 lg:gap-12">
        <LoginHero />
        <LoginForm />
      </div>
    </main>
  );
}
