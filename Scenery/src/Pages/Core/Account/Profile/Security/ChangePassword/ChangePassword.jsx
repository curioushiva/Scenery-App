import { Link } from "react-router";
import { RiArrowLeftLongFill, RiEyeCloseLine, RiEyeLine } from "@remixicon/react";
import { useState } from "react";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";

const ChangePassword = () => {

    /* To re authenticate the user & change the password */
    const { reauthenticateUser, changePassword } = useAccount();

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
            setNewPasswordValidation({ success: false, message: '', requiresReauth: false });
        }
        setCurrPassValidation(response);
        setAuthBtnActionLabel("Authenticate");
    };

    /* -------------- For password change --------------------- */

    /* To set new password */
    const [newPassword, setNewPassword] = useState('');

    /* To show new password */
    const [showNewPassword, setShowNewPassword] = useState(false);

    /* To set password validation msg - (error/updation) */
    const [newPasswordValidation, setNewPasswordValidation] = useState({ success: false, message: '', requiresReauth: false });

    /* To set button action label */
    const [btnActionLabel, setBtnActionLabel] = useState("Change");

    /* To handle change password */
    const handleChangePassword = async () => {
        setBtnActionLabel("Changing...");
        const response = await changePassword(newPassword);
        setNewPasswordValidation(response);
        setBtnActionLabel("Changed");
    };

    return (
        <div className="w-full p-8 mobileNavPad">
            <div className="w-full flex flex-col gap-10">
                {/* Intro */}
                <div className="flex">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
                        Account
                    </h1>
                </div>

                {/* Change Password */}
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
                                    <h1 className="text-2xl font-bold">Change your password</h1>
                                    <p className="text-sm sm:text-base text-regular text-textcolor-secondary italic">
                                        Change the password associated with your account.
                                    </p>
                                </div>

                                {/* Toggle reauthenticate & password change */}
                                {newPasswordValidation?.requiresReauth ? (
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
                                                            message: '',
                                                            requiresReauth: false
                                                        });
                                                    }}
                                                    className="w-full text-sm sm:text-base text-textcolor-secondary px-5 pr-14 py-3 border border-white/10 rounded-sm bg-bgcolor-secondary placeholder-textcolor-secondary focus:outline focus:outline-white"
                                                    type={showAuthPassword ? "text" : "password"}
                                                    placeholder="Password" />
                                                <div onClick={() => setShowAuthPassword(prev => !prev)} className="absolute z-10 right-5 top-4 cursor-pointer text-textcolor-secondary">
                                                    {showAuthPassword ?
                                                        <RiEyeLine className="w-5 h-5" />
                                                        :
                                                        <RiEyeCloseLine className="w-5 h-5" />
                                                    }
                                                </div>
                                            </div>
                                            <p className={`text-xs sm:text-sm text-[#ff8957] pl-2`}>
                                                {currPassValidation?.message}
                                            </p>
                                        </div>
                                        {/* Buttons */}
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleAccountReauth()}
                                                className="w-full px-5 py-2 text-sm sm:text-base font-medium rounded-sm bg-uicolor-primary cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
                                            >
                                                {authBtnActionLabel}
                                            </button>
                                            <Link
                                                to="/account"
                                                className="w-full px-5 py-2 text-sm sm:text-base font-medium text-center rounded-sm text-white cursor-pointer hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out"
                                            >
                                                Cancel
                                            </Link>
                                        </div>
                                        {/* Forget password */}
                                        <Link to="/account/password" className="flex gap-2 pt-2">
                                            <h1 className="text-sm font-regular text-textcolor-secondary underline">Forgot your password? Change it from here</h1>
                                        </Link>
                                    </div>
                                ) : (
                                    /* Password change component */
                                    <div className="w-full flex flex-col gap-4">

                                        {/* Inputs  */}
                                        <div className="flex flex-col gap-2">
                                            <div className="relative">
                                                <input
                                                    value={newPassword}
                                                    onChange={(e) => {
                                                        setNewPassword(e.target.value);
                                                        setBtnActionLabel("Change");
                                                        setNewPasswordValidation({
                                                            success: false,
                                                            message: '',
                                                            requiresReauth: false
                                                        });
                                                    }}
                                                    className="w-full text-sm sm:text-base text-textcolor-secondary px-5 pr-14 py-3 border border-white/10 rounded-sm bg-bgcolor-secondary placeholder-textcolor-secondary focus:outline focus:outline-white"
                                                    type={showNewPassword ? "text" : "password"}
                                                    placeholder="Password" />
                                                <div onClick={() => setShowNewPassword(prev => !prev)} className="absolute z-10 right-5 top-4 cursor-pointer text-textcolor-secondary">
                                                    {showNewPassword ?
                                                        <RiEyeLine className="w-5 h-5" />
                                                        :
                                                        <RiEyeCloseLine className="w-5 h-5" />
                                                    }
                                                </div>
                                            </div>
                                            <p
                                                className={`text-xs sm:text-sm ${newPasswordValidation?.success ? "text-[#74f944d6]" : "text-[#ff8957]"} pl-2`}
                                            >
                                                {newPasswordValidation?.message}
                                            </p>
                                        </div>
                                        {/* Buttons */}
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleChangePassword()}
                                                className="w-full px-5 py-2 text-sm sm:text-base font-medium rounded-sm bg-uicolor-primary cursor-pointer transition duration-100 ease-out active:scale-[0.95]"
                                            >
                                                {btnActionLabel}
                                            </button>
                                            <Link
                                                to="/account"
                                                className="w-full px-5 py-2 text-sm sm:text-base font-medium text-center rounded-sm text-white cursor-pointer hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out"
                                            >
                                                Cancel
                                            </Link>
                                        </div>
                                        {/* Alert message */}
                                        <div className="flex gap-2 pt-2">
                                            <h1 className="text-xs sm:text-sm font-regular text-textcolor-secondary">⚠ Changing your password will sign you out of all other devices</h1>
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

export default ChangePassword;
