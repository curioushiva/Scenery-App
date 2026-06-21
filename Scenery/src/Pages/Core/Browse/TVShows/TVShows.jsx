import useContent from "@/Utils/Hooks/useContent/useContent";
import {
  MediaCarouselVariantOne,
  MediaCarouselVariantTwo,
} from "../../UI/MediaCarousel/MediaCarousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTvShowsGenre,
  addSelectedTvShowGenreIndex,
} from "@/Utils/Redux/Slices/ContentSlice/ContentSlice";
import { FeaturedMediaVariantTwo } from "../../UI/FeaturedMedia/FeaturedMedia";

const TVShows = () => {
  /* To dispatch  */
  const dispatch = useDispatch();

  /* To access Tv show's genre */
  const tvShowsGenre = useSelector((store) => store.content.tvShowsGenre);

  /* To get TV Shows Categorie's data */
  const { getTvShowsCat } = useContent();
  useEffect(() => {
    if (tvShowsGenre.length === 0) {
      getTvShowsCat();
    }
  }, [tvShowsGenre]);

  /* To access tv shows & bg video */
  const { tvShowsCat, tvShowsBGVideo } = useSelector((store) => store.content);

  /* Selected genre for the TV Show */
  const selectedTvShowGenreIndex = useSelector(
    (store) => store.content.selectedTvShowGenreIndex,
  );

  /* Accessing vales from useContent */
  const { tvShowsGenreData, getTvShowsGenre } = useContent();

  /* Running getTvShowsGenre on when user clicks on type of genre */
  useEffect(() => {
    if (
      selectedTvShowGenreIndex === null ||
      selectedTvShowGenreIndex === undefined
    )
      return;
    getTvShowsGenre(selectedTvShowGenreIndex);
  }, [selectedTvShowGenreIndex]);

  /* Rendering on basis of categories loaded */
  {
    return tvShowsCat?.length === 0 ? (
      <div></div>
    ) : (
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
