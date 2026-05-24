import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { auth, database } from "../../Utils/Firebase/Firebase"
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount, setIsUsersAvatarNumFetched, removeUser, } from "../../Redux/Slices/UserSlice/UserSlice";
import { setIsMediaFetched, addSavedMovies, addSavedTVShows } from "../../Redux/Slices/MediaSlice/MediaSlice";

const useUser = () => {

    /* Dispatch, get path location & navigate */
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    /* To check if media is fetched */
    const isMediaFetched = useSelector((store) => store.media.isMediaFetched);

    /* User's details - used in save account */
    const account = useSelector((store) => store.user.account)

    /* To check if users avatar num is fetched */
    const isUsersAvatarNumFetched = useSelector((store) => store.user.isUsersAvatarNumFetched);

    /* To check if profile is selected */
    const usersProfileType = useSelector((store) => store.user.account.usersProfileType);

    /* Get : Signed-in User's data | Account details (email, name, avatar) | Fetch Saved Media | User's region */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                /* If User Signed-in then dispatch user's data */
                dispatch(updateAccount({
                    usersUID: user.uid,
                    usersEmail: user.email,
                    usersName: user.displayName || '',
                }));

                /* Fetch Cur User's account from google firebase cloud (mainly avatarNum) & then navigate */
                if (!isUsersAvatarNumFetched) {
                    (async () => {
                        try {
                            const fetchedUserAccount = (await getDoc(doc(database, "users", user.uid, "user", "account"))).data();
                            dispatch(updateAccount({ usersAvatarNum: fetchedUserAccount?.usersAvatar || 0, }));
                            dispatch(setIsUsersAvatarNumFetched(true));
                        } catch (error) {
                            console.log("User account fetch failed", error);

                            /* Navigaation based on Signed-in User */
                        } finally {
                            const authRoutes = ['/signin', '/signup', '/'];
                            if (usersProfileType === null) {
                                /* Profile not choosen yet */
                                navigate('/account/profile');
                            } else {
                                /* Profile already choosen */
                                if (authRoutes.includes(location.pathname)) {
                                    navigate('/browse');
                                }
                            }
                        }
                    })();

                    /* Navigaation based on Signed-in User */
                } else {
                    const authRoutes = ['/signin', '/signup', '/'];
                    if (usersProfileType === null) {
                        /* Profile not choosen yet */
                        navigate('/account/profile');
                    } else {
                        /* Profile already choosen */
                        if (authRoutes.includes(location.pathname)) {
                            navigate('/browse');
                        }
                    }
                }

                /* Fetch Cur User's Saved Media from google firebase cloud */
                if (!isMediaFetched) {
                    (async () => {
                        try {
                            const [watchLaterMovies, favouriteMovies, watchLaterTVShows, favouriteTVShows] = await Promise.all([
                                getDocs(collection(database, "users", (user?.uid), "movies", "watchLater", "items")),
                                getDocs(collection(database, "users", (user?.uid), "movies", "favourite", "items")),
                                getDocs(collection(database, "users", (user?.uid), "tvshows", "watchLater", "items")),
                                getDocs(collection(database, "users", (user?.uid), "tvshows", "favourite", "items"))
                            ]);
                            const fetchedwatchLaterMovies = watchLaterMovies.docs.map(doc => doc.data());
                            const fetchedfavouriteMovies = favouriteMovies.docs.map(doc => doc.data());
                            const fetchedwatchLaterTVShows = watchLaterTVShows.docs.map(doc => doc.data());
                            const fetchedfavouriteTVShows = favouriteTVShows.docs.map(doc => doc.data());

                            dispatch(addSavedMovies({
                                type: "watchLater",
                                data: fetchedwatchLaterMovies
                            }));

                            dispatch(addSavedMovies({
                                type: "favourite",
                                data: fetchedfavouriteMovies
                            }))

                            dispatch(addSavedTVShows({
                                type: "watchLater",
                                data: fetchedwatchLaterTVShows
                            }));

                            dispatch(addSavedTVShows({
                                type: "favourite",
                                data: fetchedfavouriteTVShows
                            }))
                            dispatch(setIsMediaFetched(true));
                        } catch (error) {
                            console.log("Save Media fetch failed", error);
                        }
                    })();
                }

            } else {
                /* Remove user when signed off and navigate to home */
                dispatch(removeUser());
                const authRoutes = ['/signin', '/signup'];
                if (!authRoutes.includes(location.pathname)) {
                    navigate('/');
                }
            }
        });

        /* User's Region */
        const getUsersCurRegion = (async () => {
            try {
                const res = await axios.get(`https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_IO_AUTH_TOKEN}`);
                const fetchedUsersCurRegion = res?.data?.country;
                dispatch(updateAccount({ usersCurRegion: fetchedUsersCurRegion }));
            } catch (error) {
                console.log("User's current region fetch failed", error)
            }
        })();
        return () => unsubscribe();
    }, []);

    /* Save user's account (mainly AvatarNum) */
    const saveUsersAccount = async (avatarNum) => {
        try {
            await setDoc(doc(database, "users", (account?.usersUID), "user", "account"),
                {
                    usersEmail: account?.usersEmail,
                    usersName: account?.usersName,
                    usersAvatar: avatarNum,
                    createdAt: Date.now()
                }
            );
        } catch (error) {
            console.log("Post account failed", error);
        }
    };

    /* Update a user's profile name */
    const updateUsersName = (typedUsersName) => {
        const currentUser = auth.currentUser;
        console.log(currentUser)
        if (!currentUser) {
            console.error("No authenticated user found.");
            return;
        }
        updateProfile(currentUser, { displayName: typedUsersName }).then(() => {
            dispatch(updateAccount({
                usersName: typedUsersName,
            }));
        }).catch((error) => {
            console.error("Profile update failed:", error);
        });
    };

    /* To Sign out the user */
    const SignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }

    return {
        saveUsersAccount,
        updateUsersName,
        SignOut,
    }
};

export default useUser;