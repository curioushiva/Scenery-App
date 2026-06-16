import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AvatarsMockData } from "@/Utils/Mockdata/Mockdata";
import { RiPencilLine } from "@remixicon/react";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import { setIsProfileSelected } from "@/Utils/Redux/Slices/AccountSlice/AccountSlice";

const Choose = () => {
    /* For dispatch & navigate */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* To update profile */
    const { updateProfile } = useAccount();

    /* Selecting Name & Avatar number */
    const { Name, AvatarNum } = useSelector((store) => store.account.profile);

    /* Check if profile is selected once or not */
    const isProfileSelected = useSelector(
        (store) => store.account.isProfileSelected,
    );

    /* For profile updation form */
    const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);

    /* To set & change new avatar */
    const [newAvatar, setNewAvatar] = useState(AvatarNum);
    const changeNewAvatar = () => {
        setNewAvatar((prev) => {
            if (prev + 1 === 12) {
                return 0;
            } else {
                return prev + 1;
            }
        });
    };

    /* To set new name */
    const [newName, setNewName] = useState(Name);

    /* To set new Name validation message */
    const [newNameValidation, setNewNameValidation] = useState(null);

    /* To set button's action label */
    const [btnActionLabel, setBtnActionLabel] = useState("Update");

    /* Update profile handler */
    const handleUpdateProfile = async () => {
        setBtnActionLabel("Updating...");
        const message = await updateProfile(newAvatar, newName);
        setNewNameValidation(message);
        setBtnActionLabel("Update");
        if (!message) {
            setBtnActionLabel("Update");
            setShowUpdateProfileForm(false);
        }
    };

    /* Sync values after cross-platform updates */
    useEffect(() => {
        setNewAvatar(AvatarNum);
    }, [AvatarNum]);

    useEffect(() => {
        setNewName(Name);
    }, [Name]);

    /* Naviation based on profile selected */
    const chooseNavigationType = () => {
        if (isProfileSelected) {
            navigate("/account");
        } else {
            navigate("/browse");
            dispatch(setIsProfileSelected(true));
        }
    };

    /* Return*/
    if (showUpdateProfileForm) {
        /* Update profile form */
        return (
            <div className="w-full h-screen min-h-screen px-5 py-5 bg-linear-to-b from-bg-topColor to-bg-bottomColor text-text-primary">
                <div className="w-full h-full flex justify-center items-center px-0 py-5">
                    <div className="w-full max-w-160 bg-cardColor-primary flex flex-col gap-4 justify-center items-center border border-br-primary rounded-3xl px-2 py-8 220:px-10">
                        {/* Headings */}
                        <h1 className="text-xl sm:text-2xl font-medium text-center">
                            Update your profile
                        </h1>
                        <p className="text-xs sm:text-sm font-regular text-center">
                            Give your profile a fresh look
                        </p>
                        {/* Image */}
                        <div className="w-22 sm:w-26 flex justify-center items-center">
                            <img
                                src={AvatarsMockData[newAvatar].avatar}
                                alt="avatar"
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                        {/* Inputs & buttons */}
                        <button
                            onClick={() => changeNewAvatar()}
                            className="text-xs 220:text-sm font-regular text-center py-1 px-3 border border-br-primary rounded-3xl cursor-pointer transition duration-220 ease-out active:scale-95"
                        >
                            Change
                        </button>
                        <div className="w-full flex flex-col gap-1 mt-1">
                            <input
                                value={newName}
                                onChange={(e) => {
                                    setNewName(e.target.value);
                                    setNewNameValidation(null);
                                }}
                                className="text-xs 220:text-sm sm:text-sm font-medium px-4 py-3 rounded-3xl border border-br-primary bg-bg-inputColor placeholder-text-secondary outline-none"
                                type="text"
                                placeholder="Name"
                            />
                            <p className="text-xs sm:text-sm text-errorcolor">
                                {newNameValidation}
                            </p>
                        </div>
                        <button
                            onClick={() => handleUpdateProfile()}
                            className="220:w-full py-2 px-3 text-sm sm:text-base font-medium rounded-3xl text-text-ternary bg-bg-whiteColor cursor-pointer  transition duration-220 ease-out active:scale-95"
                        >
                            {btnActionLabel}
                        </button>
                        <button
                            onClick={() => {
                                setBtnActionLabel("Update");
                                setShowUpdateProfileForm(false);
                                setNewNameValidation(null);
                            }}
                            className="220:w-full py-2 px-3 text-sm sm:text-base font-medium rounded-3xl cursor-pointer transition-colors duration-300 ease-in-out hover:bg-bg-whiteColor/60"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        /* Updated profile */
        return (
            <div className="w-full h-screen min-h-screen px-5 py-5 bg-linear-to-b from-bg-topColor to-bg-bottomColor text-text-primary">
                <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                    {/* Headings */}
                    <h1 className="text-2xl sm:text-3xl font-medium text-center">
                        Ready to explore ?
                    </h1>
                    <p className="max-w-60 lg:max-w-[18rem] text-center text-sm text-text-secondary">
                        Continue with your profile and pick up where you left off
                    </p>
                    {/* Image */}
                    <div className="flex flex-row items-center gap-5">
                        <div
                            onClick={() => setShowUpdateProfileForm(true)}
                            className="w-22 group flex flex-col gap-2 justify-center items-center cursor-pointer rounded-sm hover:scale-[1.1] duration-300 ease-in-out sm:w-[clamp(6rem,10vw,10rem)]"
                        >
                            <div className="relative w-full flex items-center justify-center">
                                <img
                                    src={AvatarsMockData[AvatarNum].avatar}
                                    alt="avatar"
                                    className="w-full opacity-[0.90]"
                                />
                                <RiPencilLine className="opacity-0 absolute text-text-primary/80 z-10 sm:w-8 sm:h-8 duration-300 ease-in-out group-hover:opacity-100" />
                            </div>
                            <h1 className="text-xs font-medium text-text-secondary sm:text-[clamp(0.80rem,1.1vw,1.20rem)]">
                                {Name}
                            </h1>
                        </div>
                    </div>
                    {/* Button */}
                    <div
                        onClick={() => chooseNavigationType()}
                        className="mt-5 text-center font-medium text-sm text-text-secondary rounded-3xl cursor-pointer 
                                  border py-1 px-5 border-br-primary transition-colors duration-300 ease-in-out 
                                  sm:px-[clamp(0.25rem,2.5vw,3rem)] sm:py-[clamp(0.25rem,0.5vw,0.5rem)] sm:text-[clamp(0.80rem,1.1vw,1.20rem)]
                                   hover:border-br-secondary hover:text-text-primary"
                    >
                        Continue
                    </div>
                </div>
            </div>
        );
    }
};

export default Choose;
