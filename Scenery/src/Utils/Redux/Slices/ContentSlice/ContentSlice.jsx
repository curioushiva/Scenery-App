/* Movies slice to stores and manages movies data */
import { createSlice } from "@reduxjs/toolkit";

/* Initial state */
const initialState = {
  /* Landing page */
  landingContent: [],

  /* All genres */
  allGenres: [],

  /* Browse page */
  browseCat: [],
  browseBGVideo: {
    video: {},
    videoKey: null,
  },

  /* Movies page */
  moviesCat: [],
  moviesBGVideo: {
    video: {},
    videoKey: null,
  },
  selectedMovieGenreIndex: null,
  moviesGenre: [],

  /* Tv shows page */
  tvShowsCat: [],
  tvShowsBGVideo: {
    video: {},
    videoKey: null,
  },
  selectedTvShowGenreIndex: null,
  tvShowsGenre: [],

  /* Popular page */
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
    /* Landing page's content */
    addLandingContent: (state, action) => {
      state.landingContent = action.payload;
    },
    /* All genres - movies and tv shows included */
    addAllGenres: (state, action) => {
      state.allGenres = action.payload;
    },
    /* Browse browse page data */
    addBrowseCat: (state, action) => {
      state.browseCat = action.payload;
    },
    /* Browse page's background video */
    addBrowseBGVideo: (state, action) => {
      state.browseBGVideo = action.payload;
    },
    /* Movies page data */
    addMoviesCat: (state, action) => {
      state.moviesCat = action.payload;
    },
    /* Movie page's background video */
    addMoviesBGVideo: (state, action) => {
      state.moviesBGVideo = action.payload;
    },
    /* Selected movie genre index */
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
    /* Tv Show page's background video */
    addTvShowsBGVideo: (state, action) => {
      state.tvShowsBGVideo = action.payload;
    },
    /* Selected Tv shows genre index */
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
  /* Landing page */
  addLandingContent,
  /* All Genres */
  addAllGenres,
  /* Browse page */
  addBrowseCat,
  addBrowseBGVideo,
  /* Movies page */
  addMoviesCat,
  addMoviesBGVideo,
  addSelectedMovieGenreIndex,
  addMoviesGenre,
  /* TV Shows page */
  addTvShowsCat,
  addTvShowsBGVideo,
  addSelectedTvShowGenreIndex,
  addTvShowsGenre,
  /* Popolar page */
  addPopularCat,
  /* Media info */
  addMediaID,
  addMediaInfo,
} = ContentSlice.actions;
export default ContentSlice.reducer;
