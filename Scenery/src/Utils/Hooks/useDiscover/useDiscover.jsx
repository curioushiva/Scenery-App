import {
  SCENERY_API_BASE_URL,
  SCENERY_API_HEADERS,
} from "@/Utils/SceneryApi/SceneryApi";
import axios from "axios";
import Groq from "groq-sdk";
import { useState } from "react";
import { addAskAIData } from "@/Utils/Redux/Slices/DiscoverSlice/DiscoverSlice";
import { useDispatch } from "react-redux";

const useDiscover = () => {
  /* To dispatch */
  const dispatch = useDispatch();

  /* To get normal scenery search results */
  const getSearch = async (query) => {
    try {
      const response = await axios.get(
        `${SCENERY_API_BASE_URL}/search/multi?query=${query}`,
        {
          headers: SCENERY_API_HEADERS,
        },
      );
      /* Returning the response */
      return response?.data?.results?.filter(
        (item) => item?.media_type === "movie" || item?.media_type === "tv",
      );
    } catch (error) {
      console.error("Search failed:", error);
      return [];
    }
  };

  /* Groq ai configuration */
  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  /* AskAI loader */
  const [askAILoader, setAskAILoader] = useState(false);

  /* AskAI error */
  const [askAIError, setAskAIError] = useState(false);

  /* To get AI recommendations & fetch data from it */
  const getAskAI = async (query) => {
    /* To get AI recommendations */
    let aiRecommendation;
    try {
      /* AskAI Init */
      dispatch(
        addAskAIData({
          mediaResults: [],
          queryString: "",
        }),
      );
      setAskAILoader(true);
      setAskAIError(false);
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a movie/TV/anime database. Respond ONLY with raw JSON, no markdown, no explanation, no text outside JSON.
                                Rules:
                                - The first character of the response must be '['.
                                - The last character of the response must be ']'.
                                - Never return newline-separated JSON objects.
                                - Never return NDJSON.
                                - If input is an exact title: return that title as the first result, rest as similar titles.
                                - If input is unrelated to movies/TV/anime: always return exactly the string INVALID without '[' and ']'
                                - Return a JSON array of up to 10 objects. Fewer is fine if not enough real titles exist.
                                - Only include titles you are highly confident exist. Never invent titles or guess years.
                                - If year is unknown, omit the field entirely. Never use 0.

                                 Each object: [{"type":"movie"|"tv","title":"exact title as known on TMDB","year":number}]`,
          },
          {
            role: "user",
            content: query,
          },
        ],
      });
      const raw = response.choices[0].message.content;
      /* Check if query is valid */
      if (raw === "INVALID") {
        setAskAILoader(false);
        setAskAIError(true);
        return;
      }
      aiRecommendation = JSON.parse(raw);
    } catch (error) {
      console.log("AI response failed", error);
      setAskAILoader(false);
      setAskAIError(true);
      return;
    }

    /* Fetch media details for AI recommendations */
    try {
      /* Fetching  */
      const responses = await Promise.allSettled(
        aiRecommendation.map((recommendation) =>
          recommendation?.type === "movie"
            ? axios.get(
                `${SCENERY_API_BASE_URL}/search/movie?query=${encodeURIComponent(
                  recommendation?.title,
                )}&year=${recommendation?.year}`,
                {
                  headers: SCENERY_API_HEADERS,
                },
              )
            : axios.get(
                `${SCENERY_API_BASE_URL}/search/tv?query=${encodeURIComponent(
                  recommendation?.title,
                )}&first_air_date_year=${recommendation?.year}`,
                {
                  headers: SCENERY_API_HEADERS,
                },
              ),
        ),
      );
      /* Returning */
      const mediaRecommendations = aiRecommendation.reduce((acc, val, i) => {
        const response = responses[i];
        if (
          response?.status === "fulfilled" &&
          response?.value?.data?.results?.[0]
        ) {
          acc.push(response?.value?.data?.results?.[0]);
        }
        return acc;
      }, []);

      /* Add askAI data */
      dispatch(
        addAskAIData({
          queryString: query,
          mediaResults: mediaRecommendations,
        }),
      );
    } catch (error) {
      console.log("Data can not be fetched", error);
      setAskAILoader(false);
      setAskAIError(true);
    } finally {
      setAskAILoader(false);
    }
  };

  return {
    /* Search */
    getSearch,

    /* AskAI */
    getAskAI,
    askAILoader,
    askAIError,
    setAskAIError,
  };
};

export default useDiscover;
