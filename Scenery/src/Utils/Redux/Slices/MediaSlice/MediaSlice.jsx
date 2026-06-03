/* Media Slice to store and manage the clicked movies and tv shows */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savedMovies: {
        watchLater: [],
        favourite: []
    },
    savedTVShows: {
        watchLater: [],
        favourite: []
    },
    mediaID: null,
    mediaInfo: {},
};

const MediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        addSavedMovies: (state, action) => {
            const { type, data, append } = action.payload;
            if (append) {
                state.savedMovies[type].push(...data);
            } else {
                state.savedMovies[type] = data;
            }
        },
        addSavedTVShows: (state, action) => {
            const { type, data, append } = action.payload;
            if (append) {
                state.savedTVShows[type].push(...data);
            } else {
                state.savedTVShows[type] = data;
            }
        },
        addMediaID: (state, action) => {
            state.mediaID = action.payload;
        },
        addMediaInfo: (state, action) => {
            state.mediaInfo = action.payload;
        },

    }
})
export const { addSavedMovies, addSavedTVShows, addMediaID, addMediaInfo } = MediaSlice.actions;
export default MediaSlice.reducer;

