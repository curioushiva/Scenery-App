import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/Utils/Hooks/useAuth/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { setSignupPageErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { resetErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";

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

  /* Reseting erros on page leave */
  useEffect(() => {
    dispatch(resetErrors("SignupPageErrors"));
  }, [location.pathname]);

  return (
    <div className="w-full bg-gradient-to-b from-[#431518] to-[#000000] p-8 pt-13">
      <div className="w-full h-[75dvh] flex justify-center items-center pb-85">
        <div className="h-full flex flex-col gap-2 justify-start items-start">
          <h1 className="text-4xl font-bold">Create your account</h1>
          <h2 className="text-lg text-textcolor-secondary pb-5">
            Get started by creating a new account
          </h2>
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
            className="w-[clamp(100%,40vw,480px)] px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary focus:outline focus:outline-white 350:w-[clamp(300px,50vw,480px)]"
            type="text"
            placeholder="Email Address"
          />
          <h3 className="ext-sm text-uicolor-primary">{invalidSignupEmail}</h3>
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
            className="w-[clamp(100%,40vw,480px)] px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary focus:outline focus:outline-white 350:w-[clamp(300px,50vw,480px)]"
            type="text"
            placeholder="Password"
          />
          <h4 className="ext-sm text-uicolor-primary">
            {invalidSignupPassword
              ? invalidSignupPassword
              : firebaseSignupError}
          </h4>
          <button
            onClick={() =>
              validateSignupCred(typedSignupEmail, typedSignupPassword)
            }
            className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-base bg-uicolor-primary font-medium 350:w-[clamp(300px,50vw,480px)] cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
          >
            {signupLoader ? "Creating account..." : "Sign Up"}
          </button>
          <Link to="/signin">
            <h4 className="text-base text-textcolor-secondary pt-5 underline decoration-solid">
              Already have an account? Sign in
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
