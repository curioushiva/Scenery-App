import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { auth, database } from "@/Utils/Firebase/Firebase";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  setSavedMovies,
  setSavedTVShows,
  setIsProfileFetched,
  removeAccount,
} from "@/Utils/Redux/Slices/AccountSlice/AccountSlice";

const useAppInit = () => {
  /* For dispatch, location & navigate */
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /* To get user's profile */
  const profile = useSelector((store) => store.account.profile);

  const account = useSelector((store) => store.account);
  console.log(account);

  /* To check if users avatar num is fetched */
  const isProfileFetched = useSelector(
    (store) => store.account.isProfileFetched,
  );

  /* Check if profile is selected once or not */
  const isProfileSelected = useSelector(
    (store) => store.account.isProfileSelected,
  );

  /* Authentication effect */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        /* If User Signed-in then dispatch user's data */
        console.log(user);
        dispatch(
          updateProfile({
            UID: user.uid,
            Email: user.email,
          }),
        );
      } else {
        /* Remove user when signed off */
        dispatch(removeAccount());
      }
    });

    /* User's Region */
    const getUsersLocation = (async () => {
      try {
        const res = await axios.get(
          `https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_IO_AUTH_TOKEN}`,
        );
        const fetchedUsersLocation = res?.data?.country;
        dispatch(updateProfile({ Location: fetchedUsersLocation }));
      } catch (error) {
        console.log("User's current region fetch failed", error);
      }
    })();
    return () => {
      unsubscribe();
    };
  }, [location.pathname]);

  /* Profile fetch effect */
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

  /* Navigation Effect */
  useEffect(() => {
    /* If user signout or doesnt exists */
    if (!profile?.UID) {
      const authRoutes = [
        "/signin",
        "/signup",
        "/aboutus",
        "/privacy",
        "/whatsnew",
      ];
      if (!authRoutes.includes(location.pathname)) {
        navigate("/");
      }
    }

    /* Check if account is fetched */
    if (isProfileFetched) {
      const authRoutes = ["/signin", "/signup", "/"];
      /* Check if profile selected */
      if (isProfileSelected) {
        if (authRoutes.includes(location.pathname)) {
          navigate("/browse");
        }
      } else {
        navigate("/account/profile");
      }
    } else {
      return;
    }
  }, [profile?.UID, isProfileFetched, isProfileSelected, location.pathname]);

  /* Watch later & favrouite fetch effect */
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
};

export default useAppInit;
