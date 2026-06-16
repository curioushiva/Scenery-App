import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/Utils/Hooks/useAuth/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setSignupPageErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { resetErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";

const Signup = () => {
  /* For dispatch & location */
  const dispatch = useDispatch();
  const location = useLocation();

  /* To validate signup credentials */
  const { validateSignupCred } = useAuth();

  /* Selecting email typed by user */
  const authTypedEmail = useSelector((store) => store.auth.authTypedEmail);

  /* Selecting signup page errors */
  const {
    invalidSignupEmail,
    invalidSignupPassword,
    firebaseSignupError,
    signupLoader,
  } = useSelector((store) => store.auth.SignupPageErrors);

  /* To set email and password */
  const [typedSignupEmail, settypedSignupEmail] = useState(authTypedEmail);
  const [typedSignupPassword, settypedSignupPassword] = useState("");

  /* To show password */
  const [showPassword, setShowPassword] = useState(false);

  /* Reseting erros on page leave */
  useEffect(() => {
    dispatch(resetErrors("SignupPageErrors"));
  }, [location.pathname]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-md h-full flex flex-col gap-2 justify-start items-start">
        {/* Heading */}
        <h1 className="text-4xl font-bold">Create your account</h1>
        <h2 className="text-lg text-text-secondary pb-5">
          Get started by creating a new account
        </h2>

        {/* Email input fields */}
        <input
          value={typedSignupEmail}
          onChange={(e) => {
            settypedSignupEmail(e.target.value);
            dispatch(
              setSignupPageErrors({
                invalidSignupEmail: null,
                firebaseSignupError: null,
              }),
            );
          }}
          className="w-full px-5 py-3 rounded-sm border border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
          type="email"
          placeholder="Email Address"
        />
        <p className="ext-sm text-errorcolor">{invalidSignupEmail}</p>

        {/* Password input fields */}
        <div className="w-full relative">
          <input
            value={typedSignupPassword}
            onChange={(e) => {
              settypedSignupPassword(e.target.value);
              dispatch(
                setSignupPageErrors({
                  invalidSignupPassword: null,
                  firebaseSignupError: null,
                }),
              );
            }}
            className="w-full px-5 pr-14 py-3 rounded-sm border border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
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
        <p className="ext-sm text-errorcolor">
          {invalidSignupPassword
            ? invalidSignupPassword
            : firebaseSignupError}
        </p>

        {/* Button */}
        <button
          onClick={() =>
            validateSignupCred(typedSignupEmail, typedSignupPassword)
          }
          className="w-full px-5 py-3 rounded-sm text-base bg-btn-primary font-medium cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
        >
          {signupLoader ? "Creating account..." : "Sign Up"}
        </button>

        {/* Navigate to sigin page */}
        <Link to="/signin">
          <h4 className="text-sm font-regular text-text-secondary pt-5 underline decoration-solid">
            Already have an account? Sign in
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
