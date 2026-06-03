import { signOut } from "firebase/auth";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, database } from "@/Utils/Firebase/Firebase"
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addMediaID } from "@/Utils/Redux/Slices/MediaSlice/MediaSlice";
import { addSavedMovies, addSavedTVShows } from "@/Utils/Redux/Slices/MediaSlice/MediaSlice";

const useUser = () => {
    /* To dispatch & navigate */
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    /* User's details */
    const account = useSelector((store) => store.user.account)

    /* To select saved movies & tvshows from store */
    const savedMovies = useSelector((store) => store.media.savedMovies)
    const savedTVShows = useSelector((store) => store.media.savedTVShows)

    /* Save User's account function */
    const saveUsersAccount = async (avatarNum, typedUsersName) => {
        if (!account?.usersUID) return;
        /* To save user's account info in firestore */
        try {
            await setDoc(doc(database, "users", (account?.usersUID), "user", "account"),
                {
                    accountsUID: account?.usersUID,
                    accountsEmail: account?.usersEmail,
                    accountsName: typedUsersName,
                    accountsAvatar: avatarNum,
                    accoutsLocation: account?.usersLocation,
                    accountCreatedAt: Date.now()
                }
            );
        } catch (error) {
            console.log("Post account failed", error);
        }
    };

    /* To Sign out user function */
    const SignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }

    /* Navigate based on media type - movie or tvshow */
    const mediaType = (media) => {
        if (media?.title) {
            dispatch(addMediaID(media?.id))
            navigate(`/movie/${media?.id}`)
        } else if (media?.name) {
            dispatch(addMediaID(media?.id))
            navigate(`/tvshow/${media?.id}`)
        } else {
            null;
        }
    }

    /* Function to save user's media */
    const saveUsersMedia = async (media, collectionType) => {
        /* If user dont exists return */
        if (!(account?.usersUID)) return;

        if (media?.title) {
            if (collectionType === 'watchLater') {
                /* Reference for media doc path */
                const mediaRef = doc(database, "users", account?.usersUID, 'movies', 'watchLater', "items", String(media?.id));
                /* 1 */
                const isMovieInWatchLater = savedMovies?.watchLater?.find((movie) => movie?.media?.id === media?.id)
                if (isMovieInWatchLater) {
                    const updatedWatchLaterMovieArr = savedMovies?.watchLater?.filter((movie) => movie?.media?.id !== isMovieInWatchLater?.media?.id)
                    dispatch(addSavedMovies({
                        type: "watchLater",
                        data: updatedWatchLaterMovieArr
                    }));
                    try {
                        await deleteDoc(mediaRef);
                    } catch (error) {
                        console.log("Failed to delete movie from watch later", error);
                        /* If error , prevent updation */
                        dispatch(addSavedMovies({
                            type: "watchLater",
                            data: savedMovies?.watchLater
                        }));
                    }
                    return;
                    /* 2 */
                } else {
                    dispatch(addSavedMovies({
                        type: "watchLater",
                        data: [{
                            media: media,
                            createdAt: Date.now()
                        }],
                        append: true
                    }));
                    try {
                        await setDoc(mediaRef,
                            {
                                media: media,
                                createdAt: Date.now()
                            }
                        );
                    } catch (error) {
                        console.log("Failed to add movie to watch later", error);
                        /* If error , prevent updation */
                        dispatch(addSavedMovies({
                            type: "watchLater",
                            data: savedMovies?.watchLater
                        }));
                    }
                };
            } else if (collectionType === 'favourite') {
                /* Reference for media doc path */
                const mediaRef = doc(database, "users", account?.usersUID, 'movies', 'favourite', "items", String(media?.id));
                /* 1 */
                const isMovieInFavourite = savedMovies?.favourite?.find((movie) => movie?.media?.id === media?.id)
                if (isMovieInFavourite) {
                    const updatedFavouriteMovieArr = savedMovies?.favourite?.filter((movie) => movie?.media?.id !== isMovieInFavourite?.media?.id)
                    dispatch(addSavedMovies({
                        type: "favourite",
                        data: updatedFavouriteMovieArr
                    }));
                    try {
                        await deleteDoc(mediaRef);
                    } catch (error) {
                        console.log("Failed to remove movie from favourite", error);
                        /* If error , prevent updation */
                        dispatch(addSavedMovies({
                            type: "favourite",
                            data: savedMovies?.favourite
                        }));
                    }
                    return;
                    /* 2 */
                } else {
                    dispatch(addSavedMovies({
                        type: "favourite",
                        data: [{
                            media: media,
                            createdAt: Date.now()
                        }],
                        append: true
                    }));
                    try {
                        await setDoc(mediaRef,
                            {
                                media: media,
                                createdAt: Date.now()
                            }
                        );
                    } catch (error) {
                        console.log("Failed to add movie to favourite", error);
                        /* If error , prevent updation */
                        dispatch(addSavedMovies({
                            type: "favourite",
                            data: savedMovies?.favourite
                        }));
                    }
                };
            }
        } else if (media?.name) {
            if (collectionType === 'watchLater') {
                /* Reference for media doc path */
                const mediaRef = doc(database, "users", account?.usersUID, 'tvshows', 'watchLater', "items", String(media?.id));
                /* 1 */
                const isTvShowInWatchLater = savedTVShows?.watchLater?.find((tvshow) => tvshow?.media?.id === media?.id)
                if (isTvShowInWatchLater) {
                    const updatedWatchLaterTvShowArr = savedTVShows?.watchLater?.filter((tvShow) => tvShow?.media?.id !== isTvShowInWatchLater?.media?.id)
                    dispatch(addSavedTVShows({
                        type: "watchLater",
                        data: updatedWatchLaterTvShowArr
                    }));
                    try {
                        await deleteDoc(mediaRef);
                    } catch (error) {
                        console.log("Failed to remove TV Show from watch later", error);
                        /* If error , prevent updation */
                        dispatch(addSavedTVShows({
                            type: "watchLater",
                            data: savedTVShows?.watchLater
                        }));
                    }
                    return;
                    /* 2 */
                } else {
                    dispatch(addSavedTVShows({
                        type: "watchLater",
                        data: [{
                            media: media,
                            createdAt: Date.now()
                        }],
                        append: true
                    }));
                    try {
                        await setDoc(mediaRef,
                            {
                                media: media,
                                createdAt: Date.now()
                            }
                        );
                    } catch (error) {
                        console.log("Failed to add TV Show to watch later", error);
                        /* If error , prevent updation */
                        dispatch(addSavedTVShows({
                            type: "watchLater",
                            data: savedTVShows?.watchLater
                        }));
                    }
                };
            } else if (collectionType === 'favourite') {
                /* Reference for media doc path */
                const mediaRef = doc(database, "users", account?.usersUID, 'tvshows', 'favourite', "items", String(media?.id));
                /* 1 */
                const isInFavouriteTvShow = savedTVShows?.favourite?.find((tvShow) => tvShow?.media?.id === media?.id)
                if (isInFavouriteTvShow) {
                    const updatedFavouriteTvShowArr = savedTVShows?.favourite?.filter((tvShow) => tvShow?.media?.id !== isInFavouriteTvShow?.media?.id)
                    dispatch(addSavedTVShows({
                        type: "favourite",
                        data: updatedFavouriteTvShowArr
                    }));
                    try {
                        await deleteDoc(mediaRef);
                    } catch (error) {
                        console.log("Failed to remove TV Show from favourite", error);
                        /* If error , prevent updation */
                        dispatch(addSavedTVShows({
                            type: "favourite",
                            data: savedTVShows?.favourite
                        }));
                    }
                    return;
                    /* 2 */
                } else {
                    dispatch(addSavedTVShows({
                        type: "favourite",
                        data: [{
                            media: media,
                            createdAt: Date.now()
                        }],
                        append: true
                    }));
                    try {
                        await setDoc(mediaRef,
                            {
                                media: media,
                                createdAt: Date.now()
                            }
                        );
                    } catch (error) {
                        console.log("Failed to add TV Show to favourite", error);
                        /* If error , prevent updation */
                        dispatch(addSavedTVShows({
                            type: "favourite",
                            data: savedTVShows?.favourite
                        }));
                    }
                };
            }
        }

    }

    /* Function to check for saved media for user */
    const showSavedUsersMedia = (media, collectionType) => {
        if (!media) return null;
        const typeOfMedia = media?.title;
        const typeOfCollection = typeOfMedia ? savedMovies : savedTVShows;
        const isSaved = typeOfCollection[collectionType].some((val) => val.media.id === media.id);
        if (collectionType === "watchLater") { return isSaved ? true : false }
        if (collectionType === 'favourite') { return isSaved ? true : false }
        return null;
    }

    return {
        saveUsersAccount,
        SignOut,
        mediaType,
        saveUsersMedia,
        showSavedUsersMedia
    }
}

export default useUser