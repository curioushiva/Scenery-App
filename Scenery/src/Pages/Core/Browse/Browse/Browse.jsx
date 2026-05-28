import useContent from '@/Utils/Hooks/useContent/useContent';
import { IMG_BACKDROP_BASE_URL, IMG_POSTER_BASE_URL } from '@/Utils/SceneryApi/SceneryApi';
import useMedia from '@/Utils/Hooks/useMedia/useMedia'
import { useDispatch, useSelector } from 'react-redux';
import { RiBookmarkFill, RiBookmarkLine, RiHeartFill, RiHeartLine, RiInformationLine, RiPauseCircleLine, RiPlayFill } from '@remixicon/react';
import { Info } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';

const Browse = () => {

  /* To get All genres & explore Categorie's data */
  const { getExploreCat, getAllGenres } = useContent();
  useEffect(() => {
    getAllGenres();
    getExploreCat();
  }, []);

  /* To access movie, shows, all genres & bg video */
  const exploreCat = useSelector((store) => store.content.exploreCat);
  const allGenres = useSelector((store) => store.content.allGenres);
  const exploreBGVideo = useSelector((store) => store.content.exploreBGVideo);

  /* To play and pause the background video , def-pause */
  const [isBgVideoPlaying, setIsBgVideoPlaying] = useState(false)

  /* Media type (for info), save media (for saving watchlater & fav) & check if saved */
  const { mediaType, saveUsersMedia, showSavedUsersMedia } = useMedia();

  /* Rendering on basis of categories loaded */
  {
    return (exploreCat?.length === 0) ?
      <div></div>
      :
      <div className='overflow-hidden'>
        {/* Page 1 : Video & content */}
        <div className='relative w-full min-h-[75dvh] overflow-hidden'>
          {/* Background Media */}
          <div className="absolute inset-0 z-0">
            {/* Image */}
            {exploreBGVideo?.video?.backdrop_path &&
              <img className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-0" : "opacity-100"}`}
                src={`${IMG_BACKDROP_BASE_URL}${exploreBGVideo?.video?.backdrop_path}`}
                alt="bg"
              />
            }
            {/* Video */}
            {exploreBGVideo?.videoKey &&
              <iframe className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full pointer-events-none scale-135 transition-opacity duration-500 ${isBgVideoPlaying ? "opacity-100" : "opacity-0"}`}
                src={`https://www.youtube.com/embed/${exploreBGVideo?.videoKey}?autoplay=1&mute=1&loop=1&playlist=${exploreBGVideo?.videoKey}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&start=10`}
                title="video"
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
              />
            }
            {/* Fades top & bottoms */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/90 via-transparent to-transparent" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-bgcolor-fourth via-bgcolor-fourth/10 to-transparent" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bgcolor-fourth via-bgcolor-fourth/40 to-transparent" />
          </div>
          {/* About Video */}
          <div className="relative z-10 w-full min-h-[75dvh] flex items-end overflow-y-auto p-8 mobileNavPad">
            <div className="max-w-md flex flex-col gap-4">
              <h1 className="text-3xl lg:text-4xl font-bold">{(exploreBGVideo?.video?.title || exploreBGVideo?.video?.name)}</h1>
              {exploreBGVideo?.video?.genre_ids?.length !== 0 &&
                <div className='flex flex-row gap-2 mr-auto max-[240px]:flex-col'>
                  {(allGenres
                    .filter((list) => exploreBGVideo?.video?.genre_ids?.includes(list?.id))
                    .slice(0, 2)
                    .map((val) => (
                      <h3 key={val.id} className='text-xm font-semibold lg:text-base px-2 py-[0.10rem] rounded-4xl bg-white/10 backdrop-blur-md border border-white/20 text-white'> {val?.name === "Science Fiction" ? "Sci-Fi" : (val?.name)?.split(' ')[0]}</h3>
                    ))
                  )}
                </div>
              }
              <p className="hidden text-sm lg:text-base text-gray-200 xus:block xxm:hidden">{(exploreBGVideo?.video?.overview)?.split(" ")?.slice(0, 19)?.join(" ")}...</p>
              <p className="hidden text-sm lg:text-base text-gray-200 xxm:block">{(exploreBGVideo?.video?.overview)}</p>
              {(exploreBGVideo?.video?.release_date || exploreBGVideo?.video?.first_air_date) && <h2 className='text-xm font-semibold lg:text-base'>Released in {(exploreBGVideo?.video?.release_date || exploreBGVideo?.video?.first_air_date)?.slice(0, 4)}</h2>}
              <div className="flex flex-col max-w-40 gap-4 xxm:flex-row xxs:max-w-lg">
                {exploreBGVideo?.videoKey &&
                  <div onClick={() => setIsBgVideoPlaying(prev => !prev)} className="flex justify-center items-center gap-1 bg-white text-black pl-3 pr-6 py-2 rounded cursor-pointer">
                    {isBgVideoPlaying ?
                      <><RiPauseCircleLine /><span className="font-semibold">Pause Trailer</span></>
                      :
                      <><RiPlayFill /><span className="font-semibold">Play Trailer</span></>
                    }
                  </div>
                }
                {exploreBGVideo?.video?.id &&
                  <div onClick={() => mediaType(exploreBGVideo?.video)} className="flex justify-center items-center gap-2 bg-gray-600/70 px-4 py-2 rounded cursor-pointer">
                    <RiInformationLine />
                    <span className="font-semibold">More Info</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        {/* Page 2 : Movies with categories */}
        <div className='flex flex-col gap-10 p-8'>
          {/* Filtering categories if movie array is more than 5 */}
          {(exploreCat.filter((categorie) => categorie.content.length > 5)).map((categorie) => {
            return (
              <div key={categorie.type} className="w-full flex flex-col gap-3">
                <div className="font-medium text-base xs:text-xl">
                  <h1>{categorie.title}</h1>
                </div>
                <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar cursor-pointer">
                  {/* Filtering movies if movie have id & poster paths */}
                  {(categorie.content.filter((content) => content.id && content.poster_path)).map((content) => (
                    <div key={content?.id} onClick={() => mediaType(content)} className="relative flex-shrink-0 group">
                      <div className="relative rounded-sm overflow-hidden w-[10rem] lg:w-[13rem] aspect-[2/3] transition-transform duration-300 ease-out group-hover:scale-95">
                        <img src={`${IMG_POSTER_BASE_URL}${content.poster_path}`} alt="Poster" className="absolute z-0 w-full h-full object-cover" />
                        {/* About movie or show - on hover drop down */}
                        <div className='absolute z-10 bottom-0 bg-black/90 w-full flex flex-col gap-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-200'>
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div >
  }
}

export default Browse;

