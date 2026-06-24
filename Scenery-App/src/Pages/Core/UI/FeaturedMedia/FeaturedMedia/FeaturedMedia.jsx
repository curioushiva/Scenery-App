import { SCENERY_API_IMG_BACKDROP_BASE_URL } from "@/Utils/SceneryAPI/SceneryAPI";
import {
  RiInformationLine,
  RiPauseCircleLine,
  RiPlayFill,
} from "@remixicon/react";
import { useState } from "react";
import useContent from "@/Utils/Hooks/useContent/useContent";
import { useSelector } from "react-redux";

/* Featured Media Variant one - used in (browse) */
export const FeaturedMediaVariantOne = ({ backgroundVideo }) => {
  /* To access all genre */
  const { allGenres } = useSelector((store) => store.content);

  /* To play and pause the background video , def-pause */
  const [isBgVideoPlaying, setIsBgVideoPlaying] = useState(false);

  /* Media type (for info) */
  const { mediaType } = useContent();

  return (
    <div className="relative w-full min-h-[75dvh] overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {/* Image */}
        {backgroundVideo?.video?.backdrop_path && (
          <img
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-0" : "opacity-100"}`}
            src={`${SCENERY_API_IMG_BACKDROP_BASE_URL}${backgroundVideo?.video?.backdrop_path}`}
            alt="bg"
          />
        )}
        {/* Video */}
        {backgroundVideo?.videoKey && (
          <iframe
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full pointer-events-none scale-135 transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-100" : "opacity-0"}`}
            src={`https://www.youtube.com/embed/${backgroundVideo?.videoKey}?autoplay=1&mute=1&loop=1&playlist=${backgroundVideo?.videoKey}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&start=10`}
            title="video"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        )}
        {/* Fades top & bottoms */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-bg-coreColor/10 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-bg-coreColor via-bg-coreColor/10 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-bg-coreColor via-bg-coreColor/40 to-transparent" />
      </div>
      {/* About Video */}
      <div className="relative z-10 w-full min-h-[75dvh] flex items-end navPadding">
        <div className="max-w-md flex flex-col gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold">
            {backgroundVideo?.video?.title || backgroundVideo?.video?.name}
          </h1>
          {backgroundVideo?.video?.genre_ids?.length !== 0 && (
            <div className="flex flex-row gap-2">
              {allGenres
                ?.filter((list) =>
                  backgroundVideo?.video?.genre_ids?.includes(list?.id),
                )
                ?.slice(0, 2)
                ?.map((val) => (
                  <h3
                    key={val.id}
                    className="text-xm font-semibold lg:text-base px-4 py-[0.15rem] rounded-4xl bg-bg-whiteColor/10 backdrop-blur-md border border-br-primary"
                  >
                    {val?.name === "Science Fiction"
                      ? "Sci-Fi"
                      : val?.name?.split(" ")[0]}
                  </h3>
                ))}
            </div>
          )}
          <p className="text-sm lg:text-base text-text-primary/90 430:hidden">
            {backgroundVideo?.video?.overview
              ?.split(" ")
              ?.slice(0, 19)
              ?.join(" ")}
            ...
          </p>
          <p className="hidden text-sm lg:text-base text-text-primary/90 430:block">
            {backgroundVideo?.video?.overview}
          </p>
          {(backgroundVideo?.video?.release_date ||
            backgroundVideo?.video?.first_air_date) && (
              <h2 className="text-xm font-semibold lg:text-base">
                Released in{" "}
                {(
                  backgroundVideo?.video?.release_date ||
                  backgroundVideo?.video?.first_air_date
                )?.slice(0, 4)}
              </h2>
            )}
          <div className="flex flex-col gap-4 350:flex-row">
            {backgroundVideo?.videoKey && (
              <div
                onClick={() => setIsBgVideoPlaying((prev) => !prev)}
                className="flex justify-center items-center gap-1 text-text-ternary bg-bg-whiteColor pl-1 pr-4 py-2 rounded cursor-pointer"
              >
                {isBgVideoPlaying ? (
                  <>
                    <RiPauseCircleLine />
                    <span className="font-semibold">Pause Trailer</span>
                  </>
                ) : (
                  <>
                    <RiPlayFill />
                    <span className="font-semibold">Play Trailer</span>
                  </>
                )}
              </div>
            )}
            {backgroundVideo?.video?.id && (
              <div
                onClick={() => mediaType(backgroundVideo?.video)}
                className="flex justify-center items-center gap-2 bg-btn-secondary px-4 py-2 rounded cursor-pointer"
              >
                <RiInformationLine />
                <span className="font-semibold">More Info</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Featured Media Variant Two - used in (movies/tvshows) */
export const FeaturedMediaVariantTwo = ({
  backgroundVideo,
  genre,
  genreData,
  sectionName,
  mediaLabel,
  onResetGenre,
  onSelectGenre,
}) => {
  /* To access all genres */
  const { allGenres } = useSelector((store) => store.content);

  /* To check if genre is clicked */
  const [isGenreClicked, setIsGenreClicked] = useState(false);

  /* To play and pause the background video , def-pause */
  const [isBgVideoPlaying, setIsBgVideoPlaying] = useState(false);

  /* Media type (for info) */
  const { mediaType } = useContent();

  return (
    <div className="relative w-full min-h-[75dvh] overflow-hidden">
      {/* Bottom Layer */}
      <div className="absolute inset-0 z-0">
        {/* Image */}
        {backgroundVideo?.video?.backdrop_path && (
          <img
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-0" : "opacity-100"}`}
            src={`${SCENERY_API_IMG_BACKDROP_BASE_URL}${backgroundVideo?.video?.backdrop_path}`}
            alt="bg"
          />
        )}
        {/* Video */}
        {backgroundVideo?.videoKey && (
          <iframe
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full pointer-events-none scale-135 transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-100" : "opacity-0"}`}
            src={`https://www.youtube.com/embed/${backgroundVideo?.videoKey}?autoplay=1&mute=1&loop=1&playlist=${backgroundVideo?.videoKey}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&start=10`}
            title="video"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        )}

        {/* Fades top & bottoms */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-bg-coreColor/10 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-bg-coreColor via-bg-coreColor/10 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-bg-coreColor via-bg-coreColor/40 to-transparent" />
      </div>
      {/* Top Layer */}
      <div className="relative z-10 w-full min-h-[75dvh] flex flex-col justify-between gap-10 navPadding">
        {/* Genre */}
        {genre.length > 0 ? (
          <div className="relative z-20 flex flex-row items-start justify-start gap-1 flex-wrap">
            <h1
              onClick={() => {
                setIsGenreClicked(false);
                onResetGenre();
                setIsBgVideoPlaying(false);
              }}
              className="text-xl font-normal leading-8 text-text-primary/90 cursor-pointer"
            >{`${sectionName} >`}</h1>
            <h1 className="text-3xl font-medium leading-none">
              {genre[0]?.genre} {mediaLabel}
            </h1>
          </div>
        ) : (
          <div className="relative z-20 flex flex-col gap-6 350:flex-row">
            <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
              {sectionName}
            </h1>
            <div
              onClick={() => {
                setIsGenreClicked((prev) => !prev);
              }}
              className="w-fit flex justify-center items-center gap-2 cursor-pointer px-2 border lg:gap-7 lg:py-[0.1rem] hover:bg-bg-whiteColor/30"
            >
              <h1 className="font-medium text-[0.70rem] lg:text-[0.80rem]">
                Genres
              </h1>
              <svg
                className={`w-3 transition-transform duration-300 ${isGenreClicked ? "rotate-180" : "rotate-0"}`}
                viewBox="8 10 8 4"
                fill="currentColor"
              >
                <path d="M12 14L8 10H16L12 14Z" />
              </svg>
              {/* Genre Types */}
              {isGenreClicked && (
                <div className="genreDropdown">
                  <div className="w-40 text-sm max-h-30 sm:max-h-40 overflow-y-scroll custom-scrollbar bg-bg-blackColor border border-br-primary flex flex-col items-start justify-center">
                    <div className="flex flex-col gap-4 px-4 mt-70 sm:mt-60 pb-5">
                      {genreData?.map((val, index) => {
                        return (
                          <div
                            key={val?.key}
                            className="flex items-center justify-start gap-2"
                          >
                            <div
                              onClick={() => {
                                setIsGenreClicked(false);
                                onSelectGenre(index);
                                setIsBgVideoPlaying(false);
                              }}
                              className="hover:underline"
                            >
                              {val?.genre}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* About media */}
        <div className="max-w-md flex flex-col gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold">
            {backgroundVideo?.video?.title || backgroundVideo?.video?.name}
          </h1>
          {backgroundVideo?.video?.genre_ids?.length !== 0 && (
            <div className="flex flex-row gap-2">
              {allGenres
                ?.filter((list) =>
                  backgroundVideo?.video?.genre_ids?.includes(list?.id),
                )
                ?.slice(0, 2)
                ?.map((val) => (
                  <h3
                    key={val?.id}
                    className="text-xm font-semibold lg:text-base px-2 py-[0.10rem] rounded-4xl bg-bg-whiteColor/10 backdrop-blur-md border border-br-primary"
                  >
                    {val?.name === "Science Fiction"
                      ? "Sci-Fi"
                      : val?.name?.split(" ")[0]}
                  </h3>
                ))}
            </div>
          )}
          <p className="text-sm lg:text-base text-text-primary/90 430:hidden">
            {backgroundVideo?.video?.overview
              ?.split(" ")
              ?.slice(0, 19)
              ?.join(" ")}
            ...
          </p>
          <p className="hidden text-sm lg:text-base text-text-primary/90 430:block">
            {backgroundVideo?.video?.overview}
          </p>
          {(backgroundVideo?.video?.release_date ||
            backgroundVideo?.video?.first_air_date) && (
              <h2 className="text-xm font-semibold lg:text-base">
                Released in{" "}
                {(
                  backgroundVideo?.video?.release_date ||
                  backgroundVideo?.video?.first_air_date
                )?.slice(0, 4)}
              </h2>
            )}
          <div className="flex flex-col gap-4 350:flex-row">
            {backgroundVideo?.videoKey && (
              <div
                onClick={() => setIsBgVideoPlaying((prev) => !prev)}
                className="flex justify-center items-center gap-1 text-text-ternary bg-bg-whiteColor pl-1 pr-4 py-2 rounded cursor-pointer"
              >
                {isBgVideoPlaying ? (
                  <>
                    <RiPauseCircleLine />
                    <span className="font-semibold whitespace-nowrap">
                      Pause Trailer
                    </span>
                  </>
                ) : (
                  <>
                    <RiPlayFill />
                    <span className="font-semibold whitespace-nowrap">
                      Play Trailer
                    </span>
                  </>
                )}
              </div>
            )}
            {backgroundVideo?.video?.id && (
              <div
                onClick={() => mediaType(backgroundVideo?.video)}
                className="flex justify-center items-center gap-2  bg-btn-secondary px-4 py-2 rounded cursor-pointer"
              >
                <RiInformationLine />
                <span className="font-semibold">More Info</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
