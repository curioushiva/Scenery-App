import {
    SCENERY_API_BASE_URL,
    SCENERY_API_HEADERS,
} from "@/Utils/SceneryApi/SceneryApi";
import axios from "axios";

const useDiscover = () => {

    /* To get normal scenery search results */
    const getSearch = async (query) => {
        try {
            const response = await axios.get(`${SCENERY_API_BASE_URL}/search/multi?query=${query}`, {
                headers: SCENERY_API_HEADERS,
            });
            /* Returning the response */
            return response.data.results.filter(
                (item) => item.media_type === 'movie' || item.media_type === 'tv'
            );
        } catch (error) {
            console.error('Search failed:', error);
            return [];
        }
    };

    return { getSearch };
}

export default useDiscover