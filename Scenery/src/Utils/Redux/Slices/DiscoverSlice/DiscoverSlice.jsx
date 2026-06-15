/* Finder slice to stores and manage discovered data */
import { createSlice } from "@reduxjs/toolkit";

/* Initial state */
const initialState = {
    /* Search data */
    searchData: {
        queryString: '',
        filterType: 'all',
        selectedResult: [],
        selectedResultTitle: null
    },
};

/* Reducers and actions */
const DiscoverSlice = createSlice({
    name: "discover",
    initialState,
    reducers: {
        /* Add search data */
        addSearchData: (state, action) => {
            state.searchData = { ...state.searchData, ...action.payload };
        },

        /* Remove discover data */
        removeDiscover: () => {
            return initialState;
        }
    },
});

export const {
    /* Search data */
    addSearchData,
    removeDiscover

} = DiscoverSlice.actions;
export default DiscoverSlice.reducer;
