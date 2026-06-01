import React, { useEffect, useState } from 'react';
import { SCENERY_API_BASE_URL, SCENERY_API_HEADERS } from '@/Utils/SceneryAPI/SceneryAPI';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  addHomePosterData,
  addAllGenres,
  addExploreCat,
  addExploreBGVideo,
  addMoviesCat,
  addMoviesBGVideo,
  addMoviesGenre,
  addTvShowsCat,
  addTvShowsBGVideo,
  addTvShowsGenre,
  addPopularCat
} from '@/Utils/Redux/Slices/ContentSlice/ContentSlice';

const useContent = () => {

  /* To disptach data in ContentSlice */
  const dispatch = useDispatch();
  /* Selected genre index for movies & Tv Shows */
  const selectedMovieGenreIndex = useSelector((store) => store.content.selectedMovieGenreIndex)
  const selectedTvShowGenreIndex = useSelector((store) => store.content.selectedTvShowGenreIndex)
  /* User's Current Region */
  const usersCurRegion = useSelector((store) => store.user.account.usersCurRegion)

  /* Date today  */
  const today = new Date().toISOString().split("T")[0];

  /* Data for movies & tv genre */
  const genreData = [
    {
      type: "movies",
      url: "/genre/movie/list?language=en"
    },
    {
      type: "tvshows",
      url: "/genre/tv/list?language=en"
    },
  ]

  /* Data for explore categories */
  const exploreCatData = [
    {
      type: "adventure",
      title: "Epic Adventures",
      url: "/discover/movie?with_genres=12&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "scifi",
      title: "Future & Sci-Fi Worlds",
      url: "/discover/movie?with_genres=878&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "thriller",
      title: "Edge-of-Seat Thrillers",
      url: "/discover/movie?with_genres=53&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "tvDrama",
      title: "TV Drama Stories",
      url: "/discover/tv?with_genres=18&sort_by=popularity.desc"
    },
    {
      type: "crime",
      title: "Crime & Underworld Stories",
      url: "/discover/movie?with_genres=80&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "animation",
      title: "Animated Adventures",
      url: "/discover/movie?with_genres=16&sort_by=popularity.desc&vote_count.gte=100"
    },
    {
      type: "fantasy",
      title: "Fantasy Realms",
      url: "/discover/movie?with_genres=14&sort_by=popularity.desc&vote_count.gte=150"
    },
    {
      type: "mystery",
      title: "Mind-Bending Mysteries",
      url: "/discover/movie?with_genres=9648&sort_by=popularity.desc&vote_count.gte=150"
    },
    {
      type: "drama",
      title: "Powerful Drama Stories",
      url: "/discover/movie?with_genres=18&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "family",
      title: "Family Watch Together",
      url: "/discover/movie?with_genres=10751&sort_by=popularity.desc&vote_count.gte=100"
    },
    {
      type: "romance",
      title: "Love & Romance",
      url: "/discover/movie?with_genres=10749&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "tvPopular",
      title: "Binge-Worthy Series",
      url: "/discover/tv?sort_by=popularity.desc&vote_count.gte=100"
    },
    {
      type: "comedy",
      title: "Laugh Out Loud",
      url: "/discover/movie?with_genres=35&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "horror",
      title: "Nightmare Fuel",
      url: "/discover/movie?with_genres=27&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "mindgames",
      title: "Twists & Mind Games",
      url: "/discover/movie?with_genres=9648,53&vote_average.gte=7&vote_count.gte=300"
    },
    {
      type: "dark",
      title: "Dark & Gritty",
      url: "/discover/movie?with_genres=18,53&vote_average.gte=7&vote_count.gte=300"
    },
    {
      type: "feelgood",
      title: "Feel-Good Vibes",
      url: "/discover/movie?with_genres=35,10749&vote_average.gte=6&vote_count.gte=200"
    },
    {
      type: "critically",
      title: "Critics’ Favorites",
      url: "/discover/movie?sort_by=vote_average.desc&vote_count.gte=2000"
    },
    {
      type: "underrated",
      title: "Hidden Gems",
      url: "/discover/movie?sort_by=vote_average.desc&vote_count.gte=100&vote_count.lte=500"
    },
    {
      type: "tvScifi",
      title: "Sci-Fi & Fantasy Series",
      url: "/discover/tv?with_genres=10765&sort_by=popularity.desc"
    }
  ];

  /* Data for Movies categories */
  const moviesCatData = [
    {
      type: "nowPlaying",
      title: "Now Playing",
      url: "/movie/now_playing"
    },
    {
      type: "popularMovies",
      title: "Top Popular Movies",
      url: "/discover/movie?sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "topRated",
      title: "Top Rated Movies",
      url: "/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000"
    },
    {
      type: "recentHits",
      title: "Recent Hits",
      url: "/discover/movie?primary_release_date.gte=2024-01-01&sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "upcoming",
      title: "Coming Soon",
      url: "/movie/upcoming"
    },
    {
      type: "actionBlockbusters",
      title: "Action Blockbusters",
      url: "/discover/movie?with_genres=28&sort_by=popularity.desc&vote_count.gte=300"
    },
    {
      type: "criticallyAcclaimed",
      title: "Critically Acclaimed",
      url: "/discover/movie?sort_by=vote_average.desc&vote_count.gte=2000"
    }
  ];

  /* Data for Movies Genre */
  const moviesGenreData = [
    {
      genre: "Action",
      key: "action",
      genreMovies: [
        {
          type: "blockbusters",
          title: "High-Octane Blockbusters",
          url: "/discover/movie?with_genres=28&sort_by=popularity.desc&vote_count.gte=300"
        },
        {
          type: "military",
          title: "Military Action",
          url: "/discover/movie?with_genres=28&with_keywords=9715&sort_by=popularity.desc"
        },
        {
          type: "martial",
          title: "Martial Arts Action",
          url: "/discover/movie?with_genres=28&with_keywords=779&sort_by=popularity.desc"
        },
        {
          type: "heist",
          title: "Heist Action",
          url: "/discover/movie?with_genres=28,80&sort_by=popularity.desc"
        },
        {
          type: "superhero",
          title: "Superhero Action",
          url: "/discover/movie?with_genres=28,878&sort_by=popularity.desc"
        },
        {
          type: "revenge",
          title: "Revenge Action",
          url: "/discover/movie?with_genres=28,53&sort_by=popularity.desc"
        }
      ]
    },

    {
      genre: "Comedy",
      key: "comedy",
      genreMovies: [
        {
          type: "popular",
          title: "Laugh-Out-Loud Hits",
          url: "/discover/movie?with_genres=35&sort_by=popularity.desc&vote_count.gte=200"
        },
        {
          type: "romcom",
          title: "Romantic Comedies",
          url: "/discover/movie?with_genres=35,10749&sort_by=popularity.desc"
        },
        {
          type: "dark",
          title: "Dark Comedy",
          url: "/discover/movie?with_genres=35&vote_average.gte=6.5&sort_by=vote_average.desc"
        },
        {
          type: "family",
          title: "Family Comedy",
          url: "/discover/movie?with_genres=35,10751&sort_by=popularity.desc"
        },
        {
          type: "satire",
          title: "Satire & Parody",
          url: "/discover/movie?with_genres=35&with_keywords=10397"
        },
        {
          type: "feelgood",
          title: "Feel-Good Comedy",
          url: "/discover/movie?with_genres=35&vote_average.gte=6"
        }
      ]
    },

    {
      genre: "Drama",
      key: "drama",
      genreMovies: [
        {
          type: "top",
          title: "Emotional Masterpieces",
          url: "/discover/movie?with_genres=18&vote_average.gte=7.5&vote_count.gte=500"
        },
        {
          type: "real",
          title: "Inspired by Real Events",
          url: "/discover/movie?with_genres=18&with_keywords=9672"
        },
        {
          type: "family",
          title: "Family Drama",
          url: "/discover/movie?with_genres=18,10751"
        },
        {
          type: "coming",
          title: "Coming of Age",
          url: "/discover/movie?with_genres=18&with_keywords=155"
        },
        {
          type: "romantic",
          title: "Romantic Drama",
          url: "/discover/movie?with_genres=18,10749"
        },
        {
          type: "award",
          title: "Award-Winning Drama",
          url: "/discover/movie?with_genres=18&vote_average.gte=8&vote_count.gte=2000"
        }
      ]
    },

    {
      genre: "Thriller",
      key: "thriller",
      genreMovies: [
        {
          type: "psych",
          title: "Psychological Thrillers",
          url: "/discover/movie?with_genres=53&vote_average.gte=7"
        },
        {
          type: "crime",
          title: "Crime Thrillers",
          url: "/discover/movie?with_genres=53,80"
        },
        {
          type: "survival",
          title: "Survival Thrillers",
          url: "/discover/movie?with_genres=53&with_keywords=971"
        },
        {
          type: "political",
          title: "Political Thrillers",
          url: "/discover/movie?with_genres=53&with_keywords=398"
        },
        {
          type: "mystery",
          title: "Mystery Thrillers",
          url: "/discover/movie?with_genres=53,9648"
        },
        {
          type: "twists",
          title: "Twist Endings",
          url: "/discover/movie?with_genres=53&vote_average.gte=7.2"
        }
      ]
    },

    {
      genre: "Sci-Fi",
      key: "scifi",
      genreMovies: [
        {
          type: "space",
          title: "Space Adventures",
          url: "/discover/movie?with_genres=878&with_keywords=9951"
        },
        {
          type: "ai",
          title: "AI & Robots",
          url: "/discover/movie?with_genres=878&with_keywords=310"
        },
        {
          type: "time",
          title: "Time Travel",
          url: "/discover/movie?with_genres=878&with_keywords=4379"
        },
        {
          type: "dystopian",
          title: "Dystopian Futures",
          url: "/discover/movie?with_genres=878&with_keywords=4565"
        },
        {
          type: "alien",
          title: "Alien Encounters",
          url: "/discover/movie?with_genres=878&with_keywords=146"
        },
        {
          type: "scifiAction",
          title: "Sci-Fi Action",
          url: "/discover/movie?with_genres=878,28"
        }
      ]
    },

    {
      genre: "Crime",
      key: "crime",
      genreMovies: [
        {
          type: "gangster",
          title: "Gangster Stories",
          url: "/discover/movie?with_genres=80"
        },
        {
          type: "detective",
          title: "Detective Cases",
          url: "/discover/movie?with_genres=80,9648"
        },
        {
          type: "heist",
          title: "Heist Movies",
          url: "/discover/movie?with_genres=80,28"
        },
        {
          type: "courtroom",
          title: "Courtroom Drama",
          url: "/discover/movie?with_genres=80,18"
        },
        {
          type: "truecrime",
          title: "True Crime",
          url: "/discover/movie?with_genres=80&vote_average.gte=7"
        },
        {
          type: "underworld",
          title: "Underworld Crime",
          url: "/discover/movie?with_genres=80&vote_count.gte=300"
        }
      ]
    },

    {
      genre: "Romance",
      key: "romance",
      genreMovies: [
        {
          type: "classic",
          title: "Timeless Love Stories",
          url: "/discover/movie?with_genres=10749&vote_average.gte=7"
        },
        {
          type: "modern",
          title: "Modern Romance",
          url: "/discover/movie?with_genres=10749&sort_by=popularity.desc"
        },
        {
          type: "romcom",
          title: "Romantic Comedy",
          url: "/discover/movie?with_genres=10749,35"
        },
        {
          type: "drama",
          title: "Romantic Drama",
          url: "/discover/movie?with_genres=10749,18"
        },
        {
          type: "sad",
          title: "Heartbreak Stories",
          url: "/discover/movie?with_genres=10749&vote_average.gte=6.5"
        },
        {
          type: "feelgood",
          title: "Feel-Good Romance",
          url: "/discover/movie?with_genres=10749&vote_count.gte=200"
        }
      ]
    },

    {
      genre: "Fantasy",
      key: "fantasy",
      genreMovies: [
        {
          type: "epic",
          title: "Epic Fantasy",
          url: "/discover/movie?with_genres=14&vote_count.gte=300"
        },
        {
          type: "magic",
          title: "Magic & Wizards",
          url: "/discover/movie?with_genres=14&with_keywords=818"
        },
        {
          type: "myth",
          title: "Mythology",
          url: "/discover/movie?with_genres=14&with_keywords=9717"
        },
        {
          type: "dark",
          title: "Dark Fantasy",
          url: "/discover/movie?with_genres=14,53"
        },
        {
          type: "adventure",
          title: "Fantasy Adventure",
          url: "/discover/movie?with_genres=14,12"
        },
        {
          type: "fairytale",
          title: "Fairytale Stories",
          url: "/discover/movie?with_genres=14,10751"
        }
      ]
    },

    {
      genre: "Horror",
      key: "horror",
      genreMovies: [
        {
          type: "supernatural",
          title: "Supernatural Horror",
          url: "/discover/movie?with_genres=27"
        },
        {
          type: "psych",
          title: "Psychological Horror",
          url: "/discover/movie?with_genres=27&vote_average.gte=6.5"
        },
        {
          type: "slasher",
          title: "Slasher Horror",
          url: "/discover/movie?with_genres=27&with_keywords=12377"
        },
        {
          type: "possession",
          title: "Possession & Haunted",
          url: "/discover/movie?with_genres=27&with_keywords=615"
        },
        {
          type: "creature",
          title: "Creature Horror",
          url: "/discover/movie?with_genres=27&with_keywords=282"
        },
        {
          type: "survival",
          title: "Survival Horror",
          url: "/discover/movie?with_genres=27,53"
        }
      ]
    },

    {
      genre: "Anime",
      key: "anime",
      genreMovies: [
        {
          type: "top",
          title: "Top Anime Picks",
          url: "/discover/movie?with_genres=16&with_original_language=ja&vote_average.gte=7"
        },
        {
          type: "action",
          title: "Action Anime",
          url: "/discover/movie?with_genres=16,28&with_original_language=ja"
        },
        {
          type: "scifi",
          title: "Sci-Fi Anime",
          url: "/discover/movie?with_genres=16,878&with_original_language=ja"
        },
        {
          type: "romance",
          title: "Romantic Anime",
          url: "/discover/movie?with_genres=16,10749&with_original_language=ja"
        },
        {
          type: "fantasy",
          title: "Fantasy Anime",
          url: "/discover/movie?with_genres=16,14&with_original_language=ja"
        },
        {
          type: "popular",
          title: "Popular Anime Movies",
          url: "/discover/movie?with_genres=16&with_original_language=ja&sort_by=popularity.desc"
        }
      ]
    }
  ];

  /* Data for Tv Shows categories */
  const tvShowsCatData = [
    {
      type: "airingNow",
      title: "Currently Airing",
      url: "/tv/on_the_air"
    },
    {
      type: "popularTvShows",
      title: "Top Popular TV Shows",
      url: "/discover/tv?sort_by=popularity.desc&vote_count.gte=100"
    },
    {
      type: "topRatedShows",
      title: "Top Rated Series",
      url: "/discover/tv?sort_by=vote_average.desc&vote_count.gte=500"
    },
    {
      type: "trendingShows",
      title: "Trending Series",
      url: "/trending/tv/day"
    },
    {
      type: "recentShows",
      title: "New Episodes & Releases",
      url: `/discover/tv?first_air_date.gte=${today}&sort_by=popularity.desc&vote_count.gte=50`
    },
    {
      type: "bingeWorthy",
      title: "Binge-Worthy Series",
      url: "/discover/tv?sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "limitedSeries",
      title: "Limited Series",
      url: "/discover/tv?with_type=2&sort_by=popularity.desc&vote_count.gte=50"
    }
  ];

  /* Data for Tv Shows Genre */
  const tvShowsGenreData = [
    {
      genre: "Action",
      key: "action",
      genreTvShows: [
        {
          type: "blockbusters",
          title: "Action-Packed Blockbusters",
          url: "/discover/tv?with_genres=10759&sort_by=popularity.desc&vote_count.gte=200"
        },
        {
          type: "binge",
          title: "Binge-Worthy Action",
          url: "/discover/tv?with_genres=10759&vote_count.gte=300"
        },
        {
          type: "crime",
          title: "Action Crime Series",
          url: "/discover/tv?with_genres=10759,80"
        },
        {
          type: "scifi",
          title: "Sci-Fi Action Shows",
          url: "/discover/tv?with_genres=10759,10765"
        },
        {
          type: "dark",
          title: "Dark Action Stories",
          url: "/discover/tv?with_genres=10759,18"
        },
        {
          type: "adventure",
          title: "Adventure Action",
          url: "/discover/tv?with_genres=10759&sort_by=popularity.desc"
        }
      ]
    },

    {
      genre: "Comedy",
      key: "comedy",
      genreTvShows: [
        {
          type: "popular",
          title: "Comedy Hits",
          url: "/discover/tv?with_genres=35&sort_by=popularity.desc"
        },
        {
          type: "binge",
          title: "Binge-Worthy Comedy",
          url: "/discover/tv?with_genres=35&vote_count.gte=300"
        },
        {
          type: "romcom",
          title: "Romantic Comedy Series",
          url: "/discover/tv?with_genres=35,10749"
        },
        {
          type: "dark",
          title: "Dark Comedy",
          url: "/discover/tv?with_genres=35&vote_average.gte=6.5"
        },
        {
          type: "family",
          title: "Family Comedy Shows",
          url: "/discover/tv?with_genres=35,10751"
        },
        {
          type: "feelgood",
          title: "Feel-Good Comedy",
          url: "/discover/tv?with_genres=35&vote_average.gte=6"
        }
      ]
    },

    {
      genre: "Drama",
      key: "drama",
      genreTvShows: [
        {
          type: "top",
          title: "Top Drama Series",
          url: "/discover/tv?with_genres=18&vote_average.gte=7.5"
        },
        {
          type: "popular",
          title: "Popular Drama Shows",
          url: "/discover/tv?with_genres=18&sort_by=popularity.desc"
        },
        {
          type: "romantic",
          title: "Romantic Drama",
          url: "/discover/tv?with_genres=18,10749"
        },
        {
          type: "crime",
          title: "Crime Drama",
          url: "/discover/tv?with_genres=18,80"
        },
        {
          type: "binge",
          title: "Binge-Worthy Drama",
          url: "/discover/tv?with_genres=18&vote_count.gte=500"
        },
        {
          type: "award",
          title: "Critically Acclaimed Drama",
          url: "/discover/tv?with_genres=18&vote_count.gte=1000"
        }
      ]
    },

    {
      genre: "Thriller",
      key: "thriller",
      genreTvShows: [
        {
          type: "trending",
          title: "Trending Thrillers",
          url: "/trending/tv/day"
        },
        {
          type: "popular",
          title: "Popular Thriller Shows",
          url: "/discover/tv?with_genres=53&sort_by=popularity.desc"
        },
        {
          type: "crime",
          title: "Crime Thrillers",
          url: "/discover/tv?with_genres=80&sort_by=popularity.desc"
        },
        {
          type: "mystery",
          title: "Mystery Thrillers",
          url: "/discover/tv?with_genres=9648&sort_by=popularity.desc"
        },
        {
          type: "binge",
          title: "Binge-Worthy Thrillers",
          url: "/discover/tv?sort_by=popularity.desc&vote_count.gte=200"
        },
        {
          type: "top",
          title: "Top Thriller Series",
          url: "/discover/tv?with_genres=53&vote_count.gte=300"
        }
      ]
    },

    {
      genre: "Sci-Fi",
      key: "scifi",
      genreTvShows: [
        {
          type: "popular",
          title: "Sci-Fi Hits",
          url: "/discover/tv?with_genres=10765&sort_by=popularity.desc"
        },
        {
          type: "binge",
          title: "Binge-Worthy Sci-Fi",
          url: "/discover/tv?with_genres=10765&vote_count.gte=300"
        },
        {
          type: "future",
          title: "Futuristic Worlds",
          url: "/discover/tv?with_genres=10765"
        },
        {
          type: "dystopian",
          title: "Dystopian Series",
          url: "/discover/tv?with_genres=10765&vote_count.gte=200"
        },
        {
          type: "fantasy",
          title: "Sci-Fi & Fantasy",
          url: "/discover/tv?with_genres=10765,14"
        },
        {
          type: "action",
          title: "Sci-Fi Action",
          url: "/discover/tv?with_genres=10765,10759"
        }
      ]
    },

    {
      genre: "Crime",
      key: "crime",
      genreTvShows: [
        {
          type: "popular",
          title: "Crime Hits",
          url: "/discover/tv?with_genres=80&sort_by=popularity.desc"
        },
        {
          type: "binge",
          title: "Binge-Worthy Crime",
          url: "/discover/tv?with_genres=80&vote_count.gte=300"
        },
        {
          type: "detective",
          title: "Detective Series",
          url: "/discover/tv?with_genres=80,9648"
        },
        {
          type: "gangster",
          title: "Gangster Stories",
          url: "/discover/tv?with_genres=80"
        },
        {
          type: "dark",
          title: "Dark Crime",
          url: "/discover/tv?with_genres=80,53"
        },
        {
          type: "truecrime",
          title: "True Crime Series",
          url: "/discover/tv?with_genres=80&vote_average.gte=7"
        }
      ]
    },

    {
      genre: "Romance",
      key: "romance",
      genreTvShows: [
        {
          type: "popular",
          title: "Romantic Series",
          url: "/discover/tv?with_genres=10749"
        },
        {
          type: "binge",
          title: "Binge-Worthy Romance",
          url: "/discover/tv?with_genres=10749&vote_count.gte=200"
        },
        {
          type: "drama",
          title: "Romantic Drama",
          url: "/discover/tv?with_genres=10749,18"
        },
        {
          type: "comedy",
          title: "Romantic Comedy Shows",
          url: "/discover/tv?with_genres=10749,35"
        },
        {
          type: "modern",
          title: "Modern Love Stories",
          url: "/discover/tv?with_genres=10749&sort_by=popularity.desc"
        },
        {
          type: "feelgood",
          title: "Feel-Good Romance",
          url: "/discover/tv?with_genres=10749&vote_average.gte=6"
        }
      ]
    },

    {
      genre: "Fantasy",
      key: "fantasy",
      genreTvShows: [
        {
          type: "epic",
          title: "Epic Fantasy Series",
          url: "/discover/tv?with_genres=10765"
        },
        {
          type: "popular",
          title: "Popular Fantasy Shows",
          url: "/discover/tv?with_genres=10765&sort_by=popularity.desc"
        },
        {
          type: "dark",
          title: "Dark Fantasy",
          url: "/discover/tv?with_genres=10765,53"
        },
        {
          type: "adventure",
          title: "Fantasy Adventure",
          url: "/discover/tv?with_genres=10765,10759"
        },
        {
          type: "magic",
          title: "Magic & Supernatural",
          url: "/discover/tv?with_genres=10765,14"
        },
        {
          type: "family",
          title: "Fantasy for All Ages",
          url: "/discover/tv?with_genres=10765,10751"
        }
      ]
    },

    {
      genre: "Horror",
      key: "horror",
      genreTvShows: [
        {
          type: "supernatural",
          title: "Supernatural Horror",
          url: "/discover/tv?with_genres=10765,9648&sort_by=popularity.desc"
        },
        {
          type: "dark",
          title: "Dark Horror Series",
          url: "/discover/tv?with_genres=53,9648&vote_count.gte=100"
        },
        {
          type: "psych",
          title: "Psychological Horror",
          url: "/discover/tv?with_genres=53&vote_count.gte=150"
        },
        {
          type: "mystery",
          title: "Mystery Horror",
          url: "/discover/tv?with_genres=9648"
        },
        {
          type: "binge",
          title: "Binge-Worthy Horror",
          url: "/discover/tv?with_genres=53,10765&sort_by=popularity.desc"
        },
        {
          type: "popular",
          title: "Popular Dark Series",
          url: "/discover/tv?with_genres=53,10765&vote_count.gte=200"
        }
      ]
    },

    {
      genre: "Anime",
      key: "anime",
      genreTvShows: [
        {
          type: "top",
          title: "Top Anime Series",
          url: "/discover/tv?with_genres=16&with_original_language=ja&vote_average.gte=7"
        },
        {
          type: "popular",
          title: "Popular Anime Shows",
          url: "/discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc"
        },
        {
          type: "action",
          title: "Action Anime",
          url: "/discover/tv?with_genres=16,10759&with_original_language=ja"
        },
        {
          type: "scifi",
          title: "Sci-Fi Anime",
          url: "/discover/tv?with_genres=16,10765&with_original_language=ja"
        },
        {
          type: "romance",
          title: "Romantic Anime",
          url: "/discover/tv?with_genres=16,10749&with_original_language=ja"
        },
        {
          type: "fantasy",
          title: "Fantasy Anime",
          url: "/discover/tv?with_genres=16,14&with_original_language=ja"
        }
      ]
    }
  ];

  /* Data for popular */
  const popularCatData = [
    {
      type: "nowPlaying",
      title: "Now Playing",
      url: "/movie/now_playing"
    },
    {
      type: "popularMovies",
      title: "Top Popular Movies",
      url: "/discover/movie?sort_by=popularity.desc&vote_count.gte=200"
    },
    {
      type: "upcomingMovies",
      title: "Upcoming Movies",
      url: `/discover/movie?primary_release_date.gte=${today}&sort_by=primary_release_date.asc`
    },
    {
      type: "popularTvShows",
      title: "Top Popular TV Shows",
      url: "/discover/tv?sort_by=popularity.desc&vote_count.gte=100"
    },
    {
      type: "upcomingShows",
      title: "Upcoming Shows",
      url: `/discover/tv?first_air_date.gte=${today}&sort_by=first_air_date.asc`
    },
  ];

  /* Function to get Background Video availability */
  const getBackgroundVideo = async (getVideoList) => {
    const validBackgroundVideo = getVideoList.find((val) => val.backdrop_path);
    try {
      const mediaType = validBackgroundVideo.name ? "tv" : "movie";
      const responses = await axios.get(`${SCENERY_API_BASE_URL}/${mediaType}/${validBackgroundVideo.id}/videos`, { headers: SCENERY_API_HEADERS })
      const primaryVideoAsset = responses.data.results.find(val => val.type === "Trailer" && val.site === "YouTube") || responses.data.results.find(val => val.type === "Teaser" && val.site === "YouTube");
      const primaryVideoKey = primaryVideoAsset?.key;
      let validBackgroundVideoKey = null;
      if (primaryVideoKey && usersCurRegion) {
        const checkVideo = async (primaryVideoKey) => {
          const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos`,
            {
              params: {
                part: "status,contentDetails",
                id: primaryVideoKey,
                regionCode: usersCurRegion,
                key: `${import.meta.env.VITE_YOUTUBE_V3_AUTH_TOKEN}`
              }
            }
          );
          const video = data.items?.[0];
          if (!video) return null;
          const ageRestricted = video.contentDetails?.contentRating?.ytRating === "ytAgeRestricted";
          const embeddable = video.status?.embeddable;
          const processing = video.status?.uploadStatus === "processing";
          if (ageRestricted || !embeddable || processing) return null;
          return primaryVideoKey;
        };
        validBackgroundVideoKey = await checkVideo(primaryVideoKey);
      }
      return { video: validBackgroundVideo, videoKey: validBackgroundVideoKey };
    } catch (error) {
      console.error(error);
      return { video: validBackgroundVideo, videoKey: validBackgroundVideoKey };
    }
  }

  /* Function to get homepage data */
  const getHomePosterData = async () => {
    try {
      const responses = await axios.get(`${SCENERY_API_BASE_URL}/movie/popular`, { headers: SCENERY_API_HEADERS })
      responses.data.results && dispatch(addHomePosterData(responses.data.results));
    } catch (error) {
      console.error(error);
    }
  };

  /* Function to call movies & tv shows genres */
  const getAllGenres = async () => {
    try {
      const responses = await Promise.allSettled(genreData.map((val) =>
        axios.get(`${SCENERY_API_BASE_URL}${val.url}`, { headers: SCENERY_API_HEADERS })
      ));
      const genresList = responses.reduce((acc, res) => {
        if (res.status === "fulfilled") {
          res.value.data.genres.forEach(genre => {
            const exists = acc.find(item => item.id === genre.id);
            if (!exists) {
              acc.push(genre);
            }
          });
        }
        return acc;
      }, []);
      dispatch(addAllGenres(genresList));
    } catch (error) {
      console.error(error);
    }
  };

  /* Function to call explore page's categorie */
  const getExploreCat = async () => {
    try {
      const responses = await Promise.allSettled(exploreCatData.map((cat) =>
        axios.get(`${SCENERY_API_BASE_URL}${cat.url}`, { headers: SCENERY_API_HEADERS })
      ));

      /* To get & dispatch explore content */
      const exploreCatList = exploreCatData.reduce((acc, categorie, i) => {
        const res = responses[i];
        if (res.status === "fulfilled") {
          acc.push({
            type: categorie.type,
            title: categorie.title,
            content: res.value.data.results
          });
        }
        return acc;
      }, []);
      dispatch(addExploreCat(exploreCatList));

      /* Calling get Background Video */
      if (exploreCatList) {
        const checkExploreCatList = exploreCatList[0].content;
        const resultedBackgroundVideo = await getBackgroundVideo(checkExploreCatList);
        dispatch(addExploreBGVideo(resultedBackgroundVideo));
      };
    } catch (error) {
      console.error(error);
    };
  };

  /* Function to call movie page's categorie */
  const getMoviesCat = async () => {
    try {
      const responses = await Promise.allSettled(moviesCatData.map((cat) =>
        axios.get(`${SCENERY_API_BASE_URL}${cat.url}`, { headers: SCENERY_API_HEADERS })
      ));

      const moviesCatList = moviesCatData.reduce((acc, val, i) => {
        const res = responses[i];
        if (res.status === "fulfilled") {
          acc.push({
            type: val.type,
            title: val.title,
            movies: res.value.data.results
          });
        }
        return acc;
      }, []);
      dispatch(addMoviesCat(moviesCatList));

      /* Calling get Background Video */
      if (moviesCatList) {
        const checkMovieCatList = moviesCatList[0].movies;
        const resultedBackgroundVideo = await getBackgroundVideo(checkMovieCatList);
        dispatch(addMoviesBGVideo(resultedBackgroundVideo));
      };

    } catch (error) {
      console.error(error);
    }
  };

  /* Function to movie's of diff genre categorie */
  const getMoviesGenre = async (selectedMovieGenreIndex) => {
    try {
      const responses = await Promise.allSettled(moviesGenreData[selectedMovieGenreIndex].genreMovies.map((cat) =>
        axios.get(`${SCENERY_API_BASE_URL}${cat.url}`, { headers: SCENERY_API_HEADERS })
      ));

      const moviesGenreList = moviesGenreData[selectedMovieGenreIndex].genreMovies.reduce((acc, val, i) => {
        const res = responses[i];
        if (res.status === "fulfilled") {
          acc.push({
            type: val.type,
            title: val.title,
            movies: res.value.data.results
          });
        }
        return acc;
      }, []);

      if (moviesGenreList) {
        const selectedMovieGenre = [{
          genre: moviesGenreData[selectedMovieGenreIndex].genre,
          key: moviesGenreData[selectedMovieGenreIndex].key,
          genreMovies: moviesGenreList
        }]
        dispatch(addMoviesGenre(selectedMovieGenre))
      }
      /* Calling get Background Video */
      if (moviesGenreList) {
        const checkMoviesGenreList = moviesGenreList[0].movies;
        const resultedBackgroundVideo = await getBackgroundVideo(checkMoviesGenreList);
        dispatch(addMoviesBGVideo(resultedBackgroundVideo));
      };
    } catch (error) {
      console.error(error);
    }
  };

  /* Function to call TV SHows page's categorie */
  const getTvShowsCat = async () => {
    try {
      const responses = await Promise.allSettled(tvShowsCatData.map((cat) =>
        axios.get(`${SCENERY_API_BASE_URL}${cat.url}`, { headers: SCENERY_API_HEADERS })
      ));

      const tvShowsCatList = tvShowsCatData.reduce((acc, val, i) => {
        const res = responses[i];
        if (res.status === "fulfilled") {
          acc.push({
            type: val.type,
            title: val.title,
            tvShows: res.value.data.results
          });
        }
        return acc;
      }, []);
      dispatch(addTvShowsCat(tvShowsCatList));

      /* Calling get Background Video */
      if (tvShowsCatList) {
        const checkTvShowsCatList = tvShowsCatList[0].tvShows;
        const resultedBackgroundVideo = await getBackgroundVideo(checkTvShowsCatList);
        dispatch(addTvShowsBGVideo(resultedBackgroundVideo));
      };
    } catch (error) {
      console.error(error);
    }
  };

  /* Function to tvshows's of diff genre categorie */
  const getTvShowsGenre = async (selectedTvShowGenreIndex) => {
    try {
      const responses = await Promise.allSettled(tvShowsGenreData[selectedTvShowGenreIndex].genreTvShows.map((cat) =>
        axios.get(`${SCENERY_API_BASE_URL}${cat.url}`, { headers: SCENERY_API_HEADERS })
      ));
      const tvShowsGenreList = tvShowsGenreData[selectedTvShowGenreIndex].genreTvShows.reduce((acc, val, i) => {
        const res = responses[i];
        if (res.status === "fulfilled") {
          acc.push({
            type: val.type,
            title: val.title,
            tvShows: res.value.data.results
          });
        }
        return acc;
      }, []);
      if (tvShowsGenreList) {
        const selectedTvShowGenre = [{
          genre: tvShowsGenreData[selectedTvShowGenreIndex].genre,
          key: tvShowsGenreData[selectedTvShowGenreIndex].key,
          genreTvShows: tvShowsGenreList
        }]
        dispatch(addTvShowsGenre(selectedTvShowGenre));
      }

      /* Calling get Background Video */
      if (tvShowsGenreList) {
        const checkTvShowsGenreList = tvShowsGenreList[0].tvShows;
        const resultedBackgroundVideo = await getBackgroundVideo(checkTvShowsGenreList);
        dispatch(addTvShowsBGVideo(resultedBackgroundVideo));
      };

    } catch (error) {
      console.error(error);
    }
  };

  /* Function to get new & popular */
  const getPopularCat = async () => {
    try {
      const responses = await Promise.allSettled(popularCatData.map((cat) =>
        axios.get(`${SCENERY_API_BASE_URL}${cat.url}`, { headers: SCENERY_API_HEADERS })
      ));

      const popularCatList = popularCatData.reduce((acc, val, i) => {
        const res = responses[i];
        if (res.status === "fulfilled") {
          acc.push({
            type: val.type,
            title: val.title,
            content: res.value.data.results,
          });
        }
        return acc;
      }, []);
      dispatch(addPopularCat(popularCatList));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getHomePosterData,
    getExploreCat,
    getAllGenres,
    getMoviesCat,
    moviesGenreData,
    getMoviesGenre,
    getTvShowsCat,
    tvShowsGenreData,
    getTvShowsGenre,
    getPopularCat
  };
}

export default useContent;