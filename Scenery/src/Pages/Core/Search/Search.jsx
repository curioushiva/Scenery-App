import { useSelector } from "react-redux";
import useDiscover from "@/Utils/Hooks/useDiscover/useDiscover";
import useContent from "@/Utils/Hooks/useContent/useContent";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { RiArrowLeftUpLine, RiCloseLine, RiSearchLine } from "@remixicon/react";
import { IMG_POSTER_BASE_URL } from "@/Utils/SceneryAPI/SceneryAPI";
import { addSearchData } from "@/Utils/Redux/Slices/DiscoverSlice/DiscoverSlice";
import NoPoster from "@/Assets/Imgs/Logo/NoPoster.png";

const Search = () => {
  /* To dispatch */
  const dispatch = useDispatch();

  /* To select Name */
  const { Name } = useSelector((store) => store.account.profile);

  /* Selecting all genres  */
  const { allGenres } = useSelector((store) => store.content);

  /* Selecting search data */
  const { queryString, filterType, selectedResultTitle, selectedResult } =
    useSelector((store) => store.discover.searchData);

  /* To call for normal scenery search */
  const { getSearch } = useDiscover();

  /* To check input interacted */
  const [hasInteracted, setHasInteracted] = useState(false);

  /* To set query */
  const [query, setQuery] = useState(queryString);

  /* To store req id for each query */
  const requestId = useRef(0);

  /* To set query results */
  const [results, setResults] = useState([]);

  /* Use effect for query debounce */
  useEffect(() => {
    if (!hasInteracted) return;

    if (!query.trim()) {
      requestId.current = requestId.current + 1;
      setResults([]);
      dispatch(
        addSearchData({
          queryString: "",
          selectedResultTitle: null,
          selectedResult: [],
        }),
      );
      return;
    }
    dispatch(addSearchData({ queryString: query }));
    const timeout = setTimeout(async () => {
      requestId.current = requestId.current + 1;
      const id = requestId.current;
      const data = await getSearch(query);
      if (id !== requestId.current) return;
      setResults(data);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  /* To handle selected result */
  const handleSelectedResult = async (selecetdQuery) => {
    setResults([]);
    dispatch(addSearchData({ selectedResultTitle: selecetdQuery }));
    const data = await getSearch(selecetdQuery);
    dispatch(addSearchData({ selectedResult: data }));
  };

  /* To filter the selected results */
  const filteredResults =
    filterType === "all"
      ? selectedResult
      : selectedResult.filter((content) => {
        return content.media_type === filterType;
      });

  /* Media type (for info) */
  const { mediaType } = useContent();

  return (
    <div className="w-full navPadding">
      <div className="w-full flex flex-col gap-10">
        {/* Intro */}
        <div className="flex">
          <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
            Search
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
            . What are you searching for?
          </h1>
        </div>

        {/* Main */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-3xl flex flex-col gap-5">

            <div className="relative w-full grid grid-rows-[auto_1fr] gap-5">
              {/* Input */}
              <div className="relative w-full flex items-center">
                <RiSearchLine className="absolute left-3 text-text-secondary pointer-events-none h-4 w-4 sm:w-5 sm:h-5" />
                <input
                  value={query}
                  onChange={(e) => {
                    setHasInteracted(true);
                    setQuery(e.target.value);
                  }}
                  className="w-full text-sm sm:text-base px-10 py-3 rounded-sm border text-text-secondary border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
                  type="text"
                  placeholder="Search titles, genres, and more..."
                />
                {query && (
                  <RiCloseLine
                    onClick={() => {
                      setQuery("");
                      setHasInteracted(true);
                    }}
                    className="absolute right-3 text-text-secondary cursor-pointer h-4 w-4 sm:w-5 sm:h-5 transition duration-100 ease-in-out hover:text-text-primary"
                  />
                )}
              </div>

              {/* About */}
              {!selectedResult.length > 0 && (
                <div className="row-start-2 col-start-1 w-full flex items-center justify-center">
                  <div className="max-w-xs flex flex-col items-center gap-4">
                    <div className="w-fit flex items-center justify-center p-3 rounded-xl border border-br-primary/30">
                      <RiSearchLine className="w-4 h-4 text-text-secondary" />
                    </div>
                    <h1 className="text-sm text-text-primary/80">
                      Discover Something New
                    </h1>
                    <p className="text-xs text-center text-text-secondary">
                      Find movies, TV shows, genres and networks all in one
                      place. Start typing to explore.
                    </p>
                    <div className="flex gap-2 items-center justify-center flex-wrap">
                      <p
                        onClick={() => {
                          setQuery("Thriller");
                          setHasInteracted(true);
                        }}
                        className="text-xs text-text-secondary font-normal py-1.5 px-3 rounded-3xl cursor-pointer border-[0.5px] border-br-primary/80 transition duration-200 ease-in-out hover:text-text-primary"
                      >
                        Thriller
                      </p>
                      <p
                        onClick={() => {
                          setQuery("Action");
                          setHasInteracted(true);
                        }}
                        className="text-xs text-text-secondary font-normal py-1.5 px-3 rounded-3xl cursor-pointer border-[0.5px] border-br-primary/80 transition duration-200 ease-in-out hover:text-text-primary"
                      >
                        Action
                      </p>
                      <p
                        onClick={() => {
                          setQuery("Korean");
                          setHasInteracted(true);
                        }}
                        className="text-xs text-text-secondary font-normal py-1.5 px-3 rounded-3xl cursor-pointer border-[0.5px] border-br-primary/80 transition duration-200 ease-in-out hover:text-text-primary"
                      >
                        Korean
                      </p>
                      <p
                        onClick={() => {
                          setQuery("HBO");
                          setHasInteracted(true);
                        }}
                        className="text-xs text-text-secondary font-normal py-1.5 px-3 rounded-3xl cursor-pointer border-[0.5px] border-br-primary/80 transition duration-200 ease-in-out hover:text-text-primary"
                      >
                        HBO
                      </p>
                      <p
                        onClick={() => {
                          setQuery("Science fiction");
                          setHasInteracted(true);
                        }}
                        className="text-xs text-text-secondary font-normal py-1.5 px-3 rounded-3xl cursor-pointer border-[0.5px] border-br-primary/80 transition duration-200 ease-in-out hover:text-text-primary"
                      >
                        Sci-Fi
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div className="w-full row-start-2 col-start-1 z-10 ">
                  <div className="w-full flex flex-col border border-br-primary/30 rounded-sm divide-y divide-br-primary/30 bg-cardColor-secondary">
                    {results?.slice(0, 5)?.map((content) => {
                      return (
                        <div
                          key={content?.id}
                          onClick={() =>
                            handleSelectedResult(
                              content?.name || content?.original_title,
                            )
                          }
                          className="w-full flex items-center justify-between gap-5 py-4 px-4 cursor-pointer transition-all ease-in duration-100 active:bg-bg-whiteColor/5"
                        >
                          <h1 className="text-[10px] 280:text-xs sm:text-sm font-regular">
                            {content?.original_title || content?.name}
                          </h1>
                          <RiArrowLeftUpLine className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      );
                    })}

                    <div
                      onClick={() => handleSelectedResult(query)}
                      className="w-full flex justify-between items-center gap-5 py-3 px-4 cursor-pointer transition-all ease-in duration-100 active:bg-bg-whiteColor/5"
                    >
                      <h1 className="text-[10px] 280:text-xs font-regular text-text-secondary">
                        See all results for{" "}
                        <span className="text-text-primary">{query}</span>
                      </h1>
                      <h2 className="text-[10px] 280:text-xs font-regular text-text-sixth">
                        All results
                      </h2>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected results */}
              {selectedResult.length > 0 && (
                <div className="row-start-2 col-start-1 w-full flex flex-col justify-center gap-4">
                  {/* Filtering */}
                  <div className="w-full flex justify-between items-center gap-5 flex-wrap">
                    <h1 className="text-xs 280:text-sm sm:text-base text-text-secondary font-regular">
                      Showing{" "}
                      <span className="text-text-primary">
                        {filteredResults?.length}
                      </span>{" "}
                      results for{" "}
                      <span className="text-text-primary">
                        {selectedResultTitle}
                      </span>{" "}
                    </h1>
                    <div className="flex gap-2 flex-wrap">
                      <h1
                        onClick={() =>
                          dispatch(addSearchData({ filterType: "all" }))
                        }
                        className={`text-[10px] 280:text-xs font-medium text-nowrap px-3 py-1.25 rounded-2xl cursor-pointer border border-br-primary/20 ${filterType === "all" && "bg-bg-whiteColor/40 backdrop-blur-md"}`}
                      >
                        All
                      </h1>
                      <h1
                        onClick={() =>
                          dispatch(addSearchData({ filterType: "movie" }))
                        }
                        className={`text-[10px] 280:text-xs font-medium text-nowrap px-3 py-1.25 rounded-2xl cursor-pointer border border-br-primary/20 ${filterType === "movie" && "bg-bg-blueColor/40 backdrop-blur-md"}`}
                      >
                        Movies
                      </h1>
                      <h1
                        onClick={() =>
                          dispatch(addSearchData({ filterType: "tv" }))
                        }
                        className={`text-[10px] 280:text-xs font-medium text-nowrap px-3 py-1.25 rounded-2xl cursor-pointer border border-br-primary/20 ${filterType === "tv" && "bg-bg-yellowColor/40 backdrop-blur-md"}`}
                      >
                        TV Shows
                      </h1>
                    </div>
                  </div>
                  {/* Filtered results */}
                  {filteredResults.length > 0 && (
                    <div className="w-full flex flex-col border border-br-primary/30 rounded-sm divide-y divide-br-primary/30 bg-bg-blackColor/60">
                      {filteredResults?.map((content) => {
                        return (
                          <div
                            key={content?.id}
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
                                          content?.genre_ids?.includes(list?.id),
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
                                  className={`w-fit text-[8px] 280:text-[10px] sm:text-xs font-normal py-[0.1rem] px-[0.4em] rounded-sm ${(content.media_type === "movie" && "bg-bg-blueColor/40") || (content.media_type === "tv" && "bg-bg-yellowColor/40")}`}
                                >
                                  {(content.media_type === "movie" && "MOVIE") ||
                                    (content.media_type === "tv" && "TV")}
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

export default Search;
