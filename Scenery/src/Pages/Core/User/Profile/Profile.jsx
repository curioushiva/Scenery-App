import Guest from "@/Assets/Imgs/Avatars/Guest.png"
import Add from "@/Assets/Imgs/Avatars/Add.png"
import { useState, useEffect } from 'react'
import { RiRepeatLine } from '@remixicon/react'
import { useDispatch, useSelector } from 'react-redux'
import useUser from "@/Utils/Hooks/useUser/useUser"
import { useNavigate } from 'react-router'
import { updateAccount } from '@/Utils/Redux/Slices/UserSlice/UserSlice'
import { AvatarsMockData } from '@/Utils/Mockdata/Mockdata'

const Profile = () => {

    /* To dispatch and navigate */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* To select usersName & usersAvatarnum */
    const { usersName, usersAvatarNum } = useSelector((store) => store.user.account);

    /* Toggle - To create or update profile */
    const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);

    /* Typed User's Name */
    const [typedUsersName, setTypedUsersName] = useState(usersName);

    /* To change the avatar photos */
    const [avatarNum, setAvatarNum] = useState(usersAvatarNum);
    const changeAvatar = () => {
        setAvatarNum((prev) => {
            if (prev + 1 === 12) {
                return 0;
            } else {
                return prev + 1;
            }
        });
    };

    /* Update avatarNum & typedUsersName asap usersAvatarNum changes */
    useEffect(() => {
        setAvatarNum(usersAvatarNum);
        setTypedUsersName(usersName);
    }, [usersAvatarNum])

    /* Calling saveUsersAccount(- for firebasestore) & updateUsersName(- for FirebaseAuth) */
    const { saveUsersAccount, updateUsersName } = useUser();

    /* Check for valid profile name and save */
    const [usersNameError, setUsersNameError] = useState(null);
    const checkUsersNameValid = (profileName) => {
        const valid = /^[a-zA-Z0-9]{3,12}$/.test(profileName);
        if (valid) {
            /* Updating redux - for faster avail */
            dispatch(updateAccount({ usersAvatarNum: avatarNum }));
            dispatch(updateAccount({ usersName: typedUsersName }));
            setIsProfileFormOpen(false);
            /* Updating firebase - for source off truth */
            saveUsersAccount(avatarNum)
            updateUsersName(typedUsersName);
        } else {
            setUsersNameError("⚠ Please enter a valid name");
        }
    };

    return (
        <div className="w-full h-screen min-h-screen bg-gradient-to-b from-[#431518] to-[#000000] px-5 py-5">
            {/* Toggle - To create or update profile */}
            {isProfileFormOpen ?
                <div className='w-full h-full flex justify-center items-center px-5 py-5'>
                    <div className='w-full max-w-[40rem] bg-bgcolor-secondary flex flex-col gap-4 justify-center items-center border-1 border-brcolor-primary rounded-xl px-10 py-8'>
                        <h1 className='text-center text-3xl font-medium t-5'>{usersName ? "Update your profile" : "Create a profile"}</h1>
                        <h2 className='text-center text-base font-normal'>{usersName ? "Give your profile a fresh look" : "Set up a profile to track your favorites and discover more"}</h2>
                        <img src={AvatarsMockData[avatarNum].avatar} alt="avatar" className='w-22 object-cover sm:w-[clamp(4rem,8vw,8rem)]' />
                        <button onClick={() => changeAvatar()} className='text-center text-sm font-normal cursor-pointer border py-1 px-3 border-brcolor-primary hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out'>Change</button>
                        <div className='w-full border-t-[0.1] border-brcolor-primary my-3'></div>
                        <div className='w-full h-full flex flex-col gap-1'>
                            <input value={typedUsersName} onChange={(e) => { setTypedUsersName(e.target.value); setUsersNameError(null); }} className="w-[clamp(100%,40vw,480px)] px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary outline-none" type="text" placeholder="Username" />
                            <h3 className="text-sm text-[#FFBB57]">{usersNameError}</h3>
                        </div>
                        <button onClick={() => checkUsersNameValid(typedUsersName)} className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-black text-lg bg-textcolor-primary font-medium cursor-pointer transition duration-200 ease-out hover:scale-95">{usersName ? "Update" : "Save"}</button>
                        <button onClick={() => { setTypedUsersName(''); setIsProfileFormOpen(false); setUsersNameError(null); }} className="w-[clamp(100%,40vw,480px)] px-5 py-3 rounded-sm text-white text-lg font-medium cursor-pointer hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out">Cancel</button></div>
                </div>
                :
                /* Render based on the availability of usersName */
                (usersName ?
                    <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
                        <h1 className='text-3xl font-medium text-center'>Explore the feed as ?</h1>
                        <div className='flex flex-row items-center gap-5'>
                            <div onClick={() => { dispatch(updateAccount({ usersProfileType: 'Guest' })); navigate("/browse") }} className='w-22 flex flex-col gap-2 justify-center items-center cursor-pointer hover:scale-[1.1] duration-300 ease-in-out sm:w-[clamp(6rem,10vw,10rem)]'>
                                <img src={Guest} alt="Guest" className='w-full rounded-sm' />
                                <h1 className='text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>Guest</h1>
                            </div>
                            <div onClick={() => { dispatch(updateAccount({ usersProfileType: 'Personal' })); navigate("/browse") }} className='w-22 flex flex-col gap-2 justify-center items-center cursor-pointer rounded-sm hover:scale-[1.1] duration-300 ease-in-out sm:w-[clamp(6rem,10vw,10rem)]'>
                                <img src={AvatarsMockData[avatarNum].avatar} alt="avatar" className='w-full' />
                                <h1 className='text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>{usersName}</h1>
                            </div>
                        </div>
                        <button onClick={() => setIsProfileFormOpen(true)} className='mt-5 text-center font-medium text-sm text-textcolor-secondary cursor-pointer border py-1 px-5 border-brcolor-primary hover:border-brcolor-secondary hover:text-textcolor-primary transition-colors duration-300 ease-in-out sm:px-[clamp(0.25rem,2.5vw,3rem)] sm:py-[clamp(0.25rem,0.5vw,0.5rem)] sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>Update Profile</button>
                    </div>
                    :
                    <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
                        <h1 className='text-3xl font-medium text-center'>Explore the feed as ?</h1>
                        <div className='flex flex-row items-center gap-5'>
                            <div onClick={() => { dispatch(updateAccount({ usersProfileType: 'Guest' })); navigate("/browse") }} className='flex flex-col gap-2 justify-center items-center cursor-pointer hover:scale-[1.1] duration-300 ease-in-out'>
                                <div className='w-22 sm:w-[clamp(6rem,10vw,10rem)]'>
                                    <img src={Guest} alt="Guest" className='w-full' />
                                </div>
                                <h1 className='text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]'>Guest</h1>
                            </div>
                            <div onClick={() => setIsProfileFormOpen(true)} className='flex flex-col gap-2 justify-center items-center cursor-pointer rounded-sm hover:scale-[1.1] duration-300 ease-in-out'>
                                <div className='w-22 h-22 flex justify-center items-center hover:bg-[#595555] transition-colors duration-300 ease-in-out rounded-sm sm:w-[clamp(6rem,10vw,10rem)] sm:h-[clamp(6rem,10vw,10rem)]'>
                                    <img src={Add} alt="Add" className='w-[65%] h-[65%] object-cover' />
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