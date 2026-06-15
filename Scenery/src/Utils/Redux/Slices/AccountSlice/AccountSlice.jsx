/* Account slice to stores and manages account data  */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /* Profile fetched */
  isProfileFetched: false,
  /* Profile */
  profile: {
    UID: null,
    Email: null,
    Name: "",
    AvatarNum: 0,
    Location: null,
    CreatedAt: null,
    CredChanged: false,
    savedMovies: {
      watchLater: [],
      favourite: [],
    },
    savedTVShows: {
      watchLater: [],
      favourite: [],
    },
  },
  /* Profile selected */
  isProfileSelected: false,
};

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    /* Set Profile fetched */
    setIsProfileFetched: (state, action) => {
      state.isProfileFetched = action.payload;
    },
    /* Update profile */
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    /* Set & append saved movies */
    setSavedMovies: (state, action) => {
      const { type, data } = action.payload;
      state.profile.savedMovies[type] = data;
    },
    appendSavedMovie: (state, action) => {
      const { type, data } = action.payload;
      state.profile.savedMovies[type].push(data);
    },
    /* Set & append saved tvshows */
    setSavedTVShows: (state, action) => {
      const { type, data } = action.payload;
      state.profile.savedTVShows[type] = data;
    },
    appendSavedTVShow: (state, action) => {
      const { type, data } = action.payload;
      state.profile.savedTVShows[type].push(data);
    },
    /* Set profile selected */
    setIsProfileSelected: (state, action) => {
      state.isProfileSelected = action.payload;
    },
    /* Remove account */
    removeAccount: () => {
      return initialState;
    },
  },
});

export const {
  /* Profile fetched */
  setIsProfileFetched,
  /* Profile */
  updateProfile,
  /* Saved movies */
  setSavedMovies,
  appendSavedMovie,
  /* Saved tvshows */
  setSavedTVShows,
  appendSavedTVShow,
  /* Profile selected */
  setIsProfileSelected,
  /* Remove account */
  removeAccount,
} = AccountSlice.actions;
export default AccountSlice.reducer;
