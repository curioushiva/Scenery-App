import useContent from "@/Utils/Hooks/useContent/useContent";
import {
  MediaCarouselVariantOne,
  MediaCarouselVariantTwo,
} from "../../UI/MediaCarousel/MediaCarousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMoviesGenre,
  addSelectedMovieGenreIndex,
} from "@/Utils/Redux/Slices/ContentSlice/ContentSlice";
import { FeaturedMediaVariantTwo } from "../../UI/FeaturedMedia/FeaturedMedia";

const Movies = () => {
  /* To dispatch  */
  const dispatch = useDispatch();

  /* To access Movie's genre  */
  const moviesGenre = useSelector((store) => store.content.moviesGenre);

  /* To get Movies Categorie's data */
  const { getMoviesCat } = useContent();
  useEffect(() => {
    if (moviesGenre.length === 0) {
      getMoviesCat();
    }
  }, [moviesGenre]);

  /* To access movie & bg video */
  const { moviesCat, moviesBGVideo } = useSelector((store) => store.content);

  /* Selected genre for the movie */
  const selectedMovieGenreIndex = useSelector(
    (store) => store.content.selectedMovieGenreIndex,
  );

  /* Accessing vales from useContent */
  const { moviesGenreData, getMoviesGenre } = useContent();

  /* Running getMoviesGenre on when user clicks on type of genre */
  useEffect(() => {
    if (
      selectedMovieGenreIndex === null ||
      selectedMovieGenreIndex === undefined
    )
      return;
    getMoviesGenre(selectedMovieGenreIndex);
  }, [selectedMovieGenreIndex]);

  /* Rendering on basis of categorie loaded */
  {
    return moviesCat?.length === 0 ? (
      <div></div>
    ) : (
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
