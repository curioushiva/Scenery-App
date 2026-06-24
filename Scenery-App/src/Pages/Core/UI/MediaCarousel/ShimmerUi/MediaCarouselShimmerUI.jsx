import {
  MediaCardVariantFourShimmerUI,
  MediaCardVariantOneShimmerUI,
} from "../../MediaCard/ShimmerUI/MediaCardShimmerUI";

/* Media Carousel Variant One ShimmerUI - used in (browse/movies/tvshows/popular) */
export const MediaCarouselVariantOneShimmerUI = () => {
  return (
    /* Wrapper */
    <div className="w-full flex flex-col gap-3 animate-pulse p-8">
      {/* Category heading */}
      <div className="w-full max-w-60">
        <h1 className="w-[70%] sm:w-full h-6 bg-bg-whiteColor/60"></h1>
      </div>
      {/* Card wrapper */}
      <div className="relative w-full group/carousel">
        <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar">
          {Array.from({ length: 20 }).map((_,index) => {
            return <MediaCardVariantOneShimmerUI key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

/* Media Carousel Variant Five ShimmerUI - used in (movieInfo/tvShowInfo - recomendation ) */
export const MediaCarouselVariantFiveShimmerUI = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      {/* Heading */}
      <div className="w-full max-w-60">
        <h1 className="w-[70%] sm:w-full h-6 bg-bg-whiteColor/60"></h1>
      </div>
      <div className="relative w-full group/carousel">
        <div className="flex flex-row gap-4 no-scrollbar overflow-x-scroll">
          {Array.from({ length: 20 }).map((_,index) => {
            return <MediaCardVariantFourShimmerUI key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};
