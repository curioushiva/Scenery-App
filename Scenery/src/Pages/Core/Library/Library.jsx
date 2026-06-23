import { useDispatch, useSelector } from "react-redux";
import {
  MediaCarouselVariantThree,
  MediaCarouselVariantFour,
} from "../UI/MediaCarousel/MediaCarousel/MediaCarousel";
import { setSelectedLibrarySection } from "@/Utils/Redux/Slices/AccountSlice/AccountSlice";

const Library = () => {
  /* For dispatch */
  const dispatch = useDispatch();

  /* To select Name, savedMovies & savedTvShows */
  const { Name, savedMovies, savedTVShows } = useSelector(
    (store) => store.account.profile,
  );

  /* For selecting selected library section */
  const selectedLibrarySection = useSelector(
    (store) => store.account.selectedLibrarySection,
  );

  /* Total library items */
  const totalLibraryItems = (
    (savedMovies?.watchLater?.length ?? 0) +
    (savedMovies?.favourite?.length ?? 0) +
    (savedTVShows?.watchLater?.length ?? 0) +
    (savedTVShows?.favourite?.length ?? 0)
  )

  /* Library sections to be shown */
  const librarySections = [
    {
      data: savedMovies?.watchLater,
      type: "watchLaterMovies",
      name: "Watch Later Movies",
    },
    {
      data: savedMovies?.favourite,
      type: "favouriteMovies",
      name: "Favourite Movies",
    },
    {
      data: savedTVShows?.watchLater,
      type: "watchLaterTVShows",
      name: "Watch Later TV Shows",
    },
    {
      data: savedTVShows?.favourite,
      type: "favouriteTVShows",
      name: "Favourite TV Shows",
    },
  ];

  /* Selected libraray section */
  const selectedSection = librarySections.find((val) => {
    return selectedLibrarySection.type === val.type;
  });

  return (
    <div className="w-full navPadding">
      <div className="w-full flex flex-col gap-10">
        {/* Intro */}
        <div className="flex">
          <h1 className="text-3xl lg:text-4xl font-bold leading-[0.7]">
            My Libraray
          </h1>
        </div>

        {/* Welcome msg */}
        <div className="flex">
          <h1 className="text-sm lg:text-base font-regular  text-text-secondary">
            Hey,
            <span className="italic font-medium text-text-primary">
              {" "}
              {Name}{" "}
            </span>
            . See what you have in your library
          </h1>
        </div>

        {/* Main */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex flex-col gap-8 sm:gap-12">
            {/* Saved list */}
            <div className="w-full grid grid-cols-2 grid-rows-3 md:grid-cols-5 md:grid-rows-1 gap-4">
              <div
                onClick={() =>
                  dispatch(
                    setSelectedLibrarySection({
                      name: "Total Movies & TV Shows",
                      type: "totalMovies&TVShows",
                      data: null,
                    }),
                  )
                }
                className={`${selectedLibrarySection?.type === "totalMovies&TVShows" && "bg-bg-whiteColor/5"} row-span-1 col-span-2 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}
              >
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {totalLibraryItems}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Total Movies & TV Shows
                </h2>
              </div>

              <div
                onClick={() =>
                  dispatch(
                    setSelectedLibrarySection({
                      name: "Watch Later Movies",
                      type: "watchLaterMovies",
                      data: savedMovies?.watchLater,
                    }),
                  )
                }
                className={`${selectedLibrarySection?.type === "watchLaterMovies" && "bg-bg-whiteColor/5"} row-span-1 col-span-1 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}
              >
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {savedMovies?.watchLater?.length ?? 0}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Watch Later Movies
                </h2>
              </div>

              <div
                onClick={() =>
                  dispatch(
                    setSelectedLibrarySection({
                      name: "Favourite Movies",
                      type: "favouriteMovies",
                      data: savedMovies?.favourite,
                    }),
                  )
                }
                className={`${selectedLibrarySection?.type === "favouriteMovies" && "bg-bg-whiteColor/5"} row-span-1 col-span-1 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}
              >
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {savedMovies?.favourite?.length ?? 0}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Favourite Movies
                </h2>
              </div>

              <div
                onClick={() =>
                  dispatch(
                    setSelectedLibrarySection({
                      name: "Watch Later TV Shows",
                      type: "watchLaterTVShows",
                      data: savedTVShows?.watchLater,
                    }),
                  )
                }
                className={`${selectedLibrarySection?.type === "watchLaterTVShows" && "bg-bg-whiteColor/5"} row-span-1 col-span-1 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}
              >
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {savedTVShows?.watchLater?.length ?? 0}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Watch Later TV Shows
                </h2>
              </div>

              <div
                onClick={() =>
                  dispatch(
                    setSelectedLibrarySection({
                      name: "Favourite TV Shows",
                      type: "favouriteTVShows",
                      data: savedTVShows?.favourite,
                    }),
                  )
                }
                className={`${selectedLibrarySection?.type === "favouriteTVShows" && "bg-bg-whiteColor/5"} row-span-1 col-span-1 md:row-span-1 md:col-span-1 w-full flex flex-col items-start justify-center gap-0.5 py-2 px-5 border border-br-primary/60 rounded-xl cursor-pointer transition-all ease-in duration-100 hover:bg-bg-whiteColor/5`}
              >
                <h1 className="text-base sm:text-lg lg:text-xl font-medium">
                  {savedTVShows?.favourite?.length ?? 0}
                </h1>
                <h2 className="text-[10px] 310:text-xs text-medium text-text-secondary">
                  Favourite TV Shows
                </h2>
              </div>
            </div>

            {/* Data to be shown */}
            {selectedLibrarySection?.type === "totalMovies&TVShows" ? (
              /* Library section */
              <div className="w-full flex flex-col gap-10">
                {librarySections.map((section) => {
                  return (
                    section?.data?.length > 0 && (
                      <MediaCarouselVariantThree
                        key={section?.type}
                        section={section}
                      />
                    )
                  );
                })}
              </div>
            ) : selectedSection?.data?.length > 0 ? (
              <MediaCarouselVariantFour selectedSection={selectedSection} />
            ) : (
              <div className="w-full flex justify-center items-center pt-8 sm:pt-12">
                <div className="max-w-xs flex flex-col justify-center items-center gap-2 text-center">
                  <h1 className="text-lg 310:text-xl sm:text-2xl font-medium">
                    Your {selectedLibrarySection?.name} collection is empty
                  </h1>
                  <h2 className="max-w-70 text-sm 210:text-base font-regular italic text-text-secondary">
                    Start building your collection by saving movies and TV shows
                  </h2>
                </div>
              </div>
            )}


            {(selectedLibrarySection?.type === "totalMovies&TVShows" && totalLibraryItems === 0) && (
              <div className="w-full flex justify-center items-center">
                <div className="max-w-xs flex flex-col justify-center items-center gap-2 text-center">
                  <h1 className="text-lg 310:text-xl sm:text-2xl font-medium">
                    Your library is empty
                  </h1>
                  <h2 className="max-w-70 text-sm 210:text-base font-regular italic text-text-secondary">
                    Save movies and TV shows to build your personal collection
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
