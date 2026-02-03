"use client";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "../../schemas/signup.schema";
import signupAction from "../../server/signup.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setToken } from "../../server/auth.actions";
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../../store/auth.slice";

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
      terms: false,
    },

    resolver: zodResolver(signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
    const response = await signupAction(values);
    try {
      if (response?.success) {
        toast.success(response.message);
        await setToken(response.data?.token, false);
        dispatch(
          setAuthInfo({
            userInfo: response.data?.userInfo,
            token: response.data?.token,
            isAuthenticated: true,
          }),
        );

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof SignupFormValues, {
              message: response.errors[key],
            });
          });
        }
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
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
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3">
            or
          </span>
        </div>
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="name flex gap-1 flex-col">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              placeholder="Ali"
              className="form-control"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 mt-0.5">*{errors.name.message}</p>
            )}
          </div>
          <div className="email flex gap-1 flex-col">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              placeholder="ali.route@gmail.com"
              className="form-control"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 mt-0.5">*{errors.email.message}</p>
            )}
          </div>
          <div className="phone flex gap-1 flex-col">
            <label htmlFor="phone">Phone*</label>
            <input
              type="tel"
              id="phone"
              placeholder="+2 010 9751 4862"
              className="form-control"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 mt-0.5">*{errors.phone.message}</p>
            )}
          </div>
          <div className="password flex gap-1 flex-col">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="create a strong password"
              {...register("password")}
            />
            <div className="pssword-strength flex gap-2 items-center">
              <div className="bar rounded-xl overflow-hidden w-full h-1 bg-gray-200">
                <div className="progress w-1/4 bg-red-500 h-full"></div>
              </div>
              <span>Week</span>
            </div>

            {errors.password ? (
              <p className="text-red-500 mt-0.5">*{errors.password.message}</p>
            ) : (
              <p className="text-sm -mt-2">
                Must be at least 8 characters with numbers and symbols
              </p>
            )}
          </div>
          <div className="rePassword flex gap-1 flex-col">
            <label htmlFor="rePassword">Confirm Password*</label>
            <input
              type="password"
              id="rePassword"
              placeholder="confirm your password"
              className="form-control"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-500 mt-0.5">
                *{errors.rePassword.message}
              </p>
            )}
          </div>
          <div className="terms flex gap-2 items-center">
            <input
              type="checkbox"
              id="terms"
              className="accent-primary-600 size-4"
              {...register("terms")}
            />
            <label htmlFor="terms">
              I agree to the{" "}
              <Link href={`/terms`} className="text-primary-600 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={`/privacy`} className="text-primary-600 underline">
                {" "}
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 -mt-5">*{errors.terms.message}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                <span> Creating Account...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUserPlus} />
                <span> Create My Account</span>
              </>
            )}
          </button>
        </form>
        <p className="text-center pt-8 border-t border-gray-300/50">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600 underline">
            Sign In
          </Link>
        </p>
      </section>
    </>
  );
}
