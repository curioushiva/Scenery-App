import { useSelector } from "react-redux";
import {
  RiCloseLine,
  RiArrowRightLine,
  RiArrowRightLongLine,
} from "@remixicon/react";
import { useState, useEffect } from "react";
import useDiscover from "@/Utils/Hooks/useDiscover/useDiscover";
import { useDispatch } from "react-redux";
import { addAskAIData } from "@/Utils/Redux/Slices/DiscoverSlice/DiscoverSlice";
import { IMG_POSTER_BASE_URL } from "@/Utils/SceneryAPI/SceneryAPI";
import NoPoster from "@/Assets/Imgs/Logo/NoPoster.png";
import useContent from "@/Utils/Hooks/useContent/useContent";

const Askai = () => {
  /* For dispatch */
  const dispatch = useDispatch();

  /* To call for normal scenery search */
  const { getAskAI } = useDiscover();

  /* To select Name */
  const { Name } = useSelector((store) => store.account.profile);

  /* Selecting all genres  */
  const { allGenres } = useSelector((store) => store.content);

  /* Selecting ask AI data */
  const { queryString, mediaResults } = useSelector(
    (store) => store.discover.askAIData,
  );

  /* To set query */
  const [query, setQuery] = useState(queryString);

  /* To check is result were found */
  const [noResultsFound, setNoResultsFound] = useState(false);

  /* To handle get ask ai */
  const handelGetAskAI = async () => {
    const data = await getAskAI(query);
    if (!data) {
      setNoResultsFound(true);
      dispatch(
        addAskAIData({
          queryString: "",
          mediaResults: [],
        }),
      );
      return;
    }

    dispatch(
      addAskAIData({
        queryString: query,
        mediaResults: data,
      }),
    );
  };

  /* Use effect for cleanup */
  useEffect(() => {
    if (!query.trim()) {
      dispatch(
        addAskAIData({
          mediaResults: [],
          queryString: "",
        }),
      );
      setNoResultsFound(false);
      return;
    }
  }, [query]);

  /* Media type (for info) */
  const { mediaType } = useContent();

  return (
    <div className="w-full navPadding">
      <div className="w-full flex flex-col gap-10">
        {/* Intro */}
        <div className="flex">
          <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
            Ask AI
          </h1>
        </div>

        {/* Welcome msg */}
        <div className="flex">
          <h1 className="text-sm lg:text-base font-regular  text-text-secondary">
            Hey,
            <span className="italic font-medium text-text-primary">
              {" "}
              {Name}{" "}
            </span>
            . What's on your mind?
          </h1>
        </div>

        {/* Main */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-3xl flex flex-col gap-5">
            <div className="w-full flex flex-col gap-5">
              {/* Text area */}
              <div className="relative w-full flex-col gap-0 bg-bg-inputColor border border-br-primary/80 rounded-sm">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  maxLength={200}
                  className="w-full h-30 resize-none text-sm px-4 py-4 pr-15 280:pr-12 text-text-secondary placeholder-text-secondary focus:outline-none custom-scrollbar"
                  type="text"
                  placeholder="e.g. show me some retro funny movies from the 80s..."
                ></textarea>
                {query && (
                  <RiCloseLine
                    onClick={() => {
                      setQuery("");
                    }}
                    className="absolute top-4.5 sm:top-4 right-4 text-text-secondary cursor-pointer h-4.5 w-4.5 sm:w-5 sm:h-5 p-0.5 rounded-full bg-bg-whiteColor/20 transition duration-100 ease-in-out hover:text-text-primary"
                  />
                )}
                <div className="w-full flex justify-between items-center gap-4 flex-wrap px-4 py-4 border-t border-br-primary/40">
                  <div className="flex gap-2 items-center justify-start flex-wrap">
                    <p
                      onClick={() =>
                        setQuery("Retro funny movies from the 80s")
                      }
                      className="text-xs text-text-secondary font-normal py-0.5 md:py-1 px-3 rounded-3xl cursor-pointer border-[0.5px] border-br-primary/80 transition duration-200 ease-in-out hover:text-text-primary"
                    >
                      Retro Comedy
                    </p>
                    <p
                      onClick={() => setQuery("Underrated thriller shows")}
                      className="text-xs text-text-secondary font-normal py-0.5 md:py-1 px-3 rounded-3xl cursor-pointer border-[0.5px] border-br-primary/80 transition duration-200 ease-in-out hover:text-text-primary"
                    >
                      Underrated thrillers
                    </p>
                    <p
                      onClick={() => setQuery("Mind bending sci-fi movies")}
                      className="text-xs text-text-secondary font-normal py-0.5 md:py-1 px-3 rounded-3xl cursor-pointer border-[0.5px] border-br-primary/80 transition duration-200 ease-in-out hover:text-text-primary"
                    >
                      Sci-Fi
                    </p>
                  </div>
                  <div
                    onClick={() => handelGetAskAI()}
                    className="flex items-center justify-center gap-2 py-1 px-4 bg-btn-primary rounded-sm cursor-pointer duration-200 ease-in-out active:scale-[0.95]"
                  >
                    <h1 className="text-xs sm:text-sm font-regular">Ask</h1>
                    <RiArrowRightLine className="w-4 h-4 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Ask AI cards */}
              {!mediaResults.length > 0 && !noResultsFound && (
                <div className="w-full flex flex-col gap-4">
                  <h1 className="text-sm text-text-primary/80">TRY ASKING</h1>
                  <div className="flex flex-col gap-2">
                    <div
                      onClick={() =>
                        setQuery(
                          "Anime series worth binge watching in one weekend",
                        )
                      }
                      className="w-full flex justify-between items-center gap-4 py-3 px-4 bg-cardColor-primary border border-br-primary/40 rounded-sm cursor-pointer transition duration-200 ease-in-out group hover:bg-bg-whiteColor/5"
                    >
                      <h1 className="text-xs sm:text-sm text-text-secondary font-regular transition duration-200 ease-in-out group-hover:scale-102 group-hover:text-text-primary">
                        Anime series worth binge watching in one weekend
                      </h1>
                      <RiArrowRightLongLine className="shrink-0 w-3 h-3 sm:w-4 sm:h-4 transition duration-200 ease-in-out group-hover:scale-115" />
                    </div>

                    <div
                      onClick={() =>
                        setQuery("Dark psychological thrillers like Black Swan")
                      }
                      className="w-full flex justify-between items-center gap-4 py-3 px-4 bg-cardColor-primary border border-br-primary/40 rounded-sm cursor-pointer transition duration-200 ease-in-out group hover:bg-bg-whiteColor/5"
                    >
                      <h1 className="text-xs sm:text-sm text-text-secondary font-regular transition duration-200 ease-in-out group-hover:scale-102 group-hover:text-text-primary">
                        Dark psychological thrillers like Black Swan
                      </h1>
                      <RiArrowRightLongLine className="shrink-0 w-3 h-3 sm:w-4 sm:h-4 transition duration-200 ease-in-out group-hover:scale-115" />
                    </div>

                    <div
                      onClick={() =>
                        setQuery("Best feel good shows for a rainy day")
                      }
                      className="w-full flex justify-between items-center gap-4 py-3 px-4 bg-cardColor-primary border border-br-primary/40 rounded-sm cursor-pointer transition duration-200 ease-in-out group hover:bg-bg-whiteColor/5"
                    >
                      <h1 className="text-xs sm:text-sm text-text-secondary font-regular transition duration-200 ease-in-out group-hover:scale-102 group-hover:text-text-primary">
                        Best feel good shows for a rainy day
                      </h1>
                      <RiArrowRightLongLine className="shrink-0 w-3 h-3 sm:w-4 sm:h-4 transition duration-200 ease-in-out group-hover:scale-115" />
                    </div>

                    <div
                      onClick={() =>
                        setQuery("Underrated sci-fi movies from the 2000s")
                      }
                      className="w-full flex justify-between items-center gap-4 py-3 px-4 bg-cardColor-primary border border-br-primary/40 rounded-sm cursor-pointer transition duration-200 ease-in-out group hover:bg-bg-whiteColor/5"
                    >
                      <h1 className="text-xs sm:text-sm text-text-secondary font-regular transition duration-200 ease-in-out group-hover:scale-102 group-hover:text-text-primary">
                        Underrated sci-fi movies from the 2000s
                      </h1>
                      <RiArrowRightLongLine className="shrink-0 w-3 h-3 sm:w-4 sm:h-4 transition duration-200 ease-in-out group-hover:scale-115" />
                    </div>

                    <div
                      onClick={() =>
                        setQuery("Classic Hollywood movies from the golden era")
                      }
                      className="w-full flex justify-between items-center gap-4 py-3 px-4 bg-cardColor-primary border border-br-primary/40 rounded-sm cursor-pointer transition duration-200 ease-in-out group hover:bg-bg-whiteColor/5"
                    >
                      <h1 className="text-xs sm:text-sm text-text-secondary font-regular transition duration-200 ease-in-out group-hover:scale-102 group-hover:text-text-primary">
                        Classic Hollywood movies from the golden era
                      </h1>
                      <RiArrowRightLongLine className="shrink-0 w-3 h-3 sm:w-4 sm:h-4 transition duration-200 ease-in-out group-hover:scale-115" />
                    </div>
                  </div>
                </div>
              )}

              {/* No media recommendation found */}
              {noResultsFound && mediaResults.length <= 0 && (
                <div className="w-full flex flex-col justify-center gap-10">
                  <div className="w-full flex flex-col gap-2 border px-4 py-4 overflow-hidden bg-bg-inputColor border-br-primary/60 rounded-sm">
                    <h1 className="text-sm font-regular text-text-sixth">
                      Scenery AI
                    </h1>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      I couldn't find anything matching that. Try a different
                      description.
                    </p>
                  </div>
                </div>
              )}

              {/* Media recommendation */}
              {mediaResults.length > 0 && (
                <div className="w-full flex flex-col justify-center gap-4">
                  {/* Intro */}
                  <div className="w-full flex flex-col gap-2 border px-4 py-4 overflow-hidden bg-bg-inputColor border-br-primary/60 rounded-sm">
                    <h1 className="text-sm font-regular text-text-sixth">
                      Scenery AI
                    </h1>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      Here are
                      <span className="text-text-primary/80  font-regular">
                        {" "}
                        {mediaResults?.length}{" "}
                      </span>
                      recommendations curated for
                      <span className="text-text-primary/80 font-regular">
                        {" "}
                        "{queryString}"
                      </span>
                    </p>
                  </div>
                  <h1 className="text-xs font-regular text-text-secondary">
                    MATCHED RESULTS
                  </h1>

                  {/* Results */}
                  {mediaResults.length > 0 && (
                    <div className="w-full flex flex-col border border-br-primary/30 rounded-sm divide-y divide-br-primary/30 bg-bg-blackColor/60">
                      {mediaResults?.map((content, index) => {
                        return (
                          <div
                            key={content?.id || index}
                            onClick={() => mediaType(content)}
                            className="w-full py-2 px-4 cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/2"
                          >
                            <div className="flex flex-row gap-4">
                              <div className="w-10 280:w-12 385:w-14 shrink-0">
                                <img
                                  src={
                                    content?.poster_path
                                      ? `${IMG_POSTER_BASE_URL}${content?.poster_path}`
                                      : NoPoster
                                  }
                                  alt="poster"
                                  className="w-full h-full aspect-2/3 object-cover rounded-sm"
                                />
                              </div>
                              <div className="w-full flex flex-col 310:flex-row justify-between 310:items-center gap-2 310:gap-4">
                                <div className="w-full flex flex-col justify-center gap-1">
                                  <h1 className="text-[10px] 280:text-sm sm:text-sm font-regular">
                                    {content?.original_title || content?.name}
                                  </h1>
                                  <div className="flex gap-1 flex-wrap">
                                    <h1 className="text-[8px] 280:text-[10px] sm:text-xs font-regular text-text-secondary">
                                      {(
                                        content?.release_date ||
                                        content?.first_air_date
                                      )?.slice(0, 4) || "N/A"}
                                    </h1>
                                    <h2 className="text-[8px] 280:text-[10px] sm:text-xs font-regular text-text-secondary">
                                      ·
                                    </h2>
                                    {content?.genre_ids?.length === 0 ? (
                                      <h3 className="text-[8px] 280:text-[10px] sm:text-xs font-regular text-text-secondary">
                                        Uncategorized
                                      </h3>
                                    ) : (
                                      allGenres
                                        ?.filter((list) =>
                                          content?.genre_ids?.includes(
                                            list?.id,
                                          ),
                                        )
                                        ?.slice(0, 2)
                                        ?.map((val) => (
                                          <h3
                                            key={val?.id}
                                            className="text-[8px] 280:text-[10px] sm:text-xs font-regular text-text-secondary"
                                          >
                                            {val?.name === "Science Fiction"
                                              ? "Sci-Fi"
                                              : val?.name?.split(" ")[0]}
                                          </h3>
                                        ))
                                    )}
                                  </div>
                                </div>
                                <h1
                                  className={`w-fit text-[8px] 280:text-[10px] sm:text-xs font-normal py-[0.1rem] px-[0.4em] rounded-sm ${content.original_title ? "bg-bg-blueColor/40" : "bg-bg-yellowColor/40"}`}
                                >
                                  {content.original_title ? "Movie" : "TV"}
                                </h1>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Askai;
