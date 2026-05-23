import { SCENERY_API_BASE_URL, SCENERY_API_HEADERS } from "../../Utils/SceneryApi/SceneryApi";
import axios from "axios";
import { useState, useEffect } from "react";
import { addMediaInfo } from "../../Redux/Slices/MediaSlice/MediaSlice";
import { useDispatch, useSelector } from "react-redux";
import { addSavedMovies, addSavedTVShows } from "../../Redux/Slices/MediaSlice/MediaSlice";
import { doc, setDoc } from "firebase/firestore";
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
        if (!(account?.usersUID)) return;
        /* Check if data exists if yes the dispatching user's watchlater and fav for movies & tvshows in local storage for faster access */
        if (getMediaType === "movies" && getCollectionType === "watchLater") {
            const ifExists = savedMovies?.watchLater?.some((val) => val?.media?.id === getMedia?.id)
            if (ifExists) {
                return
            } else {
                dispatch(addSavedMovies({
                    type: "watchLater",
                    data: [{
                        media: getMedia,
                        createdAt: Date.now()
                    }],
                    append: true
                }));
            };
        } else if (getMediaType === "movies" && getCollectionType === "favourite") {
            const ifExists = savedMovies?.favourite?.some((val) => val?.media?.id === getMedia?.id)
            if (ifExists) {
                return
            } else {
                dispatch(addSavedMovies({
                    type: "favourite",
                    data: [{
                        media: getMedia,
                        createdAt: Date.now()
                    }],
                    append: true
                }));
            };
        } else if (getMediaType === "tvshows" && getCollectionType === "watchLater") {
            const ifExists = savedTVShows?.watchLater?.some((val) => val?.media?.id === getMedia?.id)
            if (ifExists) {
                return
            } else {
                dispatch(addSavedTVShows({
                    type: "watchLater",
                    data: [{
                        media: getMedia,
                        createdAt: Date.now()
                    }],
                    append: true
                }));
            };
        } else if (getMediaType === "tvshows" && getCollectionType === "favourite") {
            const ifExists = savedTVShows?.favourite?.some((val) => val?.media?.id === getMedia?.id)
            if (ifExists) {
                return
            } else {
                dispatch(addSavedTVShows({
                    type: "favourite",
                    data: [{
                        media: getMedia,
                        createdAt: Date.now()
                    }],
                    append: true
                }));
            };
        }

        /* Function to save for curr user's watchlater and fav for movies & tvshows in google firebase cloud */
        try {
            await setDoc(doc(database, "users", (account?.usersUID), getMediaType, getCollectionType, "items", String(getMedia?.id)),
                {
                    media: getMedia,
                    createdAt: Date.now()
                }
            );
        } catch (error) {
            console.log("Post Media failed", error);
        }
    }

    /* returing it to be called somehwere else */
    return { getMovieInfo, getTVShowInfo, saveUsersMedia };
};

export default useMedia;