import {
  IMG_POSTER_BASE_URL,
  IMG_HERO_BACKDROP_BASE_URL,
  IMG_HERO_POSTER_BASE_URL,
} from "@/Utils/SceneryAPI/SceneryAPI";
import {
  RiAddFill,
  RiHeartFill,
  RiHeartLine,
  RiPlayFill,
  RiCalendarEventLine,
  RiMoneyDollarCircleLine,
  RiWallet3Line,
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
import { Wikipedia } from "react-bootstrap-icons";
import NoProfile from "@/Assets/Imgs/Avatars/NoProfile.png";
import NoProvider from "@/Assets/Imgs/Logo/NoProvider.png";
import NoStudio from "@/Assets/Imgs/Logo/NoStudio.png";
import NoPoster from "@/Assets/Imgs/Logo/NoPoster.png";
import NoBackdrop from "@/Assets/Imgs/Logo/NoBackdrop.png";

/* To show trailer */
export const ShowTrailerUI = ({
  playTrailerInitialVideoKey,
  setShowTrailer,
  playTrailerVideoKey,
}) => {
  return (
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
              className="flex justify-center items-center w-9 h-9 p-2 rounded-full bg-bg-whiteColor/90 font-bold text-text-ternary cursor-pointer active:scale-95"
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
  );
};

/* Media info background */
export const MediaInfoBackground = ({ backdropPathUrl }) => {
  return (
    <div className="absolute z-0 w-full h-[75dvh] min-h-100 overflow-hidden">
      <img
        className="absolute z-0 inset-0 w-full h-full object-cover object-top"
        src={`${IMG_HERO_BACKDROP_BASE_URL}${backdropPathUrl}`}
        alt="Background"
      />
      {/* Fades top & bottoms */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-bg-coreColor/10 via-transparent to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-bg-coreColor via-bg-coreColor/10 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-bg-coreColor via-bg-coreColor/40 to-transparent" />
    </div>
  );
};

/* Media info poster */
export const MediaInfoPoster = ({
  posterPathUrl,
  regionalWatchProviderFirstValue,
}) => {
  return (
    <div className="hidden flex-col shrink-0  880:flex 880:w-[18rem]">
      <img
        src={
          posterPathUrl
            ? `${IMG_HERO_POSTER_BASE_URL}${posterPathUrl}`
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
            <h1 className="text-sm text-text-secondary">Now Streaming</h1>
            <h2 className="text-sm font-medium">Watch Now</h2>
          </div>
        </div>
      )}
    </div>
  );
};

/* Media genric info */
export const MediaGenricInfo = ({
  mediaDetails,
  mediaInfoTitle,
  mediaCertification,
  mediaDate,
  mediaCountry,
  tvShowGenres,
  movieGenres,
  movieRuntime,
  mediaRatings,
  mediaVotes,
  mediaTagline,
  mediaOverview,
  tvShowCreator,
  movieDirector,
  movieWriter,
  videoTrailer,
  setPlayTrailerVideoKey,
  playTrailerInitialVideoKey,
  setShowTrailer,
  saveProfileMedia,
  showSavedProfileMedia,
}) => {
  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      {/* Title */}
      <h1 className="text-3xl font-medium sm:text-4xl">
        {mediaInfoTitle || "N/A"}
      </h1>

      <div className="flex items-center flex-wrap text-sm gap-2">
        {/* Certification */}
        {mediaCertification && (
          <h2 className="text-text-secondary border rounded-sm px-1.5 whitespace-nowrap">
            {mediaCertification}
          </h2>
        )}

        {/* Release / First Air Date - for movies & tv shows & Origin country */}
        {(mediaDate || mediaCountry) && (
          <div className="flex gap-1">
            <h1>{mediaDate?.slice(0, 4)}</h1>
            {mediaCountry && <h2>({mediaCountry})</h2>}
          </div>
        )}

        {/* Genres for tvshows */}
        {tvShowGenres?.length > 0 && (
          <div className="flex gap-2">
            <h2>•</h2>
            {tvShowGenres?.slice(0, 2)?.map((val) => (
              <h2 key={val.id}>
                {val?.name === "Science Fiction"
                  ? "Sci-Fi"
                  : val?.name?.split(" ")[0]}
              </h2>
            ))}
          </div>
        )}

        {/* Genre & runtime for movie */}
        {(movieGenres?.length > 0 || (movieRuntime !== 0 && movieRuntime)) && (
          <div className="flex gap-2 flex-wrap">
            {/* Movie genres */}
            {movieGenres?.length > 0 && (
              <div className="flex gap-2">
                <h2>•</h2>
                {movieGenres?.slice(0, 2)?.map((val) => (
                  <h2 key={val.id}>
                    {val?.name === "Science Fiction"
                      ? "Sci-Fi"
                      : val?.name?.split(" ")[0]}
                  </h2>
                ))}
              </div>
            )}

            {/* Movie runtime */}
            {movieRuntime !== 0 && movieRuntime && (
              <div className="flex gap-2">
                <h2>•</h2>
                <h2>
                  {`${Math.floor(movieRuntime / 60) === 0 ? "" : Math.floor(mediaDetails?.runtime / 60)}${Math.floor(mediaDetails?.runtime / 60) === 0 ? "" : "h"} ${(mediaDetails?.runtime % 60)?.toString()?.padStart(2, "0")}m`}
                </h2>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ratings and Votes */}
      {(mediaRatings !== null || mediaVotes !== null) && (
        <div className="flex gap-2 items-center text-base">
          {mediaRatings !== null && (
            <h3 className="font-medium">
              <span className="text-text-fifth">★ </span>
              {mediaRatings?.toFixed(1) || "N/A"}
            </h3>
          )}

          {mediaVotes !== null && (
            <h3 className="text-sm">({`${mediaVotes} Votes`})</h3>
          )}
        </div>
      )}

      {/* Tagline */}
      {mediaTagline && (
        <h4 className="italic text-text-secondary ">{mediaTagline}</h4>
      )}

      {/* Overview */}
      {mediaOverview && (
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-medium">Overview</h1>
          <p className="text-sm sm:text-base">{mediaOverview}</p>
        </div>
      )}

      {/* Director or Creater for tvshows */}
      {tvShowCreator?.length > 0 && (
        <div className="max-w-2xl flex gap-x-10 gap-y-5 flex-wrap items-center pt-4 text-base cursor-pointer">
          {tvShowCreator?.length > 0 &&
            tvShowCreator?.map((creator, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    creator &&
                    mediaInfoTitle &&
                    window.open(
                      `https://www.google.com/search?q=${creator}+creator+of+${mediaInfoTitle}`,
                    )
                  }
                  target="_blank"
                  className="flex flex-col gap-1"
                >
                  <h1 className="text-base font-semibold underline">
                    {creator}
                  </h1>
                  <p className="text-sm text-text-primary/90">Creater</p>
                </div>
              );
            })}
        </div>
      )}

      {/* Director and writer for movies */}
      {(movieDirector || movieWriter) && (
        <div className="max-w-2xl flex gap-x-10 gap-y-5 flex-wrap items-center pt-4 text-base cursor-pointer">
          {movieDirector && (
            <div
              onClick={() =>
                movieDirector &&
                mediaDetails?.title &&
                window.open(
                  `https://www.google.com/search?q=${movieDirector}+director+of+${mediaDetails?.title}`,
                )
              }
              target="_blank"
              className="flex flex-col gap-1"
            >
              <h1 className="text-base font-semibold underline">
                {movieDirector}
              </h1>
              <p className="text-sm text-text-primary/90">Director</p>
            </div>
          )}
          {movieWriter && (
            <div
              onClick={() =>
                movieWriter &&
                mediaDetails?.title &&
                window.open(
                  `https://www.google.com/search?q=${movieWriter}+writer+of+${mediaDetails?.title}`,
                )
              }
              target="_blank"
              className="flex flex-col gap-1"
            >
              <h1 className="text-base font-semibold underline">
                {movieWriter}
              </h1>
              <p className="text-sm text-text-primary/60">Writer</p>
            </div>
          )}
        </div>
      )}

      {/* Trailer, Watch later & fav */}
      <div className="flex gap-4 pt-5 flex-wrap 430:flex-nowrap">
        {/* Play video trailer */}
        {videoTrailer?.length > 0 && (
          <div
            onClick={() => {
              setPlayTrailerVideoKey(playTrailerInitialVideoKey);
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
            onClick={() => saveProfileMedia(mediaDetails, "watchLater")}
            className="w-full flex justify-center items-center gap-2 border border-br-secondary/60 pl-2 pr-3 py-2 rounded cursor-pointer active:scale-95"
          >
            {showSavedProfileMedia(mediaDetails, "watchLater") ? (
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
            onClick={() => saveProfileMedia(mediaDetails, "favourite")}
            className="w-full flex justify-center items-center gap-2 border border-br-secondary/60 px-3 py-2 rounded cursor-pointer active:scale-95"
          >
            {showSavedProfileMedia(mediaDetails, "favourite") ? (
              <RiHeartFill className="w-[1.80rem] h-[1.80rem] text-text-fourth" />
            ) : (
              <RiHeartLine className="w-[1.80rem] h-[1.80rem] text-text-secondary" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* More media info */
export const MoreMediaInfo = ({
  mediaDate,
  mediaSeasons,
  mediaBudget,
  mediaEpisodes,
  mediaRevenue,
  mediaStatus,
}) => {
  return (
    <div className="w-full flex flex-col gap-5 880:flex-row 880:gap-10">
      {/* Date */}
      {mediaDate && (
        <div className="w-full flex items-center gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
          <div className="flex justify-center items-center">
            <RiCalendarEventLine className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">Release Date</h1>
            <h2 className="text-base">
              {mediaDate?.replaceAll("-", "/") || "N/A"}
            </h2>
          </div>
        </div>
      )}

      {/* Seasons for tv show */}
      {mediaSeasons && (
        <div className="w-full flex items-center gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
          <div className="flex justify-center items-center">
            <RiSlideshowView className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">Seasons</h1>
            <h2 className="text-base">
              {mediaSeasons ? `${mediaSeasons}` : "N/A"}
            </h2>
          </div>
        </div>
      )}

      {/* Budget for movies */}
      {mediaBudget && (
        <div className="w-full flex items-center gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
          <div className="flex justify-center items-center">
            <RiMoneyDollarCircleLine className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">Budget</h1>
            <h2 className="text-base">
              {mediaBudget > 0
                ? `$${mediaBudget?.toLocaleString("en-US")}`
                : "N/A"}
            </h2>
          </div>
        </div>
      )}

      {/* Total episodes for tv shows */}
      {mediaEpisodes && (
        <div className="w-full flex items-center gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
          <div className="flex justify-center items-center">
            <RiVideoLine className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">Episodes</h1>
            <h2 className="text-base">
              {mediaEpisodes ? `${mediaEpisodes}` : "N/A"}
            </h2>
          </div>
        </div>
      )}

      {/* Total revenue for movies */}
      {mediaRevenue && (
        <div className="w-full flex items-center gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
          <div className="flex justify-center items-center">
            <RiWallet3Line className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">Revenue</h1>
            <h2 className="text-base">
              {mediaRevenue > 0
                ? `$${mediaRevenue?.toLocaleString("en-US")}`
                : "N/A"}
            </h2>
          </div>
        </div>
      )}

      {/* Status */}
      {mediaStatus && (
        <div className="w-full flex items-center gap-2 p-4 bg-bg-blackColor/40 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
          <div className="flex justify-center items-center">
            <RiFilmAiLine className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">Status</h1>
            <h2 className="text-base">{mediaStatus}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

/* Media info cast */
export const MediaInfoCast = ({
  mediaDetails,
  mediaCast,
  castScrollRefs,
  tvShowInfoCast,
  movieInfoCast,
}) => {
  return (
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
          {tvShowInfoCast === "tvShowInfoCast" &&
            mediaCast?.map((cast, index) => {
              const castRoles =
                cast?.roles?.length > 0
                  ? cast?.roles
                      ?.slice(0, 1)
                      ?.map((roles) => roles?.character)
                      ?.join(", ")
                  : null;
              const query =
                cast?.name && castRoles && mediaDetails?.name
                  ? encodeURIComponent(
                      `${cast?.name} as ${castRoles} of ${mediaDetails?.name}`,
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
                  key={index}
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
          {movieInfoCast == "movieInfoCast" &&
            mediaCast?.map((cast, index) => {
              const query =
                cast?.name && cast?.character && mediaDetails?.title
                  ? encodeURIComponent(
                      `${cast?.name} as ${cast?.character} from ${mediaDetails?.title}`,
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
                  key={index}
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
                    {cast?.character && (
                      <h2 className="text-sm text-text-secondary">
                        {cast?.character}
                      </h2>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

/* Media info trailers */
export const MediaInfoTrailers = ({
  videoTrailer,
  setPlayTrailerVideoKey,
  setShowTrailer,
}) => {
  return (
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
  );
};

/* Media info series detail (only for tvshows) */
export const MediaInfoSeriesDetails = ({
  mediaDetails,
  mediaInfoTitle,
  seriesDetailsSection,
  setSeriesDetailsSection,
  mediaInfoSeriesNetworks,
  mediaInfoSeriesSeasons,
  mediaInfoSeriesLastEpisode,
  mediaInfoSeriesNextEpisode,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="font-medium text-xl">
        <h1>Series Details</h1>
      </div>
      <div className="w-full flex flex-col justify-around gap-5 rounded-lg cursor-pointer">
        {/* Rendering Networks */}
        <div
          onClick={() =>
            setSeriesDetailsSection((prev) =>
              prev === "Networks" ? null : "Networks",
            )
          }
          className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${seriesDetailsSection === "Networks" && "underline text-text-primary/60"}`}
        >
          <div className="flex gap-2">
            <RiChatQuoteLine className="w-6 h-6 430:w-7 430:h-7" />
            <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
              Networks
            </h1>
          </div>
          {seriesDetailsSection === "Networks" ? (
            <RiArrowUpWideLine />
          ) : (
            <RiArrowDownWideLine />
          )}
        </div>
        {seriesDetailsSection === "Networks" &&
          (mediaInfoSeriesNetworks?.length > 0 ? (
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
                    {(mediaInfoTitle || "this title")?.replace(".", "")}
                  </span>
                </h1>
                <div className="w-full max-h-70 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-6 cursor-pointer">
                  {mediaInfoSeriesNetworks?.map((network) => {
                    return (
                      <div
                        key={network.id}
                        onClick={() =>
                          network?.name &&
                          mediaInfoTitle &&
                          window.open(
                            `https://www.google.com/search?q=${network?.name}+Networks+${mediaInfoTitle}`,
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
            setSeriesDetailsSection((prev) =>
              prev === "Seasons" ? null : "Seasons",
            )
          }
          className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${seriesDetailsSection === "Seasons" && "underline text-text-primary/60"}`}
        >
          <div className="flex gap-2">
            <RiChatQuoteLine className="w-6 h-6 430:w-7 430:h-7" />
            <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
              Seasons
            </h1>
          </div>
          {seriesDetailsSection === "Seasons" ? (
            <RiArrowUpWideLine />
          ) : (
            <RiArrowDownWideLine />
          )}
        </div>
        {seriesDetailsSection === "Seasons" &&
          (mediaInfoSeriesSeasons?.length > 0 ? (
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
                    {(mediaInfoTitle || "this title")?.replace(".", "")}
                  </span>
                </h1>
                <div className="w-full max-h-120 pr-3 overflow-y-auto custom-scrollbar flex flex-col gap-8 430:pr-5">
                  {/* All seasons */}
                  {mediaInfoSeriesSeasons?.map((season) => {
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
                                  mediaDetails?.poster_path
                                    ? `${IMG_POSTER_BASE_URL}${season?.poster_path || mediaDetails?.poster_path}`
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
                                    {season?.air_date?.replaceAll("-", "/")}
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
                                      {season?.vote_average?.toFixed(1) ||
                                        "N/A"}
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
                                      Season : {season?.season_number || "N/A"}
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
                                  <p className="text-sm">{season?.overview}</p>
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
            setSeriesDetailsSection((prev) =>
              prev === "Airing" ? null : "Airing",
            )
          }
          className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${seriesDetailsSection === "Airing" && "underline text-text-primary/60"}`}
        >
          <div className="flex gap-2">
            <RiHourglass2Line className="w-6 h-6 430:w-7 430:h-7" />
            <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
              Airing
            </h1>
          </div>
          {seriesDetailsSection === "Airing" ? (
            <RiArrowUpWideLine />
          ) : (
            <RiArrowDownWideLine />
          )}
        </div>
        {seriesDetailsSection === "Airing" &&
          ((mediaInfoSeriesLastEpisode || mediaInfoSeriesNextEpisode) !==
          null ? (
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
                  {mediaInfoSeriesLastEpisode !== null ? (
                    <div className="flex flex-col gap-5 border-[0.1px] border-br-primary rounded-2xl">
                      <div className="p-5 border-b-[0.1px] border-br-primary">
                        <h1 className="text-lg font-semibold">
                          <span className="italic">{`${mediaInfoTitle ? mediaInfoTitle : "Show"}'s`}</span>{" "}
                          last episode
                        </h1>
                      </div>
                      <div className="w-full flex flex-col gap-5 cursor-pointer p-5">
                        <div className="w-full h-full flex flex-col gap-8 840:flex-row">
                          {/* Episode's poster */}
                          <div className="relative w-full aspect-video overflow-hidden rounded-sm shrink-0 840:w-[20rem]">
                            <img
                              src={
                                mediaInfoSeriesLastEpisode?.still_path ||
                                mediaDetails?.backdrop_path
                                  ? `${IMG_POSTER_BASE_URL}${mediaInfoSeriesLastEpisode?.still_path || mediaDetails?.backdrop_path}`
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
                              {mediaInfoSeriesLastEpisode?.name || "N/A"}
                            </h1>

                            <div className="flex items-center gap-2 flex-wrap text-sm">
                              {/* Episode's air date */}
                              {mediaInfoSeriesLastEpisode?.air_date && (
                                <h2>
                                  (
                                  {mediaInfoSeriesLastEpisode?.air_date?.replaceAll(
                                    "-",
                                    "/",
                                  )}
                                  )
                                </h2>
                              )}

                              {/* Episode's type */}
                              {mediaInfoSeriesLastEpisode?.episode_type && (
                                <div className="flex">
                                  <h2>
                                    •{" "}
                                    {mediaInfoSeriesLastEpisode?.episode_type
                                      ?.charAt(0)
                                      ?.toUpperCase() +
                                      mediaInfoSeriesLastEpisode?.episode_type?.slice(
                                        1,
                                      )}
                                  </h2>
                                </div>
                              )}

                              {/* Episode's runtime */}
                              {mediaInfoSeriesLastEpisode?.runtime !== 0 &&
                                mediaInfoSeriesLastEpisode?.runtime && (
                                  <div className="flex">
                                    <h2>
                                      •{" "}
                                      {`${Math.floor(mediaInfoSeriesLastEpisode?.runtime / 60) === 0 ? "" : Math.floor(mediaInfoSeriesLastEpisode?.runtime / 60)}${Math.floor(mediaInfoSeriesLastEpisode?.runtime / 60) === 0 ? "" : "h"} ${(mediaInfoSeriesLastEpisode?.runtime % 60)?.toString()?.padStart(2, "0")}m`}
                                    </h2>
                                  </div>
                                )}
                            </div>

                            {/* Episode's ratings and votes */}
                            {(mediaInfoSeriesLastEpisode?.vote_average !==
                              null ||
                              mediaInfoSeriesLastEpisode?.vote_count !==
                                null) && (
                              <div className="flex gap-2 items-center text-base flex-wrap">
                                {mediaInfoSeriesLastEpisode?.vote_average !==
                                  null && (
                                  <h3 className="font-medium text-nowrap">
                                    <span className="text-text-fifth">★ </span>
                                    {mediaInfoSeriesLastEpisode?.vote_average?.toFixed(
                                      1,
                                    ) || "N/A"}
                                  </h3>
                                )}
                                {mediaInfoSeriesLastEpisode?.vote_count !==
                                  null && (
                                  <h3 className="text-sm text-nowrap">
                                    (
                                    {`${mediaInfoSeriesLastEpisode?.vote_count} Votes`}
                                    )
                                  </h3>
                                )}
                              </div>
                            )}

                            {/* Season & episode number */}
                            {(mediaInfoSeriesLastEpisode?.season_number !==
                              null ||
                              mediaInfoSeriesLastEpisode?.episode_number !==
                                null) && (
                              <div className="flex gap-4 items-center text-base">
                                {mediaInfoSeriesLastEpisode?.season_number !==
                                  null && (
                                  <h3 className="text-sm px-2 py-[0.10rem] rounded-4xl bg-bg-whiteColor/10 backdrop-blur-md border border-br-primary text-nowrap">
                                    S
                                    {mediaInfoSeriesLastEpisode?.season_number ||
                                      "N/A"}{" "}
                                    {mediaInfoSeriesLastEpisode?.episode_number !==
                                      null && (
                                      <span>
                                        • E
                                        {mediaInfoSeriesLastEpisode?.episode_number ||
                                          "N/A"}
                                      </span>
                                    )}
                                  </h3>
                                )}
                              </div>
                            )}

                            {/* If episode's poster unavailable */}
                            {mediaInfoSeriesLastEpisode?.still_path ===
                              null && (
                              <h4 className="italic text-text-secondary text-sm">
                                (Episode's poster unavailable)
                              </h4>
                            )}

                            {/* Episodes's overview */}
                            {mediaInfoSeriesLastEpisode?.overview && (
                              <div className="flex flex-col gap-2">
                                <h1 className="text-base font-medium">
                                  Overview
                                </h1>
                                <p className="text-sm">
                                  {mediaInfoSeriesLastEpisode?.overview}
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
                  {mediaInfoSeriesNextEpisode !== null ? (
                    <div className="flex flex-col gap-5 border-[0.1px] border-br-primary rounded-2xl">
                      <div className="p-5 border-b-[0.1px] border-br-primary">
                        <h1 className="text-lg font-semibold">
                          <span className="italic">{`${mediaInfoTitle ? mediaInfoTitle : "Show"}'s`}</span>
                          next episode
                        </h1>
                      </div>
                      <div className="w-full flex flex-col gap-5 cursor-pointer p-5">
                        <div className="w-full h-full flex flex-col gap-8 840:flex-row">
                          {/* Episode's poster */}
                          <div className="relative w-full aspect-video overflow-hidden rounded-sm shrink-0 840:w-[20rem]">
                            <img
                              src={
                                mediaInfoSeriesNextEpisode?.still_path ||
                                mediaDetails?.backdrop_path
                                  ? `${IMG_POSTER_BASE_URL}${mediaInfoSeriesNextEpisode?.still_path || mediaDetails?.backdrop_path}`
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
                              {mediaInfoSeriesNextEpisode?.name || "N/A"}
                            </h1>

                            <div className="flex items-center gap-2 flex-wrap text-sm">
                              {/* Episode's air date */}
                              {mediaInfoSeriesNextEpisode?.air_date && (
                                <h2>
                                  (
                                  {mediaInfoSeriesNextEpisode?.air_date?.replaceAll(
                                    "-",
                                    "/",
                                  )}
                                  )
                                </h2>
                              )}

                              {/* Episode's type */}
                              {mediaInfoSeriesNextEpisode?.episode_type && (
                                <div className="flex">
                                  <h2>
                                    •{" "}
                                    {mediaInfoSeriesNextEpisode?.episode_type
                                      ?.charAt(0)
                                      ?.toUpperCase() +
                                      mediaInfoSeriesNextEpisode?.episode_type?.slice(
                                        1,
                                      )}
                                  </h2>
                                </div>
                              )}

                              {/* Episode's runtime */}
                              {mediaInfoSeriesNextEpisode?.runtime !== 0 &&
                                mediaInfoSeriesNextEpisode?.runtime && (
                                  <div className="flex">
                                    <h2>
                                      •{" "}
                                      {`${Math.floor(mediaInfoSeriesNextEpisode?.runtime / 60) === 0 ? "" : Math.floor(mediaInfoSeriesNextEpisode?.runtime / 60)}${Math.floor(mediaInfoSeriesNextEpisode?.runtime / 60) === 0 ? "" : "h"} ${(mediaInfoSeriesNextEpisode?.runtime % 60)?.toString()?.padStart(2, "0")}m`}
                                    </h2>
                                  </div>
                                )}
                            </div>

                            {/* Episode's ratings and votes */}
                            {(mediaInfoSeriesNextEpisode?.vote_average !==
                              null ||
                              mediaInfoSeriesNextEpisode?.vote_count !==
                                null) && (
                              <div className="flex gap-2 items-center text-base flex-wrap">
                                {mediaInfoSeriesNextEpisode?.vote_average !==
                                  null && (
                                  <h3 className="font-medium text-nowrap">
                                    <span className="text-text-fifth">★ </span>
                                    {mediaInfoSeriesNextEpisode?.vote_average?.toFixed(
                                      1,
                                    ) || "N/A"}
                                  </h3>
                                )}
                                {mediaInfoSeriesNextEpisode?.vote_count !==
                                  null && (
                                  <h3 className="text-sm text-nowrap">
                                    (
                                    {`${mediaInfoSeriesNextEpisode?.vote_count} Votes`}
                                    )
                                  </h3>
                                )}
                              </div>
                            )}

                            {/* Season & episode number */}
                            {(mediaInfoSeriesNextEpisode?.season_number !==
                              null ||
                              mediaInfoSeriesNextEpisode?.episode_number !==
                                null) && (
                              <div className="flex gap-4 items-center text-base">
                                {mediaInfoSeriesNextEpisode?.season_number !==
                                  null && (
                                  <h3 className="text-sm px-2 py-[0.10rem] rounded-4xl bg-bg-whiteColor/10 backdrop-blur-md border border-br-primary text-white text-nowrap">
                                    S
                                    {mediaInfoSeriesNextEpisode?.season_number ||
                                      "N/A"}{" "}
                                    {mediaInfoSeriesNextEpisode?.episode_number !==
                                      null && (
                                      <span>
                                        • E
                                        {mediaInfoSeriesNextEpisode?.episode_number ||
                                          "N/A"}
                                      </span>
                                    )}
                                  </h3>
                                )}
                              </div>
                            )}

                            {/* If episode's poster unavailable */}
                            {mediaInfoSeriesNextEpisode?.still_path ===
                              null && (
                              <h4 className="italic text-text-secondary text-sm">
                                (Episode's poster unavailable)
                              </h4>
                            )}

                            {/* Episodes's overview */}
                            {mediaInfoSeriesNextEpisode?.overview && (
                              <div className="flex flex-col gap-2">
                                <h1 className="text-base font-medium">
                                  Overview
                                </h1>
                                <p className="text-sm">
                                  {mediaInfoSeriesNextEpisode?.overview}
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
  );
};

/* Media info browse more */
export const MediaInfoBrowseMore = ({
  mediaDetails,
  mediaInfoTitle,
  mediaInfoOverview,
  browseMoreSection,
  setBrowseMoreSection,
  mediaInfoReviews,
  mediaInfoStudios,
  mediaInfoRegionalWatchProviderType,
  mediaInfoWatchProviders,
  mediasSocialsCheck,
  mediaInfoSocialAccounts,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-medium text-xl">
        <h1>Browse More</h1>
      </div>
      <div className="w-full flex flex-col justify-around gap-5 rounded-lg cursor-pointer">
        {/* Rendering Reviews */}
        <div
          onClick={() =>
            setBrowseMoreSection((prev) =>
              prev === "Reviews" ? null : "Reviews",
            )
          }
          className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${browseMoreSection === "Reviews" && "underline text-text-primary/60"}`}
        >
          <div className="flex gap-2">
            <RiChatQuoteLine className="w-6 h-6 430:w-7 430:h-7" />
            <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
              Reviews
            </h1>
          </div>
          {browseMoreSection === "Reviews" ? (
            <RiArrowUpWideLine />
          ) : (
            <RiArrowDownWideLine />
          )}
        </div>
        {browseMoreSection === "Reviews" &&
          (mediaInfoReviews?.length > 0 ? (
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
                    {(mediaInfoTitle || "this title")?.replace(".", "")}
                  </span>
                </h1>
                <div className="w-full max-h-100 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-3 cursor-pointer 430:pr-5">
                  {mediaInfoReviews?.map((review) => {
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
            setBrowseMoreSection((prev) =>
              prev === "Studios" ? null : "Studios",
            )
          }
          className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${browseMoreSection === "Studios" && "underline text-text-primary/60"}`}
        >
          <div className="flex gap-2">
            <RiFilmLine className="w-6 h-6 430:w-7 430:h-7" />
            <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
              Studios
            </h1>
          </div>
          {browseMoreSection === "Studios" ? (
            <RiArrowUpWideLine />
          ) : (
            <RiArrowDownWideLine />
          )}
        </div>
        {browseMoreSection === "Studios" &&
          (mediaInfoStudios?.length > 0 ? (
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
                    {(mediaInfoTitle || "this title")?.replace(".", "")}
                  </span>
                </h1>
                <div className="w-full max-h-70 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-6 cursor-pointer">
                  {mediaInfoStudios?.map((studio) => {
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
                  })}
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
            setBrowseMoreSection((prev) =>
              prev === "Providers" ? null : "Providers",
            )
          }
          className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${browseMoreSection === "Providers" && "underline text-text-primary/60"}`}
        >
          <div className="flex gap-2">
            <RiMovie2Line className="w-6 h-6 430:w-7 430:h-7" />
            <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
              Providers
            </h1>
          </div>
          {browseMoreSection === "Providers" ? (
            <RiArrowUpWideLine />
          ) : (
            <RiArrowDownWideLine />
          )}
        </div>
        {browseMoreSection === "Providers" &&
          (mediaInfoRegionalWatchProviderType?.length > 0 ? (
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
                    {(mediaInfoTitle || "this title")?.replace(".", "")}
                  </span>{" "}
                  available on
                </h1>
                <div className="w-full max-h-100 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-3 cursor-pointer 430:pr-5">
                  {/* Buy */}
                  {mediaInfoWatchProviders?.buy?.length > 0 && (
                    <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                      <h1 className="text-base font-semibold underline">
                        Buy to own
                      </h1>
                      <div className="flex flex-col gap-5 cursor-pointer">
                        {mediaInfoWatchProviders?.buy?.map((platform) => {
                          const query =
                            mediaInfoTitle &&
                            mediaInfoOverview &&
                            platform?.provider_name
                              ? encodeURIComponent(
                                  `Show ${mediaInfoTitle} with overview ${mediaInfoOverview} on ${platform?.provider_name}`,
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
                                {platform?.provider_name || "Name unavailable"}
                              </h1>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Flatrate */}
                  {mediaInfoWatchProviders?.flatrate?.length > 0 && (
                    <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                      <h1 className="text-base font-semibold underline">
                        Included with subscription
                      </h1>
                      <div className="flex flex-col gap-5 cursor-pointer">
                        {mediaInfoWatchProviders?.flatrate?.map((platform) => {
                          const query =
                            mediaInfoTitle &&
                            mediaInfoOverview &&
                            platform?.provider_name
                              ? encodeURIComponent(
                                  `Show ${mediaInfoTitle} with overview ${mediaInfoOverview} on ${platform?.provider_name}`,
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
                                {platform?.provider_name || "Name unavailable"}
                              </h1>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Rent */}
                  {mediaInfoWatchProviders?.rent?.length > 0 && (
                    <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                      <h1 className="text-base font-semibold underline">
                        Rent & watch
                      </h1>
                      <div className="flex flex-col gap-5 cursor-pointer">
                        {mediaInfoWatchProviders?.rent?.map((platform) => {
                          const query =
                            mediaInfoTitle &&
                            mediaInfoOverview &&
                            platform?.provider_name
                              ? encodeURIComponent(
                                  `Show ${mediaInfoTitle} with overview ${mediaInfoOverview} on ${platform?.provider_name}`,
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
                                {platform?.provider_name || "Name unavailable"}
                              </h1>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {/* Ads */}
                  {mediaInfoWatchProviders?.ads?.length > 0 && (
                    <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                      <h1 className="text-base font-semibold underline">
                        Watch with ads
                      </h1>
                      <div className="flex flex-col gap-5 cursor-pointer">
                        {mediaInfoWatchProviders?.ads?.map((platform) => {
                          const query =
                            mediaInfoTitle &&
                            mediaInfoOverview &&
                            platform?.provider_name
                              ? encodeURIComponent(
                                  `Show ${mediaInfoTitle} with overview ${mediaInfoOverview} on ${platform?.provider_name}`,
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
                                {platform?.provider_name || "Name unavailable"}
                              </h1>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {/* Free */}
                  {mediaInfoWatchProviders?.free?.length > 0 && (
                    <div className="w-full bg-bg-blackColor/40 flex flex-col gap-5 p-8 rounded-md">
                      <h1 className="text-base font-semibold underline">
                        Stream for free
                      </h1>
                      <div className="flex flex-col gap-5 cursor-pointer">
                        {mediaInfoWatchProviders?.free?.map((platform) => {
                          const query =
                            mediaInfoTitle &&
                            mediaInfoOverview &&
                            platform?.provider_name
                              ? encodeURIComponent(
                                  `Show ${mediaInfoTitle} with overview ${mediaInfoOverview} on ${platform?.provider_name}`,
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
                                {platform?.provider_name || "Name unavailable"}
                              </h1>
                            </div>
                          );
                        })}
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
            setBrowseMoreSection((prev) =>
              prev === "Socials" ? null : "Socials",
            )
          }
          className={`flex justify-between gap-4 bg-bg-blackColor/40 p-5 rounded-lg ${browseMoreSection === "Socials" && "underline text-text-primary/60"}`}
        >
          <div className="flex gap-2">
            <RiHashtag className="w-6 h-6 430:w-7 430:h-7" />
            <h1 className="text-base 430:text-lg font-semibold leading-[1.3]">
              Socials
            </h1>
          </div>
          {browseMoreSection === "Socials" ? (
            <RiArrowUpWideLine />
          ) : (
            <RiArrowDownWideLine />
          )}
        </div>
        {browseMoreSection === "Socials" &&
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
                    {(mediaInfoTitle || "this title")?.replace(".", "")}
                  </span>{" "}
                  on Social Media
                </h1>
                <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-5 gap-y-6 mx-auto cursor-pointer">
                  {mediaInfoSocialAccounts?.facebook_id && (
                    <div
                      onClick={() =>
                        mediaInfoSocialAccounts?.facebook_id &&
                        window.open(
                          `https://www.facebook.com/${mediaInfoSocialAccounts?.facebook_id}`,
                          "_blank",
                        )
                      }
                      className="flex gap-2 items-center"
                    >
                      <RiFacebookLine className="w-8 h-8" />
                      <h1 className="text-sm font-normal 430:text-base transition duration-200 ease-in-out hover:underline">
                        Facebook
                      </h1>
                    </div>
                  )}
                  {mediaInfoSocialAccounts?.twitter_id && (
                    <div
                      onClick={() =>
                        mediaInfoSocialAccounts?.twitter_id &&
                        window.open(
                          `https://x.com/${mediaInfoSocialAccounts?.twitter_id}`,
                          "_blank",
                        )
                      }
                      className="flex gap-2 items-center"
                    >
                      <RiTwitterXLine className="w-8 h-8" />
                      <h1 className="text-sm font-normal 430:text-base transition duration-200 ease-in-out hover:underline">
                        Twitter
                      </h1>
                    </div>
                  )}
                  {mediaInfoSocialAccounts?.instagram_id && (
                    <div
                      onClick={() =>
                        mediaInfoSocialAccounts?.instagram_id &&
                        window.open(
                          `https://www.instagram.com/${mediaInfoSocialAccounts?.instagram_id}`,
                          "_blank",
                        )
                      }
                      className="flex gap-2 items-center"
                    >
                      <RiInstagramLine className="w-8 h-8" />
                      <h1 className="text-sm font-normal 430:text-base transition duration-200 ease-in-out hover:underline">
                        Instagram
                      </h1>
                    </div>
                  )}
                  {mediaInfoSocialAccounts?.imdb_id && (
                    <div
                      onClick={() =>
                        mediaInfoSocialAccounts?.imdb_id &&
                        window.open(
                          `https://www.imdb.com/title/${mediaInfoSocialAccounts?.imdb_id}`,
                          "_blank",
                        )
                      }
                      className="flex gap-2 items-center"
                    >
                      <RiFilmLine className="w-8 h-8" />
                      <h1 className="text-sm font-normal 430:text-base transition duration-200 ease-in-out hover:underline">
                        IMDB
                      </h1>
                    </div>
                  )}
                  {mediaInfoSocialAccounts?.tvdb_id && (
                    <div
                      onClick={() =>
                        mediaInfoSocialAccounts?.tvdb_id &&
                        window.open(
                          `https://thetvdb.com/?id=/${mediaInfoSocialAccounts?.tvdb_id}&tab=series`,
                          "_blank",
                        )
                      }
                      className="flex gap-2 items-center"
                    >
                      <RiSlideshow4Line className="w-8 h-8" />
                      <h1 className="text-sm font-normal 430:text-base transition duration-200 ease-in-out hover:underline">
                        TVDB
                      </h1>
                    </div>
                  )}
                  {mediaDetails?.homepage && (
                    <div
                      onClick={() =>
                        mediaDetails?.homepage &&
                        window.open(mediaDetails?.homepage, "_blank")
                      }
                      className="flex gap-2 items-center"
                    >
                      <RiGlobalLine className="w-8 h-8" />
                      <h1 className="text-sm font-normal 430:text-base transition duration-200 ease-in-out hover:underline">
                        Website
                      </h1>
                    </div>
                  )}
                  {mediaInfoSocialAccounts?.wikidata_id && (
                    <div
                      onClick={() =>
                        mediaInfoSocialAccounts?.wikidata_id &&
                        window.open(
                          `https://www.wikidata.org/wiki/${mediaInfoSocialAccounts?.wikidata_id}`,
                          "_blank",
                        )
                      }
                      className="flex gap-2 items-center"
                    >
                      <Wikipedia className="w-8 h-8" />
                      <h1 className="text-sm font-normal 430:text-base transition duration-200 ease-in-out hover:underline">
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
  );
};