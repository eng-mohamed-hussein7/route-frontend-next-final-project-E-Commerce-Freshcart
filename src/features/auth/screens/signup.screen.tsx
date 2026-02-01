import SignupForm from '../components/signup/SignupForm'
import SignupHero from '../components/signup/SignupHero'

export default function SignupScreen() {
  return (
    <>
    <main className="py-12">
        <div className="container grid lg:grid-cols-2 lg:gap-12">
          <SignupHero />
          <SignupForm />
        </div>
      </main>
    </>
  )
}
