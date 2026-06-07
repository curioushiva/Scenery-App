import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/Utils/Hooks/useAuth/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setSigninPageErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { resetErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";

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

  /* Reseting erros on page leave */
  useEffect(() => {
    dispatch(resetErrors("SigninPageErrors"));
  }, [location.pathname]);

  /* Toggle between email and password logic */
  return (
    <div className="w-full bg-gradient-to-b from-[#431518] to-[#000000] p-8 pt-13">
      <div className="w-full h-[75dvh] flex justify-center items-center pb-70">
        {isSigninEmailValid ? (
          <div className="h-full flex flex-col gap-2 justify-start items-start">
            <h1 className="text-4xl font-bold">Sign in to your account</h1>
            <h2 className="text-lg text-textcolor-secondary pb-5">
              Enter your details to continue
            </h2>
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
              className="w-[clamp(100%,40vw,480px)] px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary focus:outline focus:outline-white 350:w-[clamp(300px,50vw,480px)]"
              type="text"
              placeholder="Password"
            />
            <p className="text-sm text-uicolor-primary">
              {invalidSigninPassword
                ? invalidSigninPassword
                : firebaseSigninError}
            </p>
            <button
              onClick={() => {
                validateSigninPassword(typedSigninPassword, typedSigninEmail);
              }}
              className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-base bg-uicolor-primary font-medium 350:w-[clamp(300px,50vw,480px)] cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
            >
              {signinLoader ? "Signing in..." : "Sign In"}
            </button>
            <Link
              onClick={() => switchToSigninEmailForm()}
              className="text-base text-textcolor-secondary pt-5 underline decoration-solid"
            >
              Not your account? Use another email
            </Link>
          </div>
        ) : (
          <div className="h-full flex flex-col gap-2 justify-start items-start">
            <h1 className="text-4xl font-bold">Sign in to your account</h1>
            <h2 className="text-lg text-textcolor-secondary pb-5">
              Enter your details to continue
            </h2>
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
              className="w-[clamp(100%,40vw,480px)] px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary focus:outline focus:outline-white 350:w-[clamp(300px,50vw,480px)]"
              type="text"
              placeholder="Email Address"
            />
            <p className="text-sm text-uicolor-primary">{invalidSigninEmail}</p>
            <button
              onClick={() => validateSigninEmail(typedSigninEmail)}
              className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-base bg-uicolor-primary font-medium 350:w-[clamp(300px,50vw,480px)] cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
            >
              Continue
            </button>
            <Link
              to="/signup"
              className="text-base text-textcolor-secondary pt-5 underline decoration-solid"
            >
              New here? Sign up to get started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
