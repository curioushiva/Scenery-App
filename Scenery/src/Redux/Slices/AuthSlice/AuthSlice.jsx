/* Authentication slice for signing up & signin the user */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usersTypedEmail: '',
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUsersTypedEmail: (state, action) => {
            state.usersTypedEmail = action.payload
        },
    }
})

export const { addUsersTypedEmail } = AuthSlice.actions;
export default AuthSlice.reducer;