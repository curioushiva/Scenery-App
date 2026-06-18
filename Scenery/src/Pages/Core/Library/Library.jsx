import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
  RiArrowLeftWideLine,
  RiArrowRightWideLine,
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
} from "@remixicon/react";
import { IMG_POSTER_BASE_URL } from "@/Utils/SceneryAPI/SceneryAPI";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import NoPoster from "@/Assets/Imgs/Logo/NoPoster.png";
import { Info } from "react-bootstrap-icons";
import useContent from "@/Utils/Hooks/useContent/useContent";

const Library = () => {

  /* Selecting all genres  */
  const { allGenres } = useSelector((store) => store.content);

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  /* To select Name */
  const { Name } = useSelector((store) => store.account.profile);

  /* To select saved movies & tvshows */
  const { savedMovies, savedTVShows } = useSelector(
    (store) => store.account.profile,
  );

  /* To select saved type */
  const [selectedSavedType, setSelectedSavedType] = useState('totalMovies&TVShows')

  /* To map over selected saved type */
  const mapSelectedSaved = {
    watchLaterMovies: {
      name: 'Watch Later Movies',
      data: savedMovies?.watchLater,
    },
    favouriteMovies: {
      name: 'Favourite Movies',
      data: savedMovies?.favourite
    },
    watchLaterTVShows: {
      name: 'Watch Later TV Shows',
      data: savedTVShows?.watchLater
    },
    favouriteTVShows: {
      name: 'Favourite TV Shows',
      data: savedTVShows?.favourite
    },
  };
  const selectedResult = mapSelectedSaved[selectedSavedType] || [];

  /* Media type (for info) */
  const { mediaType } = useContent();

  /* For scrolling in x */
  const wmScrollRefs = useRef({});
  const fmScrollRefs = useRef({});
  const wtScrollRefs = useRef({});
  const ftScrollRefs = useRef({});

  return (
    <div className="w-full navPadding">
      <div className="w-full flex flex-col gap-10">
        {/* Intro */}
        <div className="flex">
          <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
            My Libraray
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
            . See what you have in your library
          </h1>
        </div>

        {/* Main */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex flex-col gap-12">
            {/* Saved list */}
            <div className="w-full grid grid-cols-2 grid-rows-3 md:grid-cols-5 md:grid-rows-1 gap-4">
              <div onClick={() => setSelectedSavedType('totalMovies&TVShows')} className={`${selectedSavedType === 'totalMovies&TVShows' && "bg-bg-whiteColor/5"} row-span-1 col-span-2 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}>
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {(savedMovies?.watchLater?.length ?? 0) + (savedMovies?.favourite?.length ?? 0) + (savedTVShows?.watchLater?.length ?? 0) + (savedTVShows?.favourite?.length ?? 0)}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">Total Movies & TV Shows</h2>
              </div>

              <div onClick={() => setSelectedSavedType('watchLaterMovies')} className={`${selectedSavedType === 'watchLaterMovies' && "bg-bg-whiteColor/5"} row-span-1 col-span-1 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}>
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {(savedMovies?.watchLater?.length ?? 0)}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Watch Later Movies
                </h2>
              </div>

              <div onClick={() => setSelectedSavedType('favouriteMovies')} className={`${selectedSavedType === 'favouriteMovies' && "bg-bg-whiteColor/5"} row-span-1 col-span-1 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}>
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {(savedMovies?.favourite?.length ?? 0)}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Favourite Movies
                </h2>
              </div>

              <div onClick={() => setSelectedSavedType('watchLaterTVShows')} className={`${selectedSavedType === 'watchLaterTVShows' && "bg-bg-whiteColor/5"} row-span-1 col-span-1 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}>
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {(savedTVShows?.watchLater?.length ?? 0)}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Watch Later TV Shows
                </h2>
              </div>

              <div onClick={() => setSelectedSavedType('favouriteTVShows')} className={`${selectedSavedType === 'favouriteTVShows' && "bg-bg-whiteColor/5"} row-span-1 col-span-1 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}>
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {(savedTVShows?.favourite?.length ?? 0)}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Favourite TV Shows
                </h2>
              </div>
            </div>

            {/* Saved */}
            {selectedSavedType === 'totalMovies&TVShows' &&
              <div className="w-full flex flex-col gap-10">
                {/* Watch later movies */}
                {savedMovies?.watchLater?.length > 0 &&
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex justify-between items-center gap-4">
                      <h1 className="text-sm 310:text-base sm:text-lg font-medium">Watch Later Movies</h1>
                      <h2 onClick={() => setSelectedSavedType('watchLaterMovies')} className="text-xs 310:text-sm text-text-secondary font-regular cursor-pointer transition duration-200 ease-in-out hover:text-text-primary hover:underline">View all</h2>
                    </div>

                    <div className="relative w-full group/carousel">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          wmScrollRefs.current?.scrollBy({
                            left: -600,
                            behavior: "smooth",
                          });
                        }}
                        className="absolute flex justify-start items-center z-1 left-3 sm:left-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                      >
                        <RiArrowLeftWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          wmScrollRefs.current?.scrollBy({
                            left: 600,
                            behavior: "smooth",
                          });
                        }}
                        className="absolute flex justify-end items-center z-1 right-3 sm:right-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                      >
                        <RiArrowRightWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <div
                        ref={(el) => (wmScrollRefs.current = el)}
                        className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer"
                      >
                        {/* Filtering movies if movie have id & poster paths */}
                        {savedMovies?.watchLater?.filter(
                          (content) => content?.media?.id && content?.media?.poster_path,
                        )
                          .map((content) => (
                            <div
                              key={content?.media?.id}
                              onClick={() => mediaType(content?.media)}
                              className="relative shrink-0 group/card"
                            >
                              <div className="relative rounded-sm overflow-hidden w-34 sm:w-38 lg:w-42 aspect-2/3 transition-transform duration-300 ease-out group-hover/card:scale-95">
                                <img
                                  src={
                                    content?.media?.poster_path
                                      ? `${IMG_POSTER_BASE_URL}${content?.media?.poster_path}`
                                      : NoPoster
                                  }
                                  alt="Poster"
                                  className="absolute z-0 w-full h-full object-cover"
                                />
                                {/* About movie or show - on hover drop down */}
                                <div className="absolute z-10 bottom-0 bg-bg-blackColor/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover/card:opacity-100 transition duration-200">
                                  <div className="flex justify-between items-center">
                                    <div
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                      className="flex gap-1"
                                    >
                                      <div
                                        onClick={() =>
                                          saveProfileMedia(content?.media, "watchLater")
                                        }
                                        className="p-[0.1rem]"
                                      >
                                        {showSavedProfileMedia(
                                          content?.media,
                                          "watchLater",
                                        ) ? (
                                          <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        ) : (
                                          <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        )}
                                      </div>
                                      <div
                                        onClick={() =>
                                          saveProfileMedia(content?.media, "favourite")
                                        }
                                        className="p-[0.1rem]"
                                      >
                                        {showSavedProfileMedia(
                                          content?.media,
                                          "favourite",
                                        ) ? (
                                          <RiHeartFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-fourth" />
                                        ) : (
                                          <RiHeartLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="rounded-full text-text-secondary border p-[0.1rem]">
                                      <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 font-medium text-text-secondary">
                                    <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        ★{" "}
                                        {content?.media?.vote_average?.toFixed(1) ||
                                          "0.0"}
                                      </h1>
                                    </div>
                                    <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        {(
                                          content?.media?.release_date ||
                                          content?.media?.first_air_date
                                        )?.slice(0, 4) || "N/A"}
                                      </h1>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {content?.media?.genre_ids?.length === 0 ? (
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        Uncategorized
                                      </h1>
                                    ) : (
                                      allGenres
                                        ?.filter((list) =>
                                          content?.media?.genre_ids?.includes(list?.id),
                                        )
                                        ?.slice(0, 2)
                                        ?.map((val) => (
                                          <h1
                                            key={val?.id}
                                            className="text-xs lg:text-sm font-regular"
                                          >
                                            {val?.name === "Science Fiction"
                                              ? "Sci-Fi"
                                              : val?.name?.split(" ")[0]}
                                          </h1>
                                        ))
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                }

                {/* Favourite movies */}
                {savedMovies?.favourite?.length > 0 &&
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex justify-between items-center gap-4">
                      <h1 className="text-sm 310:text-base sm:text-lg font-medium">Favourite Movies</h1>
                      <h2 onClick={() => setSelectedSavedType('favouriteMovies')} className="text-xs 310:text-sm text-text-secondary font-regular cursor-pointer transition duration-200 ease-in-out hover:text-text-primary hover:underline">View all</h2>
                    </div>

                    <div className="relative w-full group/carousel">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          fmScrollRefs.current?.scrollBy({
                            left: -600,
                            behavior: "smooth",
                          });
                        }}
                        className="absolute flex justify-start items-center z-1 left-3 sm:left-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                      >
                        <RiArrowLeftWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          fmScrollRefs.current?.scrollBy({
                            left: 600,
                            behavior: "smooth",
                          });
                        }}
                        className="absolute flex justify-end items-center z-1 right-3 sm:right-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                      >
                        <RiArrowRightWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <div
                        ref={(el) => (fmScrollRefs.current = el)}
                        className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer"
                      >
                        {/* Filtering movies if movie have id & poster paths */}
                        {savedMovies?.favourite?.filter(
                          (content) => content?.media?.id && content?.media?.poster_path,
                        )
                          .map((content) => (
                            <div
                              key={content?.media?.id}
                              onClick={() => mediaType(content?.media)}
                              className="relative shrink-0 group/card"
                            >
                              <div className="relative rounded-sm overflow-hidden w-34 sm:w-38 lg:w-42 aspect-2/3 transition-transform duration-300 ease-out group-hover/card:scale-95">
                                <img
                                  src={
                                    content?.media?.poster_path
                                      ? `${IMG_POSTER_BASE_URL}${content?.media?.poster_path}`
                                      : NoPoster
                                  }
                                  alt="Poster"
                                  className="absolute z-0 w-full h-full object-cover"
                                />
                                {/* About movie or show - on hover drop down */}
                                <div className="absolute z-10 bottom-0 bg-bg-blackColor/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover/card:opacity-100 transition duration-200">
                                  <div className="flex justify-between items-center">
                                    <div
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                      className="flex gap-1"
                                    >
                                      <div
                                        onClick={() =>
                                          saveProfileMedia(content?.media, "watchLater")
                                        }
                                        className="p-[0.1rem]"
                                      >
                                        {showSavedProfileMedia(
                                          content?.media,
                                          "watchLater",
                                        ) ? (
                                          <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        ) : (
                                          <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        )}
                                      </div>
                                      <div
                                        onClick={() =>
                                          saveProfileMedia(content?.media, "favourite")
                                        }
                                        className="p-[0.1rem]"
                                      >
                                        {showSavedProfileMedia(
                                          content?.media,
                                          "favourite",
                                        ) ? (
                                          <RiHeartFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-fourth" />
                                        ) : (
                                          <RiHeartLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="rounded-full text-text-secondary border p-[0.1rem]">
                                      <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 font-medium text-text-secondary">
                                    <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        ★{" "}
                                        {content?.media?.vote_average?.toFixed(1) ||
                                          "0.0"}
                                      </h1>
                                    </div>
                                    <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        {(
                                          content?.media?.release_date ||
                                          content?.media?.first_air_date
                                        )?.slice(0, 4) || "N/A"}
                                      </h1>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {content?.media?.genre_ids?.length === 0 ? (
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        Uncategorized
                                      </h1>
                                    ) : (
                                      allGenres
                                        ?.filter((list) =>
                                          content?.media?.genre_ids?.includes(list?.id),
                                        )
                                        ?.slice(0, 2)
                                        ?.map((val) => (
                                          <h1
                                            key={val?.id}
                                            className="text-xs lg:text-sm font-regular"
                                          >
                                            {val?.name === "Science Fiction"
                                              ? "Sci-Fi"
                                              : val?.name?.split(" ")[0]}
                                          </h1>
                                        ))
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                }

                {/* Watch later tv shows */}
                {savedTVShows?.watchLater?.length > 0 &&
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex justify-between items-center gap-4">
                      <h1 className="text-sm 310:text-base sm:text-lg font-medium">Watch Later TV Shows</h1>
                      <h2 onClick={() => setSelectedSavedType('watchLaterTVShows')} className="text-xs 310:text-sm text-text-secondary font-regular cursor-pointer transition duration-200 ease-in-out hover:text-text-primary hover:underline">View all</h2>
                    </div>

                    <div className="relative w-full group/carousel">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          wtScrollRefs.current?.scrollBy({
                            left: -600,
                            behavior: "smooth",
                          });
                        }}
                        className="absolute flex justify-start items-center z-1 left-3 sm:left-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                      >
                        <RiArrowLeftWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          wtScrollRefs.current?.scrollBy({
                            left: 600,
                            behavior: "smooth",
                          });
                        }}
                        className="absolute flex justify-end items-center z-1 right-3 sm:right-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                      >
                        <RiArrowRightWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <div
                        ref={(el) => (wtScrollRefs.current = el)}
                        className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer"
                      >
                        {/* Filtering movies if movie have id & poster paths */}
                        {savedTVShows?.watchLater?.filter(
                          (content) => content?.media?.id && content?.media?.poster_path,
                        )
                          .map((content) => (
                            <div
                              key={content?.media?.id}
                              onClick={() => mediaType(content?.media)}
                              className="relative shrink-0 group/card"
                            >
                              <div className="relative rounded-sm overflow-hidden w-34 sm:w-38 lg:w-42 aspect-2/3 transition-transform duration-300 ease-out group-hover/card:scale-95">
                                <img
                                  src={
                                    content?.media?.poster_path
                                      ? `${IMG_POSTER_BASE_URL}${content?.media?.poster_path}`
                                      : NoPoster
                                  }
                                  alt="Poster"
                                  className="absolute z-0 w-full h-full object-cover"
                                />
                                {/* About movie or show - on hover drop down */}
                                <div className="absolute z-10 bottom-0 bg-bg-blackColor/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover/card:opacity-100 transition duration-200">
                                  <div className="flex justify-between items-center">
                                    <div
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                      className="flex gap-1"
                                    >
                                      <div
                                        onClick={() =>
                                          saveProfileMedia(content?.media, "watchLater")
                                        }
                                        className="p-[0.1rem]"
                                      >
                                        {showSavedProfileMedia(
                                          content?.media,
                                          "watchLater",
                                        ) ? (
                                          <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        ) : (
                                          <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        )}
                                      </div>
                                      <div
                                        onClick={() =>
                                          saveProfileMedia(content?.media, "favourite")
                                        }
                                        className="p-[0.1rem]"
                                      >
                                        {showSavedProfileMedia(
                                          content?.media,
                                          "favourite",
                                        ) ? (
                                          <RiHeartFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-fourth" />
                                        ) : (
                                          <RiHeartLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="rounded-full text-text-secondary border p-[0.1rem]">
                                      <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 font-medium text-text-secondary">
                                    <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        ★{" "}
                                        {content?.media?.vote_average?.toFixed(1) ||
                                          "0.0"}
                                      </h1>
                                    </div>
                                    <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        {(
                                          content?.media?.release_date ||
                                          content?.media?.first_air_date
                                        )?.slice(0, 4) || "N/A"}
                                      </h1>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {content?.media?.genre_ids?.length === 0 ? (
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        Uncategorized
                                      </h1>
                                    ) : (
                                      allGenres
                                        ?.filter((list) =>
                                          content?.media?.genre_ids?.includes(list?.id),
                                        )
                                        ?.slice(0, 2)
                                        ?.map((val) => (
                                          <h1
                                            key={val?.id}
                                            className="text-xs lg:text-sm font-regular"
                                          >
                                            {val?.name === "Science Fiction"
                                              ? "Sci-Fi"
                                              : val?.name?.split(" ")[0]}
                                          </h1>
                                        ))
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                }

                {/* Favourite tv shows */}
                {savedTVShows?.favourite?.length > 0 &&
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex justify-between items-center gap-4">
                      <h1 className="text-sm 310:text-base sm:text-lg font-medium">Favourite TV Shows</h1>
                      <h2 onClick={() => setSelectedSavedType('favouriteTVShows')} className="text-xs 310:text-sm text-text-secondary font-regular cursor-pointer transition duration-200 ease-in-out hover:text-text-primary hover:underline">View all</h2>
                    </div>

                    <div className="relative w-full group/carousel">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          ftScrollRefs.current?.scrollBy({
                            left: -600,
                            behavior: "smooth",
                          });
                        }}
                        className="absolute flex justify-start items-center z-1 left-3 sm:left-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                      >
                        <RiArrowLeftWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          ftScrollRefs.current?.scrollBy({
                            left: 600,
                            behavior: "smooth",
                          });
                        }}
                        className="absolute flex justify-end items-center z-1 right-3 sm:right-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                      >
                        <RiArrowRightWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <div
                        ref={(el) => (ftScrollRefs.current = el)}
                        className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer"
                      >
                        {/* Filtering movies if movie have id & poster paths */}
                        {savedTVShows?.favourite?.filter(
                          (content) => content?.media?.id && content?.media?.poster_path,
                        )
                          .map((content) => (
                            <div
                              key={content?.media?.id}
                              onClick={() => mediaType(content?.media)}
                              className="relative shrink-0 group/card"
                            >
                              <div className="relative rounded-sm overflow-hidden w-34 sm:w-38 lg:w-42 aspect-2/3 transition-transform duration-300 ease-out group-hover/card:scale-95">
                                <img
                                  src={
                                    content?.media?.poster_path
                                      ? `${IMG_POSTER_BASE_URL}${content?.media?.poster_path}`
                                      : NoPoster
                                  }
                                  alt="Poster"
                                  className="absolute z-0 w-full h-full object-cover"
                                />
                                {/* About movie or show - on hover drop down */}
                                <div className="absolute z-10 bottom-0 bg-bg-blackColor/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover/card:opacity-100 transition duration-200">
                                  <div className="flex justify-between items-center">
                                    <div
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                      className="flex gap-1"
                                    >
                                      <div
                                        onClick={() =>
                                          saveProfileMedia(content?.media, "watchLater")
                                        }
                                        className="p-[0.1rem]"
                                      >
                                        {showSavedProfileMedia(
                                          content?.media,
                                          "watchLater",
                                        ) ? (
                                          <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        ) : (
                                          <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        )}
                                      </div>
                                      <div
                                        onClick={() =>
                                          saveProfileMedia(content?.media, "favourite")
                                        }
                                        className="p-[0.1rem]"
                                      >
                                        {showSavedProfileMedia(
                                          content?.media,
                                          "favourite",
                                        ) ? (
                                          <RiHeartFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-fourth" />
                                        ) : (
                                          <RiHeartLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="rounded-full text-text-secondary border p-[0.1rem]">
                                      <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 font-medium text-text-secondary">
                                    <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        ★{" "}
                                        {content?.media?.vote_average?.toFixed(1) ||
                                          "0.0"}
                                      </h1>
                                    </div>
                                    <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        {(
                                          content?.media?.release_date ||
                                          content?.media?.first_air_date
                                        )?.slice(0, 4) || "N/A"}
                                      </h1>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {content?.media?.genre_ids?.length === 0 ? (
                                      <h1 className="text-xs lg:text-sm font-regular">
                                        Uncategorized
                                      </h1>
                                    ) : (
                                      allGenres
                                        ?.filter((list) =>
                                          content?.media?.genre_ids?.includes(list?.id),
                                        )
                                        ?.slice(0, 2)
                                        ?.map((val) => (
                                          <h1
                                            key={val?.id}
                                            className="text-xs lg:text-sm font-regular"
                                          >
                                            {val?.name === "Science Fiction"
                                              ? "Sci-Fi"
                                              : val?.name?.split(" ")[0]}
                                          </h1>
                                        ))
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                }
              </div>
            }

            {/* To show specific type */}
            {selectedSavedType !== 'totalMovies&TVShows' &&
              (selectedResult?.data?.length > 0 ?
                (
                  < div className="flex flex-col gap-6">
                    <div className="w-full flex flex-col gap-2">
                      <h1 className="text-lg 310:text-xl sm:text-2xl font-medium">
                        {selectedResult?.name}
                      </h1>
                      <h2 className="text-sm 210:text-base font-regular italic text-text-secondary">
                        Browse all {selectedResult?.data?.length} titles you've added to this collection.
                      </h2>
                    </div>
                    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(136px,1fr))] gap-4">
                      {selectedResult?.data?.filter(
                        (content) => content?.media?.id && content?.media?.poster_path,
                      )
                        .map((content) => (
                          <div
                            key={content?.media?.id}
                            onClick={() => mediaType(content?.media)}
                            className="group/card"
                          >
                            <div className="relative cursor-pointer transition-transform duration-300 ease-out group-hover/card:scale-95">
                              <img
                                src={
                                  content?.media?.poster_path
                                    ? `${IMG_POSTER_BASE_URL}${content?.media?.poster_path}`
                                    : NoPoster
                                }
                                alt="Poster"
                                className="w-full aspect-2/3 rounded-sm object-cover"
                              />
                              {/* About movie or show - on hover drop down */}
                              <div className="w-full flex flex-col gap-2 px-2 py-2 absolute z-10 bottom-0 bg-bg-blackColor/90 rounded-b-sm opacity-0 group-hover/card:opacity-100 transition duration-200">
                                <div className="flex justify-between items-center">
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    className="flex gap-1"
                                  >
                                    <div
                                      onClick={() =>
                                        saveProfileMedia(content?.media, "watchLater")
                                      }
                                      className="p-[0.1rem]"
                                    >
                                      {showSavedProfileMedia(
                                        content?.media,
                                        "watchLater",
                                      ) ? (
                                        <RiBookmarkFill className="w-7 h-7 text-text-secondary" />
                                      ) : (
                                        <RiBookmarkLine className="w-7 h-7 text-text-secondary" />
                                      )}
                                    </div>
                                    <div
                                      onClick={() =>
                                        saveProfileMedia(content?.media, "favourite")
                                      }
                                      className="p-[0.1rem]"
                                    >
                                      {showSavedProfileMedia(
                                        content?.media,
                                        "favourite",
                                      ) ? (
                                        <RiHeartFill className="w-7 h-7 text-text-fourth" />
                                      ) : (
                                        <RiHeartLine className="w-7 h-7 text-text-secondary" />
                                      )}
                                    </div>
                                  </div>
                                  <div className="rounded-full text-text-secondary border p-[0.1rem]">
                                    <Info className="w-5 h-5" />
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 font-medium text-text-secondary">
                                  <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                    <h1 className="text-xs font-regular">
                                      ★{" "}
                                      {content?.media?.vote_average?.toFixed(1) ||
                                        "0.0"}
                                    </h1>
                                  </div>
                                  <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                    <h1 className="text-xs font-regular">
                                      {(
                                        content?.media?.release_date ||
                                        content?.media?.first_air_date
                                      )?.slice(0, 4) || "N/A"}
                                    </h1>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {content?.media?.genre_ids?.length === 0 ? (
                                    <h1 className="text-xs font-regular">
                                      Uncategorized
                                    </h1>
                                  ) : (
                                    allGenres
                                      ?.filter((list) =>
                                        content?.media?.genre_ids?.includes(list?.id),
                                      )
                                      ?.slice(0, 2)
                                      ?.map((val) => (
                                        <h1
                                          key={val?.id}
                                          className="text-xs font-regular"
                                        >
                                          {val?.name === "Science Fiction"
                                            ? "Sci-Fi"
                                            : val?.name?.split(" ")[0]}
                                        </h1>
                                      ))
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-center items-center">
                    <div className="max-w-xs flex flex-col justify-center items-center gap-2 text-center">
                      <h1 className="text-lg 310:text-xl sm:text-2xl font-medium">
                        Your collection is empty
                      </h1>
                      <h2 className="max-w-70 text-sm 210:text-base font-regular italic text-text-secondary">
                        Start building your collection by saving movies and TV shows
                      </h2>
                    </div>
                  </div>
                )
              )}
          </div>
        </div >
      </div >
    </div >
  );
};

export default Library;
