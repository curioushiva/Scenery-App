import { SCENERY_API_BASE_URL, SCENERY_API_HEADERS } from "../../Utils/SceneryApi/SceneryApi";
import axios from "axios";
import { useState, useEffect } from "react";
import { addMediaInfo } from "../../Redux/Slices/MediaSlice/MediaSlice";
import { useDispatch, useSelector } from "react-redux";
import { addSavedMovies, addSavedTVShows } from "../../Redux/Slices/MediaSlice/MediaSlice";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { database } from "../../Utils/Firebase/Firebase"

const useMedia = () => {
    /* To dispatch actions */
    const dispatch = useDispatch();

    /* To select saved movies & tvshows from store */
    const savedMovies = useSelector((store) => store.media.savedMovies)
    const savedTVShows = useSelector((store) => store.media.savedTVShows)

    /* User's details */
    const account = useSelector((store) => store.user.account)

    /* TV Show info data */
    const tvShowInfoData = [
        {
            type: "details",
            url: ``
        },
        {
            type: "credits",
            url: `/aggregate_credits`
        },
        {
            type: "videos",
            url: `/videos`
        },
        {
            type: "reviews",
            url: `/reviews`
        },
        {
            type: "recommendations",
            url: `/recommendations`
        },
        {
            type: "external_ids",
            url: `/external_ids`
        },
        {
            type: "watch_providers",
            url: `/watch/providers`
        },
        {
            type: "certifications",
            url: "/content_ratings"
        },
    ]

    /* Movie Info data */
    const movieInfoData = [
        {
            type: "details",
            url: ``
        },
        {
            type: "credits",
            url: `/credits`
        },
        {
            type: "videos",
            url: `/videos`
        },
        {
            type: "reviews",
            url: `/reviews`
        },
        {
            type: "recommendations",
            url: `/recommendations`
        },
        {
            type: "external_ids",
            url: `/external_ids`
        },
        {
            type: "watch_providers",
            url: `/watch/providers`
        },
        {
            type: `certifications`,
            url: "/release_dates"
        },
    ]

    /* Calling getMovieInfo */
    const getMovieInfo = async (mediaID) => {
        try {
            const responses = await Promise.allSettled(movieInfoData.map((val) => axios.get(`${SCENERY_API_BASE_URL}/movie/${mediaID}${val.url}`, { headers: SCENERY_API_HEADERS })));
            const movieInfoList = movieInfoData.reduce((acc, val, i) => {
                const res = responses[i]
                if (res.status === "fulfilled") {
                    acc[val.type] = res.value.data;
                }
                return acc;
            }, {});
            dispatch(addMediaInfo(movieInfoList));
        } catch (error) {
            console.log("Failed to fetch media info", error)
        }

    };

    /* Calling getMovieInfo */
    const getTVShowInfo = async (mediaID) => {
        try {
            const responses = await Promise.allSettled(tvShowInfoData.map((val) => axios.get(`${SCENERY_API_BASE_URL}/tv/${mediaID}${val.url}`, { headers: SCENERY_API_HEADERS })));
            const tvShowInfoList = tvShowInfoData.reduce((acc, val, i) => {
                const res = responses[i]
                if (res.status === "fulfilled") {
                    acc[val.type] = res.value.data;
                }
                return acc;
            }, {});
            dispatch(addMediaInfo(tvShowInfoList));
        } catch (error) {

        }
    };

    /* Function to save user's media */
    const saveUsersMedia = async (getMedia, getMediaType, getCollectionType) => {
        /* If user dont exists return */
        if (!(account?.usersUID)) return;

        /* Reference for media doc path */
        const mediaRef = doc(database, "users", account?.usersUID, getMediaType, getCollectionType, "items", String(getMedia?.id));

        /* Check media & collection type : 1. If exists, remove & update local and firestore : 2. If do not exists, add & update local and firestore */
        if (getMediaType === "movies") {
            if (getCollectionType === "watchLater") {
                /* 1 */
                const isMovieInWatchLater = savedMovies?.watchLater?.find((movie) => movie?.media?.id === getMedia?.id)
                if (isMovieInWatchLater) {
                    const updatedWatchLaterMovieArr = savedMovies?.watchLater?.filter((movie) => movie?.media?.id !== isMovieInWatchLater?.media?.id)
                    dispatch(addSavedMovies({
                        type: "watchLater",
                        data: updatedWatchLaterMovieArr
                    }));
                    try {
                        await deleteDoc(mediaRef);
                    } catch (error) {
                        console.log("Failed to delete movie from watch later", error);
                        /* If error , prevent updation */
                        dispatch(addSavedMovies({
                            type: "watchLater",
                            data: savedMovies?.watchLater
                        }));
                    }
                    return;
                    /* 2 */
                } else {
                    dispatch(addSavedMovies({
                        type: "watchLater",
                        data: [{
                            media: getMedia,
                            createdAt: Date.now()
                        }],
                        append: true
                    }));
                    try {
                        await setDoc(mediaRef,
                            {
                                media: getMedia,
                                createdAt: Date.now()
                            }
                        );
                    } catch (error) {
                        console.log("Failed to add movie to watch later", error);
                        /* If error , prevent updation */
                        dispatch(addSavedMovies({
                            type: "watchLater",
                            data: savedMovies?.watchLater
                        }));
                    }
                };
            }
            else if (getCollectionType === "favourite") {
                /* 1 */
                const isMovieInFavourite = savedMovies?.favourite?.find((movie) => movie?.media?.id === getMedia?.id)
                if (isMovieInFavourite) {
                    const updatedFavouriteMovieArr = savedMovies?.favourite?.filter((movie) => movie?.media?.id !== isMovieInFavourite?.media?.id)
                    dispatch(addSavedMovies({
                        type: "favourite",
                        data: updatedFavouriteMovieArr
                    }));
                    try {
                        await deleteDoc(mediaRef);
                    } catch (error) {
                        console.log("Failed to remove movie from favourite", error);
                        /* If error , prevent updation */
                        dispatch(addSavedMovies({
                            type: "favourite",
                            data: savedMovies?.favourite
                        }));
                    }
                    return;
                    /* 2 */
                } else {
                    dispatch(addSavedMovies({
                        type: "favourite",
                        data: [{
                            media: getMedia,
                            createdAt: Date.now()
                        }],
                        append: true
                    }));
                    try {
                        await setDoc(mediaRef,
                            {
                                media: getMedia,
                                createdAt: Date.now()
                            }
                        );
                    } catch (error) {
                        console.log("Failed to add movie to favourite", error);
                        /* If error , prevent updation */
                        dispatch(addSavedMovies({
                            type: "favourite",
                            data: savedMovies?.favourite
                        }));
                    }
                };
            }

        } else if (getMediaType === "tvshows") {
            if (getCollectionType === "watchLater") {
                /* 1 */
                const isTvShowInWatchLater = savedTVShows?.watchLater?.find((tvshow) => tvshow?.media?.id === getMedia?.id)
                if (isTvShowInWatchLater) {
                    const updatedWatchLaterTvShowArr = savedTVShows?.watchLater?.filter((tvShow) => tvShow?.media?.id !== isTvShowInWatchLater?.media?.id)
                    dispatch(addSavedTVShows({
                        type: "watchLater",
                        data: updatedWatchLaterTvShowArr
                    }));
                    try {
                        await deleteDoc(mediaRef);
                    } catch (error) {
                        console.log("Failed to remove TV Show from watch later", error);
                        /* If error , prevent updation */
                        dispatch(addSavedTVShows({
                            type: "watchLater",
                            data: savedTVShows?.watchLater
                        }));
                    }
                    return;
                    /* 2 */
                } else {
                    dispatch(addSavedTVShows({
                        type: "watchLater",
                        data: [{
                            media: getMedia,
                            createdAt: Date.now()
                        }],
                        append: true
                    }));
                    try {
                        await setDoc(mediaRef,
                            {
                                media: getMedia,
                                createdAt: Date.now()
                            }
                        );
                    } catch (error) {
                        console.log("Failed to add TV Show to watch later", error);
                        /* If error , prevent updation */
                        dispatch(addSavedTVShows({
                            type: "watchLater",
                            data: savedTVShows?.watchLater
                        }));
                    }
                };
            }
            else if (getCollectionType === "favourite") {
                /* 1 */
                const isInFavouriteTvShow = savedTVShows?.favourite?.find((tvShow) => tvShow?.media?.id === getMedia?.id)
                if (isInFavouriteTvShow) {
                    const updatedFavouriteTvShowArr = savedTVShows?.favourite?.filter((tvShow) => tvShow?.media?.id !== isInFavouriteTvShow?.media?.id)
                    dispatch(addSavedTVShows({
                        type: "favourite",
                        data: updatedFavouriteTvShowArr
                    }));
                    try {
                        await deleteDoc(mediaRef);
                    } catch (error) {
                        console.log("Failed to remove TV Show from favourite", error);
                        /* If error , prevent updation */
                        dispatch(addSavedTVShows({
                            type: "favourite",
                            data: savedTVShows?.favourite
                        }));
                    }
                    return;
                    /* 2 */
                } else {
                    dispatch(addSavedTVShows({
                        type: "favourite",
                        data: [{
                            media: getMedia,
                            createdAt: Date.now()
                        }],
                        append: true
                    }));
                    try {
                        await setDoc(mediaRef,
                            {
                                media: getMedia,
                                createdAt: Date.now()
                            }
                        );
                    } catch (error) {
                        console.log("Failed to add TV Show to favourite", error);
                        /* If error , prevent updation */
                        dispatch(addSavedTVShows({
                            type: "favourite",
                            data: savedTVShows?.favourite
                        }));
                    }
                };
            }
        }
    }

    /* returing it to be called somehwere else */
    return { getMovieInfo, getTVShowInfo, saveUsersMedia };
};

export default useMedia;