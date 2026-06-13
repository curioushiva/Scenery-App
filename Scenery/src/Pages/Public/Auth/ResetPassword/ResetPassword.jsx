import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "@/Utils/Hooks/useAuth/useAuth";

const ResetPassword = () => {
  /* To To reset password */
  const { resetPassword } = useAuth();

  /* To set email adress */
  const [emailAddress, setEmailAddress] = useState("");

  /* To set email adress validation msg - (error/updation) */
  const [emailAddressValidation, setEmailAddressValidation] = useState({
    success: false,
    message: "",
  });

  /* To set button action label */
  const [btnActionLabel, setBtnActionLabel] = useState("Send Reset Link");

  /* To handle reset password */
  const handleResetPassword = async () => {
    setBtnActionLabel("Sending...");
    const response = await resetPassword(emailAddress);
    setEmailAddressValidation(response);
    setBtnActionLabel("Sent");
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-md h-full flex flex-col gap-2 justify-start items-start">
        {/* Heading */}
        <h1 className="text-3xl font-bold"> Forgot your password?</h1>
        <h2 className="text-base italic text-text-secondary pb-5">
          Enter your email and we'll send you a reset link
        </h2>

        {/* Inputs */}
        <div className="w-full flex flex-col gap-3">
          <input
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
              setBtnActionLabel("Send Reset Link");
              setEmailAddressValidation({
                success: false,
                message: "",
              });
            }}
            className="w-full px-5 py-3 rounded-sm border-1 border-br-primary bg-bg-inputcolor placeholder-text-secondary focus:outline focus:outline-white"
            type="email"
            placeholder="Email Address"
          />
          <p
            className={`text-sm ${emailAddressValidation.success ? "text-noerrorcolor" : "text-errorcolor"}`}
          >
            {emailAddressValidation?.message}
          </p>
          <button
            onClick={() => handleResetPassword()}
            className="w-full px-5 py-3 rounded-sm text-base font-medium bg-btn-primary cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
          >
            {btnActionLabel}
          </button>
        </div>

        {/* Navigate to signup page */}
        <Link
          to="/signin"
          className="text-sm font-regular text-text-secondary pt-5 underline decoration-solid"
        >
          Ready to sign in? Head back
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
