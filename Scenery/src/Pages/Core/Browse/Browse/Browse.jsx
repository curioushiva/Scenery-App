import useContent from "@/Utils/Hooks/useContent/useContent";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import {
  IMG_BACKDROP_BASE_URL,
  IMG_POSTER_BASE_URL,
} from "@/Utils/SceneryAPI/SceneryAPI";
import { useSelector } from "react-redux";
import {
  RiArrowLeftWideLine,
  RiArrowRightWideLine,
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
  RiInformationLine,
  RiPauseCircleLine,
  RiPlayFill,
} from "@remixicon/react";
import { Info } from "react-bootstrap-icons";
import { useState, useEffect, useRef } from "react";

const Browse = () => {
  /* To get All genres & explore Categorie's data */
  const { getBrowseCat, getAllGenres } = useContent();
  useEffect(() => {
    getAllGenres();
    getBrowseCat();
  }, []);

  /* To access movie, shows, all genres & bg video */
  const { browseCat, allGenres, browseBGVideo } = useSelector(
    (store) => store.content,
  );

  /* To play and pause the background video , def-pause */
  const [isBgVideoPlaying, setIsBgVideoPlaying] = useState(false);

  /* Media type (for info) */
  const { mediaType } = useContent();

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  /* For scrolling in x */
  const scrollRefs = useRef({});

  /* Rendering on basis of categories loaded */
  {
    return browseCat?.length === 0 ? (
      <div></div>
    ) : (
      <div className="overflow-hidden">
        {/* Page 1 : Video & content */}
        <div className="relative w-full min-h-[75dvh] overflow-hidden">
          {/* Background Media */}
          <div className="absolute inset-0 z-0">
            {/* Image */}
            {browseBGVideo?.video?.backdrop_path && (
              <img
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-0" : "opacity-100"}`}
                src={`${IMG_BACKDROP_BASE_URL}${browseBGVideo?.video?.backdrop_path}`}
                alt="bg"
              />
            )}
            {/* Video */}
            {browseBGVideo?.videoKey && (
              <iframe
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full pointer-events-none scale-135 transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-100" : "opacity-0"}`}
                src={`https://www.youtube.com/embed/${browseBGVideo?.videoKey}?autoplay=1&mute=1&loop=1&playlist=${browseBGVideo?.videoKey}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&start=10`}
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
                {browseBGVideo?.video?.title || browseBGVideo?.video?.name}
              </h1>
              {browseBGVideo?.video?.genre_ids?.length !== 0 && (
                <div className="flex flex-row gap-2">
                  {allGenres
                    ?.filter((list) =>
                      browseBGVideo?.video?.genre_ids?.includes(list?.id),
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
                {browseBGVideo?.video?.overview
                  ?.split(" ")
                  ?.slice(0, 19)
                  ?.join(" ")}
                ...
              </p>
              <p className="hidden text-sm lg:text-base text-text-primary/90 430:block">
                {browseBGVideo?.video?.overview}
              </p>
              {(browseBGVideo?.video?.release_date ||
                browseBGVideo?.video?.first_air_date) && (
                <h2 className="text-xm font-semibold lg:text-base">
                  Released in{" "}
                  {(
                    browseBGVideo?.video?.release_date ||
                    browseBGVideo?.video?.first_air_date
                  )?.slice(0, 4)}
                </h2>
              )}
              <div className="flex flex-col gap-4 350:flex-row">
                {browseBGVideo?.videoKey && (
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
                {browseBGVideo?.video?.id && (
                  <div
                    onClick={() => mediaType(browseBGVideo?.video)}
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
        {/* Page 2 : Movies with categories */}
        <div className="flex flex-col gap-10 p-8">
          {/* Filtering categories if movie array is more than 5 */}
          {browseCat
            ?.filter((categorie) => categorie?.content?.length > 5)
            ?.map((categorie) => {
              return (
                <div
                  key={categorie?.type}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="font-medium text-base 350:text-xl">
                    <h1>{categorie?.title}</h1>
                  </div>
                  <div className="relative w-full group/carousel">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollRefs.current[categorie.type]?.scrollBy({
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
                        scrollRefs.current[categorie.type]?.scrollBy({
                          left: 600,
                          behavior: "smooth",
                        });
                      }}
                      className="absolute flex justify-end items-center z-1 right-3 sm:right-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
                    >
                      <RiArrowRightWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </div>
                    <div
                      ref={(el) => (scrollRefs.current[categorie.type] = el)}
                      className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer"
                    >
                      {/* Filtering movies if movie have id & poster paths */}
                      {categorie?.content
                        .filter(
                          (content) => content?.id && content?.poster_path,
                        )
                        .map((content) => (
                          <div
                            key={content?.id}
                            onClick={() => mediaType(content)}
                            className="relative shrink-0 group/card"
                          >
                            <div className="relative rounded-sm overflow-hidden w-34 sm:w-38 lg:w-42 aspect-2/3 transition-transform duration-300 ease-out group-hover/card:scale-95">
                              <img
                                src={`${IMG_POSTER_BASE_URL}${content?.poster_path}`}
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
                                <div className="flex items-center gap-2 font-medium text-text-secondary">
                                  <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                    <h1 className="text-xs lg:text-sm font-regular">
                                      ★{" "}
                                      {content?.vote_average?.toFixed(1) ||
                                        "0.0"}
                                    </h1>
                                  </div>
                                  <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
                                    <h1 className="text-xs lg:text-sm font-regular">
                                      {(
                                        content?.release_date ||
                                        content?.first_air_date
                                      )?.slice(0, 4) || "N/A"}
                                    </h1>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {content?.genre_ids?.length === 0 ? (
                                    <h1 className="text-xs lg:text-sm font-regular">
                                      Uncategorized
                                    </h1>
                                  ) : (
                                    allGenres
                                      ?.filter((list) =>
                                        content?.genre_ids?.includes(list?.id),
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
              );
            })}
        </div>
      </div>
    );
  }
};

export default Browse;
