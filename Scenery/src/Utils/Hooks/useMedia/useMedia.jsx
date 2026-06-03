import { SCENERY_API_BASE_URL, SCENERY_API_HEADERS } from "@/Utils/SceneryApi/SceneryApi";
import axios from "axios";
import { useNavigate } from 'react-router';
import { addMediaInfo } from "@/Utils/Redux/Slices/MediaSlice/MediaSlice";
import { useDispatch, useSelector } from "react-redux";

const useMedia = () => {

    /* To dispatch actions and navigate */
    const dispatch = useDispatch();

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

    /* Returing it for getting called from somehwere else */
    return { getMovieInfo, getTVShowInfo };
};

export default useMedia;