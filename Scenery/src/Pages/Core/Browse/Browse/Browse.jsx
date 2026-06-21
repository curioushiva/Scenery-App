import useContent from "@/Utils/Hooks/useContent/useContent";
import { MediaCarouselVariantOne } from "../../UI/MediaCarousel/MediaCarousel";
import { FeaturedMediaVariantOne } from "../../UI/FeaturedMedia/FeaturedMedia";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Browse = () => {

  /* To get explore Categorie's data */
  const { getBrowseCat } = useContent();
  useEffect(() => {
    getBrowseCat();
  }, []);

  /* To access browse & bg video */
  const { browseCat, browseBGVideo } = useSelector((store) => store.content);

  /* Rendering on basis of categories loaded */
  {
    return browseCat?.length === 0 ? (
      <div></div>
    ) : (
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
