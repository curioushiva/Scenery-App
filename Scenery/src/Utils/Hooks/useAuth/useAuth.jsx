/* Custom hook for authTypedEmail and usersTypedPassword authentication */
import { useDispatch } from "react-redux";
import {
  setAuthTypedEmail,
  setLandingPageErrors,
  setSignupPageErrors,
  setSigninPageErrors,
} from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { auth } from "@/Utils/Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export const useAuth = () => {
  /* To dispatch */
  const dispatch = useDispatch();

  /* Regex for valid email */
  const isEmailValid = (email) => {
    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email,
    );
    return valid ? null : "⨂ Please enter a valid Email.";
  };

  /* Regex for valid password */
  const isPasswordValid = (password) => {
    const valid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password,
      );
    return valid ? null : "⨂ Please enter a valid Password.";
  };

  /* Email Validation for upper part of landing page */
  const validateUpperEmail = (upperTypedEmail) => {
    const invalidEmailMsg = isEmailValid(upperTypedEmail);
    if (invalidEmailMsg) {
      dispatch(
        setLandingPageErrors({
          upperEmailInvalid: invalidEmailMsg,
          isLandingEmailValid: false,
        }),
      );
    } else {
      dispatch(setAuthTypedEmail(upperTypedEmail));
      dispatch(
        setLandingPageErrors({
          upperEmailInvalid: null,
          isLandingEmailValid: true,
        }),
      );
    }
  };

  /* Email Validation for lower part of landing page */
  const validateLowerEmail = (lowertypedEmail) => {
    const invalidEmailMsg = isEmailValid(lowertypedEmail);
    if (invalidEmailMsg) {
      dispatch(
        setLandingPageErrors({
          lowerEmailInvalid: invalidEmailMsg,
          isLandingEmailValid: false,
        }),
      );
    } else {
      dispatch(setAuthTypedEmail(lowertypedEmail));
      dispatch(
        setLandingPageErrors({
          lowerEmailInvalid: null,
          isLandingEmailValid: true,
        }),
      );
    }
  };

  /* Email and password validation for signup page */
  const validateSignupCred = (typedSignupEmail, typedSignupPassword) => {
    const invalidSignupEmailMsg = isEmailValid(typedSignupEmail);
    const invalidSignupPassMsg = isPasswordValid(typedSignupPassword);
    if (invalidSignupEmailMsg || invalidSignupPassMsg) {
      dispatch(
        setSignupPageErrors({
          invalidSignupEmail: invalidSignupEmailMsg,
          invalidSignupPassword: invalidSignupPassMsg,
          firebaseSignupError: null,
        }),
      );
    } else {
      dispatch(setAuthTypedEmail(typedSignupEmail));
      dispatch(
        setSignupPageErrors({
          invalidSignupEmail: null,
          invalidSignupPassword: null,
          signupLoader: true,
        }),
      );
      /* Firebase - Sign up new users */
      createUserWithEmailAndPassword(
        auth,
        typedSignupEmail,
        typedSignupPassword,
      )
        .then(() => {})
        .catch((error) => {
          dispatch(
            setSignupPageErrors({
              signupLoader: false,
            }),
          );
          const errorCode = error.code;
          const getSignupAuthError = (errorCode) => {
            switch (errorCode) {
              case "auth/email-already-in-use":
                return "Email already registered.";

              case "auth/invalid-email":
                return "Invalid email address.";

              case "auth/weak-password":
                return "Password too weak.";

              case "auth/network-request-failed":
                return "No internet connection.";

              default:
                return "Something went wrong.";
            }
          };
          const resultGetSignupAuthError = getSignupAuthError(errorCode);
          dispatch(
            setSignupPageErrors({
              firebaseSignupError: resultGetSignupAuthError,
            }),
          );
        });
    }
  };

  /* Email Validation for signin page */
  const validateSigninEmail = (typedSigninEmail) => {
    const invalidSigninEmailMsg = isEmailValid(typedSigninEmail);
    if (invalidSigninEmailMsg) {
      dispatch(
        setSigninPageErrors({
          invalidSigninEmail: invalidSigninEmailMsg,
        }),
      );
    } else {
      dispatch(setAuthTypedEmail(typedSigninEmail));
      dispatch(
        setSigninPageErrors({
          invalidSigninEmail: null,
          isSigninEmailValid: true,
        }),
      );
    }
  };

  /* Password Validation for signin page */
  const validateSigninPassword = (typedSigninPassword, typedSigninEmail) => {
    const invalidSigninPasswordMsg = isPasswordValid(typedSigninPassword);
    if (invalidSigninPasswordMsg) {
      dispatch(
        setSigninPageErrors({
          invalidSigninPassword: invalidSigninPasswordMsg,
          firebaseSigninError: null,
        }),
      );
    } else {
      dispatch(setAuthTypedEmail(typedSigninEmail));
      dispatch(
        setSigninPageErrors({
          invalidSigninPassword: null,
          firebaseSigninError: null,
          signinLoader: true,
        }),
      );
      /* Firebase - Sign in user */
      signInWithEmailAndPassword(auth, typedSigninEmail, typedSigninPassword)
        .then(() => {})
        .catch((error) => {
          dispatch(setSigninPageErrors({ signinLoader: false }));
          const errorCode = error.code;
          const getSigninAuthError = (errorCode) => {
            switch (errorCode) {
              case "auth/invalid-credential":
              case "auth/user-not-found":
              case "auth/wrong-password":
                return "Invalid email or password";

              case "auth/invalid-email":
                return "Invalid email format";

              case "auth/user-disabled":
                return "Account disabled. Contact support";

              case "auth/too-many-requests":
                return "Too many attempts. Try again later";

              case "auth/network-request-failed":
                return "Network error. Check your connection";

              default:
                return "Login failed. Try again";
            }
          };
          const resultGetSigninAuthError = getSigninAuthError(errorCode);
          dispatch(
            setSigninPageErrors({
              firebaseSigninError: resultGetSigninAuthError,
            }),
          );
        });
    }
  };

  /* To switch to email form for signin */
  const switchToSigninEmailForm = () => {
    dispatch(
      setSigninPageErrors({
        invalidSigninPassword: null,
        isSigninEmailValid: false,
      }),
    );
  };

  /* To reset password */
  const resetPassword = async (emailAdresss) => {
    /* Check for email validity */
    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      emailAdresss,
    );
    if (!valid) {
      return {
        success: false,
        message: "⨂ Please enter a valid email",
      };
    }

    /* Password reset */
    try {
      await sendPasswordResetEmail(auth, emailAdresss);
      return {
        success: true,
        message: "✓ Password reset link sent. Check your inbox",
      };
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          return {
            success: false,
            message: "⨂ No account found with this email",
          };

        case "auth/invalid-email":
          return {
            success: false,
            message: "⨂ Invalid email address",
          };

        case "auth/too-many-requests":
          return {
            success: false,
            message: "⨂ Too many attempts. Try again later",
          };

        case "auth/network-request-failed":
          return {
            success: false,
            message: "⨂ Network error. Check your connection",
          };

        default:
          return {
            success: false,
            message: "⨂ Failed to send reset email",
          };
      }
    }
  };

  return {
    /* Landing page */
    validateUpperEmail,
    validateLowerEmail,
    /* Signup page */
    validateSignupCred,
    /* Signin page */
    validateSigninEmail,
    validateSigninPassword,
    switchToSigninEmailForm,
    /* Reset password */
    resetPassword,
  };
};
