/* Media Card Variant One ShimmerUI - used in (browse/movies/tvshows/popular/library) */
export const MediaCardVariantOneShimmerUI = () => {
  return (
    <div className="relative shrink-0 group/card">
      {/* Wrapper */}
      <div className="relative rounded-sm overflow-hidden w-34 sm:w-38 lg:w-42 aspect-2/3 transition-transform duration-300 ease-out group-hover/card:scale-95">
        {/* Card */}
        <div className="w-full h-full rounded-sm bg-bg-whiteColor/40"></div>

        {/* Card options */}
        <div className="absolute z-10 bottom-0 w-full flex flex-col gap-2 px-2 py-2">
          {/* Action types */}
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between gap-2">
              <div className="flex gap-2">
                <h1 className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-bg-whiteColor/60"></h1>
                <h1 className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-bg-whiteColor/60"></h1>
              </div>
              <h1 className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-bg-whiteColor/60"></h1>
            </div>
          </div>

          {/* Ratings and votes */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <h1 className="w-full h-4 bg-bg-whiteColor/60"></h1>
              <h1 className="w-full h-4 bg-bg-whiteColor/60"></h1>
            </div>
          </div>

          {/* Genre */}
          <div className="w-full flex flex-col gap-2">
            <h1 className="w-full h-4 bg-bg-whiteColor/60"></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Media Card Variant Four ShimmerUi - used in (movieInfo/tvShowInfo - recomendation) */
export const MediaCardVariantFourShimmerUI = () => {
  return (
    <div className="relative shrink-0 group">
      {/* Wrapper */}
      <div className="relative w-60 460:w-[18rem] aspect-video rounded-sm shrink-0 transition-transform duration-300 ease-out hover:scale-95">
        {/* Card */}
        <div className="w-full h-full rounded-sm bg-bg-whiteColor/40" />
        {/* Card options */}
        <div className="absolute z-10 bottom-0 w-full flex flex-col gap-2 px-2 py-2">
          {/* Action types */}
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between gap-2">
              <div className="flex gap-2">
                <h1 className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-bg-whiteColor/60"></h1>
                <h1 className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-bg-whiteColor/60"></h1>
              </div>
              <h1 className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-bg-whiteColor/60"></h1>
            </div>
          </div>

          {/* Ratings and votes */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <h1 className="w-full h-4 bg-bg-whiteColor/60"></h1>
              <h1 className="w-full h-4 bg-bg-whiteColor/60"></h1>
            </div>
          </div>

          {/* Genre */}
          <div className="w-full flex flex-col gap-2">
            <h1 className="w-full h-4 bg-bg-whiteColor/60"></h1>
          </div>
        </div>
      </div>
    </div>
  );
};
