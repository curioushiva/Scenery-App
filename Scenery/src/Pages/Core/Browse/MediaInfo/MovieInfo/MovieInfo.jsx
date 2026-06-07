import useContent from "@/Utils/Hooks/useContent/useContent";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import {
  IMG_POSTER_BASE_URL,
  IMG_HERO_BACKDROP_BASE_URL,
  IMG_HERO_POSTER_BASE_URL,
} from "@/Utils/SceneryAPI/SceneryAPI";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RiAddFill,
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
  RiPlayFill,
  RiCalendarEventLine,
  RiMoneyDollarCircleLine,
  RiWallet3Line,
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
  RiCheckboxMultipleLine,
  RiArrowUpWideLine,
  RiArrowDownWideLine,
} from "@remixicon/react";
import { Info, Wikipedia } from "react-bootstrap-icons";
import NoProfile from "@/Assets/Imgs/Avatars/NoProfile.png";
import NoProvider from "@/Assets/Imgs/Logo/NoProvider.png";
import NoStudio from "@/Assets/Imgs/Logo/NoStudio.png";
import NoPoster from "@/Assets/Imgs/Logo/NoPoster.png";
import NoBackdrop from "@/Assets/Imgs/Logo/NoBackdrop.png";
import { useParams } from "react-router";
import { addMediaID } from "@/Utils/Redux/Slices/ContentSlice/ContentSlice";

const MovieInfo = () => {
  /* To dispatch and navigate */
  const dispatch = useDispatch();

  /* Using and calling Media ID from URLs */
  const { mediaID } = useParams();
  const mediaIDFromURL = Number(mediaID);

  /* Get movie info */
  const { getMovieInfo } = useContent();

  /* Calling to get movie info data */
  useEffect(() => {
    getMovieInfo(mediaIDFromURL);
    dispatch(addMediaID(mediaIDFromURL));
  }, [mediaIDFromURL]);

  /* Selecting mediaInfo for movies here */
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
  )?.release_dates?.[0]?.certification;

  /* Check for director & writter names */
  const findDirector = (() => {
    if (mediaInfo?.credits?.crew?.length > 0) {
      return mediaInfo?.credits?.crew.find(
        (person) => person.job === "Director",
      );
    } else {
      return null;
    }
  })();
  const findWriter = (() => {
    if (mediaInfo?.credits?.crew?.length > 0) {
      return mediaInfo?.credits?.crew.find((person) => person.job === "Writer");
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

  /* To set the section type */
  const [sectionOneType, setSectionOneType] = useState(null);

  /* Watch Providers check */
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
    mediaInfo?.details?.homepage;

  /* Rendering on the basis of avail of mediaInfo */
  return Object.keys(mediaInfo).length === 0 ? (
    <div className="w-full min-h-screen relative bg-bgcolor-fourth overflow-x-hidden"></div>
  ) : (
    /* Main Container */
    <div className="w-full min-h-screen relative bg-bgcolor-fourth overflow-x-hidden">
      {showTrailer && (
        <div className="fixed inset-0 z-5000 w-full h-full overflow-y-auto bg-black/95">
          <div className="min-h-full flex justify-center items-center py-10 px-8 lg:px-20">
            <div className="w-full max-w-5xl flex flex-col gap-3 bg-black/20 rounded-2xl border-[0.1px] border-brcolor-primary backdrop-blur-md">
              <div className="flex justify-between items-center p-4 sm:p-5 border-b border-brcolor-primary">
                <h1 className="text-lg sm:text-2xl font-medium">
                  {playTrailerInitialVideoKey?.[0]?.name
                    ? playTrailerInitialVideoKey?.[0]?.name
                    : "Official Video"}
                </h1>
                <div
                  onClick={() => setShowTrailer(false)}
                  className="flex justify-center items-center w-9 h-9 p-2 rounded-full bg-white/90 font-bold text-black cursor-pointer active:scale-95"
                >
                  <RiCloseFill />
                </div>
              </div>
              <div className="p-2 sm:p-4">
                <div className="relative w-full max-h-[60vh] aspect-video overflow-hidden rounded-xl bg-black">
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
        <div className="absolute z-0 w-full h-[75dvh] min-h-[400px] overflow-hidden">
          <img
            className="absolute z-0 inset-0 w-full h-full object-cover object-top"
            src={`${IMG_HERO_BACKDROP_BASE_URL}${mediaInfo?.details?.backdrop_path}`}
            alt="Background"
          />
          {/* Fades top & bottoms */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/100" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-bgcolor-fourth via-bgcolor-fourth/10 to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bgcolor-fourth via-bgcolor-fourth/40 to-transparent" />
        </div>
      )}

      {/* Media Info */}
      <div className="relative flex flex-col gap-10 pt-30 p-8">
        {mediaInfo?.details && (
          <div className="w-full h-full flex flex-col gap-12">
            {/* Part 1 & 2 */}
            <div className="w-full h-full flex flex-col gap-12 items-stretch 880:flex-row">
              {/* Part 1 : Media Poster */}
              <div className="hidden flex-col flex-shrink-0  880:flex 880:w-[18rem]">
                <img
                  src={
                    mediaInfo?.details?.poster_path
                      ? `${IMG_HERO_POSTER_BASE_URL}${mediaInfo?.details?.poster_path}`
                      : NoPoster
                  }
                  alt="Poster"
                  className={`w-full flex-1 min-h-0 aspect-[4/5] object-cover ${regionalWatchProviderFirstValue?.length > 0 ? "rounded-t-sm" : "rounded-sm"}`}
                />
                {regionalWatchProviderFirstValue?.length > 0 && (
                  <div className="w-full flex justify-center items-center gap-3 bg-black py-3 rounded-b-sm">
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
                      <h1 className="text-sm text-textcolor-secondary">
                        Now Streaming
                      </h1>
                      <h2 className="text-sm font-medium">Watch Now</h2>
                    </div>
                  </div>
                )}
              </div>

              {/* Part 2 : Genric Info */}
              <div className="flex flex-col gap-4 max-w-2xl">
                {/* Movie title */}
                <h1 className="text-3xl font-medium sm:text-4xl">
                  {mediaInfo?.details?.title || "N/A"}
                </h1>
                <div className="flex items-center flex-wrap text-sm gap-2">
                  {/* Certifications */}
                  {mediaCertification && (
                    <h2 className="text-textcolor-secondary border-1 rounded-sm px-[6px] whitespace-nowrap">
                      {mediaCertification}
                    </h2>
                  )}

                  {/* Movie release date & Origin country */}
                  {(mediaInfo?.details?.release_date ||
                    mediaInfo?.details?.origin_country?.[0]) && (
                    <div className="flex gap-1">
                      <h2>{mediaInfo?.details?.release_date?.slice(0, 4)}</h2>
                      {mediaInfo?.details?.origin_country?.[0] && (
                        <h2>({mediaInfo?.details?.origin_country?.[0]})</h2>
                      )}
                    </div>
                  )}

                  {/* Genre & movie runtime */}
                  {(mediaInfo?.details?.genres?.length > 0 ||
                    (mediaInfo?.details?.runtime !== 0 &&
                      mediaInfo?.details?.runtime)) && (
                    <div className="flex gap-2 flex-wrap">
                      {/* Genres */}
                      {mediaInfo?.details?.genres?.length > 0 && (
                        <div className="flex gap-2">
                          <h2>•</h2>
                          {mediaInfo?.details?.genres
                            ?.slice(0, 2)
                            ?.map((val) => (
                              <h2 key={val.id}>
                                {val?.name === "Science Fiction"
                                  ? "Sci-Fi"
                                  : val?.name?.split(" ")[0]}
                              </h2>
                            ))}
                        </div>
                      )}

                      {/* Movie runtime */}
                      {mediaInfo?.details?.runtime !== 0 &&
                        mediaInfo?.details?.runtime && (
                          <h2>
                            •{" "}
                            {`${Math.floor(mediaInfo?.details?.runtime / 60) === 0 ? "" : Math.floor(mediaInfo?.details?.runtime / 60)}${Math.floor(mediaInfo?.details?.runtime / 60) === 0 ? "" : "h"} ${(mediaInfo?.details?.runtime % 60)?.toString()?.padStart(2, "0")}m`}
                          </h2>
                        )}
                    </div>
                  )}
                </div>

                {/* Ratings and Votes */}
                {(mediaInfo?.details?.vote_average !== null ||
                  mediaInfo?.details?.vote_count !== null) && (
                  <div className="flex gap-4 items-center text-base">
                    {mediaInfo?.details?.vote_average !== null && (
                      <h3 className="font-medium">
                        <span className="text-yellow-400">★</span>{" "}
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
                  <h4 className="italic text-textcolor-secondary ">
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

                {/* Director and writer */}
                {(findDirector?.original_name || findWriter?.original_name) && (
                  <div className="max-w-2xl flex gap-x-10 gap-y-5 flex-wrap items-center pt-4 text-base cursor-pointer">
                    {findDirector?.original_name && (
                      <div
                        onClick={() =>
                          findDirector?.original_name &&
                          mediaInfo?.details?.title &&
                          window.open(
                            `https://www.google.com/search?q=${findDirector?.original_name}+director+of+${mediaInfo?.details?.title}`,
                          )
                        }
                        target="_blank"
                        className="flex flex-col gap-1"
                      >
                        <h1 className="text-base font-semibold underline">
                          {findDirector?.original_name}
                        </h1>
                        <p className="text-sm text-gray-400">Director</p>
                      </div>
                    )}
                    {findWriter?.original_name && (
                      <div
                        onClick={() =>
                          findWriter?.original_name &&
                          mediaInfo?.details?.title &&
                          window.open(
                            `https://www.google.com/search?q=${findWriter?.original_name}+writer+of+${mediaInfo?.details?.title}`,
                          )
                        }
                        target="_blank"
                        className="flex flex-col gap-1"
                      >
                        <h1 className="text-base font-semibold underline">
                          {findWriter?.original_name}
                        </h1>
                        <p className="text-sm text-gray-400">Writer</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Trailer, Watch later & fav */}
                <div className="flex gap-4 pt-5 flex-wrap 430:flex-nowrap">
                  {/* Play Video trailer */}
                  {videoTrailer?.length > 0 && (
                    <div
                      onClick={() => {
                        setPlayTrailerVideoKey(
                          playTrailerInitialVideoKey?.[0]?.key,
                        );
                        setShowTrailer(true);
                      }}
                      className="w-full flex justify-center items-center gap-1 bg-uicolor-primary text-white pl-2 pr-3 py-2 rounded cursor-pointer active:scale-[0.95]"
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
                      className="w-full flex justify-center items-center gap-2 border-1 border-textcolor-secondary text-white pl-2 pr-3 py-2 rounded cursor-pointer active:scale-[0.95]"
                    >
                      {showSavedProfileMedia(mediaInfo?.details, "watchLater") ? (
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
                      className="w-full flex justify-center items-center gap-2 border-1 border-textcolor-secondary px-3 py-2 rounded cursor-pointer active:scale-[0.95]"
                    >
                      {showSavedProfileMedia(mediaInfo?.details, "favourite") ? (
                        <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                      ) : (
                        <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 3 : Budget & revenue */}
            <div className="w-full flex flex-col gap-5 880:flex-row 880:gap-10">
              {/* Release date */}
              {mediaInfo?.details?.release_date && (
                <div className="w-full flex gap-2 p-4 bg-black/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
                  <div className="flex justify-center items-center">
                    <RiCalendarEventLine className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm font-medium">Release Date</h1>
                    <h2 className="text-base">
                      {mediaInfo?.details?.release_date?.replaceAll("-", "/") ||
                        "N/A"}
                    </h2>
                  </div>
                </div>
              )}

              {/* Budget */}
              <div className="w-full flex gap-2 p-4 bg-black/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
                <div className="flex justify-center items-center">
                  <RiMoneyDollarCircleLine className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-medium">Budget</h1>
                  <h2 className="text-base">
                    {mediaInfo?.details?.budget > 0
                      ? `$${mediaInfo?.details?.budget?.toLocaleString("en-US")}`
                      : "N/A"}
                  </h2>
                </div>
              </div>

              {/* Total revenue */}
              <div className="w-full flex gap-2 p-4 bg-black/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
                <div className="flex justify-center items-center">
                  <RiWallet3Line className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-medium">Revenue</h1>
                  <h2 className="text-base">
                    {mediaInfo?.details?.revenue > 0
                      ? `$${mediaInfo?.details?.revenue?.toLocaleString("en-US")}`
                      : "N/A"}
                  </h2>
                </div>
              </div>

              {/* Status */}
              {mediaInfo?.details?.status && (
                <div className="w-full flex gap-2 p-4 bg-black/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
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
                <div className="grid grid-flow-col auto-cols-[10rem] gap-4 overflow-x-auto no-scrollbar items-stretch">
                  {mediaInfo?.credits?.cast?.map((cast) => {
                    const query =
                      cast?.name && cast?.character && mediaInfo?.details?.title
                        ? encodeURIComponent(
                            `${cast?.name} as ${cast?.character} from ${mediaInfo?.details?.title}`,
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
                        key={cast.id}
                        className="cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out h-full flex flex-col"
                      >
                        <img
                          src={
                            cast?.profile_path
                              ? `${IMG_POSTER_BASE_URL}${cast?.profile_path}`
                              : NoProfile
                          }
                          alt="Cast"
                          className="w-full aspect-[1/1] object-cover rounded-t-sm"
                        />
                        <div className="flex-1 flex flex-col gap-2 bg-black/40 rounded-b-sm p-3">
                          {cast?.name && (
                            <h1 className="text-[0.85rem] font-medium">
                              {cast?.name}
                            </h1>
                          )}
                          {cast?.character && (
                            <h2 className="text-sm text-textcolor-secondary">
                              {cast?.character}
                            </h2>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Part 5 : Trailers & Videos */}
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
                        className="relative w-[16rem] aspect-video overflow-hidden rounded-sm flex-shrink-0 cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out 880:w-[24rem] 460:w-[20rem]"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video?.key}/sddefault.jpg`}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute m-1 right-1 top-1 rounded-2xl px-3 py-1 bg-black/60 border-sm opacity-0 group-hover:opacity-100">
                          {video?.name && (
                            <h1 className="text-xs font-semibold 460:text-sm">
                              {video?.name?.split(/:|-/)[0]}
                            </h1>
                          )}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="p-1 rounded-full bg-black/60 border-sm 460:p-2">
                            <RiPlayLargeFill />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Part 6 : Reviews, Production Companies, Watch Providers & Socials */}
            <div className="flex flex-col gap-4">
              <div className="font-medium text-xl">
                <h1>Browse More</h1>
              </div>
              <div className="w-full flex flex-col justify-around gap-5 rounded-lg cursor-pointer">
                {/* Rendering Reviews */}
                <div
                  onClick={() =>
                    setSectionOneType((prev) =>
                      prev === "Reviews" ? null : "Reviews",
                    )
                  }
                  className={`flex justify-between gap-4 bg-black/40 p-5 rounded-lg ${sectionOneType === "Reviews" && "underline text-gray-400"}`}
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
                {sectionOneType === "Reviews" &&
                  (mediaInfo?.reviews?.results?.length > 0 ? (
                    <div className="flex flex-row gap-5 no-scrollbar">
                      <div
                        className="w-full bg-black/40 flex flex-col gap-6 py-8 px-3 pt-12 rounded-md 430:px-8 430:py-8 430:pt-12"
                        style={{
                          clipPath:
                            "polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)",
                        }}
                      >
                        <h1 className="text-base font-semibold underline">
                          Audience Reactions on{" "}
                          <span className="italic">
                            {mediaInfo?.details?.title
                              ? mediaInfo?.details?.title
                              : "this Movie"}
                          </span>
                        </h1>
                        <div className="w-full max-h-100 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-3 cursor-pointer 430:pr-5">
                          {mediaInfo?.reviews?.results?.map((review) => {
                            return (
                              <div
                                key={review.id}
                                className="w-full bg-black/40 p-5 pt-10 rounded-md"
                                style={{
                                  clipPath:
                                    "polygon(6% 5%, 100% 5%, 100% 100%, 0 100%, 0 0)",
                                }}
                              >
                                <div className="w-full flex flex-col gap-3 max-h-80 pr-3 overflow-y-auto custom-scrollbar overflow-x-hidden 430:pr-5">
                                  <div className="flex flex-col gap-5 375:flex-row">
                                    <div className="w-[3.5rem]">
                                      <img
                                        src={
                                          review?.author_details?.avatar_path
                                            ? `${IMG_POSTER_BASE_URL}${review?.author_details?.avatar_path}`
                                            : NoProfile
                                        }
                                        alt="Profile"
                                        className="w-full aspect-[1/1] rounded-full object-cover"
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
                                        </span>{" "}
                                        {review?.created_at &&
                                          `in ${review?.created_at?.slice(0, 4)}`}
                                      </h1>
                                    </div>
                                  </div>
                                  <h1 className="text-[0.85rem]">
                                    {(review?.content).split(/https:/)[0] ||
                                      "Review unavailable"}
                                  </h1>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-center py-20 px-10 bg-black/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        No one’s spilled the tea yet
                      </h1>
                    </div>
                  ))}

                {/* Rendering Studios */}
                <div
                  onClick={() =>
                    setSectionOneType((prev) =>
                      prev === "Studios" ? null : "Studios",
                    )
                  }
                  className={`flex justify-between gap-4 bg-black/40 p-5 rounded-lg ${sectionOneType === "Studios" && "underline text-gray-400"}`}
                >
                  <div className="flex gap-2">
                    <RiFilmLine className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="basex430:text-lg t-lg font-semibold leading-[1.3]">
                      Studios
                    </h1>
                  </div>
                  {sectionOneType === "Studios" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionOneType === "Studios" &&
                  (mediaInfo?.details?.production_companies?.length > 0 ? (
                    <div className="flex flex-row gap-5">
                      <div
                        className="w-full bg-black/40 flex flex-col gap-8 p-8 pt-12 rounded-md"
                        style={{
                          clipPath:
                            "polygon(96% 3%, 100% 0%, 100% 100%, 0 100%, 0 3%)",
                        }}
                      >
                        <h1 className="text-base font-semibold underline">
                          The Studios Behind{" "}
                          <span className="italic">
                            {mediaInfo?.details?.title
                              ? mediaInfo?.details?.title
                              : "this Movie"}
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
                                  <div className="w-full h-13 bg-white rounded-sm p-2 flex items-center justify-center overflow-hidden 460:max-w-[7rem]">
                                    <img
                                      src={
                                        studio?.logo_path
                                          ? `${IMG_POSTER_BASE_URL}${studio.logo_path}`
                                          : NoStudio
                                      }
                                      alt="StudiosLogo"
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  </div>
                                  {studio?.name && (
                                    <div className="flex flex-col gap-1">
                                      {studio?.name && (
                                        <h1 className="text-xs font-semibold 430:text-sm">
                                          — {studio?.name}{" "}
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
                    <div className="w-full text-center py-20 px-10 bg-black/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        Studio information unavailable
                      </h1>
                    </div>
                  ))}

                {/* Rendering Watch Providers */}
                <div
                  onClick={() =>
                    setSectionOneType((prev) =>
                      prev === "Providers" ? null : "Providers",
                    )
                  }
                  className={`flex justify-between gap-4 bg-black/40 p-5 rounded-lg ${sectionOneType === "Providers" && "underline text-gray-400"}`}
                >
                  <div className="flex gap-2">
                    <RiMovie2Line className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="tebase-430:text-lg lg font-semibold leading-[1.3]">
                      Providers
                    </h1>
                  </div>
                  {sectionOneType === "Providers" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionOneType === "Providers" &&
                  (regionalWatchProviderType?.length > 0 ? (
                    <div className="flex flex-row gap-5 no-scrollbar">
                      <div
                        className="w-full bg-black/40 flex flex-col gap-6 py-8 px-3 pt-12 rounded-md 430:px-8 430:py-8 430:pt-12"
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
                              : "this Movie"}
                          </span>
                        </h1>
                        <div className="w-full max-h-100 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-3 cursor-pointer 430:pr-5">
                          {/* Buy */}
                          {regionalWatchProvider?.watchProviders?.buy?.length >
                            0 && (
                            <div className="w-full bg-black/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-lg font-semibold underline">
                                Buy to own
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.buy?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.title &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.title} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
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
                                          className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover"
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
                            <div className="w-full bg-black/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-lg font-semibold underline">
                                Included with subscription
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.flatrate?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.title &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.title} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
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
                                          className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover"
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
                            <div className="w-full bg-black/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-lg font-semibold underline">
                                Rent & watch
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.rent?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.title &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.title} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
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
                                          className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover"
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
                            <div className="w-full bg-black/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-lg font-semibold underline">
                                Watch with ads
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.ads?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.title &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.title} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
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
                                          className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover"
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
                            <div className="w-full bg-black/40 flex flex-col gap-5 p-8 rounded-md">
                              <h1 className="text-lg font-semibold underline">
                                Stream for free
                              </h1>
                              <div className="flex flex-col gap-5 cursor-pointer">
                                {regionalWatchProvider?.watchProviders?.free?.map(
                                  (platform) => {
                                    const query =
                                      mediaInfo?.details?.title &&
                                      mediaInfo?.details?.overview &&
                                      platform?.provider_name
                                        ? encodeURIComponent(
                                            `Show ${mediaInfo?.details?.title} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`,
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
                                          className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover"
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
                    <div className="w-full text-center py-20 px-10 bg-black/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        No viewing options available
                      </h1>
                    </div>
                  ))}

                {/* Rendering Socials */}
                <div
                  onClick={() =>
                    setSectionOneType((prev) =>
                      prev === "Socials" ? null : "Socials",
                    )
                  }
                  className={`flex justify-between gap-4 bg-black/40 p-5 rounded-lg ${sectionOneType === "Socials" && "underline text-gray-400"}`}
                >
                  <div className="flex gap-2">
                    <RiHashtag className="w-6 h-6 430:w-7 430:h-7" />
                    <h1 className="text-base 430:text-lg xt-lg font-semibold leading-[1.3]">
                      Socials
                    </h1>
                  </div>
                  {sectionOneType === "Socials" ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {sectionOneType === "Socials" &&
                  (mediasSocialsCheck !== null ? (
                    <div className="flex flex-row gap-5">
                      <div
                        className="w-full bg-black/40 flex flex-col gap-8 p-8 pt-10 rounded-md"
                        style={{
                          clipPath:
                            "polygon(96% 7%, 100% 0, 100% 43%, 100% 100%, 68% 100%, 32% 100%, 0 100%, 0 7%)",
                        }}
                      >
                        <h1 className="text-base font-semibold underline">
                          Follow{" "}
                          <span className="italic">
                            {mediaInfo?.details?.title
                              ? mediaInfo?.details?.title
                              : "this Movie"}
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
                    <div className="w-full text-center py-20 px-10 bg-black/40 rounded-sm">
                      <h1 className="text-base font-semibold sm:text-base">
                        No official links available
                      </h1>
                    </div>
                  ))}
              </div>
            </div>

            {/* Part 7 : Recomendations */}
            {mediaInfo?.recommendations?.results?.length > 0 && (
              <div className="w-full flex flex-col gap-5">
                <div className="font-medium text-xl">
                  <h1>
                    If you liked{" "}
                    <span className="italic text-textcolor-secondary">
                      {(
                        mediaInfo?.details?.title ||
                        mediaInfo?.details?.name ||
                        "this Movie"
                      )?.replace(".", "")}{" "}
                    </span>
                    , you might also like
                  </h1>
                </div>
                <div className="flex flex-row gap-4 no-scrollbar overflow-x-scroll">
                  {mediaInfo?.recommendations?.results?.map((content) => {
                    return (
                      <div
                        key={content?.id}
                        onClick={() => mediaType(content)}
                        className="relative flex-shrink-0 group"
                      >
                        <div className="relative w-[15rem] aspect-video overflow-hidden rounded-t-sm flex-shrink-0 cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out 460:w-[18rem]">
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
                          <div className="absolute z-1 bottom-0 bg-black/90 w-full flex flex-col gap-[5px] px-2 py-[5px] opacity-0 group-hover:opacity-100 transition duration-200 460:gap-2 460:py-2">
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
                                    <RiBookmarkFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  ) : (
                                    <RiBookmarkLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  )}
                                </div>
                                <div
                                  onClick={() =>
                                    saveProfileMedia(content, "favourite")
                                  }
                                  className="p-[0.1rem]"
                                >
                                  {showSavedProfileMedia(content, "favourite") ? (
                                    <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                                  ) : (
                                    <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  )}
                                </div>
                              </div>
                              <div className="rounded-full border-[#A9A9A9] border p-[0.1rem]">
                                <Info className="w-6 h-6 text-[#A9A9A9]" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 font-medium text-[#A9A9A9] text-xs 460:text-sm">
                              <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                <h1>
                                  ★ {content.vote_average.toFixed(1) || "0.0"}
                                </h1>
                              </div>
                              <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                <h1>
                                  {(
                                    content.release_date ||
                                    content.first_air_date
                                  )?.slice(0, 4) || "N/A"}
                                </h1>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {content.genre_ids.length === 0 ? (
                                <h1 className="text-sm font-medium">
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
                                      className="text-sm font-medium"
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
                            <div className="absolute m-1 left-1 bottom-1 rounded-2xl px-3 py-1 bg-black/60 border-sm transition-transform duration-200 group-hover:-translate-y-23 460:group-hover:-translate-y-30">
                              <h1 className="text-xs font-semibold 460:text-sm">
                                {(content?.title || content?.name).split(
                                  /:|-/,
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
