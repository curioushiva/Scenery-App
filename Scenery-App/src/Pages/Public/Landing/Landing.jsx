import useContent from "@/Utils/Hooks/useContent/useContent";
import { SCENERY_API_IMG_POSTER_BASE_URL } from "@/Utils/SceneryAPI/SceneryAPI";
import { useNavigate } from "react-router";
import { ReasonToJoinMockData } from "@/Utils/Mockdata/Mockdata";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "@/Utils/Hooks/useAuth/useAuth";
import { setLandingPageErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { resetErrors } from "@/Utils/Redux/Slices/AuthSlice/AuthSlice";
import { Link } from "react-router";

const Landing = () => {
  /* For dispatch, navigate & location */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* To landing page's content */
  const { getLandingContentData } = useContent();
  useEffect(() => {
    getLandingContentData();
  }, []);

  /* To access all genres and landing page content */
  const { allGenres, landingContent } = useSelector((store) => store.content);

  /* Landing page popular content (using this rn) */
  const popularContent = landingContent?.find((val) => val.type === "popular");

  /* Landing page topRated content */
  const topRatedContent = landingContent?.find(
    (val) => val.type === "topRated",
  );

  /* Selecting email typed by user */
  const authTypedEmail = useSelector((store) => store.auth.authTypedEmail);

  /* Selecting landing page errors */
  const { upperEmailInvalid, lowerEmailInvalid, isLandingEmailValid } =
    useSelector((store) => store.auth.LandingPageErrors);

  /* To set upper & lower typed email */
  const [upperTypedEmail, setUpperTypedEmail] = useState(authTypedEmail);
  const [lowerTypedEmail, setLowerTypedEmail] = useState(authTypedEmail);

  /* To validate upper and lower email */
  const { validateUpperEmail, validateLowerEmail } = useAuth();

  /* To navigate if credentials true */
  useEffect(() => {
    if (isLandingEmailValid) {
      navigate("/signup");
    }
  }, [isLandingEmailValid, navigate]);

  /* Reseting erros on page leave */
  useEffect(() => {
    dispatch(resetErrors("LandingPageErrors"));
  }, [location.pathname]);

  return (
    <div className="w-full flex flex-col gap-15">
      {/* Page 1 */}
      <div className="w-full flex flex-col items-center justify-center gap-5">
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-6xl text-center font-medium">
            For every story worth watching there's
            <span className="font-sharp bg-gradient-to-b from-text-primary to-text-primary/60 bg-clip-text text-transparent">
              {" "}
              Scenery{" "}
            </span>
            for you
          </h2>
        </div>
        {/* Subheading */}
        <div className="max-w-xl">
          <p className="text-sm sm:text-base font-regular text-center italic text-text-secondary">
            Explore millions of movies and TV shows, build your personal
            library, and never run out of great stories
          </p>
        </div>
        {/* Form */}
        <div className="w-full max-w-xl flex flex-col 430:flex-row gap-2 items-start">
          {/* Input */}
          <div className="flex-1 w-full">
            <input
              value={upperTypedEmail}
              onChange={(e) => {
                setUpperTypedEmail(e.target.value);
                dispatch(setLandingPageErrors({ upperEmailInvalid: null }));
              }}
              className="w-full h-12 px-5 rounded-sm border border-br-primary/80 bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
              type="email"
              placeholder="Email Address"
            />

            {upperEmailInvalid && (
              <p className="mt-1 text-xs text-errorcolor">
                {upperEmailInvalid}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={() => validateUpperEmail(upperTypedEmail)}
            className="w-full 430:w-auto h-12 flex justify-center items-center gap-1 text-sm font-medium px-4 rounded-sm bg-btn-primary cursor-pointer transition duration-200 ease-in-out active:scale-95 "
          >
            <span>Get Started</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="18"
              fill="currentColor"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Page 2 */}
      <div className="w-full py-2 flex items-center gap-5 flex-col md:flex-row md:border-y border-br-primary/80">
        {/* 1 */}
        <div
          className="w-full flex items-center flex-row md:flex-col justify-between md:justify-center 
        pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-br-primary"
        >
          <h1 className="text-sm 310:text-base font-medium">Free</h1>
          <h2 className="text-xs 310:text-sm font-normal text-text-secondary">
            Forever
          </h2>
        </div>
        {/* 2 */}
        <div
          className="w-full flex items-center flex-row md:flex-col justify-between md:justify-center 
        pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-br-primary"
        >
          <h1 className="text-sm 310:text-base font-medium">Frequent</h1>
          <h2 className="text-xs 310:text-sm font-normal text-text-secondary">
            Updates
          </h2>
        </div>
        {/* 3 */}
        <div
          className="w-full flex items-center flex-row md:flex-col justify-between md:justify-center 
        pb-5 md:pb-0 border-b md:border-b-0 border-br-primary"
        >
          <h1 className="text-sm 310:text-base font-medium">Global</h1>
          <h2 className="text-xs 310:text-sm font-normal text-text-secondary">
            Coverage
          </h2>
        </div>
      </div>

      {/* Page 3 */}
      {popularContent?.content?.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          {/* Trending Movies */}
          <div className="flex justify-between items-center text-lg font-medium">
            <h1>The Talk of the Town</h1>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="text-sm text-regular text-text-secondary cursor-pointer transition duration-200 ease-in hover:text-text-sixth"
            >
              See all
            </Link>
          </div>
          {/* Movies & Shows Scrollbar */}
          <div className="flex flex-row gap-5 overflow-x-scroll no-scrollbar">
            {popularContent?.content
              .filter((content) => content.poster_path)
              .slice(0, 20)
              .map((content, index) => {
                return (
                  <div key={content.id || index} className="relative shrink-0">
                    <div
                      onClick={() =>
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        })
                      }
                      className="overflow-hidden w-34 sm:w-38 md:w-42 aspect-[2/3] flex flex-col items-start justify-end gap-2 pl-2 bg-bg-whiteColor/40 cursor-pointer group"
                      style={{
                        clipPath:
                          "polygon(64% 0, 76% 6%, 100% 6%, 100% 100%, 78% 100%, 56% 100%, 0 100%, 0% 70%, 0% 35%, 0 0)",
                      }}
                    >
                      <div className="flex">
                        {content?.genre_ids?.length === 0 ? (
                          <h1 className="text-xs sm:text-sm font-regular text-text-primary">
                            Uncategorized
                          </h1>
                        ) : (
                          allGenres
                            ?.filter((list) =>
                              content?.genre_ids?.includes(list?.id),
                            )
                            ?.slice(0, 1)
                            ?.map((val) => (
                              <h1
                                key={val?.id}
                                className="text-xs sm:text-sm font-regular text-text-primary"
                              >
                                {val?.name === "Science Fiction"
                                  ? "Sci-Fi"
                                  : val?.name?.split(" ")[0]}
                              </h1>
                            ))
                        )}
                      </div>
                      <div className="relative w-[100%] h-[80%] rounded-tl-2xl transition duration-300 ease-in-out group-hover:scale-105">
                        <img
                          src={`${SCENERY_API_IMG_POSTER_BASE_URL}${content.poster_path}`}
                          alt="Poster"
                          className="w-full h-full object-cover rounded-tl-2xl"
                        />
                        <div className="absolute inset-0 bg-bg-blackColor/20 rounded-tl-2xl" />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Page 4 */}
      <div className="w-full flex flex-col gap-5">
        {/* Heading */}
        <div className="flex justify-between items-center text-lg font-medium">
          <h1>Highlights</h1>
        </div>
        {/* Content */}
        <div className="w-full grid grid-cols-1 550:grid-cols-2 md:grid-cols-4 auto-rows-auto gap-5">
          {/* 1 */}
          <div className="col-span-1 550:col-span-2 row-span-1 550:row-span-2 bg-cardColor-primary/80 rounded-xl">
            <div className="w-full h-full flex flex-col gap-8 p-8">
              {ReasonToJoinMockData?.slice(0, 1)?.map((val, idx) => {
                const Heading = val.header;
                const SubHeading = val.subheader;
                const Icon = val.imgicon;
                return (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="w-fit p-2 border-[0.5px] border-br-ternary rounded-xl">
                      <Icon className="w-5 h-5 text-text-sixth" />
                    </div>
                    <h1 className="text-base sm:text-lg font-medium">
                      {Heading}
                    </h1>
                    <h2 className="text-xs sm:text-sm font-regular text-text-secondary">
                      {SubHeading}
                    </h2>
                  </div>
                );
              })}

              <div className="w-full h-full flex gap-3 flex-wrap">
                <div className="w-full flex flex-col 350:flex-row gap-3">
                  <div className="w-full h-full px-4 py-4 flex flex-col justify-center items-center gap-1 rounded-xl bg-bg-topColor/80">
                    <h1 className="text-sm sm:text-base font-medium">800K+</h1>
                    <p className="text-xs sm:text:sm font-regular">Movies</p>
                  </div>
                  <div className="w-full h-full px-4 py-4 flex flex-col justify-center items-center gap-1 rounded-xl bg-bg-topColor/80">
                    <h1 className="text-sm sm:text-base font-medium">150K+</h1>
                    <p className="text-xs sm:text:sm font-regular">TV Shows</p>
                  </div>
                </div>

                <div className="w-full flex flex-col 350:flex-row gap-3">
                  <div className="w-full h-full px-4 py-4 flex flex-col justify-center items-center gap-1 rounded-xl bg-bg-topColor/80">
                    <h1 className="text-sm sm:text-base font-medium">2.9M+</h1>
                    <p className="text-xs sm:text:sm font-regular">
                      Cast & Crew
                    </p>
                  </div>
                  <div className="w-full h-full px-4 py-4 flex flex-col justify-center items-center gap-1 rounded-xl bg-bg-topColor/80">
                    <h1 className="text-sm sm:text-base font-medium">3.8M+</h1>
                    <p className="text-xs sm:text:sm font-regular">Episodes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="col-span-1 550:col-span-1 row-span-2 550:row-span-1 flex flex-col gap-4 bg-cardColor-primary/80 rounded-xl">
            <div className="w-full flex flex-col gap-8 p-8">
              {ReasonToJoinMockData?.slice(1, 2)?.map((val, idx) => {
                const Heading = val.header;
                const SubHeading = val.subheader;
                const Icon = val.imgicon;
                return (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="w-fit p-2 border-[0.5px] border-br-ternary rounded-xl">
                      <Icon className="w-5 h-5 text-text-sixth" />
                    </div>
                    <h1 className="text-base sm:text-lg font-medium">
                      {Heading}
                    </h1>
                    <h2 className="text-xs sm:text-sm font-regular text-text-secondary">
                      {SubHeading}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3 */}
          <div className="col-span-1 550:col-span-1 row-span-3 550:row-span-1 flex flex-col gap-4 bg-cardColor-primary/80 rounded-xl">
            <div className="w-full flex flex-col gap-8 p-8">
              {ReasonToJoinMockData?.slice(2, 3)?.map((val, idx) => {
                const Heading = val.header;
                const SubHeading = val.subheader;
                const Icon = val.imgicon;
                return (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="w-fit p-2 border-[0.5px] border-br-ternary rounded-xl">
                      <Icon className="w-5 h-5 text-text-sixth" />
                    </div>
                    <h1 className="text-base sm:text-lg font-medium">
                      {Heading}
                    </h1>
                    <h2 className="text-xs sm:text-sm font-regular text-text-secondary">
                      {SubHeading}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 */}
          <div className="col-span-1 550:col-span-2 row-span-4 550:row-span-1 flex flex-col gap-4 bg-cardColor-primary/80 rounded-xl">
            <div className="w-full flex flex-col gap-8 p-8">
              {ReasonToJoinMockData?.slice(3, 4)?.map((val, idx) => {
                const Heading = val.header;
                const SubHeading = val.subheader;
                const Icon = val.imgicon;
                return (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="w-fit p-2 border-[0.5px] border-br-ternary rounded-xl">
                      <Icon className="w-5 h-5 text-text-sixth" />
                    </div>
                    <h1 className="text-base sm:text-lg font-medium">
                      {Heading}
                    </h1>
                    <h2 className="text-xs sm:text-sm font-regular text-text-secondary">
                      {SubHeading}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Page 5 */}
      <div className="w-full grid grid-col-1 md:grid-cols-4 items-center gap-10 border-y border-br-primary/80 py-15">
        {/* Heading */}
        <p className="max-w-lg md:max-w-full col-span-2 text-sm sm:text-base font-normal text-text-secondary italic">
          Ready to start? Enter your email and start discovering in seconds
        </p>
        {/* Inputs */}
        <div className="max-w-lg md:max-w-full col-span-2 flex flex-col 375:flex-row gap-4 items-start">
          <div className="flex-1 min-w-0 w-full flex flex-col gap-2 items-start">
            <input
              value={lowerTypedEmail}
              onChange={(e) => {
                setLowerTypedEmail(e.target.value);
                dispatch(setLandingPageErrors({ lowerEmailInvalid: null }));
              }}
              className="w-full h-12 px-5 py-3 rounded-sm border border-border border-br-primary bg-bg-inputColor placeholder-text-secondary focus:outline focus:outline-white"
              type="email"
              placeholder="Email Address"
            />
            <p className="text-xs text-errorcolor">{lowerEmailInvalid}</p>
          </div>
          <button
            onClick={() => validateLowerEmail(lowerTypedEmail)}
            className="w-full h-12 shrink-0 375:w-fit text-sm font-medium px-4 py-3 rounded-sm bg-btn-primary flex justify-center items-center cursor-pointer transition duration-200 ease-in-out active:scale-95"
          >
            <h1>Get Started</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="18"
              fill="currentColor"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
