import  { Link } from 'react-router';
import { RiArrowLeftLongFill } from '@remixicon/react';

const ResetPassword = () => {

    return (
        <div className="w-full p-8 mobileNavPad">
            <div className="w-full flex flex-col gap-10">
                {/* Intro */}
                <div className="flex">
                    <h1 className='text-3xl lg:text-4xl font-bold leading-[0.7]'>Account</h1>
                </div>

                {/* Reset Password */}
                <div className="w-full flex flex-col gap-2">
                    <div className='w-full grid grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] gap-x-20 lg:gap-x-0 gap-y-5'>
                        {/* Back to account */}
                        <Link to="/account" className='flex'>
                            <RiArrowLeftLongFill />
                        </Link>

                        {/* Main Container */}
                        <div className='w-full flex items-center justify-start sm:justify-center'>
                            {/* Content */}
                            <div className='w-full max-w-3xl flex flex-col gap-10'>
                                {/* Heading */}
                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-2xl font-bold'>Reset your password</h1>
                                    <p className='text-sm sm:text-base text-regular text-textcolor-secondary italic'>Reset the password associated with your account.</p>
                                </div>
                                {/* Password Form */}
                                <div className='w-full flex flex-col gap-4'>
                                    {/* Inputs */}
                                    <div className='flex flex-col gap-2'>
                                        <input className="w-full text-sm sm:text-base px-5 py-3 border border-white/10 rounded-sm bg-bgcolor-secondary placeholder-textcolor-secondary focus:outline focus:outline-white" type="text" placeholder="New password" />
                                        <input className="w-full text-sm sm:text-base px-5 py-3 border border-white/10 rounded-sm bg-bgcolor-secondary placeholder-textcolor-secondary focus:outline focus:outline-white" type="text" placeholder="Re-enter new password" />
                                        <p className="hidden text-xs sm:text-sm text-[#ff8957] pl-2">Password doesnt match</p>
                                    </div>
                                    {/* Buttons */}
                                    <div className='flex flex-col gap-2'>
                                        <button className="w-full px-5 py-2 text-sm sm:text-base font-medium rounded-sm bg-uicolor-primary cursor-pointer transition duration-100 ease-out active:scale-[0.95]">Save</button>
                                        <Link to="/account" className="w-full px-5 py-2 text-sm sm:text-base font-medium text-center rounded-sm text-white cursor-pointer hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ResetPassword