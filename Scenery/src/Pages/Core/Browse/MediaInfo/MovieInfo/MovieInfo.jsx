import useContent from "@/Utils/Hooks/useContent/useContent";
import useAccount from "@/Utils/Hooks/useAccount/useAccount";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addMediaID } from "@/Utils/Redux/Slices/ContentSlice/ContentSlice";
import {
  ShowTrailerUI,
  MediaInfoBackground,
  MediaInfoPoster,
  MediaGenricInfo,
  MoreMediaInfo,
  MediaInfoCast,
  MediaInfoTrailers,
  MediaInfoBrowseMore,
} from "@/Pages/Core/UI/MediaInfoUI/MediaInfoUI/MediaInfoUI";
import { MediaCarouselVariantFive } from "@/Pages/Core/UI/MediaCarousel/MediaCarousel/MediaCarousel";
import {
  MediaGenricInfoShimmerUI,
  MediaInfoBrowseMoreShimmerUI,
  MediaInfoCastShimmerUI,
  MediaInfoPosterShimmerUI,
  MediaInfoTrailersShimmerUI,
  MoreMediaInfoShimmerUI,
} from "@/Pages/Core/UI/MediaInfoUI/ShimmerUI/MediaInfoShimmerUI";
import { MediaCarouselVariantFiveShimmerUI } from "@/Pages/Core/UI/MediaCarousel/ShimmerUi/MediaCarouselShimmerUI";
import { FetchError } from "@/Pages/Core/UI/FetchError/FetchError";

const MovieInfo = () => {
  /* To dispatch and navigate */
  const dispatch = useDispatch();

  /* Using and calling Media ID from URLs */
  const { mediaID } = useParams();
  const mediaIDFromURL = Number(mediaID);

  /* Accessing vales from useContent */
  const { movieInfoLoader, movieInfoError, getMovieInfo } = useContent();

  /* Calling to get movie info data */
  useEffect(() => {
    getMovieInfo(mediaIDFromURL);
    dispatch(addMediaID(mediaIDFromURL));
  }, [mediaIDFromURL]);

  /* Selecting mediaInfo for movies here */
  const mediaInfo = useSelector((store) => store.content.mediaInfo);

  /* Selcing profile location */
  const Location = useSelector((store) => store.account.profile.Location);

  /*  Save media (for saving watchlater & fav) & check if saved */
  const { saveProfileMedia, showSavedProfileMedia } = useAccount();

  /* Certification check */
  const mediaCertification = mediaInfo?.certifications?.results?.find(
    (val) => val.iso_3166_1 === Location,
  )?.release_dates?.[0]?.certification;

  /* Check for director & writter names */
  const findDirector = (() => {
    if (mediaInfo?.credits?.crew?.length > 0) {
      return mediaInfo?.credits?.crew.find(
        (person) => person.job === "Director",
      );
    } else {
      return null;
    }
  })();
  const findWriter = (() => {
    if (mediaInfo?.credits?.crew?.length > 0) {
      return mediaInfo?.credits?.crew.find((person) => person.job === "Writer");
    } else {
      return null;
    }
  })();

  /* Check for Video trailers */
  const videoArray = mediaInfo?.videos?.results;
  const videoTrailer = (() => {
    if (videoArray?.length === 0) {
      return null;
    } else {
      return videoArray
        ?.filter((val) => val.type === "Trailer" && val.site === "YouTube")
        ?.map((video) => video);
    }
  })();

  /* Play Trailer Video Key */
  const [playTrailerVideoKey, setPlayTrailerVideoKey] = useState(null);

  /* Getting Play Trailer Video Key initially */
  const playTrailerInitialVideoKey = (() => {
    if (videoArray?.length > 0 && videoTrailer?.length > 0) {
      return videoTrailer?.map((val) => {
        return val;
      });
    }
  })();

  /* To Show trailer */
  const [showTrailer, setShowTrailer] = useState(false);
  useEffect(() => {
    if (showTrailer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showTrailer]);

  /* To set the browse section */
  const [browseMoreSection, setBrowseMoreSection] = useState(null);

  /* Watch Providers check */
  const regionalWatchProvider = (() => {
    const results = mediaInfo?.watch_providers?.results;
    if (!results || Object.keys(results).length === 0) {
      return null;
    }
    const watchProvidersArr = Object.entries(results).map(([key, value]) => ({
      country: key,
      watchProviders: value,
    }));
    return watchProvidersArr.find((val) => val.country === Location) || null;
  })();

  /* Watch Providers for Below Poster Check */
  const regionalWatchProviderType =
    regionalWatchProvider?.watchProviders?.buy ||
    regionalWatchProvider?.watchProviders?.flatrate ||
    regionalWatchProvider?.watchProviders ||
    regionalWatchProvider?.watchProviders?.ads ||
    regionalWatchProvider?.watchProviders?.free;
  const regionalWatchProviderFirstValue = (() => {
    if (regionalWatchProviderType?.length > 0) {
      return regionalWatchProviderType?.map((val) => val);
    } else {
      return null;
    }
  })();

  /* Media's Socials Check */
  const mediasSocialsCheck =
    mediaInfo?.external_ids?.facebook_id ||
    mediaInfo?.external_ids?.imdb_id ||
    mediaInfo?.external_ids?.instagram_id ||
    mediaInfo?.external_ids?.twitter_id ||
    mediaInfo?.external_ids?.wikidata_id ||
    mediaInfo?.details?.homepage !== "";

  /* For scrolling in x */
  const recScrollRefs = useRef({});
  const castScrollRefs = useRef({});

  /* Loader state */
  if (movieInfoLoader) {
    return (
      <div className="w-full min-h-screen relative overflow-x-hidden">
        <div className="relative flex flex-col gap-10 p-8 pt-30 animate-pulse">
          <div className="w-full h-full flex flex-col gap-12">
            {/* Part 1 & 2 */}
            <div className="w-full h-full flex flex-col gap-12 items-stretch 880:flex-row">
              {/* Part 1  */}
              <MediaInfoPosterShimmerUI />
              {/* Part 2 */}
              <MediaGenricInfoShimmerUI />
            </div>

            {/* Part 3 */}
            <MoreMediaInfoShimmerUI />

            {/* Part 4  */}
            <MediaInfoCastShimmerUI />

            {/* Part 5 */}
            <MediaInfoTrailersShimmerUI />

            {/* Part 6 */}
            <MediaInfoBrowseMoreShimmerUI />

            {/* Part 7 */}
            <MediaCarouselVariantFiveShimmerUI />
          </div>
        </div>
      </div>
    )
  }

  /* Error state */
  if (movieInfoError) {
    return (
      <FetchError
        heading={"No movie found"}
        tagline={"We dug through the archive, this movie isn't in our collection. Try another title."}
      />
    )
  }

  /* Data loaded */
  if (Object.keys(mediaInfo).length > 0) {
    return (
      <div className="w-full min-h-screen relative overflow-x-hidden">
        {showTrailer && (
          <ShowTrailerUI
            playTrailerInitialVideoKey={playTrailerInitialVideoKey}
            setShowTrailer={setShowTrailer}
            playTrailerVideoKey={playTrailerVideoKey}
          />
        )}

        {/* Background Media */}
        {mediaInfo?.details?.backdrop_path && (
          <MediaInfoBackground
            backdropPathUrl={mediaInfo?.details?.backdrop_path}
          />
        )}

        {/* Media Info */}
        <div className="relative flex flex-col gap-10 p-8 pt-30">
          {mediaInfo?.details && (
            <div className="w-full h-full flex flex-col gap-12">
              {/* Part 1 & 2 */}
              <div className="w-full h-full flex flex-col gap-12 items-stretch 880:flex-row">
                {/* Part 1 : Media Poster */}
                <MediaInfoPoster
                  posterPathUrl={mediaInfo?.details?.poster_path}
                  regionalWatchProviderFirstValue={
                    regionalWatchProviderFirstValue
                  }
                />

                {/* Part 2 : Genric Info */}
                <MediaGenricInfo
                  mediaDetails={mediaInfo?.details}
                  mediaInfoTitle={mediaInfo?.details?.title}
                  mediaCertification={mediaCertification}
                  mediaDate={mediaInfo?.details?.release_date}
                  mediaCountry={mediaInfo?.details?.origin_country?.[0]}
                  tvShowGenres={undefined}
                  movieGenres={mediaInfo?.details?.genres}
                  movieRuntime={mediaInfo?.details?.runtime}
                  mediaRatings={mediaInfo?.details?.vote_average}
                  mediaVotes={mediaInfo?.details?.vote_count}
                  mediaTagline={mediaInfo?.details?.tagline}
                  mediaOverview={mediaInfo?.details?.overview}
                  tvShowCreator={undefined}
                  movieDirector={findDirector?.original_name}
                  movieWriter={findWriter?.original_name}
                  videoTrailer={videoTrailer}
                  setPlayTrailerVideoKey={setPlayTrailerVideoKey}
                  playTrailerInitialVideoKey={
                    playTrailerInitialVideoKey?.[0]?.key
                  }
                  setShowTrailer={setShowTrailer}
                  saveProfileMedia={saveProfileMedia}
                  showSavedProfileMedia={showSavedProfileMedia}
                />
              </div>

              {/* Part 3 : More about movie */}
              <MoreMediaInfo
                mediaDate={mediaInfo?.details?.release_date}
                mediaSeasons={undefined}
                mediaBudget={mediaInfo?.details?.budget}
                mediaEpisodes={undefined}
                mediaRevenue={mediaInfo?.details?.revenue}
                mediaStatus={mediaInfo?.details?.status}
              />

              {/* Part 4 : Top Cast */}
              {mediaInfo?.credits?.cast?.length > 0 && (
                <MediaInfoCast
                  mediaDetails={mediaInfo?.details}
                  mediaCast={mediaInfo?.credits?.cast}
                  castScrollRefs={castScrollRefs}
                  tvShowInfoCast={undefined}
                  movieInfoCast={"movieInfoCast"}
                />
              )}

              {/* Part 5 : Trailers & Videos */}
              {videoArray?.length > 0 && videoTrailer?.length > 0 && (
                <MediaInfoTrailers
                  videoTrailer={videoTrailer}
                  setPlayTrailerVideoKey={setPlayTrailerVideoKey}
                  setShowTrailer={setShowTrailer}
                />
              )}

              {/* Part 6 : Reviews, Production Companies, Watch Providers & Socials */}
              <MediaInfoBrowseMore
                mediaDetails={mediaInfo?.details}
                mediaInfoTitle={mediaInfo?.details?.title}
                mediaInfoOverview={mediaInfo?.details?.overview}
                browseMoreSection={browseMoreSection}
                setBrowseMoreSection={setBrowseMoreSection}
                mediaInfoReviews={mediaInfo?.reviews?.results}
                mediaInfoStudios={mediaInfo?.details?.production_companies}
                mediaInfoRegionalWatchProviderType={regionalWatchProviderType}
                mediaInfoWatchProviders={regionalWatchProvider?.watchProviders}
                mediasSocialsCheck={mediasSocialsCheck}
                mediaInfoSocialAccounts={mediaInfo?.external_ids}
              />

              {/* Part 7 : Recomendations */}
              {mediaInfo?.recommendations?.results?.length > 0 && (
                <MediaCarouselVariantFive
                  mediaDetails={mediaInfo?.details}
                  mediaInfoTitle={mediaInfo?.details?.title}
                  recScrollRefs={recScrollRefs}
                  mediaInfoRecomendations={mediaInfo?.recommendations?.results}
                />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

};

export default MovieInfo;
