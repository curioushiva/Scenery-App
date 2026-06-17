import useContent from "@/Utils/Hooks/useContent/useContent";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import {
  IMG_POSTER_BASE_URL,
  IMG_HERO_BACKDROP_BASE_URL,
  IMG_HERO_POSTER_BASE_URL,
} from "@/Utils/SceneryAPI/SceneryAPI";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RiAddFill,
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
  RiPlayFill,
  RiCalendarEventLine,
  RiSlideshowView,
  RiFilmAiLine,
  RiPlayLargeFill,
  RiChatQuoteLine,
  RiMovie2Line,
  RiHashtag,
  RiInstagramLine,
  RiFacebookLine,
  RiTwitterXLine,
  RiFilmLine,
  RiGlobalLine,
  RiCloseFill,
  RiSlideshow4Line,
  RiVideoLine,
  RiHourglass2Line,
  RiCheckboxMultipleLine,
  RiArrowUpWideLine,
  RiArrowDownWideLine,
  RiArrowLeftWideLine,
  RiArrowRightWideLine,
} from "@remixicon/react";
import { Info, Wikipedia } from "react-bootstrap-icons";
import NoProfile from "@/Assets/Imgs/Avatars/NoProfile.png";
import NoProvider from "@/Assets/Imgs/Logo/NoProvider.png";
import NoStudio from "@/Assets/Imgs/Logo/NoStudio.png";
import NoPoster from "@/Assets/Imgs/Logo/NoPoster.png";
import NoBackdrop from "@/Assets/Imgs/Logo/NoBackdrop.png";
import { useParams } from "react-router";
import { addMediaID } from "@/Utils/Redux/Slices/ContentSlice/ContentSlice";

const TVShowInfo = () => {
  /* To dispatch and navigate */
  const dispatch = useDispatch();

  /* Using and calling Media ID from URLs */
  const { mediaID } = useParams();
  const mediaIDFromURL = Number(mediaID);

  /* Get tvshow info */
  const { getTVShowInfo } = useContent();

  /* Calling to get tvshow info data */
  useEffect(() => {
    getTVShowInfo(mediaIDFromURL);
    dispatch(addMediaID(mediaIDFromURL));
  }, [mediaIDFromURL]);

  /* Selecting mediainfo for tvshows here */
  const mediaInfo = useSelector((store) => store.content.mediaInfo);

  /* Selecting all genres */
  const allGenres = useSelector((store) => store.content.allGenres);

  /* Selcing profile location */
  const Location = useSelector((store) => store.account.profile.Location);

  /* Media type (for info) */
  const { mediaType } = useContent();

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  /* Certification check */
  const mediaCertification = mediaInfo?.certifications?.results?.find(
    (val) => val.iso_3166_1 === Location,
  )?.rating;

  /* Check for director or creater's name */
  const findCreator = (() => {
    if (mediaInfo?.details?.created_by?.length > 0) {
      return mediaInfo?.details?.created_by?.map((person) => person.name);
    } else {
      return null;
    }
  })();

  /* Check for Video trailers */
  const videoArray = mediaInfo?.videos?.results;
  const videoTrailer = (() => {
    if (videoArray?.length === 0) {
      return null;
    } else {
      return videoArray
        ?.filter((val) => val.type === "Trailer" && val.site === "YouTube")
        ?.map((video) => video);
    }
  })();

  /* Play Trailer Video Key */
  const [playTrailerVideoKey, setPlayTrailerVideoKey] = useState(null);

  /* Getting Play Trailer Video Key initially */
  const playTrailerInitialVideoKey = (() => {
    if (videoArray?.length > 0 && videoTrailer?.length > 0) {
      return videoTrailer?.map((val) => {
        return val;
      });
    }
  })();

  /* To Show trailer */
  const [showTrailer, setShowTrailer] = useState(false);
  useEffect(() => {
    if (showTrailer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showTrailer]);

  /* To set the section one type */
  const [sectionOneType, setSectionOneType] = useState(null);

  /* Networks check */
  const NetworkProvider = (() => {
    const results = mediaInfo?.details?.networks;
    if (results?.length > 0) {
      return results?.map((network) => network);
    } else {
      return null;
    }
  })();

  /* To set the section two type */
  const [sectionTwoType, setSectionTwoType] = useState(null);

  const regionalWatchProvider = (() => {
    const results = mediaInfo?.watch_providers?.results;
    if (!results || Object.keys(results).length === 0) {
      return null;
    }
    const watchProvidersArr = Object.entries(results).map(([key, value]) => ({
      country: key,
      watchProviders: value,
    }));
    return watchProvidersArr.find((val) => val.country === Location) || null;
  })();

  /* Watch Providers for Below Poster Check */
  const regionalWatchProviderType =
    regionalWatchProvider?.watchProviders?.buy ||
    regionalWatchProvider?.watchProviders?.flatrate ||
    regionalWatchProvider?.watchProviders ||
    regionalWatchProvider?.watchProviders?.ads ||
    regionalWatchProvider?.watchProviders?.free;
  const regionalWatchProviderFirstValue = (() => {
    if (regionalWatchProviderType?.length > 0) {
      return regionalWatchProviderType?.map((val) => val);
    } else {
      return null;
    }
  })();

  /* Media's Socials Check */
  const mediasSocialsCheck =
    mediaInfo?.external_ids?.facebook_id ||
    mediaInfo?.external_ids?.imdb_id ||
    mediaInfo?.external_ids?.instagram_id ||
    mediaInfo?.external_ids?.twitter_id ||
    mediaInfo?.external_ids?.wikidata_id ||
    mediaInfo?.details?.homepage !== "";

  /* For scrolling in x */
  const recScrollRefs = useRef({});
  const castScrollRefs = useRef({});

  /* Rendering on the basis of avail of mediaInfo */
  return Object.keys(mediaInfo).length === 0 ? (
    <div className="w-full min-h-screen relative overflow-x-hidden"></div>
  ) : (
    /* Main Container */
    <div className="w-full min-h-screen relative  overflow-x-hidden">
      {showTrailer && (
        <div className="fixed inset-0 z-5000 w-full h-full overflow-y-auto bg-bg-blackColor/95">
          <div className="min-h-full flex justify-center items-center py-10 px-8 lg:px-20">
            <div className="w-full max-w-5xl flex flex-col gap-3 bg-bg-blackColor/20 rounded-2xl border-[0.1px] border-br-primary backdrop-blur-md">
              <div className="flex justify-between items-center p-4 sm:p-5 border-b border-br-primary">
                <h1 className="text-lg sm:text-2xl font-medium">
                  {playTrailerInitialVideoKey?.[0]?.name
                    ? playTrailerInitialVideoKey?.[0]?.name
                    : "Official Video"}
                </h1>
                <div
                  onClick={() => setShowTrailer(false)}
                  className="flex justify-center items-center w-9 h-9 p-2 rounded-full bg-bg-bg-whiteColorcolor/90 font-bold text-text-ternary cursor-pointer active:scale-95"
                >
                  <RiCloseFill />
                </div>
              </div>
              <div className="p-2 sm:p-4">
                <div className="relative w-full max-h-[60vh] aspect-video overflow-hidden rounded-xl bg-bg-blackColor">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${playTrailerVideoKey}?autoplay=1&modestbranding=1`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Media */}
      {mediaInfo?.details?.backdrop_path && (
        <div className="absolute z-0 w-full h-[75dvh] min-h-100 overflow-hidden">
          <img
            className="absolute z-0 inset-0 w-full h-full object-cover object-top"
            src={`${IMG_HERO_BACKDROP_BASE_URL}${mediaInfo?.details?.backdrop_path}`}
            alt="Background"
          />
          {/* Fades top & bottoms */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-bg-coreColor/10 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-bg-coreColor via-bg-coreColor/10 to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-bg-coreColor via-bg-coreColor/40 to-transparent" />
        </div>
      )}

      {/* Media Info */}
      <div className="relative flex flex-col gap-10 pt-30 p-8">
        {mediaInfo?.details && (
          <div className="w-full h-full flex flex-col gap-12">
            {/* Part 1 & 2 */}
            <div className="w-full h-full flex flex-col gap-12 items-stretch 880:flex-row">
              {/* Part 1 : Media Poster */}
              <div className="hidden w-full flex-col shrink-0 880:flex 880:w-[18rem]">
                <img
                  src={
                    mediaInfo?.details?.poster_path
                      ? `${IMG_HERO_POSTER_BASE_URL}${mediaInfo?.details?.poster_path}`
                      : NoPoster
                  }
                  alt="Poster"
                  className={`w-full flex-1 min-h-0 aspect-4/5 object-cover ${regionalWatchProviderFirstValue?.length > 0 ? "rounded-t-sm" : "rounded-sm"}`}
                />
                {regionalWatchProviderFirstValue?.length > 0 && (
                  <div className="w-full flex justify-center items-center gap-3 bg-bg-blackColor py-3 rounded-b-sm">
                    <img
                      src={
                        regionalWatchProviderFirstValue?.[0]?.logo_path
                          ? `${IMG_POSTER_BASE_URL}${regionalWatchProviderFirstValue?.[0]?.logo_path}`
                          : NoProvider
                      }
                      alt="streamingLogo"
                      className="w-11 rounded-lg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-sm text-text-secondary">
                        Now Streaming
                      </h1>
                      <h2 className="text-sm font-medium">Watch Now</h2>
                    </div>
                  </div>
                )}
              </div>

              {/* Part 2 : Genric Info */}
              <div className="flex flex-col gap-4 max-w-2xl">
                <h1 className="text-3xl font-medium sm:text-4xl">
                  {mediaInfo?.details?.name || "N/A"}
                </h1>
                <div className="flex items-center flex-wrap text-sm gap-2">
                  {/* Certification */}
                  {mediaCertification && (
                    <h2 className="text-text-secondary border rounded-sm px-1.5 whitespace-nowrap">
                      {mediaCertification}
                    </h2>
                  )}

                  {/* Release / First Air Date - for movies & tv shows & Origin country */}
                  {(mediaInfo?.details?.first_air_date ||
                    mediaInfo?.details?.origin_country?.[0]) && (
                    <div className="flex gap-1">
                      <span>
                        {mediaInfo?.details?.first_air_date?.slice(0, 4)}
                      </span>
                      {mediaInfo?.details?.origin_country?.[0] && (
                        <span>({mediaInfo?.details?.origin_country?.[0]})</span>
                      )}
                    </div>
                  )}

                  {/* Genres */}
                  {mediaInfo?.details?.genres?.length > 0 && (
                    <div className="flex gap-2">
                      <h2>•</h2>
                      {mediaInfo?.details?.genres?.slice(0, 2)?.map((val) => (
                        <h2 key={val.id}>
                          {val?.name === "Science Fiction"
                            ? "Sci-Fi"
                            : val?.name?.split(" ")[0]}
                        </h2>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ratings and Votes */}
                {(mediaInfo?.details?.vote_average !== null ||
                  mediaInfo?.details?.vote_count !== null) && (
                  <div className="flex gap-2 items-center text-base">
                    {mediaInfo?.details?.vote_average !== null && (
                      <h3 className="font-medium">
                        <span className="text-text-fifth">★ </span>
                        {mediaInfo?.details?.vote_average?.toFixed(1) || "N/A"}
                      </h3>
                    )}

                    {mediaInfo?.details?.vote_count !== null && (
                      <h3 className="text-sm">
                        ({`${mediaInfo?.details?.vote_count} Votes`})
                      </h3>
                    )}
                  </div>
                )}

                {/* Tagline */}
                {mediaInfo?.details?.tagline && (
                  <h4 className="italic text-text-secondary ">
                    {mediaInfo?.details?.tagline}
                  </h4>
                )}

                {/* Overview */}
                {mediaInfo?.details?.overview && (
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-medium">Overview</h1>
                    <p className="text-sm sm:text-base">
                      {mediaInfo?.details?.overview}
                    </p>
                  </div>
                )}

                {/* Director or Creater */}
                {findCreator?.length > 0 && (
                  <div className="max-w-2xl flex gap-x-10 gap-y-5 flex-wrap items-center pt-4 text-base cursor-pointer">
                    {findCreator?.length > 0 &&
                      findCreator?.map((creator, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() =>
                              creator &&
                              mediaInfo?.details?.name &&
                              window.open(
                                `https://www.google.com/search?q=${creator}+creator+of+${mediaInfo?.details?.name}`,
                              )
                            }
                            target="_blank"
                            className="flex flex-col gap-1"
                          >
                            <h1 className="text-base font-semibold underline">
                              {creator}
                            </h1>
                            <p className="text-sm text-text-primary/90">
                              Creater
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Trailer, Watch later & fav */}
                <div className="flex gap-4 pt-5 flex-wrap 430:flex-nowrap">
                  {/* Play video trailer */}
                  {videoTrailer?.length > 0 && (
                    <div
                      onClick={() => {
                        setPlayTrailerVideoKey(
                          playTrailerInitialVideoKey?.[0]?.key,
                        );
                        setShowTrailer(true);
                      }}
                      className="w-full flex justify-center items-center gap-1 bg-btn-primary pl-2 pr-3 py-2 rounded cursor-pointer active:scale-95"
                    >
                      <RiPlayFill />
                      <span className="font-semibold whitespace-nowrap">
                        Play Trailer
                      </span>
                    </div>
                  )}
                  <div className="w-full flex gap-4 flex-wrap 295:flex-nowrap">
                    {/* Watch later - saved to google cloud firebase */}
                    <div
                      onClick={() =>
                        saveProfileMedia(mediaInfo?.details, "watchLater")
                      }
                      className="w-full flex justify-center items-center gap-2 border border-br-secondary/60 pl-2 pr-3 py-2 rounded cursor-pointer active:scale-95"
                    >
                      {showSavedProfileMedia(
                        mediaInfo?.details,
                        "watchLater",
                      ) ? (
                        <>
                          <RiCheckboxMultipleLine />
                          <span className="font-semibold">Saved</span>
                        </>
                      ) : (
                        <>
                          <RiAddFill />
                          <span className="font-semibold whitespace-nowrap">
                            Watch Later
                          </span>
                        </>
                      )}
                    </div>

                    {/* Add to fav - saved to google cloud firebase */}
                    <div
                      onClick={() =>
                        saveProfileMedia(mediaInfo?.details, "favourite")
                      }
                      className="w-full flex justify-center items-center gap-2 border border-br-secondary/60 px-3 py-2 rounded cursor-pointer active:scale-95"
                    >
                      {showSavedProfileMedia(
                        mediaInfo?.details,
                        "favourite",
                      ) ? (
                        <RiHeartFill className="w-[1.80rem] h-[1.80rem] text-text-fourth" />
                      ) : (
                        <RiHeartLine className="w-[1.80rem] h-[1.80rem] text-text-secondary" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 3 : More about tv show */}
            <div className="w-full flex flex-col gap-5 880:flex-row 880:gap-10">
              {/* First air date */}
              {mediaInfo?.details?.first_air_date && (
                <div className="w-full flex gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] 880:justify-center">
                  <div className="flex justify-center items-center">
                    <RiCalendarEventLine className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm font-medium whitespace-nowrap">
                      Release Date
                    </h1>
                    <h2 className="text-base">
                      {mediaInfo?.details?.first_air_date?.replaceAll(
                        "-",
                        "/",
                      ) || "N/A"}
                    </h2>
                  </div>
                </div>
              )}

              {/* Total seasons */}
              <div className="w-full flex gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
                <div className="flex justify-center items-center">
                  <RiSlideshowView className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-medium">Seasons</h1>
                  <h2 className="text-base">
                    {mediaInfo?.details?.number_of_seasons
                      ? `${mediaInfo?.details?.number_of_seasons}`
                      : "N/A"}
                  </h2>
                </div>
              </div>

              {/* Total Episodes */}
              <div className="w-full flex gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
                <div className="flex justify-center items-center">
                  <RiVideoLine className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-medium">Episodes</h1>
                  <h2 className="text-base">
                    {mediaInfo?.details?.number_of_episodes
                      ? `${mediaInfo?.details?.number_of_episodes}`
                      : "N/A"}
                  </h2>
                </div>
              </div>

              {/* Status */}
              {mediaInfo?.details?.status && (
                <div className="w-full flex gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
                  <div className="flex justify-center items-center">
                    <RiFilmAiLine className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm font-medium">Status</h1>
                    <h2 className="text-base">{mediaInfo?.details?.status}</h2>
                  </div>
                </div>
              )}
            </div>

            {/* Part 4 : Top Cast */}
            {mediaInfo?.credits?.cast?.length > 0 && (
              <div className="w-full flex flex-col gap-5">
                <div className="font-medium text-xl">
                  <h1>Top Cast</h1>
                </div>
                <div className="relative w-full group/carousel">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      castScrollRefs.current?.scrollBy({
                        left: -600,
                        behavior: "smooth",
                      });
                    }}
                    className="absolute flex justify-start items-center z-1 left-3 sm:left-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                  >
                    <RiArrowLeftWideLine className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      castScrollRefs.current?.scrollBy({
                        left: 600,
                        behavior: "smooth",
                      });
                    }}
                    className="absolute flex justify-end items-center z-1 right-3 sm:right-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                  >
                    <RiArrowRightWideLine className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <div
                    ref={castScrollRefs}
                    className="grid grid-flow-col auto-cols-[10rem] gap-4 overflow-x-auto no-scrollbar items-stretch"
                  >
                    {mediaInfo?.credits?.cast?.slice(0, 20)?.map((cast) => {
                      const castRoles =
                        cast?.roles?.length > 0
                          ? cast?.roles
                              ?.slice(0, 1)
                              ?.map((roles) => roles?.character)
                              ?.join(", ")
                          : null;
                      const query =
                        cast?.name && castRoles && mediaInfo?.details?.name
                          ? encodeURIComponent(
                              `${cast?.name} as ${castRoles} of ${mediaInfo?.details?.name}`,
                            )?.replace(/%20/g, "+")
                          : null;
                      return (
                        <div
                          onClick={() =>
                            query &&
                            window.open(
                              `https://www.google.com/search?q=${query}`,
                              "_blank",
                            )
                          }
                          target="_blank"
                          key={cast?.id}
                          className="cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out h-full flex flex-col"
                        >
                          <img
                            src={
                              cast?.profile_path
                                ? `${IMG_POSTER_BASE_URL}${cast?.profile_path}`
                                : NoProfile
                            }
                            alt="Cast"
                            className="w-full aspect-square object-cover rounded-t-sm"
                          />
                          <div className="flex-1 flex flex-col gap-2 bg-bg-blackColor/40 rounded-b-sm p-3">
                            {cast?.name && (
                              <h1 className="text-[0.85rem] font-medium">
                                {cast?.name}
                              </h1>
                            )}
                            {cast?.roles?.length > 3
                              ? castRoles && (
                                  <h1 className="text-sm text-text-secondary line-clamp-0">
                                    {castRoles} more...
                                  </h1>
                                )
                              : castRoles && (
                                  <h1 className="text-sm text-text-secondary line-clamp-0">
                                    {castRoles}
                                  </h1>
                                )}
                            {cast?.total_episode_count && (
                              <h2 className="text-sm text-text-secondary line-clamp-0">
                                {cast?.total_episode_count} Episodes
                              </h2>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Part 5 : Netwrok, Seasons & Airing status */}
            <div className="flex flex-col gap-5">
              <div className="font-medium text-xl">
                <h1>Series Details</h1>
              </div>
              <div className="w-full flex flex-col justify-around gap-5 rounded-lg cursor-pointer">
                {/* Rendering Networks */}
                <div
                  onClick={() =>
                    setSectionOneType((prev) =>
                      prev === "Networks" ? null : "Networks",
                    )
                  }
                  className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${sectionOneType === "Networks" && "underline text-text-primary/60"}`}
                >
                  <div className="flex gap-2">
                    <RiChatQuoteLine className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
                      Networks
                    </h1>
                  </div>
                  {sectionOneType === "Networks" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionOneType === "Networks" &&
                  (mediaInfo?.details?.networks?.length > 0 ? (
                    <div className="flex flex-row gap-5">
                      <div
                        className="w-full bg-bg-blackColor/40 flex flex-col gap-8 p-8 pt-12 rounded-md"
                        style={{
                          clipPath:
                            "polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)",
                        }}
                      >
                        <h1 className="text-base font-semibold underline">
                          The Networks Behind{" "}
                          <span className="italic">
                            {mediaInfo?.details?.name
                              ? mediaInfo?.details?.name
                              : "this TV Show"}
                          </span>
                        </h1>
                        <div className="w-full max-h-70 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-6 cursor-pointer">
                          {mediaInfo?.details?.networks?.map((network) => {
                            return (
                              <div
                                key={network.id}
                                onClick={() =>
                                  network?.name &&
                                  mediaInfo?.details?.name &&
                                  window.open(
                                    `https://www.google.com/search?q=${network?.name}+Networks+${mediaInfo?.details?.name}`,
                                    "_blank",
                                  )
                                }
                                className="w-full flex flex-col gap-2 items-start 460:items-center 460:flex-row"
                              >
                                <div className="w-full h-13 bg-bg-whiteColor rounded-sm p-2 flex items-center justify-center overflow-hidden 460:max-w-28">
                                  <img
                                    src={
                                      network?.logo_path
                                        ? `${IMG_POSTER_BASE_URL}${network.logo_path}`
                                        : NoStudio
                                    }
                                    alt="NetworksLogo"
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                                {network?.name && (
                                  <div className="flex flex-col gap-1">
                                    {network?.name && (
                                      <h1 className="text-sm font-semibold">
                                        — {network?.name}
                                        {network?.origin_country && (
                                          <span className="text-sm">{`(${network?.origin_country})`}</span>
                                        )}
                                      </h1>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        Network information unavailable
                      </h1>
                    </div>
                  ))}

                {/* Rendering Seasons */}
                <div
                  onClick={() =>
                    setSectionOneType((prev) =>
                      prev === "Seasons" ? null : "Seasons",
                    )
                  }
                  className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${sectionOneType === "Seasons" && "underline text-text-primary/60"}`}
                >
                  <div className="flex gap-2">
                    <RiChatQuoteLine className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
                      Seasons
                    </h1>
                  </div>
                  {sectionOneType === "Seasons" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionOneType === "Seasons" &&
                  (mediaInfo?.details?.seasons?.length > 0 ? (
                    <div
                      className="flex flex-row gap-5"
                      style={{
                        clipPath:
                          "polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)",
                      }}
                    >
                      <div className="w-full bg-bg-blackColor/40 flex flex-col gap-8 py-8 px-3 pt-12 rounded-md 430:px-8 430:py-8 430:pt-12">
                        <h1 className="text-base font-semibold underline">
                          All seasons of{" "}
                          <span className="italic">
                            {mediaInfo?.details?.name
                              ? mediaInfo?.details?.name
                              : "this TV Show"}
                          </span>
                        </h1>
                        <div className="w-full max-h-120 pr-3 overflow-y-auto custom-scrollbar flex flex-col gap-8 430:pr-5">
                          {/* All seasons */}
                          {mediaInfo?.details?.seasons?.map((season) => {
                            return (
                              <div
                                key={season.id}
                                className="flex flex-col gap-5 border-[0.1px] border-br-primary rounded-2xl"
                              >
                                <div className="p-5 border-b-[0.1px] border-br-primary">
                                  <h1 className="text-lg font-semibold">
                                    {season?.name}
                                  </h1>
                                </div>
                                <div className="w-full flex flex-col gap-5 p-5">
                                  <div className="w-full h-full flex flex-col gap-8 700:flex-row">
                                    {/* Season's poster */}
                                    <div className="relative w-full overflow-hidden rounded-sm shrink-0 700:w-56">
                                      <img
                                        src={
                                          season?.poster_path ||
                                          mediaInfo?.details?.poster_path
                                            ? `${IMG_POSTER_BASE_URL}${season?.poster_path || mediaInfo?.details?.poster_path}`
                                            : NoPoster
                                        }
                                        alt="SeasonPoster"
                                        className="w-full aspect-square object-cover object-top 700:h-full 700:aspect-auto"
                                      />
                                    </div>

                                    {/* Season's genric info */}
                                    <div className="flex flex-col gap-4 max-w-2xl">
                                      {/* Epsode's name */}
                                      <h1 className="text-2xl font-medium">
                                        {season?.name || "N/A"}
                                      </h1>

                                      {/* Seasons's air date */}
                                      {season?.air_date && (
                                        <div className="flex text-sm">
                                          <h2 className="text-xs text-text-secondary border-[0.5px] rounded-2xl px-2.5 py-0.5">
                                            <span className="hidden 295:inline-block">
                                              Premiered :
                                            </span>{" "}
                                            {season?.air_date?.replaceAll(
                                              "-",
                                              "/",
                                            )}
                                          </h2>
                                        </div>
                                      )}

                                      {/* Season's ratings and votes */}
                                      {season?.vote_average !== null && (
                                        <div className="flex gap-2 items-center text-base">
                                          {season?.vote_average !== null && (
                                            <h3 className="font-medium text-base">
                                              <span className="text-text-fifth">
                                                ★{" "}
                                              </span>
                                              {season?.vote_average?.toFixed(
                                                1,
                                              ) || "N/A"}
                                            </h3>
                                          )}
                                        </div>
                                      )}

                                      {/* Season number & episode count */}
                                      {(season?.season_number !== null ||
                                        season?.episode_count !== null) && (
                                        <div className="flex gap-2 items-center text-sm flex-wrap">
                                          {season?.season_number !== null && (
                                            <h3 className="text-xs px-2 py-[0.10rem] rounded-4xl bg-bg-whiteColor/10 backdrop-blur-md border border-br-primary text-nowrap">
                                              Season :{" "}
                                              {season?.season_number || "N/A"}
                                            </h3>
                                          )}
                                          {season?.episode_count !== null && (
                                            <h3 className="text-xs px-2 py-[0.10rem] rounded-4xl bg-bg-whiteColor/10 backdrop-blur-md border border-br-primary text-nowrap">
                                              Episodes :{" "}
                                              {season?.episode_count || "N/A"}
                                            </h3>
                                          )}
                                        </div>
                                      )}

                                      {/* If season's poster unavailable */}
                                      {season?.poster_path === null && (
                                        <h4 className="italic text-text-secondary text-sm">
                                          (Season's poster unavailable)
                                        </h4>
                                      )}

                                      {/* Season's overview */}
                                      {season?.overview && (
                                        <div className="flex flex-col gap-2">
                                          <h1 className="text-base font-medium">
                                            Overview
                                          </h1>
                                          <p className="text-sm">
                                            {season?.overview}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        Seasons's information unavailable
                      </h1>
                    </div>
                  ))}

                {/* Airing Status */}
                <div
                  onClick={() =>
                    setSectionOneType((prev) =>
                      prev === "Airing" ? null : "Airing",
                    )
                  }
                  className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${sectionOneType === "Airing" && "underline text-text-primary/60"}`}
                >
                  <div className="flex gap-2">
                    <RiHourglass2Line className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
                      Airing
                    </h1>
                  </div>
                  {sectionOneType === "Airing" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionOneType === "Airing" &&
                  ((mediaInfo?.details?.last_episode_to_air ||
                    mediaInfo?.details?.next_episode_to_air) !== null ? (
                    <div
                      className="flex flex-row gap-5"
                      style={{
                        clipPath:
                          "polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)",
                      }}
                    >
                      <div className="w-full bg-bg-blackColor/40 py-8 px-3 pt-18 rounded-md overflow-y-auto custom-scrollbar 430:px-8 430:py-8 430:pt-18">
                        <div className="w-full flex flex-col py-2 gap-8 max-h-110 pr-3 overflow-y-auto custom-scrollbar 430:pr-5">
                          {/* Last episode to air */}
                          {mediaInfo?.details?.last_episode_to_air !== null ? (
                            <div className="flex flex-col gap-5 border-[0.1px] border-br-primary rounded-2xl">
                              <div className="p-5 border-b-[0.1px] border-br-primary">
                                <h1 className="text-lg font-semibold">
                                  <span className="italic">{`${mediaInfo?.details?.name ? mediaInfo?.details?.name : "Show"}'s`}</span>{" "}
                                  last episode
                                </h1>
                              </div>
                              <div className="w-full flex flex-col gap-5 cursor-pointer p-5">
                                <div className="w-full h-full flex flex-col gap-8 840:flex-row">
                                  {/* Episode's poster */}
                                  <div className="relative w-full aspect-video overflow-hidden rounded-sm shrink-0 840:w-[20rem]">
                                    <img
                                      src={
                                        mediaInfo?.details?.last_episode_to_air
                                          ?.still_path ||
                                        mediaInfo?.details?.backdrop_path
                                          ? `${IMG_POSTER_BASE_URL}${mediaInfo?.details?.last_episode_to_air?.still_path || mediaInfo?.details?.backdrop_path}`
                                          : NoBackdrop
                                      }
                                      alt="SeasonPoster"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>

                                  {/* Episode's genric info */}
                                  <div className="flex flex-col gap-4 max-w-2xl">
                                    {/* Episode name */}
                                    <h1 className="text-2xl font-medium">
                                      {mediaInfo?.details?.last_episode_to_air
                                        ?.name || "N/A"}
                                    </h1>

                                    <div className="flex items-center gap-2 flex-wrap text-sm">
                                      {/* Episode's air date */}
                                      {mediaInfo?.details?.last_episode_to_air
                                        ?.air_date && (
                                        <h2>
                                          (
                                          {mediaInfo?.details?.last_episode_to_air?.air_date?.replaceAll(
                                            "-",
                                            "/",
                                          )}
                                          )
                                        </h2>
                                      )}

                                      {/* Episode's type */}
                                      {mediaInfo?.details?.last_episode_to_air
                                        ?.episode_type && (
                                        <div className="flex">
                                          <h2>
                                            •{" "}
                                            {mediaInfo?.details?.last_episode_to_air?.episode_type
                                              ?.charAt(0)
                                              ?.toUpperCase() +
                                              mediaInfo?.details?.last_episode_to_air?.episode_type?.slice(
                                                1,
                                              )}
                                          </h2>
                                        </div>
                                      )}

                                      {/* Episode's runtime */}
                                      {mediaInfo?.details?.last_episode_to_air
                                        ?.runtime !== 0 &&
                                        mediaInfo?.details?.last_episode_to_air
                                          ?.runtime && (
                                          <div className="flex">
                                            <h2>
                                              •{" "}
                                              {`${Math.floor(mediaInfo?.details?.last_episode_to_air?.runtime / 60) === 0 ? "" : Math.floor(mediaInfo?.details?.last_episode_to_air?.runtime / 60)}${Math.floor(mediaInfo?.details?.last_episode_to_air?.runtime / 60) === 0 ? "" : "h"} ${(mediaInfo?.details?.last_episode_to_air?.runtime % 60)?.toString()?.padStart(2, "0")}m`}
                                            </h2>
                                          </div>
                                        )}
                                    </div>

                                    {/* Episode's ratings and votes */}
                                    {(mediaInfo?.details?.last_episode_to_air
                                      ?.vote_average !== null ||
                                      mediaInfo?.details?.last_episode_to_air
                                        ?.vote_count !== null) && (
                                      <div className="flex gap-2 items-center text-base flex-wrap">
                                        {mediaInfo?.details?.last_episode_to_air
                                          ?.vote_average !== null && (
                                          <h3 className="font-medium text-nowrap">
                                            <span className="text-text-fifth">
                                              ★{" "}
                                            </span>
                                            {mediaInfo?.details?.last_episode_to_air?.vote_average?.toFixed(
                                              1,
                                            ) || "N/A"}
                                          </h3>
                                        )}
                                        {mediaInfo?.details?.last_episode_to_air
                                          ?.vote_count !== null && (
                                          <h3 className="text-sm text-nowrap">
                                            (
                                            {`${mediaInfo?.details?.last_episode_to_air?.vote_count} Votes`}
                                            )
                                          </h3>
                                        )}
                                      </div>
                                    )}

                                    {/* Season & episode number */}
                                    {(mediaInfo?.details?.last_episode_to_air
                                      ?.season_number !== null ||
                                      mediaInfo?.details?.last_episode_to_air
                                        ?.episode_number !== null) && (
                                      <div className="flex gap-4 items-center text-base">
                                        {mediaInfo?.details?.last_episode_to_air
                                          ?.season_number !== null && (
                                          <h3 className="text-sm px-2 py-[0.10rem] rounded-4xl bg-bg-whiteColor/10 backdrop-blur-md border border-br-primary text-nowrap">
                                            S
                                            {mediaInfo?.details
                                              ?.last_episode_to_air
                                              ?.season_number || "N/A"}{" "}
                                            {mediaInfo?.details
                                              ?.last_episode_to_air
                                              ?.episode_number !== null && (
                                              <span>
                                                • E
                                                {mediaInfo?.details
                                                  ?.last_episode_to_air
                                                  ?.episode_number || "N/A"}
                                              </span>
                                            )}
                                          </h3>
                                        )}
                                      </div>
                                    )}

                                    {/* If episode's poster unavailable */}
                                    {mediaInfo?.details?.last_episode_to_air
                                      ?.still_path === null && (
                                      <h4 className="italic text-text-secondary text-sm">
                                        (Episode's poster unavailable)
                                      </h4>
                                    )}

                                    {/* Episodes's overview */}
                                    {mediaInfo?.details?.last_episode_to_air
                                      ?.overview && (
                                      <div className="flex flex-col gap-2">
                                        <h1 className="text-base font-medium">
                                          Overview
                                        </h1>
                                        <p className="text-sm">
                                          {
                                            mediaInfo?.details
                                              ?.last_episode_to_air?.overview
                                          }
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm border-[0.1px] border-br-primary">
                              <h1 className="text-base font-semibold sm:text-base">
                                Last episode information unavailable
                              </h1>
                            </div>
                          )}
                          {/* Next episode to air */}
                          {mediaInfo?.details?.next_episode_to_air !== null ? (
                            <div className="flex flex-col gap-5 border-[0.1px] border-br-primary rounded-2xl">
                              <div className="p-5 border-b-[0.1px] border-br-primary">
                                <h1 className="text-lg font-semibold">
                                  <span className="italic">{`${mediaInfo?.details?.name ? mediaInfo?.details?.name : "Show"}'s`}</span>
                                  next episode
                                </h1>
                              </div>
                              <div className="w-full flex flex-col gap-5 cursor-pointer p-5">
                                <div className="w-full h-full flex flex-col gap-8 840:flex-row">
                                  {/* Episode's poster */}
                                  <div className="relative w-full aspect-video overflow-hidden rounded-sm shrink-0 840:w-[20rem]">
                                    <img
                                      src={
                                        mediaInfo?.details?.next_episode_to_air
                                          ?.still_path ||
                                        mediaInfo?.details?.backdrop_path
                                          ? `${IMG_POSTER_BASE_URL}${mediaInfo?.details?.next_episode_to_air?.still_path || mediaInfo?.details?.backdrop_path}`
                                          : NoBackdrop
                                      }
                                      alt="SeasonPoster"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>

                                  {/* Episode's genric info */}
                                  <div className="flex flex-col gap-4 max-w-2xl">
                                    {/* Episode name */}
                                    <h1 className="text-2xl font-medium">
                                      {mediaInfo?.details?.next_episode_to_air
                                        ?.name || "N/A"}
                                    </h1>

                                    <div className="flex items-center gap-2 flex-wrap text-sm">
                                      {/* Episode's air date */}
                                      {mediaInfo?.details?.next_episode_to_air
                                        ?.air_date && (
                                        <h2>
                                          (
                                          {mediaInfo?.details?.next_episode_to_air?.air_date?.replaceAll(
                                            "-",
                                            "/",
                                          )}
                                          )
                                        </h2>
                                      )}

                                      {/* Episode's type */}
                                      {mediaInfo?.details?.next_episode_to_air
                                        ?.episode_type && (
                                        <div className="flex">
                                          <h2>
                                            •{" "}
                                            {mediaInfo?.details?.next_episode_to_air?.episode_type
                                              ?.charAt(0)
                                              ?.toUpperCase() +
                                              mediaInfo?.details?.next_episode_to_air?.episode_type?.slice(
                                                1,
                                              )}
                                          </h2>
                                        </div>
                                      )}

                                      {/* Episode's runtime */}
                                      {mediaInfo?.details?.next_episode_to_air
                                        ?.runtime !== 0 &&
                                        mediaInfo?.details?.next_episode_to_air
                                          ?.runtime && (
                                          <div className="flex">
                                            <h2>
                                              •{" "}
                                              {`${Math.floor(mediaInfo?.details?.next_episode_to_air?.runtime / 60) === 0 ? "" : Math.floor(mediaInfo?.details?.next_episode_to_air?.runtime / 60)}${Math.floor(mediaInfo?.details?.next_episode_to_air?.runtime / 60) === 0 ? "" : "h"} ${(mediaInfo?.details?.next_episode_to_air?.runtime % 60)?.toString()?.padStart(2, "0")}m`}
                                            </h2>
                                          </div>
                                        )}
                                    </div>

                                    {/* Episode's ratings and votes */}
                                    {(mediaInfo?.details?.next_episode_to_air
                                      ?.vote_average !== null ||
                                      mediaInfo?.details?.next_episode_to_air
                                        ?.vote_count !== null) && (
                                      <div className="flex gap-2 items-center text-base flex-wrap">
                                        {mediaInfo?.details?.next_episode_to_air
                                          ?.vote_average !== null && (
                                          <h3 className="font-medium text-nowrap">
                                            <span className="text-text-fifth">
                                              ★{" "}
                                            </span>
                                            {mediaInfo?.details?.next_episode_to_air?.vote_average?.toFixed(
                                              1,
                                            ) || "N/A"}
                                          </h3>
                                        )}
                                        {mediaInfo?.details?.next_episode_to_air
                                          ?.vote_count !== null && (
                                          <h3 className="text-sm text-nowrap">
                                            (
                                            {`${mediaInfo?.details?.next_episode_to_air?.vote_count} Votes`}
                                            )
                                          </h3>
                                        )}
                                      </div>
                                    )}

                                    {/* Season & episode number */}
                                    {(mediaInfo?.details?.next_episode_to_air
                                      ?.season_number !== null ||
                                      mediaInfo?.details?.next_episode_to_air
                                        ?.episode_number !== null) && (
                                      <div className="flex gap-4 items-center text-base">
                                        {mediaInfo?.details?.next_episode_to_air
                                          ?.season_number !== null && (
                                          <h3 className="text-sm px-2 py-[0.10rem] rounded-4xl bg-bg-whiteColor/10 backdrop-blur-md border border-br-primary text-white text-nowrap">
                                            S
                                            {mediaInfo?.details
                                              ?.next_episode_to_air
                                              ?.season_number || "N/A"}{" "}
                                            {mediaInfo?.details
                                              ?.next_episode_to_air
                                              ?.episode_number !== null && (
                                              <span>
                                                • E
                                                {mediaInfo?.details
                                                  ?.next_episode_to_air
                                                  ?.episode_number || "N/A"}
                                              </span>
                                            )}
                                          </h3>
                                        )}
                                      </div>
                                    )}

                                    {/* If episode's poster unavailable */}
                                    {mediaInfo?.details?.next_episode_to_air
                                      ?.still_path === null && (
                                      <h4 className="italic text-text-secondary text-sm">
                                        (Episode's poster unavailable)
                                      </h4>
                                    )}

                                    {/* Episodes's overview */}
                                    {mediaInfo?.details?.next_episode_to_air
                                      ?.overview && (
                                      <div className="flex flex-col gap-2">
                                        <h1 className="text-base font-medium">
                                          Overview
                                        </h1>
                                        <p className="text-sm">
                                          {
                                            mediaInfo?.details
                                              ?.next_episode_to_air?.overview
                                          }
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm border-[0.1px] border-br-primary">
                              <h1 className="text-base font-semibold sm:text-base">
                                No upcoming episode available
                              </h1>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        Airing information unavailable
                      </h1>
                    </div>
                  ))}
              </div>
            </div>

            {/* Part 6 : Trailers & Videos */}
            {videoArray?.length > 0 && videoTrailer?.length > 0 && (
              <div className="w-full flex flex-col gap-5">
                <div className="font-medium text-xl">
                  <h1>Trailers & Videos</h1>
                </div>
                <div className="flex flex-row gap-4 no-scrollbar overflow-x-scroll">
                  {videoTrailer?.map((video) => {
                    return (
                      <div
                        onClick={() => {
                          setPlayTrailerVideoKey(video?.key);
                          setShowTrailer(true);
                        }}
                        key={video?.key}
                        className="relative w-[16rem] aspect-video overflow-hidden rounded-sm shrink-0 cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out 880:w-[24rem] 460:w-[20rem]"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video?.key}/sddefault.jpg`}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute m-1 right-1 top-1 rounded-2xl px-3 py-1 bg-bg-blackColor/60 border-sm opacity-0 group-hover:opacity-100">
                          {video?.name && (
                            <h1 className="text-xs font-semibold 460:text-sm">
                              {video?.name?.split(/:|-/)[0]}
                            </h1>
                          )}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="p-1 rounded-full bg-bg-blackColor/60 border-sm 460:p-2">
                            <RiPlayLargeFill />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Part 7 : Reviews, Production Companies, Watch Providers & Socials */}
            <div className="flex flex-col gap-4">
              <div className="font-medium text-xl">
                <h1>Browse More</h1>
              </div>
              <div className="w-full flex flex-col justify-around gap-5 rounded-lg cursor-pointer">
                {/* Rendering Reviews */}
                <div
                  onClick={() =>
                    setSectionTwoType((prev) =>
                      prev === "Reviews" ? null : "Reviews",
                    )
                  }
                  className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${sectionTwoType === "Reviews" && "underline text-text-primary/60"}`}
                >
                  <div className="flex gap-2">
                    <RiChatQuoteLine className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
                      Reviews
                    </h1>
                  </div>
                  {sectionOneType === "Reviews" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionTwoType === "Reviews" &&
                  (mediaInfo?.reviews?.results?.length > 0 ? (
                    <div className="flex flex-row gap-5 no-scrollbar">
                      <div
                        className="w-full bg-bg-blackColor/40 flex flex-col gap-6 py-8 px-3 pt-12 rounded-md 430:px-8 430:py-8 430:pt-12"
                        style={{
                          clipPath:
                            "polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)",
                        }}
                      >
                        <h1 className="text-base font-semibold underline">
                          Audience Reactions on{" "}
                          <span className="italic">
                            {mediaInfo?.details?.name
                              ? mediaInfo?.details?.name
                              : "this TV Show"}
                          </span>
                        </h1>
                        <div className="w-full max-h-100 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-3 cursor-pointer 430:pr-5">
                          {mediaInfo?.reviews?.results?.map((review) => {
                            return (
                              <div
                                key={review.id}
                                className="w-full bg-bg-blackColor/40 p-5 pt-10 rounded-md"
                                style={{
                                  clipPath:
                                    "polygon(6% 5%, 100% 5%, 100% 100%, 0 100%, 0 0)",
                                }}
                              >
                                <div className="w-full flex flex-col gap-3 max-h-80 pr-3 overflow-y-auto custom-scrollbar 430:pr-5">
                                  <div className="flex flex-col gap-5 375:flex-row">
                                    <div className="w-14">
                                      <img
                                        src={
                                          review?.author_details?.avatar_path
                                            ? `${IMG_POSTER_BASE_URL}${review?.author_details?.avatar_path}`
                                            : NoProfile
                                        }
                                        alt="Profile"
                                        className="w-full aspect-square rounded-full object-cover"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <h1 className="text-sm font-semibold underline">
                                        A review by{" "}
                                        {review?.author ||
                                          review?.author_details?.username ||
                                          "Scenery User"}
                                      </h1>
                                      <h1 className="text-xs">
                                        Written by{" "}
                                        <span className="italic">
                                          {review?.author ||
                                            review?.author_details?.username ||
                                            "Scenery User"}
                                        </span>
                                        {review?.created_at &&
                                          `in ${review?.created_at?.slice(0, 4)}`}
                                      </h1>
                                    </div>
                                  </div>
                                  <h1 className="text-[0.85rem]">
                                    {review?.content || "Review unavailable"}
                                  </h1>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        No one’s spilled the tea yet
                      </h1>
                    </div>
                  ))}

                {/* Rendering Studios */}
                <div
                  onClick={() =>
                    setSectionTwoType((prev) =>
                      prev === "Studios" ? null : "Studios",
                    )
                  }
                  className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${sectionTwoType === "Studios" && "underline text-text-primary/60"}`}
                >
                  <div className="flex gap-2">
                    <RiFilmLine className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
                      Studios
                    </h1>
                  </div>
                  {sectionOneType === "Studios" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionTwoType === "Studios" &&
                  (mediaInfo?.details?.production_companies?.length > 0 ? (
                    <div className="flex flex-row gap-5">
                      <div
                        className="w-full bg-bg-blackColor/40 flex flex-col gap-8 p-8 pt-12 rounded-md"
                        style={{
                          clipPath:
                            "polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)",
                        }}
                      >
                        <h1 className="text-base font-semibold underline">
                          The Studios Behind{" "}
                          <span className="italic">
                            {mediaInfo?.details?.name
                              ? mediaInfo?.details?.name
                              : "this TV Show"}
                          </span>
                        </h1>
                        <div className="w-full max-h-70 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-6 cursor-pointer">
                          {mediaInfo?.details?.production_companies?.map(
                            (studio) => {
                              return (
                                <div
                                  key={studio.id}
                                  onClick={() =>
                                    studio?.name &&
                                    window.open(
                                      `https://www.google.com/search?q=${studio?.name}+Production+Company`,
                                      "_blank",
                                    )
                                  }
                                  className="w-full flex flex-col gap-2 items-start 460:items-center 460:flex-row"
                                >
                                  <div className="w-full h-13 bg-bg-whiteColor rounded-sm p-2 flex items-center justify-center overflow-hidden 460:max-w-28">
                                    <img
                                      src={
                                        studio?.logo_path
                                          ? `${IMG_POSTER_BASE_URL}${studio.logo_path}`
                                          : NoStudio
                                      }
                                      alt="StudioLogo"
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  </div>
                                  {studio?.name && (
                                    <div className="flex flex-col gap-1">
                                      {studio?.name && (
                                        <h1 className="text-sm font-semibold">
                                          — {studio?.name}
                                          {studio?.origin_country && (
                                            <span className="text-sm">{`(${studio?.origin_country})`}</span>
                                          )}
                                        </h1>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        Studio information unavailable
                      </h1>
                    </div>
                  ))}

                {/* Rendering Watch Providers */}
                <div
                  onClick={() =>
                    setSectionTwoType((prev) =>
                      prev === "Providers" ? null : "Providers",
                    )
                  }
                  className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${sectionTwoType === "Providers" && "underline text-text-primary/60"}`}
                >
                  <div className="flex gap-2">
                    <RiMovie2Line className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
                      Providers
                    </h1>
                  </div>
                  {sectionOneType === "Providers" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionTwoType === "Providers" &&
                  (regionalWatchProviderType?.length > 0 ? (
                    <div className="flex flex-row gap-5 no-scrollbar">
                      <div
                        className="w-full bg-bg-blackColor/40 flex flex-col gap-6 py-8 px-3 pt-12 rounded-md 430:px-8 430:py-8 430:pt-12"
                        style={{
                          clipPath:
                            "polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)",
                        }}
                      >
                        <h1 className="text-base font-semibold underline">
                          Streaming Options for{" "}
                          <span className="italic">
                            {mediaInfo?.details?.name
                              ? mediaInfo?.details?.name
                              : "this TV Show"}
                          </span>{" "}
                          available on
                        </h1>
                        <div className="w-full max-h-100 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-3 cursor-pointer 430:pr-5">
                          {/* Buy */}
                          {regionalWatchProvider?.watchProviders?.buy?.length >
                            0 && (
                            <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-base font-semibold underline">
                                Buy to own
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.buy?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.name &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
                                          )?.replace(/%20/g, "+")
                                        : null;
                                    return (
                                      <div
                                        onClick={() =>
                                          query &&
                                          window.open(
                                            `https://www.google.com/search?q=${query}`,
                                            "_blank",
                                          )
                                        }
                                        key={platform.provider_id}
                                        className="flex gap-3 items-center"
                                      >
                                        <img
                                          src={
                                            platform?.logo_path
                                              ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}`
                                              : NoProvider
                                          }
                                          alt="ProvidersLogo"
                                          className="w-14 aspect-square rounded-2xl object-cover"
                                        />
                                        <h1 className="text-xs font-semibold 430:text-sm">
                                          —{" "}
                                          {platform?.provider_name ||
                                            "Name unavailable"}
                                        </h1>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          )}

                          {/* Flatrate */}
                          {regionalWatchProvider?.watchProviders?.flatrate
                            ?.length > 0 && (
                            <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-base font-semibold underline">
                                Included with subscription
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.flatrate?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.name &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
                                          )?.replace(/%20/g, "+")
                                        : null;
                                    return (
                                      <div
                                        onClick={() =>
                                          query &&
                                          window.open(
                                            `https://www.google.com/search?q=${query}`,
                                            "_blank",
                                          )
                                        }
                                        key={platform.provider_id}
                                        className="flex gap-3 flex-col items-start 310:flex-row 310:items-center"
                                      >
                                        <img
                                          src={
                                            platform?.logo_path
                                              ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}`
                                              : NoProvider
                                          }
                                          alt="ProvidersLogo"
                                          className="w-14 aspect-square rounded-2xl object-cover"
                                        />
                                        <h1 className="text-xs font-semibold 430:text-sm">
                                          —{" "}
                                          {platform?.provider_name ||
                                            "Name unavailable"}
                                        </h1>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          )}

                          {/* Rent */}
                          {regionalWatchProvider?.watchProviders?.rent?.length >
                            0 && (
                            <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-base font-semibold underline">
                                Rent & watch
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.rent?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.name &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
                                          )?.replace(/%20/g, "+")
                                        : null;
                                    return (
                                      <div
                                        onClick={() =>
                                          query &&
                                          window.open(
                                            `https://www.google.com/search?q=${query}`,
                                            "_blank",
                                          )
                                        }
                                        key={platform.provider_id}
                                        className="flex gap-3 flex-col items-start 310:flex-row 310:items-center"
                                      >
                                        <img
                                          src={
                                            platform?.logo_path
                                              ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}`
                                              : NoProvider
                                          }
                                          alt="ProvidersLogo"
                                          className="w-14 aspect-square rounded-2xl object-cover"
                                        />
                                        <h1 className="text-xs font-semibold 430:text-sm">
                                          —{" "}
                                          {platform?.provider_name ||
                                            "Name unavailable"}
                                        </h1>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          )}
                          {/* Ads */}
                          {regionalWatchProvider?.watchProviders?.ads?.length >
                            0 && (
                            <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-base font-semibold underline">
                                Watch with ads
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.ads?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.name &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
                                          )?.replace(/%20/g, "+")
                                        : null;
                                    return (
                                      <div
                                        onClick={() =>
                                          query &&
                                          window.open(
                                            `https://www.google.com/search?q=${query}`,
                                            "_blank",
                                          )
                                        }
                                        key={platform.provider_id}
                                        className="flex gap-3 flex-col items-start 310:flex-row 310:items-center"
                                      >
                                        <img
                                          src={
                                            platform?.logo_path
                                              ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}`
                                              : NoProvider
                                          }
                                          alt="ProvidersLogo"
                                          className="w-14 aspect-square rounded-2xl object-cover"
                                        />
                                        <h1 className="text-xs font-semibold 430:text-sm">
                                          —{" "}
                                          {platform?.provider_name ||
                                            "Name unavailable"}
                                        </h1>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          )}
                          {/* Free */}
                          {regionalWatchProvider?.watchProviders?.free?.length >
                            0 && (
                            <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-base font-semibold underline">
                                Stream for free
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.free?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.name &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
                                          )?.replace(/%20/g, "+")
                                        : null;
                                    return (
                                      <div
                                        onClick={() =>
                                          query &&
                                          window.open(
                                            `https://www.google.com/search?q=${query}`,
                                            "_blank",
                                          )
                                        }
                                        key={platform.provider_id}
                                        className="flex gap-3 flex-col items-start 310:flex-row 310:items-center"
                                      >
                                        <img
                                          src={
                                            platform?.logo_path
                                              ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}`
                                              : NoProvider
                                          }
                                          alt="ProvidersLogo"
                                          className="w-14 aspect-square rounded-2xl object-cover"
                                        />
                                        <h1 className="text-xs font-semibold 430:text-sm">
                                          —{" "}
                                          {platform?.provider_name ||
                                            "Name unavailable"}
                                        </h1>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        No viewing options available
                      </h1>
                    </div>
                  ))}

                {/* Rendering Socials */}
                <div
                  onClick={() =>
                    setSectionTwoType((prev) =>
                      prev === "Socials" ? null : "Socials",
                    )
                  }
                  className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${sectionTwoType === "Socials" && "underline text-text-primary/60"}`}
                >
                  <div className="flex gap-2">
                    <RiHashtag className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
                      Socials
                    </h1>
                  </div>
                  {sectionOneType === "Socials" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionTwoType === "Socials" &&
                  (mediasSocialsCheck ? (
                    <div className="flex flex-row gap-5">
                      <div
                        className="w-full bg-bg-blackColor/40 flex flex-col gap-8 p-8 pt-12 rounded-md"
                        style={{
                          clipPath:
                            "polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)",
                        }}
                      >
                        <h1 className="text-base font-semibold underline">
                          Follow{" "}
                          <span className="italic">
                            {mediaInfo?.details?.name
                              ? mediaInfo?.details?.name
                              : "this TV Show"}
                          </span>{" "}
                          on Social Media
                        </h1>
                        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-5 gap-y-6 mx-auto cursor-pointer">
                          {mediaInfo?.external_ids?.facebook_id && (
                            <div
                              onClick={() =>
                                mediaInfo?.external_ids?.facebook_id &&
                                window.open(
                                  `https://www.facebook.com/${mediaInfo?.external_ids?.facebook_id}`,
                                  "_blank",
                                )
                              }
                              className="flex gap-2 items-center"
                            >
                              <RiFacebookLine className="w-8 h-8" />
                              <h1 className="text-sm font-normal 430:text-base">
                                Facebook
                              </h1>
                            </div>
                          )}
                          {mediaInfo?.external_ids?.twitter_id && (
                            <div
                              onClick={() =>
                                mediaInfo?.external_ids?.twitter_id &&
                                window.open(
                                  `https://x.com/${mediaInfo?.external_ids?.twitter_id}`,
                                  "_blank",
                                )
                              }
                              className="flex gap-2 items-center"
                            >
                              <RiTwitterXLine className="w-8 h-8" />
                              <h1 className="text-sm font-normal 430:text-base">
                                Twitter
                              </h1>
                            </div>
                          )}
                          {mediaInfo?.external_ids?.instagram_id && (
                            <div
                              onClick={() =>
                                mediaInfo?.external_ids?.instagram_id &&
                                window.open(
                                  `https://www.instagram.com/${mediaInfo?.external_ids?.instagram_id}`,
                                  "_blank",
                                )
                              }
                              className="flex gap-2 items-center"
                            >
                              <RiInstagramLine className="w-8 h-8" />
                              <h1 className="text-sm font-normal 430:text-base">
                                Instagram
                              </h1>
                            </div>
                          )}
                          {mediaInfo?.external_ids?.imdb_id && (
                            <div
                              onClick={() =>
                                mediaInfo?.external_ids?.imdb_id &&
                                window.open(
                                  `https://www.imdb.com/title/${mediaInfo?.external_ids?.imdb_id}`,
                                  "_blank",
                                )
                              }
                              className="flex gap-2 items-center"
                            >
                              <RiFilmLine className="w-8 h-8" />
                              <h1 className="text-sm font-normal 430:text-base">
                                IMDB
                              </h1>
                            </div>
                          )}
                          {mediaInfo?.external_ids?.tvdb_id && (
                            <div
                              onClick={() =>
                                mediaInfo?.external_ids?.tvdb_id &&
                                window.open(
                                  `https://thetvdb.com/?id=/${mediaInfo?.external_ids?.tvdb_id}&tab=series`,
                                  "_blank",
                                )
                              }
                              className="flex gap-2 items-center"
                            >
                              <RiSlideshow4Line className="w-8 h-8" />
                              <h1 className="text-sm font-normal 430:text-base">
                                TVDB
                              </h1>
                            </div>
                          )}
                          {mediaInfo?.details?.homepage && (
                            <div
                              onClick={() =>
                                mediaInfo?.details?.homepage &&
                                window.open(
                                  mediaInfo?.details?.homepage,
                                  "_blank",
                                )
                              }
                              className="flex gap-2 items-center"
                            >
                              <RiGlobalLine className="w-8 h-8" />
                              <h1 className="text-sm font-normal 430:text-base">
                                Website
                              </h1>
                            </div>
                          )}
                          {mediaInfo?.external_ids?.wikidata_id && (
                            <div
                              onClick={() =>
                                mediaInfo?.external_ids?.wikidata_id &&
                                window.open(
                                  `https://www.wikidata.org/wiki/${mediaInfo?.external_ids?.wikidata_id}`,
                                  "_blank",
                                )
                              }
                              className="flex gap-2 items-center"
                            >
                              <Wikipedia className="w-8 h-8" />
                              <h1 className="text-sm font-normal 430:text-base">
                                Wikipedia
                              </h1>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-20 px-10 bg-bg-blackColor/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        No official links available
                      </h1>
                    </div>
                  ))}
              </div>
            </div>

            {/* Part 8 : Recomendations */}
            {mediaInfo?.recommendations?.results?.length > 0 && (
              <div className="w-full flex flex-col gap-5">
                <div className="font-medium text-xl">
                  <h1>
                    If you liked{" "}
                    <span className="italic text-text-secondary">
                      {(mediaInfo?.details?.name || "this TV Show")?.replace(
                        ".",
                        "",
                      )}
                    </span>
                    , you might also like
                  </h1>
                </div>
                <div className="relative w-full group/carousel">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      recScrollRefs.current?.scrollBy({
                        left: -600,
                        behavior: "smooth",
                      });
                    }}
                    className="absolute flex justify-start items-center z-1 left-3 sm:left-4 top-3 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                  >
                    <RiArrowLeftWideLine className="w-4 h-4 460:w-6 460:h-6" />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      recScrollRefs.current?.scrollBy({
                        left: 600,
                        behavior: "smooth",
                      });
                    }}
                    className="absolute flex justify-end items-center z-1 right-3 sm:right-4 top-3 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                  >
                    <RiArrowRightWideLine className="w-4 h-4 460:w-6 460:h-6" />
                  </div>
                  <div
                    ref={recScrollRefs}
                    className="flex flex-row gap-4 no-scrollbar overflow-x-scroll"
                  >
                    {mediaInfo?.recommendations?.results?.map((content) => {
                      return (
                        <div
                          key={content?.id}
                          onClick={() => mediaType(content)}
                          className="relative shrink-0 group"
                        >
                          <div className="relative w-60 aspect-video overflow-hidden rounded-t-sm shrink-0 cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out 460:w-[18rem]">
                            <img
                              src={
                                content.backdrop_path
                                  ? `${IMG_POSTER_BASE_URL}${content.backdrop_path}`
                                  : NoBackdrop
                              }
                              alt="Recomendations"
                              className="absolute z-0 w-full h-full object-cover"
                            />
                            {/* About movie or show - on hover drop down */}
                            <div className="absolute z-1 bottom-0 bg-bg-blackColor/90 w-full flex flex-col gap-1.25 px-2 py-1.25 opacity-0 group-hover:opacity-100 transition duration-200 460:gap-2 460:py-2">
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
                                      saveProfileMedia(content, "watchLater")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "watchLater",
                                    ) ? (
                                      <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                    ) : (
                                      <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                                    )}
                                  </div>
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "favourite")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
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
                              <div className="flex items-center gap-2 font-medium text-text-secondary text-xs 460:text-sm">
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                  <h1 className="text-xs lg:text-sm font-regular">
                                    ★ {content.vote_average.toFixed(1) || "0.0"}
                                  </h1>
                                </div>
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                  <h1 className="text-xs lg:text-sm font-regular">
                                    {(
                                      content.release_date ||
                                      content.first_air_date
                                    )?.slice(0, 4) || "N/A"}
                                  </h1>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {content.genre_ids?.length === 0 ? (
                                  <h1 className="text-xs lg:text-sm font-regular">
                                    Uncategorized
                                  </h1>
                                ) : (
                                  allGenres
                                    .filter((list) =>
                                      content.genre_ids.includes(list.id),
                                    )
                                    .slice(0, 2)
                                    .map((val) => (
                                      <h1
                                        key={val.id}
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
                            {(content?.title || content?.name) && (
                              <div className="absolute m-1 right-1 bottom-1 rounded-2xl px-3 py-1 bg-bg-blackColor/60 border-sm transition-transform duration-200 group-hover:-translate-y-23 460:group-hover:-translate-y-30">
                                <h1 className="text-xs font-semibold 460:text-sm">
                                  {(content?.title || content?.name).split(
                                    /:|-|,/,
                                  )[0] || "N/A"}
                                </h1>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShowInfo;
