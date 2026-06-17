import { Link } from "react-router";
import {
  RiArrowLeftLongFill,
  RiEyeCloseLine,
  RiEyeLine,
} from "@remixicon/react";
import { useState } from "react";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";

const DeleteAccount = () => {
  /* To re authenticate the user & delete the account */
  const { reauthenticateUser, deleteAccount } = useAccount();

  /* -------------- For re authentication --------------------- */

  /* To set current password */
  const [currentPassword, setCurrentPassword] = useState("");

  /* To show auth password */
  const [showAuthPassword, setShowAuthPassword] = useState(false);

  /* To set current password validation - (error) */
  const [currPassValidation, setCurrPassValidation] = useState({
    success: false,
    message: "",
    requiresReauth: false,
  });

  /* To set authentication button action label */
  const [authBtnActionLabel, setAuthBtnActionLabel] = useState("Authenticate");

  /* To handle account re authentication via password */
  const handleAccountReauth = async () => {
    setAuthBtnActionLabel("Authenticating...");
    const response = await reauthenticateUser(currentPassword);
    if (!response.requiresReauth) {
      setDeleteMsgValidation({
        success: false,
        message: "",
        requiresReauth: false,
      });
    }
    setCurrPassValidation(response);
    setAuthBtnActionLabel("Authenticate");
  };

  /* -------------- For Account deletion --------------------- */

  /* To set delete msg */
  const [deleteMsg, setDeleteMsg] = useState("");

  /* To set deletion msg validation - (error) */
  const [deleteMsgValidation, setDeleteMsgValidation] = useState({
    success: false,
    message: "",
    requiresReauth: false,
  });

  /* To set button action label */
  const [btnActionLabel, setBtnActionLabel] = useState("Delete");

  /* To handle delete account */
  const handelDeleteAccount = async () => {
    setBtnActionLabel("Deleting...");
    const response = await deleteAccount(deleteMsg);
    setDeleteMsgValidation(response);
    setBtnActionLabel("Delete");
  };

  return (
    <div className="w-full navPadding">
      <div className="w-full flex flex-col gap-10">
        {/* Intro */}
        <div className="flex">
          <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
            Account
          </h1>
        </div>

        {/* Delete account */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full grid grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] gap-x-20 lg:gap-x-0 gap-y-5">
            {/* Back to account */}
            <Link to="/account" className="flex">
              <RiArrowLeftLongFill />
            </Link>

            {/* Main Container */}
            <div className="w-full flex items-center justify-start sm:justify-center">
              {/* Content */}
              <div className="w-full max-w-3xl flex flex-col gap-10">
                {/* Heading */}
                <div className="w-full flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">Delete your account</h1>
                  <p className="text-sm sm:text-base text-regular text-text-secondary italic">
                    Permanently delete your account and all associated data.
                  </p>
                </div>

                {/* Toggle reauthenticate & account delete */}
                {deleteMsgValidation?.requiresReauth ? (
                  /* Reauthentication component */
                  <div className="w-full flex flex-col gap-4">
                    {/* Heading */}
                    <h1 className="text-sm sm:text-base font-normal">
                      For security, please confirm your current password first.
                    </h1>
                    {/* Inputs */}
                    <div className="flex flex-col gap-2">
                      <div className="relative">
                        <input
                          value={currentPassword}
                          onChange={(e) => {
                            setCurrentPassword(e.target.value);
                            setCurrPassValidation({
                              success: false,
                              message: "",
                              requiresReauth: false,
                            });
                          }}
                          className="w-full text-sm sm:text-base px-5 pr-14 py-3 rounded-sm border text-text-secondary border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
                          type={showAuthPassword ? "text" : "password"}
                          placeholder="Password"
                        />
                        <div
                          onClick={() => setShowAuthPassword((prev) => !prev)}
                          className="absolute z-10 right-5 top-4 cursor-pointer text-text-secondary"
                        >
                          {showAuthPassword ? (
                            <RiEyeLine className="w-5 h-5" />
                          ) : (
                            <RiEyeCloseLine className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      <p className={`text-xs sm:text-sm text-errorcolor pl-2`}>
                        {currPassValidation?.message}
                      </p>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleAccountReauth()}
                        className="w-full px-5 py-2 text-sm sm:text-base font-medium rounded-sm bg-btn-primary cursor-pointer transition duration-100 ease-out active:scale-95"
                      >
                        {authBtnActionLabel}
                      </button>
                      <Link
                        to="/account"
                        className="w-full px-5 py-2 text-sm sm:text-base font-medium text-center rounded-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-bg-whiteColor/60"
                      >
                        Cancel
                      </Link>
                    </div>
                    {/* Forget password */}
                    <Link to="/account/password" className="flex gap-2 pt-2">
                      <h1 className="text-sm font-regular text-text-secondary underline">
                        Forgot your password? Change it from here
                      </h1>
                    </Link>
                  </div>
                ) : (
                  /* Account deletion component */
                  <div className="w-full flex flex-col gap-4">
                    {/* Heading */}
                    <div className="flex">
                      <h1 className="text-sm sm:text-base font-regular">
                        Are you sure you want to delete your account? This will
                        permanently remove all your data and cannot be undone.
                        To confirm, type "DELETE" below and click Delete.
                      </h1>
                    </div>
                    {/* Inputs  */}
                    <div className="flex flex-col gap-2">
                      <input
                        value={deleteMsg}
                        onChange={(e) => {
                          setDeleteMsg(e.target.value);
                          setDeleteMsgValidation({
                            success: false,
                            message: "",
                            requiresReauth: false,
                          });
                        }}
                        className="w-full text-sm sm:text-base px-5 py-3 rounded-sm border text-text-secondary border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
                        type="text"
                        placeholder="Delete account"
                      />
                      <p className="text-xs sm:text-sm text-errorcolor pl-2">
                        {deleteMsgValidation?.message}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handelDeleteAccount()}
                        className="w-full px-5 py-2 text-sm sm:text-base font-medium rounded-sm bg-btn-primary cursor-pointer transition duration-100 ease-out active:scale-95"
                      >
                        {btnActionLabel}
                      </button>
                      <Link
                        to="/account"
                        className="w-full px-5 py-2 text-sm sm:text-base font-medium text-center rounded-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-bg-whiteColor/60"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
