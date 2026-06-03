/* Custom hook for usersTypedEmail and usersTypedPassword authentication */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsersTypedEmail } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { auth } from "@/Utils/Firebase/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const useAuth = () => {

    /* To dispatch user info */
    const dispatch = useDispatch();

    /* Regex for valid email */
    const isEmailValid = (email) => {
        const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        return valid ? null : "⊗ Please enter a valid Email.";
    };

    /* Regex for valid password */
    const isPasswordValid = (password) => {
        const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        return valid ? null : "⊗ Please enter a valid Password.";
    };

    /* Toggle btwn home and signup or signin page */
    const [isHomeEmailValid, setisHomeEmailValid] = useState(false);

    /* Email Validation for upper part of home page */
    const [upperInvalidEmail, setupperInvalidEmail] = useState(null);
    const validateUpperEmail = (upperTypedEmail) => {
        const invalidEmailMsg = isEmailValid(upperTypedEmail);
        if (invalidEmailMsg) {
            setupperInvalidEmail(invalidEmailMsg);
            setisHomeEmailValid(false);
        } else {
            dispatch(addUsersTypedEmail(upperTypedEmail));
            setupperInvalidEmail(null);
            setisHomeEmailValid(true);
        }
    };

    /* Email Validation for lower part of home page */
    const [lowerInvalidEmail, setlowerInvalidEmail] = useState(null);
    const validateLowerEmail = (lowertypedEmail) => {
        const invalidEmailMsg = isEmailValid(lowertypedEmail);
        if (invalidEmailMsg) {
            setlowerInvalidEmail(invalidEmailMsg);
            setisHomeEmailValid(false);
        } else {
            dispatch(addUsersTypedEmail(lowertypedEmail));
            setlowerInvalidEmail(null);
            setisHomeEmailValid(true);
        }
    };

    /* Email and password validation for signup page */
    const [invalidSignupEmail, setinvalidSignupEmail] = useState(null);
    const [invalidSignupPassword, setinvalidSignupPassword] = useState(null);
    const [firebaseSignupError, setfirebaseSignupError] = useState(null);
    const validateSignupCred = (typedSignupEmail, typedSignupPassword) => {
        const invalidSignupEmailMsg = isEmailValid(typedSignupEmail);
        setfirebaseSignupError(null);
        setinvalidSignupEmail(invalidSignupEmailMsg);
        const invalidSignupPassMsg = isPasswordValid(typedSignupPassword);
        setinvalidSignupPassword(invalidSignupPassMsg);
        if (!invalidSignupEmailMsg && !invalidSignupPassMsg) {
            setinvalidSignupPassword(null);
            dispatch(addUsersTypedEmail(typedSignupEmail));
            /* Firebase - Sign up new users */
            createUserWithEmailAndPassword(auth, typedSignupEmail, typedSignupPassword)
                .then(() => {
                    setfirebaseSignupError(null);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const getAuthErrorMessage = (errorCode) => {
                        switch (errorCode) {
                            case 'auth/email-already-in-use':
                                return 'Email already registered.';

                            case 'auth/invalid-email':
                                return 'Invalid email address.';

                            case 'auth/weak-password':
                                return 'Password too weak.';

                            case 'auth/network-request-failed':
                                return 'No internet connection.';

                            default:
                                return 'Something went wrong.';
                        }
                    };
                    setfirebaseSignupError(getAuthErrorMessage(errorCode));
                });
        }
    };

    /* Toggling btwn Signin email and Signin Password */
    const [isSigninEmailValid, setisSigninEmailValid] = useState(false);

    /* Email Validation for signin page */
    const [invalidSigninEmail, setinvalidSigninEmail] = useState(null);
    const validateSigninEmail = (typedSigninEmail) => {
        const invalidSigninEmailMsg = isEmailValid(typedSigninEmail);
        if (invalidSigninEmailMsg) {
            setinvalidSigninEmail(invalidSigninEmailMsg);
        } else {
            dispatch(addUsersTypedEmail(typedSigninEmail));
            setinvalidSigninEmail(null);
            setisSigninEmailValid(true);
        }
    };

    /* Password Validation for signin page */
    const [invalidSigninPassword, setinvalidSigninPassword] = useState(null);
    const [firebaseSigninError, setfirebaseSigninError] = useState(null);
    const validateSigninPassword = (typedSigninPassword, typedSigninEmail) => {
        const invalidSigninPasswordMsg = isPasswordValid(typedSigninPassword);
        if (invalidSigninPasswordMsg) {
            setinvalidSigninPassword(invalidSigninPasswordMsg);
        } else {
            dispatch(addUsersTypedEmail(typedSigninEmail));
            setinvalidSigninPassword(null);
            /* Firebase - Sign in user */
            signInWithEmailAndPassword(auth, typedSigninEmail, typedSigninPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setfirebaseSigninError(null);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const getAuthErrorMessage = (errorCode) => {
                        switch (errorCode) {
                            case 'auth/invalid-credential':
                            case 'auth/user-not-found':
                            case 'auth/wrong-password':
                                return 'Invalid email or password';

                            case 'auth/invalid-email':
                                return 'Invalid email format';

                            case 'auth/user-disabled':
                                return 'Account disabled. Contact support';

                            case 'auth/too-many-requests':
                                return 'Too many attempts. Try again later';

                            case 'auth/network-request-failed':
                                return 'Network error. Check your connection';

                            default:
                                return 'Login failed. Try again';
                        }
                    };
                    setfirebaseSigninError(getAuthErrorMessage(errorCode));
                });
        }
    };

    /* To change typed signin email */
    const changeTypedSigninEmail = () => {
        setisSigninEmailValid(false);
        setinvalidSigninPassword(null);
    }

    return {
        /* Home page hooks */
        validateUpperEmail,
        upperInvalidEmail,
        isHomeEmailValid,
        validateLowerEmail,
        lowerInvalidEmail,
        /* Signup page hooks */
        validateSignupCred,
        invalidSignupEmail,
        invalidSignupPassword,
        firebaseSignupError,
        /* Signin page hooks */
        validateSigninEmail,
        invalidSigninEmail,
        isSigninEmailValid,
        changeTypedSigninEmail,
        invalidSigninPassword,
        validateSigninPassword,
        firebaseSigninError,
    };
};