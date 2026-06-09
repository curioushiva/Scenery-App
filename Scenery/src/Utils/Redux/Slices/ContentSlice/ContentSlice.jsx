/* Movies slice to stores and manages movies data */
import { createSlice } from "@reduxjs/toolkit";

/* Initial state */
const initialState = {
  /* Home */
  landingPosterData: [],

  /* All genres */
  allGenres: [],

  /* Browse */
  browseCat: [],
  browseBGVideo: {
    video: {},
    videoKey: null,
  },

  /* Movies */
  moviesCat: [],
  moviesBGVideo: {
    video: {},
    videoKey: null,
  },
  selectedMovieGenreIndex: null,
  moviesGenre: [],

  /* Tv shows */
  tvShowsCat: [],
  tvShowsBGVideo: {
    video: {},
    videoKey: null,
  },
  selectedTvShowGenreIndex: null,
  tvShowsGenre: [],

  /* Popular */
  popularCat: [],

  /* Media info */
  mediaID: null,
  mediaInfo: {},
};

/* Reducers and actions */
const ContentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    /* Landingpage poster data */
    addLandingPosterData: (state, action) => {
      state.landingPosterData = action.payload;
    },
    /* All genres - movies and tv shows included */
    addAllGenres: (state, action) => {
      state.allGenres = action.payload;
    },
    /* Browse browse page data */
    addBrowseCat: (state, action) => {
      state.browseCat = action.payload;
    },
    /* Browse Page's Background Video */
    addBrowseBGVideo: (state, action) => {
      state.browseBGVideo = action.payload;
    },
    /* Movies page data */
    addMoviesCat: (state, action) => {
      state.moviesCat = action.payload;
    },
    /* Movie Page's Background Video */
    addMoviesBGVideo: (state, action) => {
      state.moviesBGVideo = action.payload;
    },
    /* Selected Movie Genre Index */
    addSelectedMovieGenreIndex: (state, action) => {
      state.selectedMovieGenreIndex = action.payload;
    },
    /* Movies genre */
    addMoviesGenre: (state, action) => {
      state.moviesGenre = action.payload;
    },
    /* Tv shows data */
    addTvShowsCat: (state, action) => {
      state.tvShowsCat = action.payload;
    },
    /* Tv Show Page's Background Video */
    addTvShowsBGVideo: (state, action) => {
      state.tvShowsBGVideo = action.payload;
    },
    /* Selected Tv shows Genre Index */
    addSelectedTvShowGenreIndex: (state, action) => {
      state.selectedTvShowGenreIndex = action.payload;
    },
    /* Tv shows genre */
    addTvShowsGenre: (state, action) => {
      state.tvShowsGenre = action.payload;
    },
    /* Popular movies and tv shows data */
    addPopularCat: (state, action) => {
      state.popularCat = action.payload;
    },
    /* Media id and media info */
    addMediaID: (state, action) => {
      state.mediaID = action.payload;
    },
    addMediaInfo: (state, action) => {
      state.mediaInfo = action.payload;
    },
  },
});

export const {
  /* Landingpage & Header */
  addLandingPosterData,
  /* All Genres */
  addAllGenres,
  /* Browse */
  addBrowseCat,
  addBrowseBGVideo,
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
  addPopularCat,
  /* Media info */
  addMediaID,
  addMediaInfo,
} = ContentSlice.actions;
export default ContentSlice.reducer;
