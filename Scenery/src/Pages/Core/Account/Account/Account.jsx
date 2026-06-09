import {
    RiArrowRightSLine, RiArticleLine, RiDeleteBinLine,
    RiLock2Line, RiLogoutCircleLine, RiMailLine, RiUserLine
} from "@remixicon/react";
import {  Link } from "react-router";
import { useSelector } from "react-redux";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";

const Account = () => {

    /* To select Name */
    const { Name } = useSelector((store) => store.account.profile);

    /* To Sign out user */
    const { SignOut } = useAccount();

    return (
        <div className="w-full p-8 mobileNavPad">
            <div className="w-full flex flex-col gap-10">
                {/* Intro */}
                <div className="flex">
                    <h1 className='text-3xl lg:text-4xl font-bold leading-[0.7]'>Account</h1>
                </div>

                {/* Welcome msg */}
                <div className="flex">
                    <h1 className='text-sm lg:text-base font-regular'>Hey, <span className="italic font-medium text-textcolor-secondary">{Name}</span>. Ready to make some changes?</h1>
                </div>

                {/* Account main */}
                <div className="flex flex-col gap-8 pt-2">

                    {/* Account settings */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-base font-regular">Account Settings</h1>
                        <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">

                            <Link to="/account/name" className="w-full flex items-center justify-between gap-5 py-4 lg:py-5 px-5 cursor-pointer transition-all ease-in duration-100 hover:bg-white/5">
                                <div className="flex items-center justify-center gap-2">
                                    <RiArticleLine className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <h1 className="text-sm lg:text-base font-medium">Change username</h1>
                                </div>
                                <RiArrowRightSLine />
                            </Link>

                            <Link to="/account/email" className="w-full flex items-center justify-between gap-5 py-4 lg:py-5 px-5 cursor-pointer transition-all ease-in duration-100 hover:bg-white/5">
                                <div className="flex items-center justify-center gap-2">
                                    <RiMailLine className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <h1 className="text-sm lg:text-base font-medium">Update email</h1>
                                </div>
                                <RiArrowRightSLine />
                            </Link>

                            <Link to="/account/password" className="w-full flex items-center justify-between gap-5 py-4 lg:py-5 px-5 cursor-pointer transition-all ease-in duration-100 hover:bg-white/5">
                                <div className="flex items-center justify-center gap-2">
                                    <RiLock2Line className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <h1 className="text-sm lg:text-base font-medium">Update password</h1>
                                </div>
                                <RiArrowRightSLine />
                            </Link>
                        </div>
                    </div>

                    {/* Profile settings */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-base font-regular">Profile Settings</h1>
                        <Link to="choose" className="flex flex-col border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">
                            <div className="w-full flex items-center justify-between gap-5 py-4 lg:py-5 px-5 cursor-pointer transition-all ease-in duration-100 hover:bg-white/5">
                                <div className="flex items-center justify-center gap-2">
                                    <RiUserLine className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <h1 className="text-sm lg:text-base font-medium">Update profile</h1>
                                </div>
                                <RiArrowRightSLine />
                            </div>
                        </Link>
                    </div>

                    {/* Account actions */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-base font-regular">Account Actions</h1>
                        <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">
                            <div onClick={() => { SignOut(); }}  className="w-full flex items-center justify-between gap-5 py-4 lg:py-5 px-5 cursor-pointer transition-all ease-in duration-100 hover:bg-white/5">
                                <div className="flex items-center justify-center gap-2">
                                    <RiLogoutCircleLine className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <h1 className="text-sm lg:text-base font-medium">Sign out</h1>
                                </div>
                                <RiArrowRightSLine />
                            </div>
                            <Link to="/account/delete" className="w-full flex items-center justify-between gap-5 py-4 lg:py-5 px-5 cursor-pointer transition-all ease-in duration-100 hover:bg-white/5">
                                <div className="flex items-center justify-center gap-2">
                                    <RiDeleteBinLine className="h-5 w-5 sm:h-6 sm:w-6" />
                                    <h1 className="text-sm lg:text-base font-medium">Delete account</h1>
                                </div>
                                <RiArrowRightSLine />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Account;