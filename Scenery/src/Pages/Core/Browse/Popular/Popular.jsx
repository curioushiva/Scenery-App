import useContent from "@/Utils/Hooks/useContent/useContent";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import { IMG_POSTER_BASE_URL } from "@/Utils/SceneryAPI/SceneryAPI";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeartFill,
  RiHeartLine,
} from "@remixicon/react";
import { Info } from "react-bootstrap-icons";

const Popular = () => {
  /* To get Popular Categorie's data */
  const { getPopularCat } = useContent();
  useEffect(() => {
    getPopularCat();
  }, []);

  /* To access popular movies & shows sategories & Genres */
  const { popularCat, allGenres } = useSelector((store) => store.content);

  /* Media type (for info) */
  const { mediaType } = useContent();

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  {
    return popularCat?.length === 0 ? (
      <div></div>
    ) : (
      <div className="relative flex flex-col gap-10 p-8 mobileNavPad overflow-hidden">
        {/* Now Playing */}
        {popularCat
          .filter((categorie) => categorie.content.length > 5)
          .slice(0, 1)
          .map((categorie) => {
            return (
              <div key={categorie.type} className="w-full flex flex-col gap-3">
                <div className="font-medium text-base 350:text-xl">
                  <h1>{categorie.title}</h1>
                </div>
                <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                  {categorie.content
                    .filter((content) => content.id && content.poster_path)
                    .map((content, index) => (
                      <div
                        key={content.id}
                        onClick={() => mediaType(content)}
                        className="relative flex-shrink-0 group"
                      >
                        <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                          <img
                            src={`${IMG_POSTER_BASE_URL}${content.poster_path}`}
                            alt="Poster"
                            className="absolute z-0 w-full h-full object-cover"
                          />
                          {/* About movie or show - on hover drop down */}
                          <div className="absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
                            <div className="flex justify-between items-center">
                              <div
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                className="flex gap-1"
                              >
                                <div
                                  onClick={() =>
                                    saveProfileMedia(content, "watchLater")
                                  }
                                  className="p-[0.1rem]"
                                >
                                  {showSavedProfileMedia(
                                    content,
                                    "watchLater",
                                  ) ? (
                                    <RiBookmarkFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  ) : (
                                    <RiBookmarkLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  )}
                                </div>
                                <div
                                  onClick={() =>
                                    saveProfileMedia(content, "favourite")
                                  }
                                  className="p-[0.1rem]"
                                >
                                  {showSavedProfileMedia(content, "favourite") ? (
                                    <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                                  ) : (
                                    <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  )}
                                </div>
                              </div>
                              <div className="rounded-full border-[#A9A9A9] border p-[0.1rem]">
                                <Info className="w-6 h-6 text-[#A9A9A9]" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 font-medium text-[#A9A9A9]">
                              <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                <h1 className="text-sm">
                                  ★ {content.vote_average.toFixed(1) || "0.0"}
                                </h1>
                              </div>
                              <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                <h1 className="text-sm">
                                  {" "}
                                  {(
                                    content.release_date ||
                                    content.first_air_date
                                  )?.slice(0, 4) || "N/A"}
                                </h1>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {content.genre_ids.length === 0 ? (
                                <h1 className="text-sm font-medium">
                                  Uncategorized
                                </h1>
                              ) : (
                                allGenres
                                  .filter((list) =>
                                    content.genre_ids.includes(list.id),
                                  )
                                  .slice(0, 2)
                                  .map((val) => (
                                    <h1
                                      key={val.id}
                                      className="text-sm font-medium"
                                    >
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
                    ))}
                </div>
              </div>
            );
          })}

        {/* Top Popular Movies */}
        {popularCat
          .filter((categorie) => categorie.content.length > 5)
          .slice(1, 2)
          .map((categorie) => {
            return (
              categorie.title === "Top Popular Movies" && (
                <div
                  key={categorie.type}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="font-medium text-base 350:text-xl">
                    <h1>{categorie.title}</h1>
                  </div>
                  <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                    {/* 1-9 */}
                    {categorie.content
                      .filter((content) => content.id && content.poster_path)
                      .slice(0, 9)
                      .map((content, index) => (
                        <div
                          key={content.id}
                          onClick={() => mediaType(content)}
                          className="relative w-[16rem] h-[12rem] md:w-[18rem] md:h-[14rem] flex-shrink-0 group"
                        >
                          <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
                            <img
                              src={`${IMG_POSTER_BASE_URL}${content.poster_path}`}
                              alt="Poster"
                              className="absolute right-0 z-10 w-[67%] md:w-[65%] h-full object-cover"
                            />
                            <h1
                              className="absolute left-0 text-[13rem] md:text-[15rem] font-bold text-black"
                              style={{ WebkitTextStroke: "4px #5F5E5E" }}
                            >
                              {index + 1}
                            </h1>
                            {/* About movie or show - on hover drop down */}
                            <div className="absolute z-10 bottom-0 right-0 bg-black/90 w-[67%] md:w-[65%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
                              <div className="flex justify-between items-center">
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  className="flex gap-1"
                                >
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "watchLater")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "watchLater",
                                    ) ? (
                                      <RiBookmarkFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    ) : (
                                      <RiBookmarkLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    )}
                                  </div>
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "favourite")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "favourite",
                                    ) ? (
                                      <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                                    ) : (
                                      <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    )}
                                  </div>
                                </div>
                                <div className="rounded-full border-[#A9A9A9] border p-[0.1rem]">
                                  <Info className="w-6 h-6 text-[#A9A9A9]" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2 font-medium text-[#A9A9A9]">
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                  <h1 className="text-sm">
                                    ★ {content.vote_average.toFixed(1) || "0.0"}
                                  </h1>
                                </div>
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                  <h1 className="text-sm">
                                    {" "}
                                    {(
                                      content.release_date ||
                                      content.first_air_date
                                    )?.slice(0, 4) || "N/A"}
                                  </h1>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {content.genre_ids.length === 0 ? (
                                  <h1 className="text-sm font-medium">
                                    Uncategorized
                                  </h1>
                                ) : (
                                  allGenres
                                    .filter((list) =>
                                      content.genre_ids.includes(list.id),
                                    )
                                    .slice(0, 2)
                                    .map((val) => (
                                      <h1
                                        key={val.id}
                                        className="text-sm font-medium"
                                      >
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
                      ))}
                    {/* 10-15 */}
                    {categorie.content
                      .filter((content) => content.id && content.poster_path)
                      .slice(9, 15)
                      .map((content, index) => (
                        <div
                          key={content.id}
                          onClick={() => mediaType(content)}
                          className="relative w-[23rem] h-[12rem] md:w-[25rem] md:h-[14rem] flex-shrink-0 group"
                        >
                          <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
                            <img
                              src={`${IMG_POSTER_BASE_URL}${content.poster_path}`}
                              alt="Poster"
                              className="absolute right-0 z-10 w-[58%] md:w-[50%] h-full object-cover"
                            />
                            <h1
                              className="absolute left-0 tracking-[-2rem] text-[12rem] md:text-[15rem] font-bold text-black"
                              style={{ WebkitTextStroke: "4px #5F5E5E" }}
                            >
                              {index + 10}
                            </h1>
                            {/* About movie or show - on hover drop down */}
                            <div className="absolute z-10 bottom-0 right-0 bg-black/90 w-[58%] md:w-[50%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
                              <div className="flex justify-between items-center">
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  className="flex gap-1"
                                >
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "watchLater")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "watchLater",
                                    ) ? (
                                      <RiBookmarkFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    ) : (
                                      <RiBookmarkLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    )}
                                  </div>
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "favourite")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "favourite",
                                    ) ? (
                                      <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                                    ) : (
                                      <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    )}
                                  </div>
                                </div>
                                <div className="rounded-full border-[#A9A9A9] border p-[0.1rem]">
                                  <Info className="w-6 h-6 text-[#A9A9A9]" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2 font-medium text-[#A9A9A9]">
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                  <h1 className="text-sm">
                                    ★ {content.vote_average.toFixed(1) || "0.0"}
                                  </h1>
                                </div>
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                  <h1 className="text-sm">
                                    {" "}
                                    {(
                                      content.release_date ||
                                      content.first_air_date
                                    )?.slice(0, 4) || "N/A"}
                                  </h1>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {content.genre_ids.length === 0 ? (
                                  <h1 className="text-sm font-medium">
                                    Uncategorized
                                  </h1>
                                ) : (
                                  allGenres
                                    .filter((list) =>
                                      content.genre_ids.includes(list.id),
                                    )
                                    .slice(0, 2)
                                    .map((val) => (
                                      <h1
                                        key={val.id}
                                        className="text-sm font-medium"
                                      >
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
                      ))}
                  </div>
                </div>
              )
            );
          })}

        {/* Upcoming Movies */}
        {popularCat
          .filter((categorie) => categorie.content.length > 5)
          .slice(2, 3)
          .map((categorie) => {
            return (
              <div key={categorie.type} className="w-full flex flex-col gap-3">
                <div className="font-medium text-base 350:text-xl">
                  <h1>{categorie.title}</h1>
                </div>
                <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                  {categorie.content
                    .filter((content) => content.id && content.poster_path)
                    .map((content, index) => (
                      <div
                        key={content.id}
                        onClick={() => mediaType(content)}
                        className="relative flex-shrink-0 group"
                      >
                        <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                          <img
                            src={`${IMG_POSTER_BASE_URL}${content.poster_path}`}
                            alt="Poster"
                            className="absolute z-0 w-full h-full object-cover"
                          />
                          {/* About movie or show - on hover drop down */}
                          <div className="absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
                            <div className="flex justify-between items-center">
                              <div
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                className="flex gap-1"
                              >
                                <div
                                  onClick={() =>
                                    saveProfileMedia(content, "watchLater")
                                  }
                                  className="p-[0.1rem]"
                                >
                                  {showSavedProfileMedia(
                                    content,
                                    "watchLater",
                                  ) ? (
                                    <RiBookmarkFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  ) : (
                                    <RiBookmarkLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  )}
                                </div>
                                <div
                                  onClick={() =>
                                    saveProfileMedia(content, "favourite")
                                  }
                                  className="p-[0.1rem]"
                                >
                                  {showSavedProfileMedia(content, "favourite") ? (
                                    <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                                  ) : (
                                    <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  )}
                                </div>
                              </div>
                              <div className="rounded-full border-[#A9A9A9] border p-[0.1rem]">
                                <Info className="w-6 h-6 text-[#A9A9A9]" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 font-medium text-[#A9A9A9]">
                              <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                <h1 className="text-sm">
                                  ★ {content.vote_average.toFixed(1) || "0.0"}
                                </h1>
                              </div>
                              <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                <h1 className="text-sm">
                                  {" "}
                                  {(
                                    content.release_date ||
                                    content.first_air_date
                                  )?.slice(0, 4) || "N/A"}
                                </h1>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {content.genre_ids.length === 0 ? (
                                <h1 className="text-sm font-medium">
                                  Uncategorized
                                </h1>
                              ) : (
                                allGenres
                                  .filter((list) =>
                                    content.genre_ids.includes(list.id),
                                  )
                                  .slice(0, 2)
                                  .map((val) => (
                                    <h1
                                      key={val.id}
                                      className="text-sm font-medium"
                                    >
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
                    ))}
                </div>
              </div>
            );
          })}

        {/* Top Popular Shows */}
        {popularCat
          .filter((categorie) => categorie.content.length > 5)
          .slice(3, 4)
          .map((categorie) => {
            return (
              categorie.title === "Top Popular TV Shows" && (
                <div
                  key={categorie.type}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="font-medium text-base 350:text-xl">
                    <h1>{categorie.title}</h1>
                  </div>
                  <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                    {/* 1-9 */}
                    {categorie.content
                      .filter((content) => content.id && content.poster_path)
                      .slice(0, 9)
                      .map((content, index) => (
                        <div
                          key={content.id}
                          onClick={() => mediaType(content)}
                          className="relative w-[16rem] h-[12rem] md:w-[18rem] md:h-[14rem] flex-shrink-0 group"
                        >
                          <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
                            <img
                              src={`${IMG_POSTER_BASE_URL}${content.poster_path}`}
                              alt="Poster"
                              className="absolute right-0 z-10 w-[67%] md:w-[65%] h-full object-cover"
                            />
                            <h1
                              className="absolute left-0 text-[13rem] md:text-[15rem] font-bold text-black"
                              style={{ WebkitTextStroke: "4px #5F5E5E" }}
                            >
                              {index + 1}
                            </h1>
                            {/* About movie or show - on hover drop down */}
                            <div className="absolute z-10 bottom-0 right-0 bg-black/90 w-[67%] md:w-[65%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
                              <div className="flex justify-between items-center">
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  className="flex gap-1"
                                >
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "watchLater")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "watchLater",
                                    ) ? (
                                      <RiBookmarkFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    ) : (
                                      <RiBookmarkLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    )}
                                  </div>
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "favourite")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "favourite",
                                    ) ? (
                                      <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                                    ) : (
                                      <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    )}
                                  </div>
                                </div>
                                <div className="rounded-full border-[#A9A9A9] border p-[0.1rem]">
                                  <Info className="w-6 h-6 text-[#A9A9A9]" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2 font-medium text-[#A9A9A9]">
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                  <h1 className="text-sm">
                                    ★ {content.vote_average.toFixed(1) || "0.0"}
                                  </h1>
                                </div>
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                  <h1 className="text-sm">
                                    {" "}
                                    {(
                                      content.release_date ||
                                      content.first_air_date
                                    )?.slice(0, 4) || "N/A"}
                                  </h1>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {content.genre_ids.length === 0 ? (
                                  <h1 className="text-sm font-medium">
                                    Uncategorized
                                  </h1>
                                ) : (
                                  allGenres
                                    .filter((list) =>
                                      content.genre_ids.includes(list.id),
                                    )
                                    .slice(0, 2)
                                    .map((val) => (
                                      <h1
                                        key={val.id}
                                        className="text-sm font-medium"
                                      >
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
                      ))}
                    {/* 10-15 */}
                    {categorie.content
                      .filter((content) => content.id && content.poster_path)
                      .slice(9, 15)
                      .map((content, index) => (
                        <div
                          key={content.id}
                          onClick={() => mediaType(content)}
                          className="relative w-[23rem] h-[12rem] md:w-[25rem] md:h-[14rem] flex-shrink-0 group"
                        >
                          <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
                            <img
                              src={`${IMG_POSTER_BASE_URL}${content.poster_path}`}
                              alt="Poster"
                              className="absolute right-0 z-10 w-[58%] md:w-[50%] h-full object-cover"
                            />
                            <h1
                              className="absolute left-0 tracking-[-2rem] text-[12rem] md:text-[15rem] font-bold text-black"
                              style={{ WebkitTextStroke: "4px #5F5E5E" }}
                            >
                              {index + 10}
                            </h1>
                            {/* About movie or show - on hover drop down */}
                            <div className="absolute z-10 bottom-0 right-0 bg-black/90 w-[58%] md:w-[50%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
                              <div className="flex justify-between items-center">
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  className="flex gap-1"
                                >
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "watchLater")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "watchLater",
                                    ) ? (
                                      <RiBookmarkFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    ) : (
                                      <RiBookmarkLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    )}
                                  </div>
                                  <div
                                    onClick={() =>
                                      saveProfileMedia(content, "favourite")
                                    }
                                    className="p-[0.1rem]"
                                  >
                                    {showSavedProfileMedia(
                                      content,
                                      "favourite",
                                    ) ? (
                                      <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                                    ) : (
                                      <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                    )}
                                  </div>
                                </div>
                                <div className="rounded-full border-[#A9A9A9] border p-[0.1rem]">
                                  <Info className="w-6 h-6 text-[#A9A9A9]" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2 font-medium text-[#A9A9A9]">
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                  <h1 className="text-sm">
                                    ★ {content.vote_average.toFixed(1) || "0.0"}
                                  </h1>
                                </div>
                                <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                  <h1 className="text-sm">
                                    {" "}
                                    {(
                                      content.release_date ||
                                      content.first_air_date
                                    )?.slice(0, 4) || "N/A"}
                                  </h1>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {content.genre_ids.length === 0 ? (
                                  <h1 className="text-sm font-medium">
                                    Uncategorized
                                  </h1>
                                ) : (
                                  allGenres
                                    .filter((list) =>
                                      content.genre_ids.includes(list.id),
                                    )
                                    .slice(0, 2)
                                    .map((val) => (
                                      <h1
                                        key={val.id}
                                        className="text-sm font-medium"
                                      >
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
                      ))}
                  </div>
                </div>
              )
            );
          })}

        {/* Upcoming Shows */}
        {popularCat
          .filter((categorie) => categorie.content.length > 5)
          .slice(4, 5)
          .map((categorie) => {
            return (
              <div key={categorie.type} className="w-full flex flex-col gap-3">
                <div className="font-medium text-base 350:text-xl">
                  <h1>{categorie.title}</h1>
                </div>
                <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                  {categorie.content
                    .filter((content) => content.id && content.poster_path)
                    .map((content, index) => (
                      <div
                        key={content.id}
                        onClick={() => mediaType(content)}
                        className="relative flex-shrink-0 group"
                      >
                        <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                          <img
                            src={`${IMG_POSTER_BASE_URL}${content.poster_path}`}
                            alt="Poster"
                            className="absolute z-0 w-full h-full object-cover"
                          />
                          {/* About movie or show - on hover drop down */}
                          <div className="absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200">
                            <div className="flex justify-between items-center">
                              <div
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                className="flex gap-1"
                              >
                                <div
                                  onClick={() =>
                                    saveProfileMedia(content, "watchLater")
                                  }
                                  className="p-[0.1rem]"
                                >
                                  {showSavedProfileMedia(
                                    content,
                                    "watchLater",
                                  ) ? (
                                    <RiBookmarkFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  ) : (
                                    <RiBookmarkLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  )}
                                </div>
                                <div
                                  onClick={() =>
                                    saveProfileMedia(content, "favourite")
                                  }
                                  className="p-[0.1rem]"
                                >
                                  {showSavedProfileMedia(content, "favourite") ? (
                                    <RiHeartFill className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#f14049]" />
                                  ) : (
                                    <RiHeartLine className="w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] lg:h-[1.9rem] text-[#A9A9A9]" />
                                  )}
                                </div>
                              </div>
                              <div className="rounded-full border-[#A9A9A9] border p-[0.1rem]">
                                <Info className="w-6 h-6 text-[#A9A9A9]" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 font-medium text-[#A9A9A9]">
                              <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                <h1 className="text-sm">
                                  ★ {content.vote_average.toFixed(1) || "0.0"}
                                </h1>
                              </div>
                              <div className="flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1">
                                <h1 className="text-sm">
                                  {" "}
                                  {(
                                    content.release_date ||
                                    content.first_air_date
                                  )?.slice(0, 4) || "N/A"}
                                </h1>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {content.genre_ids.length === 0 ? (
                                <h1 className="text-sm font-medium">
                                  Uncategorized
                                </h1>
                              ) : (
                                allGenres
                                  .filter((list) =>
                                    content.genre_ids.includes(list.id),
                                  )
                                  .slice(0, 2)
                                  .map((val) => (
                                    <h1
                                      key={val.id}
                                      className="text-sm font-medium"
                                    >
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
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
};

export default Popular;
