/* Media info poster shimmerUI */
export const MediaInfoPosterShimmerUI = () => {
    return (
        <div className="hidden flex-col shrink-0 880:flex 880:w-[18rem] rounded-sm">
            {/* Poster */}
            <div className="w-full flex-1 min-h-0 aspect-4/5 bg-bg-whiteColor/40 object-cover rounded-sm" />
        </div>
    );
};

/* Media genric info shimmerUI  */
export const MediaGenricInfoShimmerUI = () => {
    return (
        <div className="w-full flex flex-col gap-4 max-w-2xl">
            {/* Title */}
            <h1 className="w-full h-8 bg-bg-whiteColor/60"></h1>

            <div className=" flex items-center gap-2">
                {/* Certification */}
                <h1 className="w-30 h-5 bg-bg-whiteColor/60"></h1>

                {/* Genre */}
                <h1 className="w-30 h-5 bg-bg-whiteColor/60"></h1>

                {/* Runtime */}
                <h1 className="w-30 h-5 bg-bg-whiteColor/60"></h1>
            </div>

            {/* Ratings and votes */}
            <div className=" flex items-center gap-2">
                <h1 className="w-60 h-5 bg-bg-whiteColor/60"></h1>
            </div>

            {/* Tagline */}
            <div className=" flex items-center gap-2">
                <h1 className="w-94 h-5 bg-bg-whiteColor/60"></h1>
            </div>

            {/* Overview */}
            {Array.from({ length: 4 }).map((_, index) => {
                return <p key={index} className="w-full h-4 bg-bg-whiteColor/60"></p>;
            })}

            {/* Maker */}
            <div className=" flex items-center gap-2">
                <h1 className="w-30 h-8 bg-bg-whiteColor/60"></h1>
            </div>

            <div className=" flex items-center gap-2">
                {/* Play Trailer */}
                <h1 className="w-full h-8 rounded-sm bg-bg-whiteColor/60"></h1>

                {/* Watch later */}
                <h1 className="w-full h-8 rounded-sm bg-bg-whiteColor/60"></h1>

                {/* Fav */}
                <h1 className="w-full h-8 rounded-sm bg-bg-whiteColor/60"></h1>
            </div>
        </div>
    );
};

/* More media info shimmerUI */
export const MoreMediaInfoShimmerUI = () => {
    return (
        <div className="w-full flex flex-col gap-5 880:flex-row 880:gap-10">
            {/* More media cards */}
            <div className="w-full flex items-center gap-4">
                {Array.from({ length: 4 }).map((_, index) => {
                    return (
                        <div key={index} className="w-full h-10 bg-bg-whiteColor/40"></div>
                    );
                })}
            </div>
        </div>
    );
};

/* Media info cast shimmerUI */
export const MediaInfoCastShimmerUI = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            {/* Heading */}
            <div className="w-full max-w-60">
                <h1 className="w-[70%] sm:w-full h-6 bg-bg-whiteColor/60"></h1>
            </div>
            {/* Cast cards */}
            <div className="relative w-full group/carousel">
                <div className="grid grid-flow-col auto-cols-[10rem] gap-4 overflow-x-auto no-scrollbar items-stretch">
                    {Array.from({ length: 20 }).map((_, index) => {
                        return (
                            <div
                                key={index}
                                className="relative h-50 flex flex-col rounded-sm bg-bg-whiteColor/40 transition-all duration-300 ease-out hover:scale-95"
                            >
                                <div className="absolute h-[30%] bottom-0 w-full bg-bg-whiteColor/20"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

/* Media info trailers shimmerUI */
export const MediaInfoTrailersShimmerUI = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            {/* Heading */}
            <div className="w-full max-w-60">
                <h1 className="w-[70%] sm:w-full h-6 bg-bg-whiteColor/60"></h1>
            </div>
            {/* Trailer cards */}
            <div className="flex flex-row gap-4 no-scrollbar overflow-x-scroll">
                {Array.from({ length: 4 }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="relative w-[16rem]  880:w-[24rem] 460:w-[20rem] aspect-video bg-bg-whiteColor/60 rounded-sm transition-transform duration-300 ease-out hover:scale-95"
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

/* Media info browse more shimmerUI */
export const MediaInfoBrowseMoreShimmerUI = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Heading */}
            <div className="w-full max-w-60">
                <h1 className="w-[70%] sm:w-full h-6 bg-bg-whiteColor/60"></h1>
            </div>
            {/* Browse more cards */}
            <div className="w-full flex flex-col justify-around gap-5">
                {Array.from({ length: 4 }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="h-10 flex justify-between gap-4 bg-bg-whiteColor/40 rounded-lg"
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

/* Media info series detail shimmerUI (only for tvshows) */
export const MediaInfoSeriesDetailsShimmerUI = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Heading */}
            <div className="w-full max-w-60">
                <h1 className="w-[70%] sm:w-full h-6 bg-bg-whiteColor/60"></h1>
            </div>
            {/* Series details cards */}
            <div className="w-full flex flex-col justify-around gap-5">
                {Array.from({ length: 4 }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="h-10 flex justify-between gap-4 bg-bg-whiteColor/40 rounded-lg"
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
