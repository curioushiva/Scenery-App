import useContent from '@/Utils/Hooks/useContent/useContent';
import useMedia from '@/Utils/Hooks/useMedia/useMedia';
import { IMG_BACKDROP_BASE_URL, IMG_POSTER_BASE_URL } from '@/Utils/SceneryApi/SceneryApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiBookmarkFill, RiBookmarkLine, RiHeartFill, RiHeartLine, RiInformationLine, RiPauseCircleLine, RiPlayFill } from '@remixicon/react';
import { Info } from 'react-bootstrap-icons';;
import { Outlet, useNavigate } from 'react-router';
import { addMoviesGenre, addSelectedMovieGenreIndex } from '@/Utils/Redux/Slices/ContentSlice/ContentSlice';
import { addMediaID } from '@/Utils/Redux/Slices/MediaSlice/MediaSlice';
import { useMediaQuery } from 'react-responsive';

const Movies = () => {

    /* To dispatch and navigate */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* To access Movie's genre  */
    const moviesGenre = useSelector((store) => store.content.moviesGenre)

    /* To get Movies Categorie's data */
    const { getMoviesCat } = useContent();
    useEffect(() => {
        if (moviesGenre.length === 0) {
            getMoviesCat();
        }
    }, [moviesGenre]);

    /* To access movie, all genres & bg video */
    const moviesCat = useSelector((store) => store.content.moviesCat);
    const allGenres = useSelector((store) => store.content.allGenres);
    const moviesBGVideo = useSelector((store) => store.content.moviesBGVideo);

    /* To check if movies genre is clicked */
    const [isMoviesGenreClicked, setIsMoviesGenreClicked] = useState(false);

    /* Selected genre for the movie */
    const selectedMovieGenreIndex = useSelector((store) => store.content.selectedMovieGenreIndex);

    /* Accessing vales from useContent */
    const { moviesGenreData, getMoviesGenre } = useContent();

    /* Running getMoviesGenre on when user clicks on type of genre */
    useEffect(() => {
        if (selectedMovieGenreIndex === null || selectedMovieGenreIndex === undefined) return;
        getMoviesGenre(selectedMovieGenreIndex);
    }, [selectedMovieGenreIndex]);

    /* To play and pause the background video , def-pause */
    const [isBgVideoPlaying, setIsBgVideoPlaying] = useState(false)

    /* Media type (for info), save media (for saving watchlater & fav) & check if saved */
    const { mediaType, saveUsersMedia, showSavedUsersMedia } = useMedia();

    /* Rendering on basis of categorie loaded */
    {
        return moviesCat?.length === 0 ?
            <div></div>
            :
            <div className='overflow-hidden'>
                {/* Page 1 : video & content */}
                <div className='relative w-full min-h-[75dvh] overflow-hidden'>
                    {/* Bottom Layer */}
                    <div className="absolute inset-0 z-0">
                        {/* Image */}
                        {moviesBGVideo?.video?.backdrop_path &&
                            <img className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-0" : "opacity-100"}`}
                                src={`${IMG_BACKDROP_BASE_URL}${moviesBGVideo?.video?.backdrop_path}`}
                                alt="bg"
                            />
                        }

                        {/* Video */}
                        {moviesBGVideo?.videoKey &&
                            <iframe className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full pointer-events-none scale-135 transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-100" : "opacity-0"}`}
                                src={`https://www.youtube.com/embed/${moviesBGVideo?.videoKey}?autoplay=1&mute=1&loop=1&playlist=${moviesBGVideo?.videoKey}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&start=10`}
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
                        {(moviesGenre?.length > 0) ?
                            <div className="relative z-20 flex flex-col items-start justify-start gap-1 xls:flex-row">
                                <h1 onClick={() => { setIsMoviesGenreClicked(false); dispatch(addMoviesGenre([])); dispatch(addSelectedMovieGenreIndex(null)); setIsBgVideoPlaying(false); }} className="text-xl font-normal leading-[2rem] text-gray-300 cursor-pointer">Movies ＞</h1>
                                <h1 className='text-3xl font-medium leading-none'>{moviesGenre[0]?.genre} Movies</h1>
                            </div>
                            :
                            <div className="relative z-20 flex flex-col items-start gap-5 xus:flex-row xus:items-end xus:gap-7 lg:gap-10">
                                <div>
                                    <h1 className="text-4xl lg:text-4xl font-bold leading-[0.7]">Movies</h1>
                                </div>
                                <div onClick={() => { setIsMoviesGenreClicked(prev => !prev); }} className="flex justify-center items-center gap-2 cursor-pointer px-2 border-1 lg:gap-7 lg:py-[0.1rem] hover:bg-brcolor-primary">
                                    <h1 className='font-medium text-[0.70rem] lg:text-[0.80rem]'>Genres</h1>
                                    <svg className={`w-3 transition-transform duration-300 ${isMoviesGenreClicked ? "rotate-180" : "rotate-0"}`} viewBox="8 10 8 4" fill="currentColor"><path d="M12 14L8 10H16L12 14Z" /></svg>
                                    {/* Movies Genre Types*/}
                                    {isMoviesGenreClicked &&
                                        <div className="moviesGenreDropdown">
                                            <div className="w-40 max-h-30 sm:max-h-40 overflow-y-scroll no-scrollbar bg-black/100 text-sm border-1 border-brcolor-primary flex flex-col items-start justify-center">
                                                <div className="flex flex-col gap-4 px-4 mt-70 sm:mt-60 pb-5">
                                                    {moviesGenreData.map((val, index, arr) => {
                                                        return (
                                                            <div key={val.key} className="flex items-center justify-start gap-2">
                                                                <div onClick={() => {
                                                                    setIsMoviesGenreClicked(false);
                                                                    dispatch(addSelectedMovieGenreIndex(index));
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
                            <h1 className="text-3xl lg:text-4xl font-bold">{(moviesBGVideo?.video?.title || moviesBGVideo?.video?.name)}</h1>
                            {moviesBGVideo?.video?.genre_ids?.length !== 0 &&
                                <div className='flex flex-row gap-2 mr-auto max-[240px]:flex-col'>
                                    {(allGenres
                                        .filter((list) => moviesBGVideo?.video?.genre_ids?.includes(list?.id))
                                        .slice(0, 2)
                                        .map((val) => (
                                            <h3 key={val?.id} className='text-xm font-semibold lg:text-base px-2 py-[0.10rem] rounded-4xl bg-white/10 backdrop-blur-md border border-white/20 text-white'> {val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h3>
                                        ))
                                    )}
                                </div>
                            }
                            <p className="hidden text-sm lg:text-base text-gray-200 xus:block xxm:hidden">{(moviesBGVideo?.video?.overview)?.split(" ")?.slice(0, 19)?.join(" ")}...</p>
                            <p className="hidden text-sm lg:text-base text-gray-200 xxm:block">{(moviesBGVideo?.video?.overview)}</p>
                            {(moviesBGVideo?.video?.release_date || moviesBGVideo?.video?.first_air_date) && <h2 className='text-xm font-semibold lg:text-base'>Released in {(moviesBGVideo?.video?.release_date || moviesBGVideo?.video?.first_air_date)?.slice(0, 4)}</h2>}
                            <div className="flex flex-col max-w-40 gap-4 xxm:flex-row xxs:max-w-lg">
                                {moviesBGVideo?.videoKey &&
                                    <div onClick={() => setIsBgVideoPlaying(prev => !prev)} className="flex justify-center items-center gap-1 bg-white text-black pl-3 pr-6 py-2 rounded cursor-pointer">
                                        {isBgVideoPlaying ?
                                            <><RiPauseCircleLine /><span className="font-semibold">Pause Trailer</span></>
                                            :
                                            <><RiPlayFill /><span className="font-semibold">Play Trailer</span></>
                                        }
                                    </div>
                                }
                                {moviesBGVideo?.video?.id &&
                                    <div onClick={() => mediaType(moviesBGVideo?.video)} className="flex justify-center items-center gap-2 bg-gray-600/70 px-4 py-2 rounded cursor-pointer">
                                        <RiInformationLine />
                                        <span className="font-semibold">More Info</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page 2 : Movies with categorie - including genre movies based on condition */}
                {moviesGenre.length > 0 ?
                    <div className='flex flex-col gap-10 p-8'>
                        {moviesGenre[0].genreMovies.filter((val, idx) => val.movies.length > 5).map((categorie) => {
                            return (
                                <div key={categorie.type} className="w-full flex flex-col gap-3">
                                    <div className="font-medium text-base xs:text-xl">
                                        <h1>{categorie.title}</h1>
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                                        {(categorie.movies.filter((movie) => movie.id && movie.poster_path)).map((movie) => (
                                            <div key={movie.id} onClick={() => mediaType(movie)} className="relative flex-shrink-0 group">
                                                <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${movie.poster_path}`} alt="Poster" className="absolute z-0 w-full h-full object-cover" />
                                                    {/* About movie - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(movie, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(movie, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(movie.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(movie.release_date || movie.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {movie.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => movie.genre_ids.includes(list.id))
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
                        {(moviesCat.filter((categorie) => categorie.movies.length > 5)).slice(0, 1).map((categorie) => {
                            return (
                                <div key={categorie.type} className="w-full flex flex-col gap-3">
                                    <div className="font-medium text-base xs:text-xl">
                                        <h1>{categorie.title}</h1>
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                                        {(categorie.movies.filter((movie) => movie.id && movie.poster_path)).map((movie) => (
                                            <div key={movie.id} onClick={() => mediaType(movie)} className="relative flex-shrink-0 group">
                                                <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${movie.poster_path}`} alt="Poster" className="absolute z-0 w-full h-full object-cover" />
                                                    {/* About movie or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(movie, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(movie, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(movie.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(movie.release_date || movie.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {movie.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => movie.genre_ids.includes(list.id))
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
                        {/* Top Popular Movies */}
                        {(moviesCat.filter((categorie) => categorie.movies.length > 5)).slice(1, 2).map((categorie) => {
                            return categorie.title === "Top Popular Movies" && (
                                <div key={categorie.type} className="w-full flex flex-col gap-3">
                                    <div className="font-medium text-base xs:text-xl">
                                        <h1>{categorie.title}</h1>
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                                        {/* 1-9 */}
                                        {(categorie.movies.filter((movie) => movie.id && movie.poster_path)).slice(0, 9).map((movie, index) => (
                                            <div key={movie.id} onClick={() => mediaType(movie)} className="relative w-[16rem] h-[12rem] md:w-[18rem] md:h-[14rem] flex-shrink-0 group">
                                                <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${movie.poster_path}`} alt="Poster" className="absolute right-0 z-10 w-[67%] md:w-[65%] h-full object-cover" />
                                                    <h1 className="absolute left-0 text-[13rem] md:text-[15rem] font-bold text-black" style={{ WebkitTextStroke: '4px #5F5E5E' }}>{index + 1}</h1>
                                                    {/* About movie or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 right-0 bg-black/90 w-[67%] md:w-[65%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(movie, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(movie, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(movie.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(movie.release_date || movie.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {movie.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => movie.genre_ids.includes(list.id))
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
                                        {(categorie.movies.filter((movie) => movie.id && movie.poster_path)).slice(9, 15).map((movie, index) => (
                                            <div key={movie.id} onClick={() => mediaType(movie)} className="relative w-[23rem] h-[12rem] md:w-[25rem] md:h-[14rem] flex-shrink-0 group">
                                                <div className="relative flex justify-center items-center rounded-sm overflow-hidden w-full h-full transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${movie.poster_path}`} alt="Poster" className="absolute right-0 z-10 w-[58%] md:w-[50%] h-full object-cover" />
                                                    <h1 className="absolute left-0 tracking-[-2rem] text-[12rem] md:text-[15rem] font-bold text-black" style={{ WebkitTextStroke: '4px #5F5E5E' }}>{index + 10}</h1>
                                                    {/* About movie or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 right-0 bg-black/90 w-[58%] md:w-[50%] flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(movie, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(movie, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(movie.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(movie.release_date || movie.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {movie.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => movie.genre_ids.includes(list.id))
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
                        {(moviesCat.filter((categorie) => categorie.movies.length > 5)).slice(2, 7).map((categorie) => {
                            return (
                                <div key={categorie.type} className="w-full flex flex-col gap-3">
                                    <div className="font-medium text-base xs:text-xl">
                                        <h1>{categorie.title}</h1>
                                    </div>
                                    <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                                        {(categorie.movies.filter((movie) => movie.id && movie.poster_path)).map((movie) => (
                                            <div key={movie.id} onClick={() => mediaType(movie)} className="relative flex-shrink-0 group">
                                                <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                                                    <img src={`${IMG_POSTER_BASE_URL}${movie.poster_path}`} alt="Poster" className="absolute z-0 w-full h-full object-cover" />
                                                    {/* About movie or show - on hover drop down */}
                                                    <div className='absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className='flex gap-1'>
                                                                <div onClick={() => saveUsersMedia(movie, 'watchLater')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'watchLater')) ?
                                                                        <RiBookmarkFill className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                        :
                                                                        <RiBookmarkLine className='w-[1.80rem] h-[1.80rem] lg:w-[1.9rem] sm:h-[1.9rem] text-[#A9A9A9]' />
                                                                    }
                                                                </div>
                                                                <div onClick={() => saveUsersMedia(movie, 'favourite')} className='p-[0.1rem]'>
                                                                    {(showSavedUsersMedia(movie, 'favourite')) ?
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
                                                                <h1 className='text-sm'>★ {(movie.vote_average).toFixed(1) || "0.0"}</h1>
                                                            </div>
                                                            <div className='flex justify-center items-center gap-1 py-[0.05rem] px-2 border-1'>
                                                                <h1 className='text-sm'> {(movie.release_date || movie.first_air_date)?.slice(0, 4) || "N/A"}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            {movie.genre_ids.length === 0 ?
                                                                <h1 className='text-sm font-medium'>Uncategorized</h1> :
                                                                (allGenres
                                                                    .filter((list) => movie.genre_ids.includes(list.id))
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

export default Movies;