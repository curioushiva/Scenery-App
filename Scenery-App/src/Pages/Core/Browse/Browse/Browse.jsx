import useContent from "@/Utils/Hooks/useContent/useContent";
import { MediaCarouselVariantOne } from "../../UI/MediaCarousel/MediaCarousel/MediaCarousel";
import { FeaturedMediaVariantOne } from "../../UI/FeaturedMedia/FeaturedMedia/FeaturedMedia";
import { FeaturedMediaVariantOneShimmerUI } from "../../UI/FeaturedMedia/ShimmerUI/FeaturedMediaShimmerUI";
import { MediaCarouselVariantOneShimmerUI } from "../../UI/MediaCarousel/ShimmerUi/MediaCarouselShimmerUI";
import { FetchError } from "../../UI/FetchError/FetchError";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Browse = () => {
  /* Accessing vales from content slice */
  const { browseCat, browseBGVideo } = useSelector((store) => store.content);

  /* Accessing vales from useContent */
  const { browseLoader, browseError, getBrowseCat } = useContent();

  /* To fetch browse data effect */
  useEffect(() => {
    if (browseCat.length === 0) {
      getBrowseCat();
    }
  }, []);

  /* Loading state */
  if (browseLoader) {
    return (
      <div>
        <FeaturedMediaVariantOneShimmerUI />
        {Array.from({ length: 20 }).map((_, index) => {
          return <MediaCarouselVariantOneShimmerUI key={index} />;
        })}
      </div>
    );
  }

  /* Error state */
  if (browseError) {
    return <FetchError />;
  }

  /* Data loaded */
  if (browseCat?.length > 0) {
    return (
      <div className="overflow-hidden">
        {/* Page 1 : Video & content */}
        <FeaturedMediaVariantOne backgroundVideo={browseBGVideo} />
        {/* Page 2 : Movies with categories */}
        <div className="flex flex-col gap-10 p-8">
          {/* Filtering categories if movie array is more than 5 */}
          {browseCat
            ?.filter((categorie) => categorie?.content?.length > 5)
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

export default Browse;
