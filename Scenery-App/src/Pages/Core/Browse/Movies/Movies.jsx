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
  addMoviesGenre,
  addSelectedMovieGenreIndex,
} from "@/Utils/Redux/Slices/ContentSlice/ContentSlice";
import { FetchError } from "../../UI/FetchError/FetchError";

const Movies = () => {
  /* To dispatch  */
  const dispatch = useDispatch();

  /* Selecting values from content slice */
  const { moviesCat, moviesBGVideo, moviesGenre, selectedMovieGenreIndex } =
    useSelector((store) => store.content);

  /* Accessing vales from useContent */
  const {
    moviesLoader,
    moviesError,
    getMoviesCat,
    moviesGenreData,
    getMoviesGenre,
  } = useContent();

  /* To fetch movies data effect */
  useEffect(() => {
    if (moviesCat.length === 0) {
      getMoviesCat();
    }
  }, []);

  /* Running getMoviesGenre on when user clicks on type of genre */
  useEffect(() => {
    if (
      selectedMovieGenreIndex === null ||
      selectedMovieGenreIndex === undefined
    )
      return;
    getMoviesGenre(selectedMovieGenreIndex);
  }, [selectedMovieGenreIndex]);

  /* Loader state */
  if (moviesLoader) {
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
  if (moviesError) {
    return <FetchError />;
  }

  /* Data loaded */
  if (moviesCat?.length > 0) {
    return (
      <div className="overflow-hidden">
        {/* Page 1 : video & content */}
        <FeaturedMediaVariantTwo
          backgroundVideo={moviesBGVideo}
          genre={moviesGenre}
          genreData={moviesGenreData}
          sectionName="All Movies"
          mediaLabel="Movies"
          onResetGenre={() => {
            dispatch(addMoviesGenre([]));
            dispatch(addSelectedMovieGenreIndex(null));
            getMoviesCat();
          }}
          onSelectGenre={(index) => {
            dispatch(addSelectedMovieGenreIndex(index));
          }}
        />
        {/* Page 2 : Movies with categorie - including genre movies based on condition */}
        {moviesGenre?.length > 0 ? (
          <div className="flex flex-col gap-10 p-8">
            {moviesGenre?.[0]?.genreMovies
              ?.filter((val) => val?.movies?.length > 5)
              ?.map((categorie) => {
                return (
                  <MediaCarouselVariantOne
                    key={categorie.type}
                    categorie={categorie}
                    media={categorie?.movies}
                  />
                );
              })}
          </div>
        ) : (
          <div className="flex flex-col gap-10 p-8">
            {/* Now Playing */}
            {moviesCat
              ?.filter((categorie) => categorie?.movies?.length > 5)
              ?.slice(0, 1)
              ?.map((categorie) => {
                return (
                  <MediaCarouselVariantOne
                    key={categorie.type}
                    categorie={categorie}
                    media={categorie?.movies}
                  />
                );
              })}
            {/* Top Popular Movies */}
            {moviesCat
              ?.filter((categorie) => categorie?.movies?.length > 5)
              ?.slice(1, 2)
              ?.map((categorie) => {
                return (
                  categorie?.title === "Top Popular Movies" && (
                    <MediaCarouselVariantTwo
                      key={categorie.type}
                      categorie={categorie}
                      media={categorie?.movies}
                    />
                  )
                );
              })}
            {/* Other */}
            {moviesCat
              ?.filter((categorie) => categorie?.movies?.length > 5)
              ?.slice(2, 7)
              ?.map((categorie) => {
                return (
                  <MediaCarouselVariantOne
                    key={categorie.type}
                    categorie={categorie}
                    media={categorie?.movies}
                  />
                );
              })}
          </div>
        )}
      </div>
    );
  }
};

export default Movies;
