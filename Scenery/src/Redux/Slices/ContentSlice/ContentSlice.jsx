/* Movies slice to stores and manages movies data */
import { createSlice } from "@reduxjs/toolkit";

/* Initial state */
const initialState = {
    /* Home */
    homePosterData: [],

    /* All genres */
    allGenres: [],

    /* Explore */
    exploreCat: [],
    exploreBGVideo: {
        video: {},
        videoKey: null
    },

    /* Movies */
    moviesCat: [],
    moviesBGVideo: {
        video: {},
        videoKey: null
    },
    selectedMovieGenreIndex: null,
    moviesGenre: [],

    /* Tv shows */
    tvShowsCat: [],
    tvShowsBGVideo: {
        video: {},
        videoKey: null
    },
    selectedTvShowGenreIndex: null,
    tvShowsGenre: [],

    /* Popular */
    popularCat: [],
}

/* Reducers and actions */
const ContentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        /* Homepage poster data */
        addHomePosterData: (state, action) => {
            state.homePosterData = action.payload
        },
        /* All genres - movies and tv shows included */
        addAllGenres: (state, action) => {
            state.allGenres = action.payload
        },
        /* Explore browse page data */
        addExploreCat: (state, action) => {
            state.exploreCat = action.payload
        },
        /* Explore Page's Background Video */
        addExploreBGVideo: (state, action) => {
            state.exploreBGVideo = action.payload
        },
        /* Movies page data */
        addMoviesCat: (state, action) => {
            state.moviesCat = action.payload
        },
        /* Movie Page's Background Video */
        addMoviesBGVideo: (state, action) => {
            state.moviesBGVideo = action.payload
        },
        /* Selected Movie Genre Index */
        addSelectedMovieGenreIndex: (state, action) => {
            state.selectedMovieGenreIndex = action.payload
        },
        /* Movies genre */
        addMoviesGenre: (state, action) => {
            state.moviesGenre = action.payload
        },
        /* Tv shows data */
        addTvShowsCat: (state, action) => {
            state.tvShowsCat = action.payload
        },
        /* Tv Show Page's Background Video */
        addTvShowsBGVideo: (state, action) => {
            state.tvShowsBGVideo = action.payload
        },
        /* Selected Tv shows Genre Index */
        addSelectedTvShowGenreIndex: (state, action) => {
            state.selectedTvShowGenreIndex = action.payload
        },
        /* Tv shows genre */
        addTvShowsGenre: (state, action) => {
            state.tvShowsGenre = action.payload
        },
        /* Popular movies and tv shows data */
        addPopularCat: (state, action) => {
            state.popularCat = action.payload
        },

    }
});

export const {
    /* Homepage & Header */
    addHomePosterData,
    /* All Genres */
    addAllGenres,
    /* Explore */
    addExploreCat,
    addExploreBGVideo,
    /* Movies */
    addMoviesCat,
    addMoviesBGVideo,
    addSelectedMovieGenreIndex,
    addMoviesGenre,
    /* TV Shows */
    addTvShowsCat,
    addTvShowsBGVideo,
    addSelectedTvShowGenreIndex,
    addTvShowsGenre,
    /* Popolar */
    addPopularCat
} = ContentSlice.actions;
export default ContentSlice.reducer;