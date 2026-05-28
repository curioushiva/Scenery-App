/* User Slice to stores and manages authenticated user details */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: {
        usersUID: null,
        usersEmail: null,
        usersName: null,
        usersCurRegion: null,
        usersAvatarNum: 0,
        usersProfileType: null
    },
    isUsersAvatarNumFetched: false
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateAccount: (state, action) => {
            state.account = { ...state.account, ...action.payload };
        },
        setIsUsersAvatarNumFetched: (state, action) => {
            state.isUsersAvatarNumFetched = action.payload;
        },
        removeUser: () => {
            return initialState;
        },
    }
});

export const { updateAccount, setIsUsersAvatarNumFetched, removeUser } = UserSlice.actions;
export default UserSlice.reducer;

