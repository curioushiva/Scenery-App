/* User Slice to stores and manages authenticated user details */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: {
        usersUID: null,
        usersEmail: null,
        usersName: '',
        usersAvatarNum: 0,
        usersLocation: null,
        usersCreatedAt: null,
    },
    isUsersAccountFetched: false,
    isUsersProfileSelected: false,
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateAccount: (state, action) => {
            state.account = { ...state.account, ...action.payload };
        },
        setIsUsersAccountFetched: (state, action) => {
            state.isUsersAccountFetched = action.payload;
        },
        setIsUsersProfileSelected: (state, action) => {
            state.isUsersProfileSelected = action.payload;
        },
        removeUser: () => {
            return initialState;
        },
    }
});

export const { updateAccount, setIsUsersAccountFetched, setIsUsersProfileSelected, removeUser } = UserSlice.actions;
export default UserSlice.reducer;

