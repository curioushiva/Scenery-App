import React, { useEffect } from 'react'
import Guest from "../../../Assets/Imgs/Avatars/Guest.png"
import Add from "../../../Assets/Imgs/Avatars/Add.png"
import { useState } from 'react'
import { RiRepeatLine } from '@remixicon/react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../../Hooks/useAuth/useAuth'
import { useNavigate } from 'react-router'
import { updateAccount } from '../../../Redux/Slices/UserSlice/UserSlice'
import { AvatarsMockData } from '../../../Utils/Mockdata/Mockdata'

const Profile = () => {

    /* To dispatch and navigate */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* To check if usersName set or not */
    const usersName = useSelector((store) => store.user.account.usersName)

    /* Seclected usersAvatarNum */
    const usersAvatarNum = useSelector((store) => store.user.account.usersAvatarNum)

    /* Calling updated user profile*/
    const { userProfile } = useAuth();

    /* Display username */
    const [typedProfileName, settypedProfileName] = useState('');

    /* Toggle - if user wants to create or update profile */
    const [iscreateProfile, setiscreateProfile] = useState(false);

    /* To chnage the avatars */
    const [avatarNum, setAvatarNum] = useState(0);
    const changeAvatar = () => {
        setAvatarNum((prev) => {
            if (prev + 1 === 12) {
                return 0;
            } else {
                return prev + 1;
            }
        });
    };

    /* Check for valid profile name and save */
    const [profileNameInvalid, setprofileNameInvalid] = useState(null);
    const isProfileNameValid = (profileName) => {
        const valid = /^[a-zA-Z0-9]{3,12}$/.test(profileName);
        if (valid) {
            userProfile(typedProfileName);
            setiscreateProfile(false);
            dispatch(updateAccount({ usersAvatarNum: avatarNum }))
        } else {
            setprofileNameInvalid("⚠ Please enter a valid name");
        }
    };

    return (
        <div className="w-full h-screen min-h-screen bg-gradient-to-b from-[#431518] to-[#000000] px-5 py-5">
            {/* Toggle - if user wants to create or update profile */}
            {iscreateProfile ?
                <div className='w-full h-full flex justify-center items-center px-5 py-5'>
                    <div className='w-full max-w-[40rem] bg-bgcolor-secondary flex flex-col gap-4 justify-center items-center border-1 border-brcolor-primary rounded-xl px-10 py-8'>
                        <h1 className='text-center text-3xl font-medium t-5'>Create a profile</h1>
                        <h2 className='text-center text-base font-normal'>Set up a profile to track your favorites and discover more</h2>
                        <img src={AvatarsMockData[avatarNum].avatar} alt="avatar" className='w-22 object-cover sm:w-[clamp(4rem,8vw,8rem)]' />
                        <button onClick={changeAvatar} className='text-center text-sm font-normal cursor-pointer border py-1 px-3 border-brcolor-primary hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out'>Change</button>
                        <div className='w-full border-t-[0.1] border-brcolor-primary my-3'></div>
                        <div className='w-full h-full flex flex-col gap-1'>
                            <input value={typedProfileName} onChange={(e) => { settypedProfileName(e.target.value); setprofileNameInvalid(null); }} className="w-[clamp(100%,40vw,480px)] px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary outline-none" type="text" placeholder="Profile Name" />
                            <h3 className="text-sm text-[#FFBB57]">{profileNameInvalid}</h3>
                        </div>
                        <button onClick={() => isProfileNameValid(typedProfileName)} className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-black text-lg bg-textcolor-primary font-medium cursor-pointer transition duration-200 ease-out hover:scale-95">Save</button>
                        <button onClick={() => { settypedProfileName(''); setiscreateProfile(false); setprofileNameInvalid(null); }} className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-white text-lg font-medium cursor-pointer hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out">Cancel</button></div>
                </div>
                :
                /* Render based on the availability of display name */
                (usersName ?
                    <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
                        <h1 className='text-3xl font-medium text-center'>Explore the feed as ?</h1>
                        <div className='flex flex-row items-center gap-5'>
                            <div onClick={() => dispatch(updateAccount({ usersProfileType: 'guest' }))} className='w-22 flex flex-col gap-2 justify-center items-center cursor-pointer hover:scale-[1.1] duration-300 ease-in-out sm:w-[clamp(6rem,10vw,10rem)]'>
                                <img src={Guest} alt="guest" className='w-full rounded-sm' />
                                <h1 className='text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>Guest</h1>
                            </div>
                            <div onClick={() => dispatch(updateAccount({ usersProfileType: 'personal' }))} className='w-22 flex flex-col gap-2 justify-center items-center cursor-pointer rounded-sm hover:scale-[1.1] duration-300 ease-in-out sm:w-[clamp(6rem,10vw,10rem)]'>
                                <img src={AvatarsMockData[usersAvatarNum].avatar} alt="avatar" className='w-full' />
                                <h1 className='text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>{usersName}</h1>
                            </div>
                        </div>
                        <button onClick={() => setiscreateProfile(true)} className='mt-5 text-center font-medium text-sm text-textcolor-secondary cursor-pointer border py-1 px-5 border-brcolor-primary hover:border-brcolor-secondary hover:text-textcolor-primary transition-colors duration-300 ease-in-out sm:px-[clamp(0.25rem,2.5vw,3rem)] sm:py-[clamp(0.25rem,0.5vw,0.5rem)] sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>Update Profile</button>
                    </div>
                    :
                    <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
                        <h1 className='text-3xl font-medium text-center'>Explore the feed as ?</h1>
                        <div className='flex flex-row items-center gap-5'>
                            <div onClick={() => dispatch(updateAccount({ usersProfileType: 'guest' }))} className='flex flex-col gap-2 justify-center items-center cursor-pointer hover:scale-[1.1] duration-300 ease-in-out'>
                                <div className='w-22 sm:w-[clamp(6rem,10vw,10rem)]'>
                                    <img src={Guest} alt="guest" className='w-full' />
                                </div>
                                <h1 className='text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>Guest</h1>
                            </div>

                            <div onClick={() => setiscreateProfile(true)} className='flex flex-col gap-2 justify-center items-center cursor-pointer rounded-sm hover:scale-[1.1] duration-300 ease-in-out'>
                                <div className='w-22 h-22 flex justify-center items-center hover:bg-[#595555] transition-colors duration-300 ease-in-out rounded-sm sm:w-[clamp(6rem,10vw,10rem)] sm:h-[clamp(6rem,10vw,10rem)]'>
                                    <img src={Add} alt="add" className='w-[65%] h-[65%] object-cover' />
                                </div>
                                <h1 className='text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>Add</h1>
                            </div>

                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Profile;