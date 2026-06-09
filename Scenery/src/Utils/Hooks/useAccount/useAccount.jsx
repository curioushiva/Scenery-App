import {
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
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
  const savedTVShows = useSelector(
    (store) => store.account.profile.savedTVShows,
  );

  /* To save profile */
  const saveProfile = async (profileAvatar, profileName) => {
    /* Return if user doesn't exists */
    if (!profile?.UID) return;

    /* Check email validity */
    const valid = /^[a-zA-Z0-9]{3,12}$/.test(profileName);
    if (!valid) {
      return "⨂ Please enter a valid name.";
    }

    /* Save profile */
    try {
      await updateDoc(
        doc(database, "users", profile?.UID, "account", "profile"),
        {
          PROFILE_NAME: profileName,
          PROFILE_AVATARNUM: profileAvatar,
        },
      );
    } catch (error) {
      console.log("Saving profile failed", error);
      return "⨂ Failed to save profile.";
    }
  };

  /* To Sign out */
  const SignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Signed out failed", error);
    }
  };

  /* To reauthenticate the user */
  const reauthenticateUser = async (currentPassword) => {
    /* Return if user doesn't exists */
    if (!profile?.UID) return;

    /* Check for pass validity */
    const valid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        currentPassword,
      );
    if (!valid) {
      return {
        success: false,
        message: "⨂ Please enter a valid password.",
        requiresReauth: true,
      };
    }

    /* Reauthentication */
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword,
    );
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      return {
        success: true,
        message: "",
        requiresReauth: false,
      };
    } catch (error) {
      console.log("Account authentication failed", error);
      switch (error.code) {
        case "auth/wrong-password":
        case "auth/invalid-credential":
          return {
            success: false,
            message: "⨂ Password is incorrect.",
            requiresReauth: true,
          };
        case "auth/too-many-requests":
          return {
            success: false,
            message: "⨂ Too many attempts. Try again later.",
            requiresReauth: true,
          };
        default:
          console.log("Failed to authenticate", error);
          return {
            success: false,
            message: "⨂ Authentication failed.",
            requiresReauth: true,
          };
      }
    }
  };

  /* To update profile */
  const updateProfile = async (newAvatar, newName) => {
    /* Return if user doesn't exists */
    if (!profile?.UID) return;

    /* Check name validity */
    const valid = /^[a-zA-Z0-9]{3,12}$/.test(newName);
    if (!valid) {
      return "⨂ Please enter a valid name.";
    }

    /* Update profie */
    try {
      await updateDoc(
        doc(database, "users", profile?.UID, "account", "profile"),
        {
          PROFILE_NAME: newName,
          PROFILE_AVATARNUM: newAvatar,
        },
      );
    } catch (error) {
      console.log("Profile updation failed", error);
      return "⨂ Failed to update profile.";
    }
  };

  /* To change profile name on firebase store */
  const changeName = async (newName) => {
    /* Return if user doesn't exists */
    if (!profile?.UID) return;

    /* Check for name validity */
    const valid = /^[a-zA-Z0-9]{3,12}$/.test(newName);
    if (!valid) {
      return {
        success: false,
        message: "⨂ Please enter a valid name",
      };
    }

    /* Change profile name */
    try {
      await updateDoc(
        doc(database, "users", profile?.UID, "account", "profile"),
        {
          PROFILE_NAME: newName,
        },
      );
      return {
        success: true,
        message: "✓ Name has been updated",
      };
    } catch (error) {
      console.log("⨂ Name updation failed", error);
      return {
        success: false,
        message: "⨂ Failed to update name",
      };
    }
  };

  /* To change email on firebase auth */
  const changeEmail = async (newEmail) => {
    /* Return if user doesn't exists */
    if (!profile?.UID) return;

    /* Check for same email */
    if (
      newEmail.trim().toLowerCase() === auth.currentUser.email.toLowerCase()
    ) {
      return {
        success: false,
        message: "⨂ Please enter a different email",
        requiresReauth: false,
      };
    }

    /* Check for email validity */
    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      newEmail,
    );
    if (!valid) {
      return {
        success: false,
        message: "⨂ Please enter a valid email",
        requiresReauth: false,
      };
    }

    /* Set polling true then move forward */
    try {
      await updateDoc(
        doc(database, "users", profile?.UID, "account", "profile"),
        {
          PROFILE_CREDCHANGED: true,
        },
      );
    } catch (error) {
      console.log("Email updation failed", error);
      return {
        success: false,
        message: "⨂ Failed to update email",
        requiresReauth: false,
      };
    }

    /* Change email */
    try {
      await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
      return {
        success: true,
        message: "✓ Verify your new email to complete the update",
        requiresReauth: false,
      };
    } catch (error) {
      switch (error.code) {
        case "auth/requires-recent-login":
          return {
            success: false,
            message: "",
            requiresReauth: true,
          };

        case "auth/too-many-requests":
          return {
            success: false,
            message: "⨂ Too many attempts. Please try again later.",
            requiresReauth: false,
          };

        case "auth/network-request-failed":
          return {
            success: false,
            message: "⨂ Network error. Check your connection.",
            requiresReauth: false,
          };

        case "auth/invalid-email":
          return {
            success: false,
            message: "⨂ Invalid email address",
            requiresReauth: false,
          };

        default:
          console.error(error);
          return {
            success: false,
            message: "⨂ Failed to update email",
            requiresReauth: false,
          };
      }
    }
  };

  /* To change password on firebase auth */
  const changePassword = async (newPassword) => {
    /* Return if user doesn't exists */
    if (!profile.UID) return;

    /* Check for password validity */
    const valid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword,
      );
    if (!valid) {
      return {
        success: false,
        message: "⨂ Please enter a valid password",
        requiresReauth: false,
      };
    }

    /* Set polling true then move forward */
    try {
      await updateDoc(
        doc(database, "users", profile?.UID, "account", "profile"),
        {
          PROFILE_CREDCHANGED: true,
        },
      );
    } catch (error) {
      console.log("Password reset failed", error);
      return {
        success: false,
        message: "⨂ Failed to reset password",
        requiresReauth: false,
      };
    }

    /* Password change */
    try {
      await updatePassword(auth.currentUser, newPassword);
      return {
        success: true,
        message: "✓ Your password has been reset successfully",
        requiresReauth: false,
      };
    } catch (error) {
      console.log("Password reset failed", error);
      switch (error.code) {
        case "auth/requires-recent-login":
          return {
            success: false,
            message: "",
            requiresReauth: true,
          };
        case "auth/weak-password":
          return {
            success: false,
            message: "⨂ Password must be at least 6 characters",
            requiresReauth: false,
          };

        case "auth/too-many-requests":
          return {
            success: false,
            message: "⨂ Too many attempts. Please try again later",
            requiresReauth: false,
          };

        case "auth/network-request-failed":
          return {
            success: false,
            message: "⨂ Network error. Check your connection",
            requiresReauth: false,
          };

        default:
          console.error(error);
          return {
            success: false,
            message: "⨂ Failed to reset password",
            requiresReauth: false,
          };
      }
    }
  };

  /* To delete account permanently */
  const deleteAccount = async (deleteMsg) => {
    /* Return if user doesn't exists */
    if (!profile.UID) return;

    /* Check for delete msg */
    if (deleteMsg !== "DELETE") {
      return {
        success: false,
        message: "⨂ Please type DELETE to confirm",
        requiresReauth: false,
      };
    }

    /* Deleting firebase account */
    try {
      await deleteUser(auth.currentUser);
    } catch (error) {
      console.log("Account deletion failed", error);
      switch (error.code) {
        case "auth/requires-recent-login":
          return {
            success: false,
            message: "",
            requiresReauth: true,
          };

        case "auth/network-request-failed":
          return {
            success: false,
            message: "⨂ Network error. Check your connection.",
            requiresReauth: false,
          };

        case "auth/too-many-requests":
          return {
            success: false,
            message: "⨂ Too many attempts. Please try again later.",
            requiresReauth: false,
          };

        case "auth/user-not-found":
          return {
            success: false,
            message: "⨂ Account not found.",
            requiresReauth: false,
          };

        default:
          console.error(error);
          return {
            success: false,
            message: "⨂ Failed to delete account.",
            requiresReauth: false,
          };
      }
    }
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
    reauthenticateUser,
    updateProfile,
    changeName,
    changeEmail,
    changePassword,
    deleteAccount,
    saveProfileMedia,
    showSavedProfileMedia,
  };
};

export default useAccount;
