import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SignupForm() {
  return (
    <>
      <section className="Signup-Form p-10 space-y-8 bg-white rounded-xl shadow-xl">
        <div className="title text-center">
          <h2 className="text-3xl font-semibold">Create Your Account</h2>
          <p className="mt-1">Start your fresh journey with us today</p>
        </div>
        <div className="action-btns flex gap-2 *:flex *:justify-center *:items-center *:gap-2 *:w-full *:hover:bg-gray-100 ">
          <button className="btn bg-transparent border border-gray-400/40">
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            <span>Google</span>
          </button>
          <button className="btn bg-transparent border border-gray-400/40">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
            <span>Facebook</span>
          </button>
        </div>
        <div className="relative w-full h-0.5 bg-gray-300/30">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3">or</span>
        </div>
        <form className="space-y-7">
          <div className="name flex gap-1 flex-col">
            <label htmlFor="name">Name*</label>
            <input type="text" id="name" placeholder="Ali"  className="form-control"/>
          </div>
          <div className="email flex gap-1 flex-col">
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" placeholder="ali.route@gmail.com"  className="form-control"/>
          </div>
          <div className="phone flex gap-1 flex-col">
            <label htmlFor="phone">Phone*</label>
            <input type="tel" id="phone" placeholder="+2 010 9751 4862" className="form-control" />
          </div>
          <div className="password flex gap-1 flex-col">
            <label htmlFor="password">Password*</label>
            <input
              type="password" className="form-control"
              id="password"
              placeholder="create a strong password"
            />

            <div className="pssword-strength flex gap-2 items-center">
              <div className="bar rounded-xl overflow-hidden w-full h-1 bg-gray-200">
                <div className="progress w-1/4 bg-red-500 h-full"></div>
              </div>
              <span>Week</span>
            </div>
            <p className="text-sm -mt-2">Must be at least 8 characters with numbers and symbols</p>
          </div>
          <div className="rePassword flex gap-1 flex-col">
            <label htmlFor="rePassword">Confirm Password*</label>
            <input
              type="text"
              id="rePassword"
              placeholder="confirm your password" className="form-control"
            />
          </div>
          <div className="terms flex gap-2 items-center">
            <input type="checkbox" name="terms" id="terms" className="accent-primary-600 size-4"/>
            <label htmlFor="terms">
              I agree to the <Link href={`/terms`} className="text-primary-600 underline">Terms of Service</Link> and{" "}
              <Link href={`/privacy`} className="text-primary-600 underline"> Privacy Policy</Link>
            </label>
          </div>
          <button type="submit" className="btn w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white ">
            <FontAwesomeIcon icon={faUserPlus} />
            <span> Create My Account</span>
          </button>
        </form>
        <p className="text-center pt-8 border-t border-gray-300/50">
          Already have an account? <Link href={`/login`} className="text-primary-600 underline">Sign In</Link>
        </p>
      </section>
    </>
  );
}
