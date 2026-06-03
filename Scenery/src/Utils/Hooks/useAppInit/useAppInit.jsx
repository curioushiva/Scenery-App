import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { auth, database } from "@/Utils/Firebase/Firebase"
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount, setIsUsersAccountFetched, removeUser, } from "@/Utils/Redux/Slices/UserSlice/UserSlice";
import { addSavedMovies, addSavedTVShows } from "@/Utils/Redux/Slices/MediaSlice/MediaSlice";

const useAppInit = () => {

    /* Dispatch, get path location & navigate */
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    /* To get user's account */
    const account = useSelector((store) => store.user.account)

    /* To check if users avatar num is fetched */
    const isUsersAccountFetched = useSelector((store) => store.user.isUsersAccountFetched);

    /* Check if profile is selected once or not */
    const isUsersProfileSelected = useSelector((store) => store.user.isUsersProfileSelected);

    /* Authentication Effect */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                /* If User Signed-in then dispatch user's data */
                console.log(user);
                dispatch(updateAccount({
                    usersUID: user.uid,
                    usersEmail: user.email,
                }));
            } else {
                /* Remove user when signed off */
                dispatch(removeUser());
            }
        });

        /* User's Region */
        const getUsersLocation = (async () => {
            try {
                const res = await axios.get(`https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_IO_AUTH_TOKEN}`);
                const fetchedUsersLocation = res?.data?.country;
                dispatch(updateAccount({ usersLocation: fetchedUsersLocation }));
            } catch (error) {
                console.log("User's current region fetch failed", error)
            }
        })();
        return () => {
            unsubscribe();
        };
    }, [location.pathname]);

    /* User's account Fetch Effect */
    useEffect(() => {
        if (!account?.usersUID) return;
        /* Fetching user's account from firestore to enable realtime updations */
        const unsubGetUsersAccount = onSnapshot(doc(database, "users", account?.usersUID, "user", "account"),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatch(updateAccount({
                        usersUID: snapshot?.data()?.accountsUID || null,
                        usersEmail: snapshot?.data()?.accountsEmail || null,
                        usersName: snapshot?.data()?.accountsName || null,
                        usersAvatarNum: snapshot?.data()?.accountsAvatar || 0,
                        usersLocation: snapshot?.data()?.accoutsLocation || null,
                        usersCreatedAt: snapshot?.data()?.accountCreatedAt || null
                    }));
                    dispatch(setIsUsersAccountFetched(true));
                } else {
                    dispatch(setIsUsersAccountFetched(true));
                };
            }
        );

        return () => {
            unsubGetUsersAccount();
        };
    }, [account?.usersUID]);

    /* Navigation Effect */
    useEffect(() => {
        /* If user signout or doesnt exists */
        if (!account?.usersUID) {
            const authRoutes = ['/signin', '/signup', '/aboutus', '/privacy', '/whatsnew'];
            if (!authRoutes.includes(location.pathname)) {
                navigate('/');
            }
        }

        /* Check if account is fetched */
        if (isUsersAccountFetched) {
            const authRoutes = ['/signin', '/signup', '/'];
            /* Check if profile selected */
            if (isUsersProfileSelected) {
                if (authRoutes.includes(location.pathname)) {
                    navigate("/browse");
                }
            } else {
                navigate("/account/profile");
            }
        } else {
            return;
        }
    }, [account?.usersUID, isUsersAccountFetched,
        isUsersProfileSelected, location.pathname
    ]);

    /* User's media Fetch Effect */
    useEffect(() => {
        if (!account?.usersUID) return;
        /* Fetching user's watchLater & fav from firestore to enable realtime updations */
        const unsubWatchLaterMovies = onSnapshot(collection(database, "users", account?.usersUID, "movies", "watchLater", "items"),
            (snapshot) => {
                dispatch(addSavedMovies({
                    type: "watchLater",
                    data: snapshot.docs.map(doc => doc.data())
                }));
            }
        );
        const unsubFavouriteMovies = onSnapshot(collection(database, "users", account?.usersUID, "movies", "favourite", "items"),
            (snapshot) => {
                dispatch(addSavedMovies({
                    type: "favourite",
                    data: snapshot.docs.map(doc => doc.data())
                }));
            }
        );

        const unsubWatchLaterTVShows = onSnapshot(collection(database, "users", account?.usersUID, "tvshows", "watchLater", "items"),
            (snapshot) => {
                dispatch(addSavedTVShows({
                    type: "watchLater",
                    data: snapshot.docs.map(doc => doc.data())
                }));
            }
        );
        const unsubFavouriteTVShows = onSnapshot(collection(database, "users", account?.usersUID, "tvshows", "favourite", "items"),
            (snapshot) => {
                dispatch(addSavedTVShows({
                    type: "favourite",
                    data: snapshot.docs.map(doc => doc.data())
                }));
            }
        );

        return () => {
            unsubWatchLaterMovies();
            unsubFavouriteMovies();
            unsubWatchLaterTVShows();
            unsubFavouriteTVShows();
        };
    }, [account?.usersUID]);

};

export default useAppInit;