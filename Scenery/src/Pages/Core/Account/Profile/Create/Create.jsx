import Add from "@/Assets/Imgs/Avatars/Add.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { AvatarsMockData } from "@/Utils/Mockdata/Mockdata";
import { RiPencilLine } from "@remixicon/react";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import { setIsProfileSelected } from "@/Utils/Redux/Slices/AccountSlice/AccountSlice";

const Create = () => {

    /* To dispatch */
    const dispatch = useDispatch();

    /* To save profile */
    const { saveProfile } = useAccount();

    /* Selecting Name & Avatar number */
    const { Name, AvatarNum } = useSelector((store) => store.account.profile);

    /* For profile creation */
    const [isCreateProfileForm, setIsCreateProfileForm] = useState(false);

    /* To change profile avatar */
    const [profileAvatar, setProfileAvatar] = useState(AvatarNum);
    const changeProfileAvatar = () => {
        setProfileAvatar((prev) => {
            if (prev + 1 === 12) {
                return 0;
            } else {
                return prev + 1;
            }
        });
    };

    /* To set profile name */
    const [profileName, setProfileName] = useState(Name);

    /* To set profile message */
    const [profileMessage, setProfileMessage] = useState(null);

    /* To set profile button type */
    const [actionLabel, setActionLabel] = useState('Save');

    /* To handle profile save */
    const handleSaveProfile = async () => {
        setActionLabel('Saving...');
        const message = await saveProfile(profileAvatar, profileName);
        setProfileMessage(message);
        setActionLabel('Save');
        if (!message) {
            setActionLabel('Save');
            setIsCreateProfileForm(false);
        }
    };

    /* Update values asap */
    useEffect(() => {
        setProfileAvatar(AvatarNum);
    }, [AvatarNum]);

    useEffect(() => {
        setProfileName(Name);
    }, [Name]);

    /* Return */
    if (isCreateProfileForm) {
        /* Create profile form */
        return (
            <div className="w-full h-screen min-h-screen bg-gradient-to-b from-[#431518] to-[#000000] px-5 py-5">
                <div className="w-full h-full flex justify-center items-center px-0 py-5">
                    <div className="w-full max-w-[40rem] bg-bgcolor-secondary flex flex-col gap-4 justify-center items-center border-1 border-brcolor-primary rounded-3xl px-2 py-8 220:px-10">
                        <h1 className="text-xl sm:text-2xl font-medium text-center">
                            Create a profile
                        </h1>
                        <p className="text-xs sm:text-sm font-regular text-center">
                            Set up a profile to track your favorites and discover more
                        </p>
                        <div className="w-22 sm:w-26 flex justify-center items-center">
                            <img
                                src={AvatarsMockData[profileAvatar].avatar}
                                alt="avatar"
                                className="w-full aspect-[1/1] object-cover"
                            />
                        </div>
                        <button
                            onClick={() => changeProfileAvatar()}
                            className="text-xs 220:text-sm font-regular text-center py-1 px-3 border-[0.5px] border-brcolor-primary rounded-3xl cursor-pointer hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out"
                        >
                            Change
                        </button>
                        <div className="w-full flex flex-col gap-1 mt-1">
                            <input
                                value={profileName}
                                onChange={(e) => {
                                    setProfileName(e.target.value);
                                    setProfileMessage(null);
                                }}
                                className="text-xs 220:text-sm sm:text-sm font-medium text-textcolor-secondary px-4 py-3 border-1 border-brcolor-primary rounded-3xl placeholder-textcolor-secondary bg-bgcolor-secondary outline-none"
                                type="text"
                                placeholder="Username"
                            />
                            <p className="text-xs sm:text-sm text-[#FFBB57]">
                                {profileMessage}
                            </p>
                        </div>
                        <button
                            onClick={() => handleSaveProfile()}
                            className="220:w-full py-2 px-3 text-sm sm:text-base font-medium rounded-3xl text-black cursor-pointer bg-textcolor-primary transition duration-220 ease-out hover:scale-95"
                        >
                            {actionLabel}
                        </button>
                        <button
                            onClick={() => {
                                setActionLabel('Save');
                                setIsCreateProfileForm(false);
                                setProfileMessage(null);
                            }}
                            className="220:w-full py-2 px-3 text-sm sm:text-base font-medium rounded-3xl text-white cursor-pointer hover:bg-[#9E9E9E] transition-colors duration-300 ease-in-out"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        if (!Name) {
            /* Create Profile Comp */
            return (
                <div className="w-full h-screen min-h-screen bg-gradient-to-b from-[#431518] to-[#000000] px-5 py-5">
                    <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                        <h1 className="text-2xl sm:text-3xl font-medium text-center">
                            Add a profile to continue
                        </h1>
                        <p className="max-w-[15rem] lg:max-w-[18rem] text-center text-sm text-textcolor-secondary">
                            Create a profile to save favorites, watch later titles and
                            personalize your experience
                        </p>
                        <div className="flex flex-row items-center gap-5">
                            <div
                                onClick={() => setIsCreateProfileForm(true)}
                                className="flex flex-col gap-2 justify-center items-center mt-2 cursor-pointer rounded-sm hover:scale-[1.1] duration-300 ease-in-out"
                            >
                                <div className="w-22 h-22 flex justify-center items-center hover:bg-[#595555] transition-colors duration-300 ease-in-out rounded-sm sm:w-[clamp(6rem,10vw,10rem)] sm:h-[clamp(6rem,10vw,10rem)]">
                                    <img
                                        src={Add}
                                        alt="Add"
                                        className="w-[65%] h-[65%] object-cover"
                                    />
                                </div>
                                <h1 className="text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]">
                                    Add
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            /* Created profile comp */
            return (
                <div className="w-full h-screen min-h-screen bg-gradient-to-b from-[#431518] to-[#000000] px-5 py-5">
                    <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                        <h1 className="text-2xl sm:text-3xl font-medium text-center">
                            Ready to explore ?
                        </h1>
                        <p className="max-w-[15rem] lg:max-w-[18rem] text-center text-sm text-textcolor-secondary">
                            Continue with your profile and pick up where you left off
                        </p>
                        <div className="flex flex-row items-center gap-5">
                            <div
                                onClick={() => setIsCreateProfileForm(true)}
                                className="w-22 group flex flex-col gap-2 justify-center items-center cursor-pointer rounded-sm hover:scale-[1.1] duration-300 ease-in-out sm:w-[clamp(6rem,10vw,10rem)]"
                            >
                                <div className="relative w-full flex items-center justify-center">
                                    <img
                                        src={AvatarsMockData[AvatarNum].avatar}
                                        alt="avatar"
                                        className="w-full opacity-[0.90]"
                                    />
                                    <RiPencilLine className="opacity-0 absolute text-white/80 z-10 sm:w-8 sm:h-8 duration-300 ease-in-out group-hover:opacity-100" />
                                </div>
                                <h1 className="text-xs font-medium text-textcolor-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]">
                                    {Name}
                                </h1>
                            </div>
                        </div>
                        <Link
                            onClick={() => dispatch(setIsProfileSelected(true))}
                            to="/browse"
                            className="mt-5 text-center font-medium text-sm text-textcolor-secondary rounded-3xl cursor-pointer
                        border py-1 px-5 border-brcolor-primary hover:border-brcolor-secondary hover:text-textcolor-primary transition-colors duration-300 ease-in-out
                        sm:px-[clamp(0.25rem,2.5vw,3rem)] sm:py-[clamp(0.25rem,0.5vw,0.5rem)] sm:text-[clamp(0.80rem,1.1vw,1.20rem)]"
                        >
                            Continue
                        </Link>
                    </div>
                </div >
            );
        }
    }
};

export default Create;
