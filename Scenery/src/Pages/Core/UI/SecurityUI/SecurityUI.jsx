import { Link } from "react-router";
import { RiArrowLeftLongFill } from "@remixicon/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";

export const SecurityUIReAuthentication = ({ setActionType }) => {

    /* To re authenticate the user */
    const { reauthenticateUser } = useAccount();

    /* -------------- For re authentication --------------------- */

    /* To set current password */
    const [currentPassword, setCurrentPassword] = useState('');

    /* To show auth password */
    const [showAuthPassword, setShowAuthPassword] = useState(false);

    /* To set current password validation - (error) */
    const [currPassValidation, setCurrPassValidation] = useState({ success: false, message: '', requiresReauth: false });

    /* To set authentication button action label */
    const [authBtnActionLabel, setAuthBtnActionLabel] = useState("Authenticate");

    /* To handle account re authentication via password */
    const handleAccountReauth = async () => {
        setAuthBtnActionLabel("Authenticating...");
        const response = await reauthenticateUser(currentPassword);
        if (!response.requiresReauth) {
            setActionType({ success: false, message: '', requiresReauth: false });
        }
        setCurrPassValidation(response);
        setAuthBtnActionLabel("Authenticate");
    };

    return (
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
                                message: '',
                                requiresReauth: false
                            });
                        }}
                        className="w-full text-sm sm:text-base px-5 pr-14 py-3 rounded-sm border text-text-secondary border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
                        type={showAuthPassword ? "text" : "password"}
                        placeholder="Password" />
                    <div onClick={() => setShowAuthPassword(prev => !prev)} className="absolute z-10 right-5 top-4 cursor-pointer text-text-secondary">
                        {showAuthPassword ?
                            <RiEyeLine className="w-5 h-5" />
                            :
                            <RiEyeCloseLine className="w-5 h-5" />
                        }
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
            <Link to="/resetpassword" className="flex gap-2 pt-2">
                <h1 className="text-sm font-regular text-text-secondary underline">Forgot your password? Reset it from here</h1>
            </Link>
        </div>
    );
};
