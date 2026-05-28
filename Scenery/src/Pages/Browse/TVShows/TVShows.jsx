import useContent from '../../../Hooks/useContent/useContent';
import useMedia from '../../../Hooks/useMedia/useMedia';
import { IMG_BACKDROP_BASE_URL, IMG_POSTER_BASE_URL } from '../../../Utils/SceneryApi/SceneryApi';
import { useState, useEffect } from 'react';
import Profile from '../../User/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { RiBookmarkFill, RiBookmarkLine, RiHeartFill, RiHeartLine, RiInformationLine, RiPauseCircleLine, RiPlayFill } from '@remixicon/react';
import { Info } from 'react-bootstrap-icons';
import { Outlet, useNavigate } from 'react-router';
import { addTvShowsGenre, addSelectedTvShowGenreIndex } from '../../../Redux/Slices/ContentSlice/ContentSlice';
import { addMediaID } from '../../../Redux/Slices/MediaSlice/MediaSlice';

const TVShows = () => {

    /* To dispatch and navigate */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* To access Tv show's genre */
    const tvShowsGenre = useSelector((store) => store.content.tvShowsGenre)

    /* To get TV Shows Categorie's data */
    const { getTvShowsCat } = useContent();
    useEffect(() => {
        if (tvShowsGenre.length === 0) {
            getTvShowsCat();
        }
    }, [tvShowsGenre]);

    /* To access tv shows, all genres & bg video */
    const tvShowsCat = useSelector((store) => store.content.tvShowsCat);
    const allGenres = useSelector((store) => store.content.allGenres);
    const tvShowsBGVideo = useSelector((store) => store.content.tvShowsBGVideo);

    /* To check if TV Shows genre is clicked */
    const [isTvShowsGenreClicked, setIsTvShowsGenreClicked] = useState(false);

    /* Selected genre for the TV Show */
    const selectedTvShowGenreIndex = useSelector((store) => store.content.selectedTvShowGenreIndex);

    /* Accessing vales from useContent */
    const { tvShowsGenreData, getTvShowsGenre } = useContent();

    /* Running getTvShowsGenre on when user clicks on type of genre */
    useEffect(() => {
        if (selectedTvShowGenreIndex === null || selectedTvShowGenreIndex === undefined) return;
        getTvShowsGenre(selectedTvShowGenreIndex);
    }, [selectedTvShowGenreIndex]);

    /* To play and pause the background video , def-pause */
    const [isBgVideoPlaying, setIsBgVideoPlaying] = useState(false)

    /* Media type (for info), save media (for saving watchlater & fav) & check if saved */
    const { mediaType, saveUsersMedia, showSavedUsersMedia } = useMedia();

    /* Rendering on basis of categories loaded */
    {
        return tvShowsCat?.length === 0 ?
            <div></div>
            :
            <div className='overflow-hidden'>
                {/* Page 1 : video & content */}
                <div className='relative w-full min-h-[75dvh] overflow-hidden'>
                    {/* Bottom Layer */}
                    <div className="absolute inset-0 z-0">
                        {/* Image */}
                        {tvShowsBGVideo?.video?.backdrop_path &&
                            <img className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-0" : "opacity-100"}`}
                                src={`${IMG_BACKDROP_BASE_URL}${tvShowsBGVideo?.video?.backdrop_path}`}
                                alt="bg"
                            />
                        }
                        {/* Video */}
                        {tvShowsBGVideo?.videoKey &&
                            <iframe className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full pointer-events-none scale-135 transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-100" : "opacity-0"}`}
                                src={`https://www.youtube.com/embed/${tvShowsBGVideo?.videoKey}?autoplay=1&mute=1&loop=1&playlist=${tvShowsBGVideo?.videoKey}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&start=10`}
                                title="video"
                                frameBorder="0"
                                allow="autoplay"
                                allowFullScreen
                            />}

                        {/* Fades top & bottoms */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/90 via-transparent to-transparent" />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-bgcolor-fourth via-bgcolor-fourth/10 to-transparent" />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bgcolor-fourth via-bgcolor-fourth/40 to-transparent" />
                    </div>
                    {/* Top Layer */}
                    <div className="relative z-10 w-full min-h-[75dvh] flex flex-col justify-between gap-10 p-8 mobileNavPad">
                        {/* Movie Genre */}
                        {(tvShowsGenre.length > 0) ?
                            <div className="relative z-20 flex flex-col items-start justify-start gap-1 xls:flex-row">
                                <h1 onClick={() => { setIsTvShowsGenreClicked(false); dispatch(addTvShowsGenre([])); dispatch(addSelectedTvShowGenreIndex(null)); setIsBgVideoPlaying(false); }} className="text-xl font-normal leading-[2rem] text-gray-300 cursor-pointer">TV Shows ＞</h1>
                                <h1 className='text-3xl font-medium leading-none'>{tvShowsGenre[0]?.genre} Shows</h1>
                            </div>
                            :
                            <div className="relative z-20 flex flex-col items-start gap-5 xs:flex-row xs:items-end xs:gap-7 lg:gap-10">
                                <div>
                                    <h1 className="text-4xl lg:text-4xl font-bold leading-[1.2] xs:leading-[0.7]">TV Shows</h1>
                                </div>
                                <div onClick={() => { setIsTvShowsGenreClicked(prev => !prev) }} className="flex justify-center items-center gap-2 cursor-pointer px-2 border-1 lg:gap-7 lg:py-[0.1rem] hover:bg-brcolor-primary">
                                    <h1 className='font-medium text-[0.70rem] lg:text-[0.80rem]'>Genres</h1>
                                    <svg className={`w-3 transition-transform duration-300 ${isTvShowsGenreClicked ? "rotate-180" : "rotate-0"}`} viewBox="8 10 8 4" fill="currentColor"><path d="M12 14L8 10H16L12 14Z" /></svg>
                                    {/* TV Shows Genre Types */}
                                    {isTvShowsGenreClicked &&
                                        <div className="showsGenreDropdown">
                                            <div className="w-40 max-h-30 sm:max-h-40 overflow-y-scroll no-scrollbar bg-black/100 text-sm border-1 border-brcolor-primary flex flex-col items-start justify-center">
                                                <div className="flex flex-col gap-4 px-4 mt-70 sm:mt-60 pb-5">
                                                    {tvShowsGenreData.map((val, index, arr) => {
                                                        return (
                                                            <div key={val.key} className="flex items-center justify-start gap-2">
                                                                <div onClick={() => {
                                                                    setIsTvShowsGenreClicked(false)
                                                                    dispatch(addSelectedTvShowGenreIndex(index));
                                                                    setIsBgVideoPlaying(false);
                                                                }} className="hover:underline">{val?.genre}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        {/* About video */}
                        <div className="max-w-md flex flex-col gap-4">
                            <h1 className="text-3xl lg:text-4xl font-bold">{(tvShowsBGVideo?.video?.title || tvShowsBGVideo?.video?.name)}</h1>
                            {tvShowsBGVideo?.video?.genre_ids?.length !== 0 &&
                                <div className='flex flex-row gap-2 mr-auto max-[240px]:flex-col'>
                                    {(allGenres
                                        .filter((list) => tvShowsBGVideo?.video?.genre_ids?.includes(list?.id))
                                        .slice(0, 2)
                                        .map((val) => (
                                            <h3 key={val?.id} className='text-xm font-semibold lg:text-base px-2 py-[0.10rem] rounded-4xl bg-white/10 backdrop-blur-md border border-white/20 text-white'>
                                                {val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}
                                            </h3>
                                        ))
                                    )}
                                </div>
                            }
                            <p className="hidden text-sm lg:text-base text-gray-200 xus:block xxm:hidden">{(tvShowsBGVideo?.video?.overview)?.split(" ")?.slice(0, 19)?.join(" ")}...</p>
                            <p className="hidden text-sm lg:text-base text-gray-200 xxm:block">{(tvShowsBGVideo?.video?.overview)}</p>
                            {(tvShowsBGVideo?.video?.release_date || tvShowsBGVideo?.video?.first_air_date) && <h2 className='text-xm font-semibold lg:text-base'>Released in {(tvShowsBGVideo?.video?.release_date || tvShowsBGVideo?.video?.first_air_date)?.slice(0, 4)}</h2>}
                            <div className="flex flex-col max-w-40 gap-4 xxm:flex-row xxs:max-w-lg">
                                {tvShowsBGVideo?.videoKey &&
                                    <div onClick={() => setIsBgVideoPlaying(prev => !prev)} className="flex justify-center items-center gap-1 bg-white text-black pl-3 pr-6 py-2 rounded cursor-pointer">
                                        {isBgVideoPlaying ?
                                            <><RiPauseCircleLine /><span className="font-semibold">Pause Trailer</span></>
                                            :
                                            <><RiPlayFill /><span className="font-semibold">Play Trailer</span></>
                                        }
                                    </div>
                                }
                                {tvShowsBGVideo?.video?.id &&
                                    <div onClick={() => mediaType(tvShowsBGVideo?.video)} className="flex justify-center items-center gap-2 bg-gray-600/70 px-4 py-2 rounded cursor-pointer">
                                        <RiInformationLine />
                                        <span className="font-semibold">More Info</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page 2 : Movies with categories - including genre movies based on condition */}
                {tvShowsGenre.length > 0 ?
                    <div className='flex flex-col gap-10 p-8'>
                        {tvShowsGenre[0].genreTvShows.filter((val, idx) => val.tvShows.length > 5).map((categorie) => {
                            return (
                                <div key={categorie.type} className="w-full flex flex-col gap-3">
                                    <div className="font-medium text-base xs:text-xl">
                                        <h1>{categorie.title}</h1>
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                                        {(categorie.tvShows.filter((tvShow) => tvShow.id && tvShow.poster_path)).map((tvShow) => (
                                            <div key={tvShow.id} onClick={() => mediaType(tvShow)} className="relative flex-shrink-0 group">
                                                <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${tvShow.poster_path}`} alt="Poster" className="absolute z-0 w-full h-full object-cover" />
                                                    {/* About tvShow or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(tvShow.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(tvShow.release_date || tvShow.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {tvShow.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => tvShow.genre_ids.includes(list.id))
                                                                    .slice(0, 2)
                                                                    .map((val) => (
                                                                        <h1 key={val.id} className='text-sm font-medium'>{val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h1>
                                                                    ))
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className='flex flex-col gap-10 p-8'>
                        {/* Now Playing */}
                        {(tvShowsCat.filter((categorie) => categorie.tvShows.length > 5)).slice(0, 1).map((categorie) => {
                            return (
                                <div key={categorie.type} className="w-full flex flex-col gap-3">
                                    <div className="font-medium text-base xs:text-xl">
                                        <h1>{categorie.title}</h1>
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                                        {(categorie.tvShows.filter((tvShow) => tvShow.id && tvShow.poster_path)).map((tvShow) => (
                                            <div key={tvShow.id} onClick={() => mediaType(tvShow)} className="relative flex-shrink-0 group">
                                                <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${tvShow.poster_path}`} alt="Poster" className="absolute z-0 w-full h-full object-cover" />
                                                    {/* About tvShow or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(tvShow.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(tvShow.release_date || tvShow.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {tvShow.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => tvShow.genre_ids.includes(list.id))
                                                                    .slice(0, 2)
                                                                    .map((val) => (
                                                                        <h1 key={val.id} className='text-sm font-medium'>{val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h1>
                                                                    ))
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                        {/* Top Popular TV Shows */}
                        {(tvShowsCat.filter((categorie) => categorie.tvShows.length > 5)).slice(1, 2).map((categorie) => {
                            return categorie.title === "Top Popular TV Shows" && (
                                <div key={categorie.type} className="w-full flex flex-col gap-3">
                                    <div className="font-medium text-base xs:text-xl">
                                        <h1>{categorie.title}</h1>
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                                        {/* 1-9 */}
                                        {(categorie.tvShows.filter((tvShow) => tvShow.id && tvShow.poster_path)).slice(0, 9).map((tvShow, index) => (
                                            <div key={tvShow.id} onClick={() => mediaType(tvShow)} className="relative w-[16rem] h-[12rem] md:w-[18rem] md:h-[14rem] flex-shrink-0 group">
                                                <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${tvShow.poster_path}`} alt="Poster" className="absolute right-0 z-10 w-[67%] md:w-[65%] h-full object-cover" />
                                                    <h1 className="absolute left-0 text-[13rem] md:text-[15rem] font-bold text-black" style={{ WebkitTextStroke: '4px #5F5E5E' }}>{index + 1}</h1>
                                                    {/* About tvShow or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 right-0 bg-black/90 w-[67%] md:w-[65%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(tvShow.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(tvShow.release_date || tvShow.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {tvShow.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => tvShow.genre_ids.includes(list.id))
                                                                    .slice(0, 2)
                                                                    .map((val) => (
                                                                        <h1 key={val.id} className='text-sm font-medium'>{val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h1>
                                                                    ))
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {/* 10-15 */}
                                        {(categorie.tvShows.filter((tvShow) => tvShow.id && tvShow.poster_path)).slice(9, 15).map((tvShow, index) => (
                                            <div key={tvShow.id} onClick={() => mediaType(tvShow)} className="relative w-[23rem] h-[12rem] md:w-[25rem] md:h-[14rem] flex-shrink-0 group">
                                                <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${tvShow.poster_path}`} alt="Poster" className="absolute right-0 z-10 w-[58%] md:w-[50%] h-full object-cover" />
                                                    <h1 className="absolute left-0 tracking-[-2rem] text-[12rem] md:text-[15rem] font-bold text-black" style={{ WebkitTextStroke: '4px #5F5E5E' }}>{index + 10}</h1>
                                                    {/* About tvShow or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 right-0 bg-black/90 w-[58%] md:w-[50%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(tvShow.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(tvShow.release_date || tvShow.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {tvShow.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => tvShow.genre_ids.includes(list.id))
                                                                    .slice(0, 2)
                                                                    .map((val) => (
                                                                        <h1 key={val.id} className='text-sm font-medium'>{val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h1>
                                                                    ))
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                        )}
                        {/* Other */}
                        {(tvShowsCat.filter((categorie) => categorie.tvShows.length > 5)).slice(2, 7).map((categorie) => {
                            return (
                                <div key={categorie.type} className="w-full flex flex-col gap-3">
                                    <div className="font-medium text-base xs:text-xl">
                                        <h1>{categorie.title}</h1>
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                                        {(categorie.tvShows.filter((tvShow) => tvShow.id && tvShow.poster_path)).map((tvShow) => (
                                            <div key={tvShow.id} onClick={() => mediaType(tvShow)} className="relative flex-shrink-0 group">
                                                <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${tvShow.poster_path}`} alt="Poster" className="absolute z-0 w-full h-full object-cover" />
                                                    {/* About tvShow or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(tvShow, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(tvShow, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(tvShow.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(tvShow.release_date || tvShow.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {tvShow.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => tvShow.genre_ids.includes(list.id))
                                                                    .slice(0, 2)
                                                                    .map((val) => (
                                                                        <h1 key={val.id} className='text-sm font-medium'>{val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h1>
                                                                    ))
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div >
    }
}


export default TVShows;

