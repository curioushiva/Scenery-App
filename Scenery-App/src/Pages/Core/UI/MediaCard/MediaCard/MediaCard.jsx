import { SCENERY_API_IMG_POSTER_BASE_URL } from "@/Utils/SceneryAPI/SceneryAPI";
import useContent from "@/Utils/Hooks/useContent/useContent";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
} from "@remixicon/react";
import { Info } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import NoBackdrop from "@/Assets/Images/Placeholders/NoBackdrop.png";
import NoPoster from "@/Assets/Images/Placeholders/NoPoster.png";

/* Media Card Variant One - used in (browse/movies/tvshows/popular/library) */
export const MediaCardVariantOne = ({ content }) => {
  /* To access all genres */
  const { allGenres } = useSelector((store) => store.content);

  /* Media type (for info) */
  const { mediaType } = useContent();

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  return (
    <div
      onClick={() => mediaType(content)}
      className="relative shrink-0 group/card"
    >
      {/* Poster */}
      <div className="relative rounded-sm overflow-hidden w-34 sm:w-38 lg:w-42 aspect-2/3 transition-transform duration-300 ease-out group-hover/card:scale-95">
        <img
          src={`${SCENERY_API_IMG_POSTER_BASE_URL}${content?.poster_path}`}
          alt="Poster"
          className="absolute z-0 w-full h-full object-cover"
        />
        {/* Hover drop down */}
        <div className="absolute z-10 bottom-0 bg-bg-blackColor/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover/card:opacity-100 transition duration-200">
          <div className="flex justify-between items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex gap-1"
            >
              <div
                onClick={() => saveProfileMedia(content, "watchLater")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "watchLater") ? (
                  <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                ) : (
                  <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                )}
              </div>
              <div
                onClick={() => saveProfileMedia(content, "favourite")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "favourite") ? (
                  <RiHeartFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-fourth" />
                ) : (
                  <RiHeartLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                )}
              </div>
            </div>
            <div className="rounded-full text-text-secondary border p-[0.1rem]">
              <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 font-medium text-text-secondary">
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs lg:text-sm font-regular">
                ★ {content?.vote_average?.toFixed(1) || "0.0"}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs lg:text-sm font-regular">
                {(content?.release_date || content?.first_air_date)?.slice(
                  0,
                  4,
                ) || "N/A"}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            {content?.genre_ids?.length === 0 ? (
              <h1 className="text-xs lg:text-sm font-regular">Uncategorized</h1>
            ) : (
              allGenres
                ?.filter((list) => content?.genre_ids?.includes(list?.id))
                ?.slice(0, 2)
                ?.map((val) => (
                  <h1 key={val?.id} className="text-xs lg:text-sm font-regular">
                    {val?.name === "Science Fiction"
                      ? "Sci-Fi"
                      : val?.name?.split(" ")[0]}
                  </h1>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Media Card Variant Two Part 1 - used in (movies/tvshows/popular - numbered) */
export const MediaCardVariantTwoPartOne = ({ content, index }) => {
  /* To access all genres */
  const { allGenres } = useSelector((store) => store.content);

  /* Media type (for info) */
  const { mediaType } = useContent();

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  return (
    <div
      onClick={() => mediaType(content)}
      className="relative w-[16rem] h-48 md:w-[18rem] md:h-56 shrink-0 group"
    >
      {/* Poster */}
      <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
        <img
          src={`${SCENERY_API_IMG_POSTER_BASE_URL}${content?.poster_path}`}
          alt="Poster"
          className="absolute right-0 z-10 w-[67%] md:w-[65%] h-full object-cover"
        />
        <h1
          className="absolute left-0 text-[13rem] md:text-[15rem] font-bold text-black"
          style={{ WebkitTextStroke: "4px #5F5E5E" }}
        >
          {index + 1}
        </h1>
        {/* Hover drop down */}
        <div className="absolute z-10 bottom-0 right-0 bg-bg-blackColor/90 w-[67%] md:w-[65%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
          <div className="flex justify-between items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex gap-1"
            >
              <div
                onClick={() => saveProfileMedia(content, "watchLater")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "watchLater") ? (
                  <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                ) : (
                  <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                )}
              </div>
              <div
                onClick={() => saveProfileMedia(content, "favourite")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "favourite") ? (
                  <RiHeartFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-fourth" />
                ) : (
                  <RiHeartLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                )}
              </div>
            </div>
            <div className="rounded-full text-text-secondary border p-[0.1rem]">
              <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 font-medium text-text-secondary">
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs lg:text-sm font-regular">
                ★ {content?.vote_average?.toFixed(1) || "0.0"}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs lg:text-sm font-regular">
                {(content?.release_date || content?.first_air_date)?.slice(
                  0,
                  4,
                ) || "N/A"}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            {content?.genre_ids?.length === 0 ? (
              <h1 className="text-xs lg:text-sm font-regular">Uncategorized</h1>
            ) : (
              allGenres
                ?.filter((list) => content?.genre_ids?.includes(list?.id))
                ?.slice(0, 2)
                ?.map((val) => (
                  <h1 key={val?.id} className="text-xs lg:text-sm font-regular">
                    {val?.name === "Science Fiction"
                      ? "Sci-Fi"
                      : val?.name?.split(" ")[0]}
                  </h1>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Media Card Variant Two Part 2 - used in (movies/tvshows/popular - numbered) */
export const MediaCardVariantTwoPartTwo = ({ content, index }) => {
  /* To access all genres */
  const { allGenres } = useSelector((store) => store.content);

  /* Media type (for info) */
  const { mediaType } = useContent();

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  return (
    <div
      onClick={() => mediaType(content)}
      className="relative w-92 h-48 md:w-100 md:h-56 shrink-0 group"
    >
      {/* Poster */}
      <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
        <img
          src={`${SCENERY_API_IMG_POSTER_BASE_URL}${content?.poster_path}`}
          alt="Poster"
          className="absolute right-0 z-10 w-[58%] md:w-[50%] h-full object-cover"
        />
        <h1
          className="absolute left-0 tracking-[-2rem] text-[12rem] md:text-[15rem] font-bold text-black"
          style={{ WebkitTextStroke: "4px #5F5E5E" }}
        >
          {index + 10}
        </h1>
        {/* hover drop down */}
        <div className="absolute z-10 bottom-0 right-0 bg-bg-blackColor/90 w-[58%] md:w-[50%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
          <div className="flex justify-between items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex gap-1"
            >
              <div
                onClick={() => saveProfileMedia(content, "watchLater")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "watchLater") ? (
                  <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                ) : (
                  <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                )}
              </div>
              <div
                onClick={() => saveProfileMedia(content, "favourite")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "favourite") ? (
                  <RiHeartFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-fourth" />
                ) : (
                  <RiHeartLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                )}
              </div>
            </div>
            <div className="rounded-full text-text-secondary border p-[0.1rem]">
              <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 font-medium text-text-secondary">
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs lg:text-sm font-regular">
                ★ {content?.vote_average?.toFixed(1) || "0.0"}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs lg:text-sm font-regular">
                {(content?.release_date || content?.first_air_date)?.slice(
                  0,
                  4,
                ) || "N/A"}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            {content?.genre_ids?.length === 0 ? (
              <h1 className="text-xs lg:text-sm font-regular">Uncategorized</h1>
            ) : (
              allGenres
                ?.filter((list) => content?.genre_ids?.includes(list?.id))
                ?.slice(0, 2)
                ?.map((val) => (
                  <h1 key={val.id} className="text-xs lg:text-sm font-regular">
                    {val?.name === "Science Fiction"
                      ? "Sci-Fi"
                      : val?.name?.split(" ")[0]}
                  </h1>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Media Card Variant Three - used in (library - selected section) */
export const MediaCardVariantThree = ({ content }) => {
  /* To access all genres */
  const { allGenres } = useSelector((store) => store.content);

  /* Media type (for info) */
  const { mediaType } = useContent();

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  return (
    <div onClick={() => mediaType(content)} className="group/card">
      <div className="relative cursor-pointer transition-transform duration-300 ease-out group-hover/card:scale-95">
        <img
          src={
            content?.poster_path
              ? `${SCENERY_API_IMG_POSTER_BASE_URL}${content?.poster_path}`
              : NoPoster
          }
          alt="Poster"
          className="w-full aspect-2/3 rounded-sm object-cover"
        />
        {/* About movie or show - on hover drop down */}
        <div className="w-full flex flex-col gap-2 px-2 py-2 absolute z-10 bottom-0 bg-bg-blackColor/90 rounded-b-sm opacity-0 group-hover/card:opacity-100 transition duration-200">
          <div className="flex justify-between items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex gap-1"
            >
              <div
                onClick={() => saveProfileMedia(content, "watchLater")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "watchLater") ? (
                  <RiBookmarkFill className="w-7 h-7 text-text-secondary" />
                ) : (
                  <RiBookmarkLine className="w-7 h-7 text-text-secondary" />
                )}
              </div>
              <div
                onClick={() => saveProfileMedia(content, "favourite")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "favourite") ? (
                  <RiHeartFill className="w-7 h-7 text-text-fourth" />
                ) : (
                  <RiHeartLine className="w-7 h-7 text-text-secondary" />
                )}
              </div>
            </div>
            <div className="rounded-full text-text-secondary border p-[0.1rem]">
              <Info className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-2 font-medium text-text-secondary">
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs font-regular">
                ★ {content?.vote_average?.toFixed(1) || "0.0"}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs font-regular">
                {(content?.release_date || content?.first_air_date)?.slice(
                  0,
                  4,
                ) || "N/A"}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            {content?.genre_ids?.length === 0 ? (
              <h1 className="text-xs font-regular">Uncategorized</h1>
            ) : (
              allGenres
                ?.filter((list) => content?.genre_ids?.includes(list?.id))
                ?.slice(0, 2)
                ?.map((val) => (
                  <h1 key={val?.id} className="text-xs font-regular">
                    {val?.name === "Science Fiction"
                      ? "Sci-Fi"
                      : val?.name?.split(" ")[0]}
                  </h1>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Media Card Variant Four used in (movieInfo/tvShowInfo - recomendation) */
export const MediaCardVariantFour = ({ content }) => {
  /* To access all genres */
  const { allGenres } = useSelector((store) => store.content);

  /* Media type (for info) */
  const { mediaType } = useContent();

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  return (
    <div onClick={() => mediaType(content)} className="relative shrink-0 group">
      <div className="relative w-60 aspect-video overflow-hidden rounded-t-sm shrink-0 cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out 460:w-[18rem]">
        <img
          src={
            content.backdrop_path
              ? `${SCENERY_API_IMG_POSTER_BASE_URL}${content.backdrop_path}`
              : NoBackdrop
          }
          alt="Recomendations"
          className="absolute z-0 w-full h-full object-cover"
        />
        {/* On hover drop down */}
        <div className="absolute z-1 bottom-0 bg-bg-blackColor/90 w-full flex flex-col gap-1.25 px-2 py-1.25 opacity-0 group-hover:opacity-100 transition duration-200 460:gap-2 460:py-2">
          <div className="flex justify-between items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex gap-1"
            >
              <div
                onClick={() => saveProfileMedia(content, "watchLater")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "watchLater") ? (
                  <RiBookmarkFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                ) : (
                  <RiBookmarkLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                )}
              </div>
              <div
                onClick={() => saveProfileMedia(content, "favourite")}
                className="p-[0.1rem]"
              >
                {showSavedProfileMedia(content, "favourite") ? (
                  <RiHeartFill className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-fourth" />
                ) : (
                  <RiHeartLine className="w-7 h-7 sm:w-[1.80rem] sm:h-[1.80rem] lg:w-[1.85rem] lg:h-[1.85rem] text-text-secondary" />
                )}
              </div>
            </div>
            <div className="rounded-full text-text-secondary border p-[0.1rem]">
              <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 font-medium text-text-secondary text-xs 460:text-sm">
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs lg:text-sm font-regular">
                ★ {content.vote_average.toFixed(1) || "0.0"}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border">
              <h1 className="text-xs lg:text-sm font-regular">
                {(content.release_date || content.first_air_date)?.slice(
                  0,
                  4,
                ) || "N/A"}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            {content.genre_ids?.length === 0 ? (
              <h1 className="text-xs lg:text-sm font-regular">Uncategorized</h1>
            ) : (
              allGenres
                .filter((list) => content.genre_ids.includes(list.id))
                .slice(0, 2)
                .map((val) => (
                  <h1 key={val.id} className="text-xs lg:text-sm font-regular">
                    {val?.name === "Science Fiction"
                      ? "Sci-Fi"
                      : val?.name?.split(" ")[0]}
                  </h1>
                ))
            )}
          </div>
        </div>
        {(content?.title || content?.name) && (
          <div className="absolute m-1 right-1 bottom-1 rounded-2xl px-3 py-1 bg-bg-blackColor/60 border-sm transition-transform duration-200 group-hover:-translate-y-23 460:group-hover:-translate-y-30">
            <h1 className="text-xs font-semibold 460:text-sm">
              {(content?.title || content?.name).split(/:|-|,/)[0] || "N/A"}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
