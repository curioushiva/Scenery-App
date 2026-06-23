import axios from "axios";
import { IPINFO_BASE_URL } from "@/Utils/SceneryAPI/SceneryAPI";
import useContent from "../useContent/useContent";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { auth, database } from "@/Utils/Firebase/Firebase";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  setSavedMovies,
  setSavedTVShows,
  setIsProfileFetched,
  setIsUpdateProfile,
  removeAccount,
} from "@/Utils/Redux/Slices/AccountSlice/AccountSlice";
import useAccount from "../useAccount/useAccount";
import { setAuthTypedEmail } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { removeDiscover } from "@/Utils/Redux/Slices/DiscoverSlice/DiscoverSlice";

const useAppInit = () => {
  /* For dispatch, location & navigate */
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /* To access get all genre */
  const { getAllGenres } = useContent();

  /* To get user's profile */
  const profile = useSelector((store) => store.account.profile);

  /* To Sign out user */
  const { SignOut } = useAccount();

  /* To access isProfileFetched, hasEnteredBrowse & isUpdateProfile */
  const { isProfileFetched, hasEnteredBrowse, isUpdateProfile } = useSelector(
    (store) => store.account,
  );

  /* To get all genre effect */
  useEffect(() => {
    getAllGenres();
  }, []);

  /* Firebase authentication effect */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        /* If User Signed-in dispatch locally */
        console.log(user);
        dispatch(
          updateProfile({
            UID: user.uid,
            Email: user.email,
          }),
        );
      } else {
        /* Remove user & data if signout or auth change */
        SignOut();
        dispatch(setAuthTypedEmail(""));
        dispatch(removeAccount());
        dispatch(removeDiscover());
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /* Firestore profile sync effect */
  useEffect(() => {
    if (!profile?.UID) return;

    (async () => {
      const docRef = doc(database, "users", profile?.UID, "account", "profile");

      /* Fetching location first */
      let fetchedUsersLocation;
      try {
        const res = await axios.get(
          `${IPINFO_BASE_URL}${import.meta.env.VITE_IPINFO_IO_AUTH_TOKEN}`,
        );
        /* If api fails fallback to 'IN' as prime loc */
        fetchedUsersLocation = res?.data?.country || "IN";
        /* In case of some firebase failure */
        dispatch(updateProfile({ Location: fetchedUsersLocation }));
      } catch (error) {
        console.log("Location fetch failed", error);
      }

      /* Handling firestore later - updation/set */
      try {
        const docSnap = await getDoc(docRef);

        /* Update doc if exists */
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            PROFILE_EMAIL: profile?.Email,
            PROFILE_LOCATION: fetchedUsersLocation,
          });
          /* Set doc if doesn't exists */
        } else {
          await setDoc(docRef, {
            PROFILE_UID: profile?.UID,
            PROFILE_EMAIL: profile?.Email,
            PROFILE_CREDCHANGED: false,
            PROFILE_NAME: "",
            PROFILE_AVATARNUM: 0,
            PROFILE_LOCATION: fetchedUsersLocation,
            PROFILE_CREATEDAT: Date.now(),
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [profile?.UID]);

  /* Realtime profile listener effect */
  useEffect(() => {
    if (!profile?.UID) return;

    /* Fetching profile from firestore to enable realtime updations */
    const unsubGetUsersAccount = onSnapshot(
      doc(database, "users", profile?.UID, "account", "profile"),
      (snapshot) => {
        if (snapshot.exists()) {
          dispatch(
            updateProfile({
              UID: snapshot?.data()?.PROFILE_UID ?? profile.UID,
              Email: snapshot?.data()?.PROFILE_EMAIL ?? profile.Email,
              CredChanged: snapshot?.data()?.PROFILE_CREDCHANGED ?? false,
              Name: snapshot?.data()?.PROFILE_NAME ?? "",
              AvatarNum: snapshot?.data()?.PROFILE_AVATARNUM ?? 0,
              Location: snapshot?.data()?.PROFILE_LOCATION ?? profile.Location,
              CreatedAt: snapshot?.data()?.PROFILE_CREATEDAT ?? null,
            }),
          );
          dispatch(setIsProfileFetched(true));
        } else {
          dispatch(setIsProfileFetched(true));
        }
      },
    );

    return () => {
      unsubGetUsersAccount();
    };
  }, [profile?.UID]);

  /* Redirect user based on auth effect */
  useEffect(() => {
    /* Not logged in - guard these pages */
    if (!profile?.UID) {
      if (
        ![
          "/signin",
          "/signup",
          "/resetpassword",
          "/aboutus",
          "/privacy",
          "/whatsnew",
        ].includes(location.pathname)
      ) {
        navigate("/");
      }
      return;
    }

    /* Logged in - but data not fetched yet */
    if (!isProfileFetched) return;

    /* Data fetched - but did not entered browse yet */
    if (!hasEnteredBrowse) {
      /*  Name exists and not on that page too */
      if (profile?.Name && location.pathname !== "/account/choose") {
        navigate("/account/choose");
        return;
      }
      /* Name does not exists and not on that page too */
      if (!profile?.Name && location.pathname !== "/account/create") {
        navigate("/account/create");
        return;
      }
    }

    /* Entered browse already */
    if (hasEnteredBrowse) {
      /* Navigatin for different paths when both true */
      if (
        ["/", "/signin", "/signup", "/account/create"].includes(
          location.pathname,
        )
      ) {
        navigate("/browse");
        return;
      }
    }
  }, [profile?.UID, location.pathname, isProfileFetched, hasEnteredBrowse]);

  /* To set is update profile effect */
  useEffect(() => {
    if (!hasEnteredBrowse) return;
    if (isUpdateProfile) return;
    if (location.pathname.includes("/browse")) {
      dispatch(setIsUpdateProfile(true));
    }
  }, [hasEnteredBrowse, isUpdateProfile, location.pathname, dispatch]);

  /* Realtime watchlater & fav listener effect */
  useEffect(() => {
    if (!profile?.UID) return;

    /* Fetching watchLater & favourite from firestore to enable realtime updations */
    const unsubWatchLaterMovies = onSnapshot(
      collection(
        database,
        "users",
        profile?.UID,
        "account",
        "profile",
        "movies",
        "watchLater",
        "items",
      ),
      (snapshot) => {
        dispatch(
          setSavedMovies({
            type: "watchLater",
            data: snapshot.docs.map((doc) => doc.data()),
          }),
        );
      },
    );
    const unsubFavouriteMovies = onSnapshot(
      collection(
        database,
        "users",
        profile?.UID,
        "account",
        "profile",
        "movies",
        "favourite",
        "items",
      ),
      (snapshot) => {
        dispatch(
          setSavedMovies({
            type: "favourite",
            data: snapshot.docs.map((doc) => doc.data()),
          }),
        );
      },
    );

    const unsubWatchLaterTVShows = onSnapshot(
      collection(
        database,
        "users",
        profile?.UID,
        "account",
        "profile",
        "tvshows",
        "watchLater",
        "items",
      ),
      (snapshot) => {
        dispatch(
          setSavedTVShows({
            type: "watchLater",
            data: snapshot.docs.map((doc) => doc.data()),
          }),
        );
      },
    );
    const unsubFavouriteTVShows = onSnapshot(
      collection(
        database,
        "users",
        profile?.UID,
        "account",
        "profile",
        "tvshows",
        "favourite",
        "items",
      ),
      (snapshot) => {
        dispatch(
          setSavedTVShows({
            type: "favourite",
            data: snapshot.docs.map((doc) => doc.data()),
          }),
        );
      },
    );

    return () => {
      unsubWatchLaterMovies();
      unsubFavouriteMovies();
      unsubWatchLaterTVShows();
      unsubFavouriteTVShows();
    };
  }, [profile?.UID]);

  /* Poll for credentials change effect */
  useEffect(() => {
    if (!profile?.CredChanged) return;

    /* Reload after every three second */
    const interval = setInterval(async () => {
      try {
        await auth.currentUser?.reload();
      } catch (error) {
        clearInterval(interval);
      }
    }, 10000);

    /* Wait for 3 mins */
    const timeout = setTimeout(
      async () => {
        clearInterval(interval);
        try {
          await updateDoc(
            doc(database, "users", profile?.UID, "account", "profile"),
            {
              PROFILE_CREDCHANGED: false,
            },
          );
        } catch (error) {
          console.log("Credential updation failed", error);
        }
      },
      3 * 60 * 1000,
    );

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [profile?.CredChanged]);
};

export default useAppInit;
