/* Featured Media Variant One ShimmerUI - used in (browse) */
export const FeaturedMediaVariantOneShimmerUI = () => {
  return (
    <div className="w-full animate-pulse navPadding">
      {/* Wrapper */}
      <div className="relative w-full min-h-[65dvh] flex items-end bg-bg-whiteColor/40 animate-pulse rounded-sm p-8">
        {/* Content bottom start */}
        <div className="w-full max-w-md flex flex-col gap-4">
          {/* Heading */}
          <h1 className="w-full h-10 bg-bg-whiteColor/60"></h1>
          {/* Overview */}
          {Array.from({ length: 2 }).map((_,index) => {
            return (
              <p key={index} className="w-full h-4 bg-bg-whiteColor/60"></p>
            );
          })}
          {/* Buttons */}
          <div className="w-[80%] flex gap-4">
            <div className="w-full h-8 rounded-sm bg-bg-whiteColor/60"></div>
            <div className="w-full h-8 rounded-sm bg-bg-whiteColor/60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Featured Media Variant Two ShimmerUI - used in (movies/tvshows) */
export const FeaturedMediaVariantTwoShimmerUI = () => {
  return (
    <div className="w-full animate-pulse navPadding">
      {/* Wrapper */}
      <div className="relative w-full min-h-[65dvh] flex flex-col justify-between bg-bg-whiteColor/40 rounded-sm p-8">
        {/* Media type top start */}
        <div className="w-full max-w-md flex items-center gap-4">
          <h1 className="w-full h-10 bg-bg-whiteColor/60"></h1>
        </div>

        {/* Content bottom start */}
        <div className="w-full max-w-md flex flex-col gap-4">
          {/* Heading */}
          <h1 className="w-full h-10 bg-bg-whiteColor/60"></h1>
          {/* Overview */}
          {Array.from({ length: 2 }).map((_,index) => {
            return (
              <p key={index} className="w-full h-4 bg-bg-whiteColor/60"
              ></p>
            );
          })}
          {/* Buttons */}
          <div className="w-[80%] flex gap-4">
            <div className="w-full h-8 rounded-sm bg-bg-whiteColor/60"></div>
            <div className="w-full h-8 rounded-sm bg-bg-whiteColor/60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
