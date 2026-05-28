import useMedia from "../../../../Hooks/useMedia/useMedia";
import {
    IMG_BACKDROP_BASE_URL, IMG_POSTER_BASE_URL,
    IMG_HERO_BACKDROP_BASE_URL, IMG_HERO_POSTER_BASE_URL
} from "../../../../Utils/SceneryApi/SceneryApi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../../../User/Profile/Profile";
import {
    RiAddFill, RiBookmarkFill, RiBookmarkLine, RiHeartFill, RiHeartLine,
    RiPlayFill, RiCalendarEventLine, RiSlideshowView, RiFilmAiLine, RiPlayLargeFill,
    RiChatQuoteLine, RiMovie2Line, RiHashtag, RiInstagramLine, RiFacebookLine, RiTwitterXLine,
    RiFilmLine, RiGlobalLine, RiCloseFill, RiSlideshow4Line, RiVideoLine, RiHourglass2Line,
    RiCheckboxMultipleLine
} from "@remixicon/react";
import { Info, Wikipedia } from 'react-bootstrap-icons';
import NoProfile from "../../../../Assets/Imgs/Avatars/NoProfile.png"
import NoProvider from "../../../../Assets/Imgs/Logo/NoProvider.png"
import NoStudio from "../../../../Assets/Imgs/Logo/NoStudio.png"
import NoPoster from "../../../../Assets/Imgs/Logo/NoPoster.png"
import NoBackdrop from "../../../../Assets/Imgs/Logo/NoBackdrop.png"
import { useNavigate, useParams } from "react-router";
import { addMediaID } from "../../../../Redux/Slices/MediaSlice/MediaSlice";


const TVShowInfo = () => {

    /* To dispatch and navigate */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Using and calling Media ID from URLs */
    const { mediaID } = useParams();
    const mediaIDFromURL = Number(mediaID);

    /* All genres , User's Profile & Users Location */
    const allGenres = useSelector((store) => store.content.allGenres);
    const usersCurRegion = useSelector((store) => store.user.account.usersCurRegion)

    /* Selcting & calling getMovieInfo from dispatched MediaID, media type (for info), save media (for saving watchlater & fav) & check if saved */
    const mediaInfo = useSelector((store) => store.media.mediaInfo)
    const { mediaType, getTVShowInfo, saveUsersMedia, showSavedUsersMedia } = useMedia();
    useEffect(() => {
        getTVShowInfo(mediaIDFromURL);
        dispatch(addMediaID(mediaIDFromURL));
    }, [mediaIDFromURL]);

    /* Certification check */
    const mediaCertification = mediaInfo?.certifications?.results?.find((val) => val.iso_3166_1 === usersCurRegion)?.rating;

    /* Check for director or creater's name */
    const findCreator = (() => {
        if (mediaInfo?.details?.created_by?.length > 0) {
            return mediaInfo?.details?.created_by?.map(
                person => person.name
            );
        } else {
            return null;
        }
    })();

    /* Check for Video trailers */
    const videoArray = mediaInfo?.videos?.results
    const videoTrailer = (() => {
        if (videoArray?.length === 0) {
            return null;
        } else {
            return videoArray?.filter(val => val.type === "Trailer" && val.site === "YouTube")?.map((video) => video)
        }
    })();

    /* Play Trailer Video Key */
    const [playTrailerVideoKey, setPlayTrailerVideoKey] = useState(null)

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

    /* To set the section type */
    const [sectionOneType, setSectionOneType] = useState("Seasons")

    /* Networks check */
    const NetworkProvider = (() => {
        const results = mediaInfo?.details?.networks;
        if (results?.length > 0) {
            return results?.map((network) => network)
        } else {
            return null;
        }
    })();

    /* To set the section type */
    const [sectionTwoType, setSectionTwoType] = useState("Reviews")

    const regionalWatchProvider = (() => {
        const results = mediaInfo?.watch_providers?.results;
        if (!results || Object.keys(results).length === 0) {
            return null;
        }
        const watchProvidersArr = Object.entries(results).map(
            ([key, value]) => ({
                country: key,
                watchProviders: value
            })
        );
        return watchProvidersArr.find(
            (val) => val.country === usersCurRegion
        ) || null;
    })();

    /* Watch Providers for Below Poster Check */
    const regionalWatchProviderType = (regionalWatchProvider?.watchProviders?.buy || regionalWatchProvider?.watchProviders?.flatrate || regionalWatchProvider?.watchProviders || regionalWatchProvider?.watchProviders?.ads || regionalWatchProvider?.watchProviders?.free);
    const regionalWatchProviderFirstValue = (() => {
        if (regionalWatchProviderType?.length > 0) {
            return regionalWatchProviderType?.map((val) => val)
        } else {
            return null;
        }
    })();

    /* Media's Socials Check */
    const mediasSocialsCheck = mediaInfo?.external_ids?.facebook_id || mediaInfo?.external_ids?.imdb_id || mediaInfo?.external_ids?.instagram_id || mediaInfo?.external_ids?.twitter_id || mediaInfo?.external_ids?.wikidata_id || mediaInfo?.details?.homepage;


    /* Rendering on the basis of avail of mediaInfo */
    return Object.keys(mediaInfo).length === 0 ?
        <div className="w-full min-h-screen relative bg-bgcolor-fourth overflow-x-hidden"></div>
        :
        /* Main Container */
        <div className="w-full min-h-screen relative bg-bgcolor-fourth overflow-x-hidden">
            {showTrailer &&
                <div className="fixed inset-0 z-5000 w-full h-full overflow-y-auto bg-black/95">
                    <div className="min-h-full flex justify-center items-center py-10 px-8 lg:px-20">
                        <div className="w-full max-w-5xl flex flex-col gap-3 bg-black/20 rounded-2xl border-[0.1px] border-brcolor-primary backdrop-blur-md">
                            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-brcolor-primary">
                                <h1 className="text-lg sm:text-2xl font-medium">{playTrailerInitialVideoKey?.[0]?.name ? playTrailerInitialVideoKey?.[0]?.name : "Official Video"}</h1>
                                <div onClick={() => setShowTrailer(false)} className="flex justify-center items-center w-9 h-9 p-2 rounded-full bg-white/90 font-bold text-black cursor-pointer active:scale-95">
                                    <RiCloseFill />
                                </div>
                            </div>
                            <div className="p-2 sm:p-4">
                                <div className="relative w-full max-h-[60vh] aspect-video overflow-hidden rounded-xl bg-black">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${playTrailerVideoKey}?autoplay=1&modestbranding=1`}
                                        title="Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {/* Background Media */}
            {
                (mediaInfo?.details?.backdrop_path) &&
                <div className="absolute z-0 w-full h-[75dvh] min-h-[400px] overflow-hidden">
                    <img className="absolute z-0 inset-0 w-full h-full object-cover object-top"
                        src={`${IMG_HERO_BACKDROP_BASE_URL}${mediaInfo?.details?.backdrop_path}`}
                        alt="Background"
                    />
                    {/* Fades top & bottoms */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/100" />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-bgcolor-fourth via-bgcolor-fourth/10 to-transparent" />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bgcolor-fourth via-bgcolor-fourth/40 to-transparent" />
                </div>
            }

            {/* Media Info */}
            <div className="relative flex flex-col gap-10 pt-35 p-8">
                {mediaInfo?.details &&
                    <div className="w-full h-full flex flex-col gap-12">
                        {/* Part 1 & 2 */}
                        <div className="w-full h-full flex gap-12 items-stretch">
                            {/* Part 1 : Media Poster */}
                            <div className="w-[18rem] flex flex-col flex-shrink-0">
                                <img src={mediaInfo?.details?.poster_path ? `${IMG_HERO_POSTER_BASE_URL}${mediaInfo?.details?.poster_path}` : NoPoster} alt="Poster" className={`w-full flex-1 min-h-0 aspect-[4/5] object-cover ${regionalWatchProviderFirstValue?.length > 0 ? "rounded-t-sm" : "rounded-sm"}`} />
                                {regionalWatchProviderFirstValue?.length > 0 &&
                                    <div className="w-full flex justify-center items-center gap-3 bg-black py-3 rounded-b-sm">
                                        <img src={regionalWatchProviderFirstValue?.[0]?.logo_path ? `${IMG_POSTER_BASE_URL}${regionalWatchProviderFirstValue?.[0]?.logo_path}` : NoProvider} alt="streamingLogo" className="w-11 rounded-lg" />
                                        <div className="flex flex-col">
                                            <h1 className="text-sm text-textcolor-secondary">Now Streaming</h1>
                                            <h2 className="text-sm font-medium">Watch Now</h2>
                                        </div>
                                    </div>
                                }
                            </div>

                            {/* Part 2 : Genric Info */}
                            <div className="flex flex-col gap-4 max-w-2xl">
                                <h1 className="text-4xl font-medium">{mediaInfo?.details?.name || "N/A"}</h1>
                                <div className="flex items-center text-sm">
                                    {/* Certification */}
                                    {mediaCertification && <h2 className="text-textcolor-secondary border-1 rounded-sm px-[6px]">{mediaCertification}</h2>}

                                    {/* Release / First Air Date - for movies & tv shows */}
                                    {mediaInfo?.details?.first_air_date && <h2 className="pl-2">{mediaInfo?.details?.first_air_date?.slice(0, 4)}</h2>}

                                    {/* Origin country */}
                                    {mediaInfo?.details?.origin_country?.[0] && <span className="pl-1">({mediaInfo?.details?.origin_country?.[0]})</span>}

                                    {/* Genres */}
                                    {mediaInfo?.details?.genres?.length > 0 &&
                                        <div className="flex">
                                            <h2 className="pl-2">•</h2>
                                            {mediaInfo?.details?.genres?.slice(0, 2)?.map((val) => <h2 className="pl-2" key={val.id}> {val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h2>)}
                                        </div>
                                    }
                                </div>

                                {/* Ratings and Votes */}
                                {(mediaInfo?.details?.vote_average !== null || mediaInfo?.details?.vote_count !== null) &&
                                    <div className="flex gap-4 items-center pt-4 text-base">
                                        {mediaInfo?.details?.vote_average !== null && <h3 className="font-medium"><span className="text-yellow-400">★</span> {(mediaInfo?.details?.vote_average)?.toFixed(1) || "N/A"}</h3>}

                                        {mediaInfo?.details?.vote_count !== null && <h3 className="text-sm">({`${mediaInfo?.details?.vote_count} Votes`})</h3>}
                                    </div>
                                }

                                {/* Tagline */}
                                {mediaInfo?.details?.tagline && <h4 className="italic text-textcolor-secondary ">{mediaInfo?.details?.tagline}</h4>}

                                {/* Overview */}
                                {mediaInfo?.details?.overview &&
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-lg font-medium">Overview</h1>
                                        <p>{mediaInfo?.details?.overview}</p>
                                    </div>
                                }

                                {/* Director or Creater */}
                                {(findCreator?.length > 0) &&
                                    <div className="max-w-2xl flex gap-x-10 gap-y-5 flex-wrap items-center pt-4 text-base cursor-pointer">
                                        {findCreator?.length > 0 &&
                                            findCreator?.map((creator, index) => {
                                                return (
                                                    <div key={index} onClick={() => (creator && mediaInfo?.details?.name) && window.open(`https://www.google.com/search?q=${creator}+creator+of+${mediaInfo?.details?.name}`)} target="_blank" className="flex flex-col gap-1">
                                                        <h1 className="text-base font-semibold underline">{creator}</h1>
                                                        <p className="text-sm text-gray-400">Creater</p>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                }

                                {/* Trailer, Watch later & fav */}
                                <div className="flex gap-4 pt-5">
                                    {/* Play video trailer */}
                                    {videoTrailer?.length > 0 &&
                                        < div onClick={() => { setPlayTrailerVideoKey(playTrailerInitialVideoKey?.[0]?.key); setShowTrailer(true); }} className="flex justify-center items-center gap-1 bg-uicolor-primary text-white pl-3 pr-6 py-2 rounded cursor-pointer active:scale-[0.95]">
                                            <RiPlayFill />
                                            <span className="font-semibold">Play Trailer</span>
                                        </div>
                                    }

                                    {/* Watch later - saved to google cloud firebase */}
                                    <div onClick={() => saveUsersMedia(mediaInfo?.details, 'watchLater')} className="flex justify-center items-center gap-2 border-1 border-textcolor-secondary text-white pl-3 pr-6 py-2 rounded cursor-pointer active:scale-[0.95]">
                                        {
                                            (showSavedUsersMedia(mediaInfo?.details, 'watchLater')) ?
                                                <>
                                                    <RiCheckboxMultipleLine />
                                                    <span className="font-semibold">Saved</span>
                                                </>
                                                :
                                                <>
                                                    <RiAddFill />
                                                    <span className="font-semibold">Watch Later</span>
                                                </>
                                        }
                                    </div>

                                    {/* Add to fav - saved to google cloud firebase */}
                                    <div onClick={() => saveUsersMedia(mediaInfo?.details, 'favourite')} className="flex justify-center items-center gap-2 border-1 border-textcolor-secondary px-3 py-2 rounded cursor-pointer active:scale-[0.95]">
                                        {(showSavedUsersMedia(mediaInfo?.details, 'favourite')) ?
                                            <RiHeartFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#f14049]' />
                                            :
                                            <RiHeartLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Part 3 : More about tv show */}
                        <div className="w-full flex justify-around bg-black/40 py-7 rounded-lg">
                            {/* First air date */}
                            {(mediaInfo?.details?.first_air_date) &&
                                <div className="flex justify-center items-center gap-2">
                                    <div className="flex justify-center items-center">
                                        <RiCalendarEventLine className="w-7 h-7" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-sm font-medium">Release Date</h1>
                                        <h2 className="text-base">{mediaInfo?.details?.first_air_date?.replaceAll('-', '/') || "N/A"}</h2>
                                    </div>
                                </div>
                            }

                            {/* Total seasons */}
                            <div className="flex justify-center items-center gap-2">
                                <div className="flex justify-center items-center">
                                    <RiSlideshowView className="w-7 h-7" />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-sm font-medium">Seasons</h1>
                                    <h2 className="text-base">{mediaInfo?.details?.number_of_seasons ? `${mediaInfo?.details?.number_of_seasons}` : 'N/A'}</h2>
                                </div>
                            </div>

                            {/* Total Episodes */}
                            <div className="flex justify-center items-center gap-2">
                                <div className="flex justify-center items-center">
                                    <RiVideoLine className="w-7 h-7" />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-sm font-medium">Episodes</h1>
                                    <h2 className="text-base">{mediaInfo?.details?.number_of_episodes ? `${mediaInfo?.details?.number_of_episodes}` : 'N/A'}</h2>
                                </div>
                            </div>

                            {/* Status */}
                            {mediaInfo?.details?.status && <div className="flex justify-center items-center gap-2">
                                <div className="flex justify-center items-center">
                                    <RiFilmAiLine className="w-7 h-7" />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-sm font-medium">Status</h1>
                                    <h2 className="text-base">{mediaInfo?.details?.status}</h2>
                                </div>
                            </div>
                            }
                        </div>

                        {/* Part 4 : Top Cast */}
                        {mediaInfo?.credits?.cast?.length > 0 &&
                            <div className="w-full flex flex-col gap-5">
                                <div className="font-medium text-xl">
                                    <h1>Top Cast</h1>
                                </div>
                                <div className="grid grid-flow-col auto-cols-[10rem] gap-4 overflow-x-auto no-scrollbar items-stretch">
                                    {mediaInfo?.credits?.cast?.slice(0, 20)?.map((cast) => {
                                        const castRoles = (cast?.roles?.length > 0 ? cast?.roles?.slice(0, 3)?.map((roles) => roles?.character)?.join(", ") : null);
                                        const query = (cast?.name && castRoles && mediaInfo?.details?.name) ? (encodeURIComponent(`${cast?.name} as ${castRoles} of ${mediaInfo?.details?.name}`))?.replace(/%20/g, "+") : null;
                                        return (
                                            <div onClick={() => query && window.open(`https://www.google.com/search?q=${query}`, '_blank')} target="_blank" key={cast?.id} className="cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out h-full flex flex-col">
                                                <img src={cast?.profile_path ? `${IMG_POSTER_BASE_URL}${cast?.profile_path}` : NoProfile} alt="Cast" className="w-full aspect-[1/1] object-cover rounded-t-sm" />
                                                <div className="flex-1 flex flex-col gap-2 bg-black/40 rounded-b-sm p-3">
                                                    {cast?.name && <h1 className="text-[0.85rem] font-medium">{cast?.name}</h1>}
                                                    {cast?.roles?.length > 3 ? (castRoles && <h1 className="text-sm text-textcolor-secondary line-clamp-0">{castRoles} more...</h1>) : (castRoles && <h1 className="text-sm text-textcolor-secondary line-clamp-0">{castRoles}</h1>)}
                                                    {cast?.total_episode_count && <h2 className="text-sm text-brcolor-primary line-clamp-0">{cast?.total_episode_count} Episodes</h2>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }

                        {/* Part 5 : Seasons & episodes */}
                        <div className="flex flex-col gap-4">
                            <div className="w-full flex justify-around items-center bg-black/40 py-7 rounded-lg cursor-pointer">
                                <div onClick={() => setSectionOneType("Networks")} className={`flex justify-center items-start gap-2 ${sectionOneType === "Networks" && "underline text-gray-400"}`}>
                                    <RiChatQuoteLine className="w-7 h-7" />
                                    <h1 className="text-lg font-semibold leading-[1.3]">Networks</h1>
                                </div>
                                <div onClick={() => setSectionOneType("Seasons")} className={`flex justify-center items-start gap-2 ${sectionOneType === "Seasons" && "underline text-gray-400"}`}>
                                    <RiChatQuoteLine className="w-7 h-7" />
                                    <h1 className="text-lg font-semibold leading-[1.3]">Seasons</h1>
                                </div>
                                <div onClick={() => setSectionOneType("AiringStatus")} className={`flex justify-center items-start gap-2 ${sectionOneType === "AiringStatus" && "underline text-gray-400"}`}>
                                    <RiHourglass2Line className="w-7 h-7" />
                                    <h1 className="text-lg font-semibold leading-[1.3]">Airing Status</h1>
                                </div>
                            </div>

                            {/* Rendering Networks */}
                            {(sectionOneType === "Networks") &&
                                (mediaInfo?.details?.networks?.length > 0 ?
                                    (<div className="flex flex-row gap-5">
                                        <div className="w-full bg-black/40 flex-shrink-0 flex flex-col gap-8 p-8 pt-12 rounded-md" style={{ clipPath: 'polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
                                            <h1 className="text-lg font-semibold underline">The Networks Behind <span className="italic">{mediaInfo?.details?.name ? mediaInfo?.details?.name : "Show"}</span></h1>
                                            <div className="w-full max-h-70 overflow-y-auto custom-scrollbar flex flex-col gap-5 cursor-pointer">
                                                {mediaInfo?.details?.networks?.map((network) => {
                                                    return (
                                                        <div key={network.id} onClick={() => (network?.name && mediaInfo?.details?.name) && window.open(`https://www.google.com/search?q=${network?.name}+Networks+${mediaInfo?.details?.name}`, '_blank')} className="w-full flex gap-5 items-center">
                                                            <div className="w-[7rem] h-13 bg-white rounded-sm p-2 flex items-center justify-center overflow-hidden">
                                                                <img src={network?.logo_path ? `${IMG_POSTER_BASE_URL}${network.logo_path}` : NoStudio} alt="NetworksLogo" className="max-w-full max-h-full object-contain" />
                                                            </div>
                                                            {network?.name &&
                                                                <div className="flex flex-col gap-1">
                                                                    {network?.name && <h1 className="text-base font-semibold">⸺  {network?.name} {network?.origin_country && <span className="text-sm">{`(${network?.origin_country})`}</span>}</h1>}
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    :
                                    (
                                        <div className="w-full flex justify-center items-center gap-2 py-40 bg-black/40 rounded-sm">
                                            <h1 className="text-xl font-semibold">Network information unavailable</h1>
                                        </div>
                                    )
                                )}

                            {/* Rendering Seasons */}
                            {(sectionOneType === "Seasons") &&
                                (mediaInfo?.details?.seasons?.length > 0 ?
                                    (<div className="flex flex-row gap-5">
                                        <div className="w-full bg-black/40 flex flex-col gap-10 p-8 rounded-md">
                                            <h1 className="text-lg font-semibold underline">All seasons of <span className="italic">{mediaInfo?.details?.name ? mediaInfo?.details?.name : "Show"}</span></h1>
                                            <div className="w-full max-h-120 pr-5 overflow-y-auto custom-scrollbar flex flex-col gap-10">
                                                {/* All seasons */}
                                                {mediaInfo?.details?.seasons?.map((season) => {
                                                    return (
                                                        <div key={season.id} className="flex flex-col gap-5 border-[0.1px] border-white/30 rounded-2xl">
                                                            <div className="p-5 border-b-[0.1px] border-white/30">
                                                                <h1 className="text-lg font-semibold">{season?.name}</h1>
                                                            </div>
                                                            <div className="w-full flex flex-col gap-5 p-5">
                                                                <div className="w-full h-full flex gap-12">
                                                                    {/* Season's poster */}
                                                                    <div className="relative w-[14rem] overflow-hidden rounded-sm flex-shrink-0">
                                                                        <img src={(season?.poster_path || mediaInfo?.details?.poster_path) ? `${IMG_POSTER_BASE_URL}${(season?.poster_path || mediaInfo?.details?.poster_path)}` : NoPoster} alt="SeasonPoster" className="w-full h-full object-cover" />
                                                                    </div>

                                                                    {/* Season's genric info */}
                                                                    <div className="flex flex-col gap-4 max-w-2xl">
                                                                        {/* Epname */}
                                                                        <h1 className="text-2xl font-medium">{season?.name || "N/A"}</h1>
                                                                        <div className="flex items-center gap-4 text-sm">
                                                                            {/* Seasons's air date */}
                                                                            {(season?.air_date) && <h2 className="text-textcolor-secondary border-1 rounded-2xl px-[10px] py-[2px]">Premiered : {season?.air_date?.replaceAll('-', '/')}</h2>}
                                                                        </div>

                                                                        {/* Season's ratings and votes */}
                                                                        {(season?.vote_average !== null) &&
                                                                            <div className="flex gap-4 items-center text-base">
                                                                                {season?.vote_average !== null && <h3 className="font-medium"><span className="text-yellow-400">★</span> {(season?.vote_average)?.toFixed(1) || "N/A"}</h3>}
                                                                            </div>
                                                                        }

                                                                        {/* Season number & episode count */}
                                                                        {(season?.season_number !== null || season?.episode_count !== null) &&
                                                                            <div className="flex gap-4 items-center text-base">
                                                                                {season?.season_number !== null && <h3 className="className='text-xs px-2 py-[0.10rem] rounded-4xl bg-white/10 backdrop-blur-md border border-white/20 text-white">Season : {season?.season_number || "N/A"}</h3>}
                                                                                {season?.episode_count !== null && <h3 className="className='text-xs px-2 py-[0.10rem] rounded-4xl bg-white/10 backdrop-blur-md border border-white/20 text-white">Episodes : {season?.episode_count || "N/A"}</h3>}
                                                                            </div>
                                                                        }

                                                                        {/* If season's poster unavailable */}
                                                                        {season?.poster_path === null && <h4 className="italic text-textcolor-secondary ">(Season's poster unavailable)</h4>}


                                                                        {/* Season's overview */}
                                                                        {season?.overview &&
                                                                            <div className="flex flex-col gap-2">
                                                                                <h1 className="text-lg font-medium">Overview</h1>
                                                                                <p>{season?.overview}</p>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                    )
                                    :
                                    (
                                        <div className="w-full flex justify-center items-center gap-2 py-40 bg-black/40 rounded-sm">
                                            <h1 className="text-xl font-semibold">Seasons's information unavailable</h1>
                                        </div>
                                    )
                                )}

                            {/* Airing Status */}
                            {(sectionOneType === "AiringStatus") &&
                                ((mediaInfo?.details?.last_episode_to_air || mediaInfo?.details?.next_episode_to_air) !== null ?
                                    (<div className="flex flex-row gap-5">
                                        <div className="w-full bg-black/40 p-8 rounded-md overflow-y-auto custom-scrollbar">
                                            <div className="w-full flex flex-col gap-10 max-h-110 pr-5 overflow-y-auto custom-scrollbar">
                                                {/* Last episode to air */}
                                                {mediaInfo?.details?.last_episode_to_air !== null ?
                                                    <div className="flex flex-col gap-5 border-[0.1px] border-white/30 rounded-2xl">
                                                        <div className="p-5 border-b-[0.1px] border-white/30">
                                                            <h1 className="text-lg font-semibold"><span className="italic">{`${mediaInfo?.details?.name ? mediaInfo?.details?.name : "Show"}'s`}</span> last episode</h1>

                                                        </div>
                                                        <div className="w-full flex flex-col gap-5 cursor-pointer p-5">
                                                            <div className="w-full h-full flex gap-12">
                                                                {/* Episode's poster */}
                                                                <div className="relative w-[27rem] aspect-video overflow-hidden rounded-sm flex-shrink-0">
                                                                    <img src={(mediaInfo?.details?.last_episode_to_air?.still_path || mediaInfo?.details?.backdrop_path) ? `${IMG_POSTER_BASE_URL}${(mediaInfo?.details?.last_episode_to_air?.still_path || mediaInfo?.details?.backdrop_path)}` : NoBackdrop} alt="SeasonPoster" className="w-full h-full object-cover" />
                                                                </div>

                                                                {/* Episode's genric info */}
                                                                <div className="flex flex-col gap-4 max-w-2xl">
                                                                    {/* Episode name */}
                                                                    <h1 className="text-2xl font-medium">{mediaInfo?.details?.last_episode_to_air?.name || "N/A"}</h1>

                                                                    <div className="flex items-center text-sm">
                                                                        {/* Episode's air date */}
                                                                        {(mediaInfo?.details?.last_episode_to_air?.air_date) && <h2 className="">({mediaInfo?.details?.last_episode_to_air?.air_date?.replaceAll('-', '/')})</h2>}

                                                                        {/* Episode's type */}
                                                                        {(mediaInfo?.details?.last_episode_to_air?.episode_type) &&
                                                                            <div className="flex">
                                                                                <h2 className="pl-2">•</h2>
                                                                                <h2 className="pl-2">{(mediaInfo?.details?.last_episode_to_air?.episode_type)?.charAt(0)?.toUpperCase() + mediaInfo?.details?.last_episode_to_air?.episode_type?.slice(1)}</h2>
                                                                            </div>
                                                                        }

                                                                        {/* Episode's runtime */}
                                                                        {(mediaInfo?.details?.last_episode_to_air?.runtime !== 0 && mediaInfo?.details?.last_episode_to_air?.runtime) &&
                                                                            <div className="flex">
                                                                                <h2 className="pl-2">•</h2>
                                                                                <h2 className="pl-2">{`${(Math.floor(mediaInfo?.details?.last_episode_to_air?.runtime / 60)) === 0 ? "" : Math.floor(mediaInfo?.details?.last_episode_to_air?.runtime / 60)}${(Math.floor(mediaInfo?.details?.last_episode_to_air?.runtime / 60)) === 0 ? "" : "h"} ${(mediaInfo?.details?.last_episode_to_air?.runtime % 60)?.toString()?.padStart(2, '0')}m`}</h2>
                                                                            </div>
                                                                        }
                                                                    </div>

                                                                    {/* Episode's ratings and votes */}
                                                                    {(mediaInfo?.details?.last_episode_to_air?.vote_average !== null || mediaInfo?.details?.last_episode_to_air?.vote_count !== null) &&
                                                                        <div className="flex gap-4 items-center text-base">
                                                                            {mediaInfo?.details?.last_episode_to_air?.vote_average !== null && <h3 className="font-medium"><span className="text-yellow-400">★</span> {(mediaInfo?.details?.last_episode_to_air?.vote_average)?.toFixed(1) || "N/A"}</h3>}

                                                                            {mediaInfo?.details?.last_episode_to_air?.vote_count !== null && <h3 className="text-sm">({`${mediaInfo?.details?.last_episode_to_air?.vote_count} Votes`})</h3>}
                                                                        </div>
                                                                    }

                                                                    {/* Season & episode number */}
                                                                    {(mediaInfo?.details?.last_episode_to_air?.season_number !== null || mediaInfo?.details?.last_episode_to_air?.episode_number !== null) &&
                                                                        <div className="flex gap-4 items-center text-base">
                                                                            {mediaInfo?.details?.last_episode_to_air?.season_number !== null && <h3 className="className='text-xs px-2 py-[0.10rem] rounded-4xl bg-white/10 backdrop-blur-md border border-white/20 text-white">S{mediaInfo?.details?.last_episode_to_air?.season_number || "N/A"} {mediaInfo?.details?.last_episode_to_air?.episode_number !== null && <span> • E{mediaInfo?.details?.last_episode_to_air?.episode_number || "N/A"}</span>}</h3>}
                                                                        </div>
                                                                    }

                                                                    {/* If episode's poster unavailable */}
                                                                    {mediaInfo?.details?.last_episode_to_air?.still_path === null && <h4 className="italic text-textcolor-secondary ">(Episode's poster unavailable)</h4>}

                                                                    {/* Episodes's overview */}
                                                                    {mediaInfo?.details?.last_episode_to_air?.overview &&
                                                                        <div className="flex flex-col gap-2">
                                                                            <h1 className="text-lg font-medium">Overview</h1>
                                                                            <p>{mediaInfo?.details?.last_episode_to_air?.overview}</p>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    :
                                                    <div className="flex justify-center items-center gap-5 p-20 border-[0.1px] border-white/30 rounded-2xl">
                                                        <h1 className="text-base font-semibold">Last episode information unavailable</h1>
                                                    </div>
                                                }
                                                {/* Next episode to air */}
                                                {mediaInfo?.details?.next_episode_to_air !== null ?
                                                    <div className="flex flex-col gap-5 border-[0.1px] border-white/30 rounded-2xl">
                                                        <div className="p-5 border-b-[0.1px] border-white/30">
                                                            <h1 className="text-lg font-semibold"><span className="italic">{`${mediaInfo?.details?.name ? mediaInfo?.details?.name : "Show"}'s`}</span> next episode</h1>

                                                        </div>
                                                        <div className="w-full flex flex-col gap-5 cursor-pointer p-5">
                                                            <div className="w-full h-full flex gap-12">
                                                                {/* Episode's poster */}
                                                                <div className="relative w-[27rem] aspect-video overflow-hidden rounded-sm flex-shrink-0">
                                                                    <img src={(mediaInfo?.details?.next_episode_to_air?.still_path || mediaInfo?.details?.backdrop_path) ? `${IMG_POSTER_BASE_URL}${(mediaInfo?.details?.next_episode_to_air?.still_path || mediaInfo?.details?.backdrop_path)}` : NoBackdrop} alt="SeasonPoster" className="w-full h-full object-cover" />
                                                                </div>

                                                                {/* Episode's genric info */}
                                                                <div className="flex flex-col gap-4 max-w-2xl">
                                                                    {/* Episode name */}
                                                                    <h1 className="text-2xl font-medium">{mediaInfo?.details?.next_episode_to_air?.name || "N/A"}</h1>

                                                                    <div className="flex items-center text-sm">
                                                                        {/* Episode's air date */}
                                                                        {(mediaInfo?.details?.next_episode_to_air?.air_date) && <h2 className="">({mediaInfo?.details?.next_episode_to_air?.air_date?.replaceAll('-', '/')})</h2>}

                                                                        {/* Episode's type */}
                                                                        {(mediaInfo?.details?.next_episode_to_air?.episode_type) &&
                                                                            <div className="flex">
                                                                                <h2 className="pl-2">•</h2>
                                                                                <h2 className="pl-2">{(mediaInfo?.details?.next_episode_to_air?.episode_type)?.charAt(0)?.toUpperCase() + mediaInfo?.details?.next_episode_to_air?.episode_type?.slice(1)}</h2>
                                                                            </div>
                                                                        }

                                                                        {/* Episode's runtime */}
                                                                        {(mediaInfo?.details?.next_episode_to_air?.runtime !== 0 && mediaInfo?.details?.next_episode_to_air?.runtime) &&
                                                                            <div className="flex">
                                                                                <h2 className="pl-2">•</h2>
                                                                                <h2 className="pl-2">{`${(Math.floor(mediaInfo?.details?.next_episode_to_air?.runtime / 60)) === 0 ? "" : Math.floor(mediaInfo?.details?.next_episode_to_air?.runtime / 60)}${(Math.floor(mediaInfo?.details?.next_episode_to_air?.runtime / 60)) === 0 ? "" : "h"} ${(mediaInfo?.details?.next_episode_to_air?.runtime % 60)?.toString()?.padStart(2, '0')}m`}</h2>
                                                                            </div>
                                                                        }
                                                                    </div>

                                                                    {/* Episode's ratings and votes */}
                                                                    {(mediaInfo?.details?.next_episode_to_air?.vote_average !== null || mediaInfo?.details?.next_episode_to_air?.vote_count !== null) &&
                                                                        <div className="flex gap-4 items-center text-base">
                                                                            {mediaInfo?.details?.next_episode_to_air?.vote_average !== null && <h3 className="font-medium"><span className="text-yellow-400">★</span> {(mediaInfo?.details?.next_episode_to_air?.vote_average)?.toFixed(1) || "N/A"}</h3>}

                                                                            {mediaInfo?.details?.next_episode_to_air?.vote_count !== null && <h3 className="text-sm">({`${mediaInfo?.details?.next_episode_to_air?.vote_count} Votes`})</h3>}
                                                                        </div>
                                                                    }

                                                                    {/* Season & episode number */}
                                                                    {(mediaInfo?.details?.next_episode_to_air?.season_number !== null || mediaInfo?.details?.next_episode_to_air?.episode_number !== null) &&
                                                                        <div className="flex gap-4 items-center text-base">
                                                                            {mediaInfo?.details?.next_episode_to_air?.season_number !== null && <h3 className="className='text-xs px-2 py-[0.10rem] rounded-4xl bg-white/10 backdrop-blur-md border border-white/20 text-white">S{mediaInfo?.details?.next_episode_to_air?.season_number || "N/A"} {mediaInfo?.details?.next_episode_to_air?.episode_number !== null && <span> • E{mediaInfo?.details?.next_episode_to_air?.episode_number || "N/A"}</span>}</h3>}
                                                                        </div>
                                                                    }


                                                                    {/* If episode's poster unavailable */}
                                                                    {mediaInfo?.details?.next_episode_to_air?.still_path === null && <h4 className="italic text-textcolor-secondary ">(Episode's poster unavailable)</h4>}

                                                                    {/* Episode's overview */}
                                                                    {mediaInfo?.details?.next_episode_to_air?.overview &&
                                                                        <div className="flex flex-col gap-2">
                                                                            <h1 className="text-lg font-medium">Overview</h1>
                                                                            <p>{mediaInfo?.details?.next_episode_to_air?.overview}</p>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="flex justify-center items-center gap-5 p-20 border-[0.1px] border-white/30 rounded-2xl">
                                                        <h1 className="text-base font-semibold">No upcoming episode available</h1>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    )
                                    :
                                    (
                                        <div className="w-full flex justify-center items-center gap-2 py-40 bg-black/40 rounded-sm">
                                            <h1 className="text-xl font-semibold">Airing information unavailable</h1>
                                        </div>
                                    )
                                )}
                        </div>

                        {/* Part 6 : Trailers & Videos */}
                        {(videoArray?.length > 0 && videoTrailer?.length > 0) &&
                            < div className="w-full flex flex-col gap-5">
                                <div className="font-medium text-xl">
                                    <h1>Trailers & Videos</h1>
                                </div>
                                <div className="flex flex-row gap-4 no-scrollbar overflow-x-scroll">
                                    {videoTrailer?.map((video) => {
                                        return (
                                            <div onClick={() => { setPlayTrailerVideoKey(video?.key); setShowTrailer(true); }} key={video?.key} className="relative w-[27rem] aspect-video overflow-hidden rounded-sm flex-shrink-0 cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video?.key}/sddefault.jpg`}
                                                    alt="thumbnail"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute m-1 right-1 top-1 rounded-2xl px-3 py-1 bg-black/60 border-sm opacity-0 group-hover:opacity-100">
                                                    {video?.name && <h1 className="text-sm font-semibold">{video?.name}</h1>}
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="p-3 rounded-full bg-black/60 border-sm">
                                                        <RiPlayLargeFill />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }

                        {/* Part 7 : Reviews, Production Companies, Watch Providers  & Socials */}
                        <div className="flex flex-col gap-4">
                            <div className="w-full flex justify-around items-center bg-black/40 py-7 rounded-lg cursor-pointer">
                                <div onClick={() => setSectionTwoType("Reviews")} className={`flex justify-center items-start gap-2 ${sectionTwoType === "Reviews" && "underline text-gray-400"}`}>
                                    <RiChatQuoteLine className="w-7 h-7" />
                                    <h1 className="text-lg font-semibold leading-[1.3]">Reviews</h1>
                                </div>
                                <div onClick={() => setSectionTwoType("Studios")} className={`flex justify-center items-start gap-2 ${sectionTwoType === "Studios" && "underline text-gray-400"}`}>
                                    <RiFilmLine className="w-7 h-7" />
                                    <h1 className="text-lg font-semibold leading-[1.3]">Studios</h1>
                                </div>
                                <div onClick={() => setSectionTwoType("WatchProviders")} className={`flex justify-center items-start gap-2 ${sectionTwoType === "WatchProviders" && "underline text-gray-400"}`}>
                                    <RiMovie2Line className="w-7 h-7" />
                                    <h1 className="text-lg font-semibold leading-[1.3]">Watch Providers</h1>
                                </div>
                                <div onClick={() => setSectionTwoType("Socials")} className={`flex justify-center items-start gap-2 ${sectionTwoType === "Socials" && "underline text-gray-400"}`}>
                                    <RiHashtag className="w-7 h-7" />
                                    <h1 className="text-lg font-semibold leading-[1.3]">Socials</h1>
                                </div>
                            </div>
                            {/* Rendering Reviews */}
                            {(sectionTwoType === "Reviews") &&
                                (mediaInfo?.reviews?.results?.length > 0 ?
                                    (<div className="flex flex-row gap-5 no-scrollbar overflow-x-scroll">
                                        {mediaInfo?.reviews?.results?.map((review) => {
                                            return (
                                                <div key={review.id} className="w-99 bg-black/40 flex-shrink-0 p-5 pt-10 rounded-md"
                                                    style={{ clipPath: 'polygon(6% 5%, 100% 5%, 100% 100%, 0 100%, 0 0)' }}>
                                                    <div className="w-full flex flex-col gap-3 max-h-79 pr-5 overflow-y-auto custom-scrollbar">
                                                        <div className="flex gap-5">
                                                            <div className="w-[3.5rem]">
                                                                <img src={review?.author_details?.avatar_path ? `${IMG_POSTER_BASE_URL}${review?.author_details?.avatar_path}` : NoProfile} alt="Profile" className="w-full aspect-[1/1] rounded-full object-cover" />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <h1 className="text-lg font-semibold underline">A review by {review?.author || review?.author_details?.username || "Scenery User"}</h1>
                                                                <h1 className="text-sm">Written by <span className="italic">{review?.author || review?.author_details?.username || "Scenery User"}</span> {review?.created_at && `in ${(review?.created_at)?.slice(0, 4)}`}</h1>
                                                            </div>
                                                        </div>
                                                        <h1 className="text-[0.85rem]">{review?.content || "Review unavailable"}</h1>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    )
                                    :
                                    (
                                        <div className="w-full flex justify-center items-center gap-2 py-40 bg-black/40 rounded-sm">
                                            <h1 className="text-xl font-semibold">No one’s spilled the tea yet</h1>
                                        </div>
                                    )
                                )}

                            {/* Rendering Studios */}
                            {(sectionTwoType === "Studios") &&
                                (mediaInfo?.details?.production_companies?.length > 0 ?
                                    (<div className="flex flex-row gap-5">
                                        <div className="w-full bg-black/40 flex-shrink-0 flex flex-col gap-8 p-8 pt-12 rounded-md" style={{ clipPath: 'polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
                                            <h1 className="text-lg font-semibold underline">The Studios Behind <span className="italic">{mediaInfo?.details?.name ? mediaInfo?.details?.name : null}</span></h1>
                                            <div className="w-full max-h-70 overflow-y-auto custom-scrollbar flex flex-col gap-5 cursor-pointer">
                                                {mediaInfo?.details?.production_companies?.map((studio) => {
                                                    return (
                                                        <div key={studio.id} onClick={() => studio?.name && window.open(`https://www.google.com/search?q=${studio?.name}+Production+Company`, '_blank')} className="w-full flex gap-5 items-center">
                                                            <div className="w-[7rem] h-13 bg-white rounded-sm p-2 flex items-center justify-center overflow-hidden">
                                                                <img src={studio?.logo_path ? `${IMG_POSTER_BASE_URL}${studio.logo_path}` : NoStudio} alt="StudioLogo" className="max-w-full max-h-full object-contain" />
                                                            </div>
                                                            {studio?.name &&
                                                                <div className="flex flex-col gap-1">
                                                                    {studio?.name && <h1 className="text-base font-semibold">⸺  {studio?.name} {studio?.origin_country && <span className="text-sm">{`(${studio?.origin_country})`}</span>}</h1>}
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    :
                                    (
                                        <div className="w-full flex justify-center items-center gap-2 py-40 bg-black/40 rounded-sm">
                                            <h1 className="text-xl font-semibold">Studio information unavailable</h1>
                                        </div>
                                    )
                                )}


                            {/* Rendering Watch Providers */}
                            {(sectionTwoType === "WatchProviders") &&
                                (regionalWatchProviderType?.length > 0 ?
                                    (<div className="flex flex-row gap-5 no-scrollbar overflow-x-scroll">
                                        {/* Buy */}
                                        {(regionalWatchProvider?.watchProviders?.buy?.length) > 0 &&
                                            <div className="w-80 bg-black/40 flex-shrink-0 flex flex-col gap-5 p-8 rounded-md" style={{ clipPath: 'polygon(30px 10px, 100% 10px, 100% 100%, 0 100%, 0 0)' }}>
                                                <h1 className="text-lg font-semibold underline">Buy to own</h1>
                                                <div className="flex flex-col gap-5 cursor-pointer">
                                                    {regionalWatchProvider?.watchProviders?.buy?.map((platform) => {
                                                        const query = (mediaInfo?.details?.name && mediaInfo?.details?.overview && platform?.provider_name) ? (encodeURIComponent(`Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`))?.replace(/%20/g, "+") : null;
                                                        return (
                                                            <div onClick={() => query && window.open(`https://www.google.com/search?q=${query}`, '_blank')} key={platform.provider_id} className="flex gap-3 items-center">
                                                                <img src={platform?.logo_path ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}` : NoProvider} alt="ProvidersLogo" className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover" />
                                                                <h1 className="text-sm font-semibold">{platform?.provider_name || "Name unavailable"}</h1>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        }
                                        {/* Flatrate */}
                                        {(regionalWatchProvider?.watchProviders?.flatrate?.length) > 0 &&
                                            <div className="w-80 bg-black/40 flex-shrink-0 flex flex-col gap-5 p-8 rounded-md" style={{ clipPath: 'polygon(30px 10px, 100% 10px, 100% 100%, 0 100%, 0 0)' }}>
                                                <h1 className="text-lg font-semibold underline">Included with subscription</h1>
                                                <div className="flex flex-col gap-5 cursor-pointer">
                                                    {regionalWatchProvider?.watchProviders?.flatrate?.map((platform) => {
                                                        const query = (mediaInfo?.details?.name && mediaInfo?.details?.overview && platform?.provider_name) ? (encodeURIComponent(`Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`))?.replace(/%20/g, "+") : null;
                                                        return (
                                                            <div onClick={() => query && window.open(`https://www.google.com/search?q=${query}`, '_blank')} key={platform.provider_id} className="flex gap-3 items-center">
                                                                <img src={platform?.logo_path ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}` : NoProvider} alt="ProvidersLogo" className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover" />
                                                                <h1 className="text-sm font-semibold">{platform?.provider_name || "Name unavailable"}</h1>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        }
                                        {/* Rent */}
                                        {(regionalWatchProvider?.watchProviders?.rent?.length) > 0 &&
                                            <div className="w-80 bg-black/40 flex-shrink-0 flex flex-col gap-5 p-8 rounded-md" style={{ clipPath: 'polygon(30px 10px, 100% 10px, 100% 100%, 0 100%, 0 0)' }}>
                                                <h1 className="text-lg font-semibold underline">Rent & watch</h1>
                                                <div className="flex flex-col gap-5 cursor-pointer">
                                                    {regionalWatchProvider?.watchProviders?.rent?.map((platform) => {
                                                        const query = (mediaInfo?.details?.name && mediaInfo?.details?.overview && platform?.provider_name) ? (encodeURIComponent(`Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`))?.replace(/%20/g, "+") : null;
                                                        return (
                                                            <div onClick={() => query && window.open(`https://www.google.com/search?q=${query}`, '_blank')} key={platform.provider_id} className="flex gap-3 items-center">
                                                                <img src={platform?.logo_path ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}` : NoProvider} alt="ProvidersLogo" className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover" />
                                                                <h1 className="text-sm font-semibold">{platform?.provider_name || "Name unavailable"}</h1>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        }
                                        {/* Ads */}
                                        {(regionalWatchProvider?.watchProviders?.ads?.length) > 0 &&
                                            <div className="w-80 bg-black/40 flex-shrink-0 flex flex-col gap-5 p-8 rounded-md" style={{ clipPath: 'polygon(30px 10px, 100% 10px, 100% 100%, 0 100%, 0 0)' }}>
                                                <h1 className="text-lg font-semibold underline">Watch with ads</h1>
                                                <div className="flex flex-col gap-5 cursor-pointer">
                                                    {regionalWatchProvider?.watchProviders?.ads?.map((platform) => {
                                                        const query = (mediaInfo?.details?.name && mediaInfo?.details?.overview && platform?.provider_name) ? (encodeURIComponent(`Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`))?.replace(/%20/g, "+") : null;
                                                        return (
                                                            <div onClick={() => query && window.open(`https://www.google.com/search?q=${query}`, '_blank')} key={platform.provider_id} className="flex gap-3 items-center">
                                                                <img src={platform?.logo_path ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}` : NoProvider} alt="ProvidersLogo" className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover" />
                                                                <h1 className="text-sm font-semibold">{platform?.provider_name || "Name unavailable"}</h1>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        }
                                        {/* Free */}
                                        {(regionalWatchProvider?.watchProviders?.free?.length) > 0 &&
                                            <div className="w-80 bg-black/40 flex-shrink-0 flex flex-col gap-5 p-8 rounded-md" style={{ clipPath: 'polygon(30px 10px, 100% 10px, 100% 100%, 0 100%, 0 0)' }}>
                                                <h1 className="text-lg font-semibold underline">Stream for free</h1>
                                                <div className="flex flex-col gap-5 cursor-pointer">
                                                    {regionalWatchProvider?.watchProviders?.free?.map((platform) => {
                                                        const query = (mediaInfo?.details?.name && mediaInfo?.details?.overview && platform?.provider_name) ? (encodeURIComponent(`Show ${mediaInfo?.details?.name} with overview ${mediaInfo?.details?.overview} on ${platform?.provider_name}`))?.replace(/%20/g, "+") : null;
                                                        return (
                                                            <div onClick={() => query && window.open(`https://www.google.com/search?q=${query}`, '_blank')} key={platform.provider_id} className="flex gap-3 items-center">
                                                                <img src={platform?.logo_path ? `${IMG_POSTER_BASE_URL}${platform?.logo_path}` : NoProvider} alt="ProvidersLogo" className="w-[3.5rem] aspect-[1/1] rounded-2xl object-cover" />
                                                                <h1 className="text-sm font-semibold">{platform?.provider_name || "Name unavailable"}</h1>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        }

                                    </div>
                                    )
                                    :
                                    (
                                        <div className="w-full flex justify-center items-center gap-2 py-40 bg-black/40 rounded-sm">
                                            <h1 className="text-xl font-semibold">No viewing options available</h1>
                                        </div>
                                    )
                                )}

                            {/* Rendering Socials */}
                            {(sectionTwoType === "Socials") &&
                                (mediasSocialsCheck !== null ?
                                    (<div className="flex flex-row gap-5">
                                        <div className="w-full bg-black/40 flex-shrink-0 flex flex-col gap-8 p-8 pt-12 rounded-md" style={{ clipPath: 'polygon(calc(100% - 40px) 20px, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
                                            <h1 className="text-lg font-semibold underline">Follow <span className="italic">{mediaInfo?.details?.name ? mediaInfo?.details?.name : null}</span> on Social Media</h1>
                                            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-5 gap-y-6 mx-auto cursor-pointer">
                                                {(mediaInfo?.external_ids?.facebook_id) &&
                                                    <div onClick={() => mediaInfo?.external_ids?.facebook_id && window.open(`https://www.facebook.com/${mediaInfo?.external_ids?.facebook_id}`, '_blank')} className="flex gap-3 items-center">
                                                        <RiFacebookLine className="w-8 h-8" />
                                                        <h1 className="text-base font-normal">Facebook</h1>
                                                    </div>
                                                }
                                                {(mediaInfo?.external_ids?.twitter_id) &&
                                                    <div onClick={() => mediaInfo?.external_ids?.twitter_id && window.open(`https://x.com/${mediaInfo?.external_ids?.twitter_id}`, '_blank')} className="flex gap-3 items-center">
                                                        <RiTwitterXLine className="w-8 h-8" />
                                                        <h1 className="text-base font-normal">Twitter</h1>
                                                    </div>
                                                }
                                                {(mediaInfo?.external_ids?.instagram_id) &&
                                                    <div onClick={() => mediaInfo?.external_ids?.instagram_id && window.open(`https://www.instagram.com/${mediaInfo?.external_ids?.instagram_id}`, '_blank')} className="flex gap-3 items-center">
                                                        <RiInstagramLine className="w-8 h-8" />
                                                        <h1 className="text-base font-normal">Instagram</h1>
                                                    </div>
                                                }
                                                {(mediaInfo?.external_ids?.imdb_id) &&
                                                    <div onClick={() => mediaInfo?.external_ids?.imdb_id && window.open(`https://www.imdb.com/title/${mediaInfo?.external_ids?.imdb_id}`, '_blank')} className="flex gap-3 items-center">
                                                        <RiFilmLine className="w-8 h-8" />
                                                        <h1 className="text-base font-normal">IMDB</h1>
                                                    </div>
                                                }
                                                {(mediaInfo?.external_ids?.tvdb_id) &&
                                                    <div onClick={() => mediaInfo?.external_ids?.tvdb_id && window.open(`https://thetvdb.com/?id=/${mediaInfo?.external_ids?.tvdb_id}&tab=series`, '_blank')} className="flex gap-3 items-center">
                                                        <RiSlideshow4Line className="w-8 h-8" />
                                                        <h1 className="text-base font-normal">TVDB</h1>
                                                    </div>
                                                }
                                                {(mediaInfo?.details?.homepage) &&
                                                    <div onClick={() => mediaInfo?.details?.homepage && window.open(mediaInfo?.details?.homepage, '_blank')} className="flex gap-3 items-center">
                                                        <RiGlobalLine className="w-8 h-8" />
                                                        <h1 className="text-base font-normal">Official Website</h1>
                                                    </div>
                                                }
                                                {(mediaInfo?.external_ids?.wikidata_id) &&
                                                    <div onClick={() => mediaInfo?.external_ids?.wikidata_id && window.open(`https://www.wikidata.org/wiki/${mediaInfo?.external_ids?.wikidata_id}`, '_blank')} className="flex gap-3 items-center">
                                                        <Wikipedia className="w-8 h-8" />
                                                        <h1 className="text-base font-normal">Wikipedia</h1>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    :
                                    (
                                        <div className="w-full flex justify-center items-center gap-2 py-40 bg-black/40 rounded-sm">
                                            <h1 className="text-xl font-semibold">No official links available</h1>
                                        </div>
                                    )
                                )}
                        </div>

                        {/* Part 8 : Recomendations */}
                        {(mediaInfo?.recommendations?.results?.length > 0) &&
                            < div className="w-full flex flex-col gap-5">
                                <div className="font-medium text-xl">
                                    <h1>If you liked <span className="italic text-textcolor-secondary">{(mediaInfo?.details?.name || "this content")?.replace(".", "")} </span>, you might also like</h1>
                                </div>
                                <div className="flex flex-row gap-4 no-scrollbar overflow-x-scroll">
                                    {mediaInfo?.recommendations?.results?.map((content) => {
                                        return (
                                            <div key={content?.id} onClick={() => mediaType(content)} className="relative flex-shrink-0 group">
                                                <div className="relative w-[20rem] aspect-video overflow-hidden rounded-t-sm flex-shrink-0 cursor-pointer group hover:scale-95 transition-transform duration-300 ease-out">
                                                    <img src={content.backdrop_path ? `${IMG_POSTER_BASE_URL}${content.backdrop_path}` : NoBackdrop} alt="Recomendations" className="absolute z-0 w-full h-full object-cover" />
                                                    {/* About movie or show - on hover drop down */}
                                                    <div className='absolute z-1 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(content, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(content, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(content, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(content, 'favourite')) ?
                                                                        <RiHeartFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#f14049]' />
                                                                        :
                                                                        <RiHeartLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className='rounded-full border-[#A9A9A9] border p-[0.1rem]'>
                                                                <Info className='w-6 h-6 text-[#A9A9A9]' />
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center gap-2 font-medium text-[#A9A9A9]'>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'>★ {(content.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'>{(content.release_date || content.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {content.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => content.genre_ids.includes(list.id))
                                                                    .slice(0, 2)
                                                                    .map((val) => (
                                                                        <h1 key={val.id} className='text-sm font-medium'>{val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h1>
                                                                    ))
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    {(content?.title || content?.name) &&
                                                        <div className="absolute m-1 left-1 bottom-1 rounded-2xl px-3 py-1 bg-black/60 border-sm transition-transform duration-200 group-hover:-translate-y-32">
                                                            <h1 className="text-sm font-semibold">{content?.title || content?.name || "N/A"}</h1>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div >
}

export default TVShowInfo;