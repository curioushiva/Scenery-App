import useContent from "../../Hooks/useContent/useContent";
import { IMG_POSTER_BASE_URL } from "../../Utils/SceneryApi/SceneryApi";
import { Link, useNavigate } from "react-router"
import { ReasonToJoinMockData } from "../../Utils/Mockdata/Mockdata"
import { RiArrowRightSLine } from "@remixicon/react";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { store } from "../../Redux/Store/Store";
import { useAuth } from "../../Hooks/useAuth/useAuth";

const Home = () => {

    /* To get home poster */
    const { getHomePosterData } = useContent();
    useEffect(() => {
        getHomePosterData();
    }, []);

    /* Custom useAuth hook */
    const { validateUpperEmail, upperInvalidEmail, isHomeEmailValid, validateLowerEmail, lowerInvalidEmail } = useAuth();

    /* Email typed by user */
    const usersTypedEmail = useSelector((store) => store.auth.usersTypedEmail);

    /* Get the home poster data */
    const homePosterData = useSelector((store) => store.content.homePosterData);

    /* Upper typed usersTypedEmail */
    const [upperTypedEmail, setupperTypedEmail] = useState(usersTypedEmail);

    /* Lower typed usersTypedEmail */
    const [lowerTypedEmail, setlowerTypedEmail] = useState(usersTypedEmail);

    /* Navigating to page if cred true */
    const navigate = useNavigate();
    useEffect(() => {
        if (isHomeEmailValid) {
            navigate("/signup");
        }
    }, [isHomeEmailValid, navigate]);

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#431518] to-[#000000] flex flex-col overflow-x-hidden">
            <div className="w-full flex flex-col gap-10 py-10 px-8 lg:px-35 ">
                {/* Page 1 */}
                <div className="w-full py-16 sm:py-24 px-10">
                    {/* Centre */}
                    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center items-center text-center gap-5">
                        <h1 className="font-bold text-3xl lg:text-4xl xl:text-6xl">Discover movies, shows, and more</h1>
                        <h2 className="font-regular lg:text-lg lg:font-medium">Explore millions of movies and shows for free.</h2>
                        <p className="font-regular lg:text-lg">Ready to explore? Enter your email to start your movie journey.</p>
                        <div className="w-full flex flex-col gap-3 justify-center content-center items-start md:flex-row">
                            <div className="w-full flex flex-col gap-2 items-start md:w-[70%]">
                                <input value={upperTypedEmail} onChange={(e) => { setupperTypedEmail(e.target.value); }} className="w-full px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary focus:outline focus:outline-white" type="text" placeholder="Email Address" />
                                <h1 className="text-sm text-uicolor-primary">{upperInvalidEmail}</h1>
                            </div>
                            <div onClick={() => validateUpperEmail(upperTypedEmail)} className="flex justify-center items-center grow-0 w-[10rem] mx-auto px-5 py-3 rounded-sm text-base bg-uicolor-primary font-medium sm:w-[30%] cursor-pointer transition duration-100 ease-out active:scale-[0.95]">
                                <h1>Get Started</h1>
                                <RiArrowRightSLine />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page 2 */}
                {(homePosterData?.length
                    ? <div className="w-full flex flex-col gap-5">
                        {/* Trending Movies */}
                        <div className="font-medium text-xl lg:text-2xl">
                            <h1>Trending Now</h1>
                        </div>
                        {/* Movies & Shows Scrollbar */}
                        <div className="flex flex-row gap-8 overflow-x-scroll no-scrollbar px-5">
                            {(homePosterData.filter((movie) => movie.poster_path).slice(0, 10)).map((movie, index) => {
                                return (
                                    <div key={movie.id || index} className="relative flex-shrink-0">
                                        <div className="relative h-[10rem] w-[8rem] rounded-2xl overflow-hidden lg:h-[13rem] lg:w-[10rem] xl:h-[16rem] xl:w-[12rem]">
                                            <img src={`${IMG_POSTER_BASE_URL}${movie.poster_path}`} alt="Poster" className="w-full h-full object-cover" />
                                        </div>
                                        <h1 className="absolute bottom-0 left-[-20px] text-[clamp(5rem,7vw,9rem)] font-bold text-black" style={{ WebkitTextStroke: '2px white' }}>{index + 1}</h1>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    : null
                )}

                {/* Page 3 */}
                < div className="w-full flex flex-col gap-5" >
                    {/* Reasons To Join Text */}
                    < div className="font-medium text-xl lg:text-2xl" >
                        <h1>More reasons to join</h1>
                    </div>
                    {/* Reasons To Join Cards */}
                    <div className="w-full grid grid-cols-[repeat(auto-fit,100%)] xl:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4 mx-auto">
                        {ReasonToJoinMockData.map((val, idx) => {
                            const Heading = val.header;
                            const SubHeading = val.subheader;
                            const Icon = val.imgicon;
                            return (
                                <div key={idx} className="bg-gradient-to-b from-[#1A2043] to-[#210E17] rounded-3xl py-6 px-4 grid grid-rows-[auto_1fr_auto] gap-4">
                                    <h1 className="text-xl font-bold lg:text-2xl">{Heading}</h1>
                                    <h2 className="text-base text-[#BCBAC1]">{SubHeading}</h2>
                                    <div className="ml-auto inline-flex items-center justify-center p-3 bg-gradient-to-b from-[#F43B10] to-[#e649a2] rounded-full w-fit lg:p-4 lg:mt-4">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div >

                {/* Page 4 */}
                < div className="w-full flex flex-col gap-5 sm:justify-center sm:items-center sm:content-center" >
                    {/* Ready To Watch Text */}
                    < div className="font-regular lg:text-lg" >
                        <h1>Ready to explore? Enter your email to start your movie journey.</h1>
                    </div >
                    {/* Ready To Watch Inputs */}
                    < div className="w-full flex flex-col items-start gap-3 sm:flex-row lg:w-[80%] lg:mx-auto" >
                        <div className="w-full flex flex-col gap-2 items-start sm:w-[70%]">
                            <input value={lowerTypedEmail} onChange={(e) => { setlowerTypedEmail(e.target.value); }} className="w-full px-5 py-3 border-1 border-brcolor-primary rounded-sm placeholder-textcolor-secondary bg-bgcolor-secondary focus:outline focus:outline-white" type="text" placeholder="Email Address" />
                            <h1 className="text-sm text-uicolor-primary">{lowerInvalidEmail}</h1>
                        </div>
                        <div onClick={() => validateLowerEmail(lowerTypedEmail)} className="w-[10rem] flex justify-center px-5 py-3 rounded-sm text-base bg-uicolor-primary font-medium sm:w-[30%] cursor-pointer transition duration-100 ease-out active:scale-[0.95]">
                            <h1>Get Started</h1>
                            <RiArrowRightSLine />
                        </div>
                    </div >
                </div >
            </div>
        </div >
    )
}

export default Home;