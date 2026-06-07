/* Authentication slice for landing, signup & signin */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /* Auth typed email */
  authTypedEmail: "",
  /* Landing page error */
  LandingPageErrors: {
    upperEmailInvalid: null,
    lowerEmailInvalid: null,
    isLandingEmailValid: false,
  },
  /* Signup page error */
  SignupPageErrors: {
    invalidSignupEmail: null,
    invalidSignupPassword: null,
    firebaseSignupError: null,
    signupLoader: false,
  },
  /* Signin page error */
  SigninPageErrors: {
    invalidSigninEmail: null,
    isSigninEmailValid: false,
    invalidSigninPassword: null,
    firebaseSigninError: null,
    signinLoader: false,
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* Set auth typed email */
    setAuthTypedEmail: (state, action) => {
      state.authTypedEmail = action.payload;
    },
    /* Set landing page errors */
    setLandingPageErrors: (state, action) => {
      state.LandingPageErrors = {
        ...state.LandingPageErrors,
        ...action.payload,
      };
    },
    /* Set signup page errors */
    setSignupPageErrors: (state, action) => {
      state.SignupPageErrors = { ...state.SignupPageErrors, ...action.payload };
    },
    /* Set signin page errors */
    setSigninPageErrors: (state, action) => {
      state.SigninPageErrors = { ...state.SigninPageErrors, ...action.payload };
    },
    /* Reset errors */
    resetErrors: (state, action) => {
      state[action.payload] = initialState[action.payload];
    },
  },
});

export const {
  /* Auth typed email */
  setAuthTypedEmail,
  /* Landing page errors */
  setLandingPageErrors,
  /* Signup page error */
  setSignupPageErrors,
  /* Signin page errors */
  setSigninPageErrors,
  /* Reset errors */
  resetErrors,
} = AuthSlice.actions;
export default AuthSlice.reducer;
