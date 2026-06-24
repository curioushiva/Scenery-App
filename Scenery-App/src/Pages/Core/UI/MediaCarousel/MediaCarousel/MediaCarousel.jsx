import { RiArrowLeftWideLine, RiArrowRightWideLine } from "@remixicon/react";
import { useRef } from "react";
import {
  MediaCardVariantOne,
  MediaCardVariantTwoPartOne,
  MediaCardVariantTwoPartTwo,
  MediaCardVariantThree,
  MediaCardVariantFour,
} from "../../MediaCard/MediaCard/MediaCard";
import { useDispatch } from "react-redux";
import { setSelectedLibrarySection } from "@/Utils/Redux/Slices/AccountSlice/AccountSlice";

/* Media Carousel Variant One - used in (browse/movies/tvshows/popular) */
export const MediaCarouselVariantOne = ({ categorie, media }) => {
  /* For scrolling in x */
  const scrollRefs = useRef({});

  return (
    <div className="w-full flex flex-col gap-3">
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
          {/* Filtering media if they have id & poster paths */}
          {media
            .filter((content) => content?.id && content?.poster_path)
            .map((content) => (
              <MediaCardVariantOne key={content?.id} content={content} />
            ))}
        </div>
      </div>
    </div>
  );
};

/* Media Carousel Variant Two - used in (movies/tvshows/popular - numbered) */
export const MediaCarouselVariantTwo = ({ categorie, media }) => {
  /* For scrolling in x */
  const scrollRefs = useRef({});

  return (
    <div className="w-full flex flex-col gap-3">
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
          {/* 1-9 */}
          {media
            ?.filter((movie) => movie?.id && movie?.poster_path)
            ?.slice(0, 9)
            ?.map((movie, index) => (
              <MediaCardVariantTwoPartOne
                key={movie?.id}
                content={movie}
                index={index}
              />
            ))}
          {/* 10-15 */}
          {media
            ?.filter((movie) => movie?.id && movie?.poster_path)
            ?.slice(9, 15)
            ?.map((movie, index) => (
              <MediaCardVariantTwoPartTwo
                key={movie?.id}
                content={movie}
                index={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

/* Media Carousel Variant Three - used in (library - sections) */
export const MediaCarouselVariantThree = ({ section }) => {
  /* For dispatch */
  const dispatch = useDispatch();

  /* For scrolling in x */
  const scrollRefs = useRef({});

  return (
    <div key={section?.type} className="w-full flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-4">
        <h1 className="text-sm 310:text-base sm:text-lg font-medium">
          {section?.name}
        </h1>
        <h2
          onClick={() =>
            dispatch(
              setSelectedLibrarySection({
                name: section?.name,
                type: section?.type,
                data: section?.data,
              }),
            )
          }
          className="text-xs 310:text-sm text-text-secondary font-regular cursor-pointer transition duration-200 ease-in-out hover:text-text-primary hover:underline"
        >
          View all
        </h2>
      </div>

      <div className="relative w-full group/carousel">
        <div
          onClick={(e) => {
            e.stopPropagation();
            scrollRefs.current[section.type]?.scrollBy({
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
            scrollRefs.current[section.type]?.scrollBy({
              left: 600,
              behavior: "smooth",
            });
          }}
          className="absolute flex justify-end items-center z-1 right-3 sm:right-4 top-4 p-1 bg-bg-blackColor/60 backdrop-blur-4 rounded-full text-text-primary/80 cursor-pointer transition duration-200 ease-in-out group-hover/carousel:scale-120 opacity-0 group-hover/carousel:opacity-100"
        >
          <RiArrowRightWideLine className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
        </div>
        <div
          ref={(el) => (scrollRefs.current[section.type] = el)}
          className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer"
        >
          {/* Filtering content if they have id & poster paths */}
          {section?.data
            ?.filter(
              (content) => content?.media?.id && content?.media?.poster_path,
            )
            .map((content) => (
              <MediaCardVariantOne
                key={content?.media?.id}
                content={content?.media}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

/* Media Carousel Variant Three - used in (library - selected section)*/
export const MediaCarouselVariantFour = ({ selectedSection }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-lg 310:text-xl sm:text-2xl font-medium">
          {selectedSection?.name}
        </h1>
        <h2 className="text-sm 210:text-base font-regular italic text-text-secondary">
          Browse all {selectedSection?.data?.length} titles you've added to this
          collection.
        </h2>
      </div>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(136px,1fr))] gap-4">
        {selectedSection?.data
          ?.filter(
            (content) => content?.media?.id && content?.media?.poster_path,
          )
          .map((content) => (
            <MediaCardVariantThree
              key={content?.media?.id}
              content={content?.media}
            />
          ))}
      </div>
    </div>
  );
};

/* Media Carousel Variant Five - used in (movieInfo/tvShowInfo - recomendation ) */
export const MediaCarouselVariantFive = ({
  mediaInfoTitle,
  recScrollRefs,
  mediaInfoRecomendations,
}) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="font-medium text-xl">
        <h1>
          If you liked{" "}
          <span className="italic text-text-secondary">
            {(mediaInfoTitle || "this title")?.replace(".", "")}
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
          {mediaInfoRecomendations?.map((content) => {
            return <MediaCardVariantFour key={content?.id} content={content} />;
          })}
        </div>
      </div>
    </div>
  );
};
