import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/Utils/Hooks/useAuth/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setSigninPageErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { resetErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { RiArrowDownSLine, RiEyeCloseLine, RiEyeLine } from "@remixicon/react";

const Signin = () => {
  /* For dispatch & location */
  const dispatch = useDispatch();
  const location = useLocation();

  /* To validate email, password & switch to email form */
  const {
    validateSigninEmail,
    validateSigninPassword,
    switchToSigninEmailForm,
  } = useAuth();

  /* Selecting email typed by user */
  const authTypedEmail = useSelector((store) => store.auth.authTypedEmail);

  /* Selecting signin page errors */
  const {
    invalidSigninEmail,
    isSigninEmailValid,
    invalidSigninPassword,
    firebaseSigninError,
    signinLoader,
  } = useSelector((store) => store.auth.SigninPageErrors);

  /* Set email & passwords */
  const [typedSigninEmail, setTypedSigninEmail] = useState(authTypedEmail);
  const [typedSigninPassword, setTypedSigninPassword] = useState("");

  /* To show password */
  const [showPassword, setShowPassword] = useState(false);

  /* To show forget password */
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  /* Reseting erros on page leave */
  useEffect(() => {
    dispatch(resetErrors("SigninPageErrors"));
  }, [location.pathname]);

  /* Toggle between email and password logic */
  return (
    <div className="w-full flex justify-center items-center">
      {isSigninEmailValid ? (
        /* Password component */
        <div className="w-full max-w-md h-full flex flex-col gap-2 justify-start items-start">
          {/* Heading */}
          <h1 className="text-4xl font-bold">Sign in to your account</h1>
          <h2 className="text-lg text-text-secondary pb-5">
            Enter your details to continue
          </h2>

          {/* Input fields */}
          <div className="w-full relative">
            <input
              value={typedSigninPassword}
              onChange={(e) => {
                setTypedSigninPassword(e.target.value);
                dispatch(
                  setSigninPageErrors({
                    invalidSigninPassword: null,
                    firebaseSigninError: null,
                  }),
                );
              }}
              className="w-full px-5 pr-14 py-3 rounded-sm border-1 border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute z-10 right-5 top-4 cursor-pointer text-text-secondary"
            >
              {showPassword ? (
                <RiEyeLine className="w-5 h-5" />
              ) : (
                <RiEyeCloseLine className="w-5 h-5" />
              )}
            </div>
          </div>
          <p className="text-sm text-errorcolor">
            {invalidSigninPassword
              ? invalidSigninPassword
              : firebaseSigninError}
          </p>

          {/* Buttton */}
          <button
            onClick={() => {
              validateSigninPassword(typedSigninPassword, typedSigninEmail);
            }}
            className="w-full px-5 py-3 rounded-sm text-base bg-btn-primary font-medium cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
          >
            {signinLoader ? "Signing in..." : "Sign In"}
          </button>

          {/* Navigate back to email component */}
          <Link
            onClick={() => switchToSigninEmailForm()}
            className="text-sm font-regular text-text-secondary pt-5 underline decoration-solid"
          >
            Not your account? Use another email
          </Link>

          {/* Navigate to forgot password page */}
          <div
            onClick={() => setShowForgotPassword((prev) => !prev)}
            className="flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-end gap-1">
              <h1 className="text-sm sm:text-base font-regular pt-2 decoration-solid">
                Can't log in?
              </h1>
              <RiArrowDownSLine
                className={`${showForgotPassword && "rotate-180"} w-5 h-5 sm:w-6 sm:h-6`}
              />
            </div>
            {showForgotPassword && (
              <Link
                to="/resetpassword"
                className="text-sm font-regular underline"
              >
                Forgot password? Reset it from here
              </Link>
            )}
          </div>
        </div>
      ) : (
        /* Email component */
        <div className="w-full max-w-md h-full flex flex-col gap-2 justify-start items-start">
          {/* Heading */}
          <h1 className="text-4xl font-bold">Sign in to your account</h1>
          <h2 className="text-lg text-text-secondary pb-5">
            Enter your details to continue
          </h2>

          {/* Input fields */}
          <input
            value={typedSigninEmail}
            onChange={(e) => {
              setTypedSigninEmail(e.target.value);
              dispatch(
                setSigninPageErrors({
                  invalidSigninEmail: null,
                  firebaseSigninError: null,
                }),
              );
            }}
            className="w-full px-5 py-3 rounded-sm border-1 border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
            type="email"
            placeholder="Email Address"
          />
          <p className="text-sm text-errorcolor">{invalidSigninEmail}</p>

          {/* Button */}
          <button
            onClick={() => validateSigninEmail(typedSigninEmail)}
            className="w-full px-5 py-3 rounded-sm text-base bg-btn-primary font-medium cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
          >
            Continue
          </button>

          {/* Navigate to signup page */}
          <Link
            to="/signup"
            className="text-sm font-regular text-text-secondary pt-5 underline decoration-solid"
          >
            New here? Sign up to get started
          </Link>

        </div>
      )}
    </div>
  );
};

export default Signin;
