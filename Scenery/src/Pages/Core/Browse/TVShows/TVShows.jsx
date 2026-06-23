import useContent from "@/Utils/Hooks/useContent/useContent";
import {
  MediaCarouselVariantOne,
  MediaCarouselVariantTwo,
} from "../../UI/MediaCarousel/MediaCarousel/MediaCarousel";
import { FeaturedMediaVariantTwo } from "../../UI/FeaturedMedia/FeaturedMedia/FeaturedMedia";
import { FeaturedMediaVariantTwoShimmerUI } from "../../UI/FeaturedMedia/ShimmerUI/FeaturedMediaShimmerUI";
import { MediaCarouselVariantOneShimmerUI } from "../../UI/MediaCarousel/ShimmerUi/MediaCarouselShimmerUI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTvShowsGenre,
  addSelectedTvShowGenreIndex,
} from "@/Utils/Redux/Slices/ContentSlice/ContentSlice";
import { FetchError } from "../../UI/FetchError/FetchError";

const TVShows = () => {
  /* To dispatch  */
  const dispatch = useDispatch();

  /* Selecting values from content slice */
  const { tvShowsCat, tvShowsBGVideo, tvShowsGenre, selectedTvShowGenreIndex } =
    useSelector((store) => store.content);

  /* Accessing vales from useContent */
  const {
    tvShowsLoader,
    tvShowsError,
    getTvShowsCat,
    tvShowsGenreData,
    getTvShowsGenre,
  } = useContent();

  /* To fetch tvShows data effect */
  useEffect(() => {
    if (tvShowsCat.length === 0) {
      getTvShowsCat();
    }
  }, []);

  /* Running getTvShowsGenre on when user clicks on type of genre */
  useEffect(() => {
    if (
      selectedTvShowGenreIndex === null ||
      selectedTvShowGenreIndex === undefined
    )
      return;
    getTvShowsGenre(selectedTvShowGenreIndex);
  }, [selectedTvShowGenreIndex]);

  /* Loader state */
  if (tvShowsLoader) {
    return (
      <div>
        <FeaturedMediaVariantTwoShimmerUI />
        {Array.from({ length: 7 }).map((_, index) => {
          return <MediaCarouselVariantOneShimmerUI key={index} />;
        })}
      </div>
    );
  }

  /* Error state */
  if (tvShowsError) {
    return <FetchError />;
  }

  /* Data loaded */
  if (tvShowsCat?.length > 0) {
    return (
      <div className="overflow-hidden">
        {/* Page 1 : video & content */}
        <FeaturedMediaVariantTwo
          backgroundVideo={tvShowsBGVideo}
          genre={tvShowsGenre}
          genreData={tvShowsGenreData}
          sectionName="TV Shows"
          mediaLabel="Shows"
          onResetGenre={() => {
            dispatch(addTvShowsGenre([]));
            dispatch(addSelectedTvShowGenreIndex(null));
            getTvShowsCat();
          }}
          onSelectGenre={(index) => {
            dispatch(addSelectedTvShowGenreIndex(index));
          }}
        />
        {/* Page 2 : Movies with categories - including genre movies based on condition */}
        {tvShowsGenre.length > 0 ? (
          <div className="flex flex-col gap-10 p-8">
            {tvShowsGenre?.[0]?.genreTvShows
              ?.filter((val) => val?.tvShows?.length > 5)
              ?.map((categorie) => {
                return (
                  <MediaCarouselVariantOne
                    key={categorie.type}
                    categorie={categorie}
                    media={categorie?.tvShows}
                  />
                );
              })}
          </div>
        ) : (
          <div className="flex flex-col gap-10 p-8">
            {/* Now Playing */}
            {tvShowsCat
              ?.filter((categorie) => categorie?.tvShows?.length > 5)
              ?.slice(0, 1)
              ?.map((categorie) => {
                return (
                  <MediaCarouselVariantOne
                    key={categorie.type}
                    categorie={categorie}
                    media={categorie?.tvShows}
                  />
                );
              })}
            {/* Top Popular TV Shows */}
            {tvShowsCat
              ?.filter((categorie) => categorie?.tvShows?.length > 5)
              ?.slice(1, 2)
              ?.map((categorie) => {
                return (
                  categorie?.title === "Top Popular TV Shows" && (
                    <MediaCarouselVariantTwo
                      key={categorie.type}
                      categorie={categorie}
                      media={categorie?.tvShows}
                    />
                  )
                );
              })}
            {/* Other */}
            {tvShowsCat
              ?.filter((categorie) => categorie?.tvShows?.length > 5)
              ?.slice(2, 7)
              ?.map((categorie) => {
                return (
                  <MediaCarouselVariantOne
                    key={categorie.type}
                    categorie={categorie}
                    media={categorie?.tvShows}
                  />
                );
              })}
          </div>
        )}
      </div>
    );
  }
};

export default TVShows;
