import { signOut, updateEmail, updatePassword } from "firebase/auth";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, database } from "@/Utils/Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setSavedMovies,
  appendSavedMovie,
  setSavedTVShows,
  appendSavedTVShow,
} from "@/Utils/Redux/Slices/AccountSlice/AccountSlice";

const useAccount = () => {
  /* To dispatch */
  const dispatch = useDispatch();

  /* Selecting profile */
  const profile = useSelector((store) => store.account.profile);

  /* Selecting saved movies & tvshows */
  const savedMovies = useSelector((store) => store.account.profile.savedMovies);
  const savedTVShows = useSelector((store) => store.account.profile.savedTVShows);

  /* To save profile */
  const saveProfile = async (avatarNum, typedName) => {
    if (!profile?.UID) return;
    try {
      await setDoc(doc(database, "users", profile?.UID, "account", "profile"), {
        PROFILE_UID: profile?.UID,
        PROFILE_EMAIL: profile?.Email,
        PROFILE_NAME: typedName,
        PROFILE_AVATARNUM: avatarNum,
        PROFILE_LOCATION: profile?.Location,
        PROFILE_CREATEDAT: profile?.CreatedAt || Date.now(),
      });
    } catch (error) {
      console.log("Post account failed", error);
    }
  };

  /* To change profile name on firebase store */
  const changeName = async (updatedName) => {
    if (!profile?.UID) return;
    const valid = /^[a-zA-Z0-9]{3,12}$/.test(updatedName);
    if (valid) {
      try {
        await updateDoc(
          doc(database, "users", profile?.UID, "account", "profile"),
          {
            PROFILE_NAME: updatedName,
          },
        );
      } catch (error) {
        console.log("Name updation failed", error);
      }
      console.log("done");
    } else {
      console.log("not done");
      return "⚠ Please enter a valid name";
    }
  };

  /* To change email on firebase auth */
  const changeEmail = async (updatedEmail) => {
    await updateEmail(auth.currentUser, "user@example.com")
      .then(() => {
        console.log("Email updated", auth.currentUser);
      })
      .catch((error) => {
        console.log("Email updation failed", error);
      });
  };

  /* To change password on firebase auth */
  const changePassword = async (updatedPassword) => {
    await updatePassword(auth.currentUser, "newPassword")
      .then(() => {
        console.log("Password updated", auth.currentUser);
      })
      .catch((error) => {
        console.log("Password updation failed", error);
      });
  };

  /* To Sign out user function */
  const SignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        console.log("Signed out failed", error)
      });
  };

  /* Function to save profile media */
  const saveProfileMedia = async (media, collectionType) => {
    /* If user dont exists return */
    if (!profile?.UID) return;

    if (media?.title) {
      if (collectionType === "watchLater") {
        /* Reference for media doc path */
        const mediaRef = doc(
          database,
          "users",
          profile?.UID,
          "account",
          "profile",
          "movies",
          "watchLater",
          "items",
          String(media?.id),
        );
        /* 1 */
        const isMovieInWatchLater = savedMovies?.watchLater?.find(
          (movie) => movie?.media?.id === media?.id,
        );
        if (isMovieInWatchLater) {
          const updatedWatchLaterMovieArr = savedMovies?.watchLater?.filter(
            (movie) => movie?.media?.id !== isMovieInWatchLater?.media?.id,
          );
          dispatch(
            setSavedMovies({
              type: "watchLater",
              data: updatedWatchLaterMovieArr,
            }),
          );
          try {
            await deleteDoc(mediaRef);
          } catch (error) {
            console.log("Failed to delete movie from watch later", error);
            /* If error , prevent updation */
            dispatch(
              setSavedMovies({
                type: "watchLater",
                data: savedMovies?.watchLater,
              }),
            );
          }
          return;
          /* 2 */
        } else {
          dispatch(
            appendSavedMovie({
              type: "watchLater",
              data: { media: media, createdAt: Date.now() },
            }),
          );
          try {
            await setDoc(mediaRef, {
              media: media,
              createdAt: Date.now(),
            });
          } catch (error) {
            console.log("Failed to add movie to watch later", error);
            /* If error , prevent updation */
            dispatch(
              setSavedMovies({
                type: "watchLater",
                data: savedMovies?.watchLater,
              }),
            );
          }
        }
      } else if (collectionType === "favourite") {
        /* Reference for media doc path */
        const mediaRef = doc(
          database,
          "users",
          profile?.UID,
          "account",
          "profile",
          "movies",
          "favourite",
          "items",
          String(media?.id),
        );
        /* 1 */
        const isMovieInFavourite = savedMovies?.favourite?.find(
          (movie) => movie?.media?.id === media?.id,
        );
        if (isMovieInFavourite) {
          const updatedFavouriteMovieArr = savedMovies?.favourite?.filter(
            (movie) => movie?.media?.id !== isMovieInFavourite?.media?.id,
          );
          dispatch(
            setSavedMovies({
              type: "favourite",
              data: updatedFavouriteMovieArr,
            }),
          );
          try {
            await deleteDoc(mediaRef);
          } catch (error) {
            console.log("Failed to remove movie from favourite", error);
            /* If error , prevent updation */
            dispatch(
              setSavedMovies({
                type: "favourite",
                data: savedMovies?.favourite,
              }),
            );
          }
          return;
          /* 2 */
        } else {
          dispatch(
            appendSavedMovie({
              type: "favourite",
              data: {
                media: media,
                createdAt: Date.now(),
              },
            }),
          );
          try {
            await setDoc(mediaRef, {
              media: media,
              createdAt: Date.now(),
            });
          } catch (error) {
            console.log("Failed to add movie to favourite", error);
            /* If error , prevent updation */
            dispatch(
              setSavedMovies({
                type: "favourite",
                data: savedMovies?.favourite,
              }),
            );
          }
        }
      }
    } else if (media?.name) {
      if (collectionType === "watchLater") {
        /* Reference for media doc path */
        const mediaRef = doc(
          database,
          "users",
          profile?.UID,
          "account",
          "profile",
          "tvshows",
          "watchLater",
          "items",
          String(media?.id),
        );
        /* 1 */
        const isTvShowInWatchLater = savedTVShows?.watchLater?.find(
          (tvshow) => tvshow?.media?.id === media?.id,
        );
        if (isTvShowInWatchLater) {
          const updatedWatchLaterTvShowArr = savedTVShows?.watchLater?.filter(
            (tvShow) => tvShow?.media?.id !== isTvShowInWatchLater?.media?.id,
          );
          dispatch(
            setSavedTVShows({
              type: "watchLater",
              data: updatedWatchLaterTvShowArr,
            }),
          );
          try {
            await deleteDoc(mediaRef);
          } catch (error) {
            console.log("Failed to remove TV Show from watch later", error);
            /* If error , prevent updation */
            dispatch(
              setSavedTVShows({
                type: "watchLater",
                data: savedTVShows?.watchLater,
              }),
            );
          }
          return;
          /* 2 */
        } else {
          dispatch(
            appendSavedTVShow({
              type: "watchLater",
              data: {
                media: media,
                createdAt: Date.now(),
              },
            }),
          );
          try {
            await setDoc(mediaRef, {
              media: media,
              createdAt: Date.now(),
            });
          } catch (error) {
            console.log("Failed to add TV Show to watch later", error);
            /* If error , prevent updation */
            dispatch(
              setSavedTVShows({
                type: "watchLater",
                data: savedTVShows?.watchLater,
              }),
            );
          }
        }
      } else if (collectionType === "favourite") {
        /* Reference for media doc path */
        const mediaRef = doc(
          database,
          "users",
          profile?.UID,
          "account",
          "profile",
          "tvshows",
          "favourite",
          "items",
          String(media?.id),
        );
        /* 1 */
        const isInFavouriteTvShow = savedTVShows?.favourite?.find(
          (tvShow) => tvShow?.media?.id === media?.id,
        );
        if (isInFavouriteTvShow) {
          const updatedFavouriteTvShowArr = savedTVShows?.favourite?.filter(
            (tvShow) => tvShow?.media?.id !== isInFavouriteTvShow?.media?.id,
          );
          dispatch(
            setSavedTVShows({
              type: "favourite",
              data: updatedFavouriteTvShowArr,
            }),
          );
          try {
            await deleteDoc(mediaRef);
          } catch (error) {
            console.log("Failed to remove TV Show from favourite", error);
            /* If error , prevent updation */
            dispatch(
              setSavedTVShows({
                type: "favourite",
                data: savedTVShows?.favourite,
              }),
            );
          }
          return;
          /* 2 */
        } else {
          dispatch(
            appendSavedTVShow({
              type: "favourite",
              data: {
                media: media,
                createdAt: Date.now(),
              },
            }),
          );
          try {
            await setDoc(mediaRef, {
              media: media,
              createdAt: Date.now(),
            });
          } catch (error) {
            console.log("Failed to add TV Show to favourite", error);
            /* If error , prevent updation */
            dispatch(
              setSavedTVShows({
                type: "favourite",
                data: savedTVShows?.favourite,
              }),
            );
          }
        }
      }
    }
  };

  /* Function to check for saved frofile media */
  const showSavedProfileMedia = (media, collectionType) => {
    if (!media) return null;
    const typeOfMedia = media?.title;
    const typeOfCollection = typeOfMedia ? savedMovies : savedTVShows;
    const isSaved = typeOfCollection[collectionType].some(
      (val) => val.media.id === media.id,
    );
    if (collectionType === "watchLater") {
      return isSaved ? true : false;
    }
    if (collectionType === "favourite") {
      return isSaved ? true : false;
    }
    return null;
  };

  return {
    saveProfile,
    SignOut,
    changeName,
    changeEmail,
    changePassword,
    saveProfileMedia,
    showSavedProfileMedia,
  };
};

export default useAccount;
