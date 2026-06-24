import useContent from "@/Utils/Hooks/useContent/useContent";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MediaCarouselVariantOne,
  MediaCarouselVariantTwo,
} from "../../UI/MediaCarousel/MediaCarousel/MediaCarousel";
import { MediaCarouselVariantOneShimmerUI } from "../../UI/MediaCarousel/ShimmerUi/MediaCarouselShimmerUI";
import { FetchError } from "../../UI/FetchError/FetchError";

const Popular = () => {
  /* Accessing vales from content slice */
  const { popularCat } = useSelector((store) => store.content);

  /*  Accessing vales from useContent */
  const { popularLoader, popularError, getPopularCat } = useContent();

  /* To fetch popular data effect */
  useEffect(() => {
    if (popularCat.length === 0) {
      getPopularCat();
    }
  }, []);

  /* Loader state */
  if (popularLoader) {
    return (
      <div>
        <div className="w-full navPadding animate-pulse">
          <div className="w-full max-w-60">
            <h1 className="w-[70%] sm:w-full h-10 bg-bg-whiteColor/60"></h1>
          </div>
        </div>

        {Array.from({ length: 5 }).map((_, index) => {
          return <MediaCarouselVariantOneShimmerUI key={index} />;
        })}
      </div>
    );
  }
  /* Error state */
  if (popularError) {
    return <FetchError />;
  }

  /* Data loaded */
  if (popularCat?.length > 0) {
    return (
      <div className="w-full flex flex-col gap-10 navPadding">
        {/* Heading */}
        <div className="flex flex-col gap-10">
          <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
            Popular
          </h1>
          <h1 className="text-sm lg:text-base font-regular italic">
            Explore trending movies and series that audiences around the world
            are watching
          </h1>
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-10 overflow-hidden">
          {/* Now Playing */}
          {popularCat
            ?.filter((categorie) => categorie?.content?.length > 5)
            ?.slice(0, 1)
            ?.map((categorie) => {
              return (
                <MediaCarouselVariantOne
                  key={categorie.type}
                  categorie={categorie}
                  media={categorie?.content}
                />
              );
            })}

          {/* Top Popular Movies */}
          {popularCat
            ?.filter((categorie) => categorie?.content?.length > 5)
            ?.slice(1, 2)
            ?.map((categorie) => {
              return (
                categorie?.title === "Top Popular Movies" && (
                  <MediaCarouselVariantTwo
                    key={categorie.type}
                    categorie={categorie}
                    media={categorie?.content}
                  />
                )
              );
            })}

          {/* Upcoming Movies */}
          {popularCat
            ?.filter((categorie) => categorie?.content?.length > 5)
            ?.slice(2, 3)
            ?.map((categorie) => {
              return (
                <MediaCarouselVariantOne
                  key={categorie.type}
                  categorie={categorie}
                  media={categorie?.content}
                />
              );
            })}

          {/* Top Popular Shows */}
          {popularCat
            ?.filter((categorie) => categorie?.content?.length > 5)
            ?.slice(3, 4)
            ?.map((categorie) => {
              return (
                categorie?.title === "Top Popular TV Shows" && (
                  <MediaCarouselVariantTwo
                    key={categorie.type}
                    categorie={categorie}
                    media={categorie?.content}
                  />
                )
              );
            })}

          {/* Upcoming Shows */}
          {popularCat
            ?.filter((categorie) => categorie?.content?.length > 5)
            ?.slice(4, 5)
            ?.map((categorie) => {
              return (
                <MediaCarouselVariantOne
                  key={categorie.type}
                  categorie={categorie}
                  media={categorie?.content}
                />
              );
            })}
        </div>
      </div>
    );
  }
};

export default Popular;
