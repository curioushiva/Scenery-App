import { Link, useLocation } from "react-router";
import logo1 from "@/Assets/Imgs/Logo/logo1.png";
import { useSelector } from "react-redux";
import { AvatarsMockData } from "@/Utils/Mockdata/Mockdata";
import {
  RiHome5Line,
  RiVideoOnLine,
  RiTvLine,
  RiFireLine,
  RiEyeCloseLine,
  RiSearchLine,
  RiShiningLine,
  RiBookShelfLine,
} from "@remixicon/react";
import { Layers } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

/* Landing Header */
export const LandingHeader = () => {
  return (
    <div className="w-full flex justify-between py-5 px-8 lg:px-35">
      <Link to="/">
        <img src={logo1} alt="logo1" className="w-10 sm:w-12" />
      </Link>
      <Link to="/signin">
        <button
          className="text-sm font-medium px-3 py-1 rounded-3xl bg-white/10 border
         border-white/20 backdrop-blur-md text-white cursor-pointer hover:bg-white/15
          transition-all duration-200"
        >
          Sign In
        </button>
      </Link>
    </div>
  );
};

/* System Header */
export const SystemHeader = () => {
  return (
    <div className="w-full border-b-1 border-br-primary py-5 px-8 lg:px-35">
      <Link to="/" className="flex w-fit">
        <img src={logo1} alt="logo1" className="w-10 sm:w-12" />
      </Link>
    </div>
  );
};

/* Auth Header */
export const AuthHeader = () => {
  return (
    <div className="w-full border-b-1 border-br-primary py-5 px-8 lg:px-35">
      <Link to="/" className="flex w-fit">
        <img src={logo1} alt="logo1" className="w-10 sm:w-12" />
      </Link>
    </div>
  );
};

/* Core Header */
export const CoreHeader = () => {
  /* For pathname */
  const location = useLocation();

  /* Different layouts for different screen sizes */
  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 500px) and (min-height: 650px)",
  });

  /* Profile avatar number */
  const { AvatarNum } = useSelector((store) => store.account.profile);

  /* To handle navbar in mobile */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      {isDesktopScreen && (
        <div className="w-[88px] h-[100dvh] sticky top-0 z-100">
          <div className="w-full h-full flex flex-col items-center gap-5 text-text-secondary p-6">
            <Link to="/browse">
              <img src={logo1} alt="logo1" className="w-10" />
            </Link>
            <div className="w-full flex-1 flex flex-col justify-center items-center gap-9">
              <Link to="/browse" className={`${location.pathname === "/browse" && "text-text-primary scale-[1.10]"} transition duration-200 ease-in-out hover:scale-[1.10] hover:text-text-primary`}>
                <RiHome5Line className="w-[1.35rem] h-[1.35rem]" />
              </Link>
              <Link to="/browse/movies" className={`${location.pathname.includes("/movies") && "text-text-primary scale-[1.10]"} transition duration-200 ease-in-out hover:scale-[1.10] hover:text-text-primary`}>
                <RiVideoOnLine className="w-[1.35rem] h-[1.35rem]" />
              </Link>
              <Link to="/browse/tvshows" className={`${location.pathname.includes("/tvshows") && "text-text-primary scale-[1.10]"} transition duration-200 ease-in-out hover:scale-[1.10] hover:text-text-primary`}>
                <RiTvLine className="w-[1.35rem] h-[1.35rem]" />
              </Link>
              <Link to="/browse/popular" className={`${location.pathname.includes("/popular") && "text-text-primary scale-[1.10]"} transition duration-200 ease-in-out hover:scale-[1.10] hover:text-text-primary`}>
                <RiFireLine className="w-[1.35rem] h-[1.35rem]" />
              </Link>
              <Link to="/library" className={`${location.pathname.includes("/library") && "text-text-primary scale-[1.10]"} transition duration-200 ease-in-out hover:scale-[1.10] hover:text-text-primary`}>
                <RiBookShelfLine className="w-[1.35rem] h-[1.35rem]" />
              </Link>
              <Link to="/search" className={`${location.pathname.includes("/search") && "text-text-primary scale-[1.10]"} transition duration-200 ease-in-out hover:scale-[1.10] hover:text-text-primary`}>
                <RiSearchLine className="w-[1.35rem] h-[1.35rem]" />
              </Link>
              <Link to="/askai" className={`${location.pathname.includes("/askai") && "text-text-primary scale-[1.10]"} transition duration-200 ease-in-out hover:scale-[1.10] hover:text-text-primary`}>
                <RiShiningLine className="w-[1.35rem] h-[1.35rem]" />
              </Link>
              <Link to="/account" className={`${location.pathname.includes("/account") && "scale-[1.20]"} transition duration-200 ease-in-out hover:scale-[1.20]`}>
                <img
                  src={AvatarsMockData[AvatarNum].avatar}
                  alt="Avatar"
                  className="w-[1.65rem]"
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navbar */}
      {!isDesktopScreen && (
        <div className="w-full">
          <div className="absolute top-0 left-0 z-30 w-full flex justify-between items-center px-8 py-8">
            <Link to="/browse">
              <img src={logo1} alt="logo1" className="w-10" />
            </Link>
            <Layers
              onClick={() => setIsMenuOpen(true)}
              className="w-8 h-8 cursor-pointer"
            />
          </div>
          {/* Drawer */}
          <div
            className={`fixed inset-0 z-40 bg-bg-blackColor/50 overflow-y-auto no-scrollbar transition-opacity duration-300 ease-out ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          >
            <div
              className={`absolute right-0 top-0 min-h-[100dvh] w-[60%] min-w-[200px] bg-bg-coreColor px-8 py-10 transition-transform duration-300 ease-out  ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="flex flex-col gap-8">
                <RiEyeCloseLine
                  onClick={() => setIsMenuOpen(false)}
                  className="cursor-pointer transition-transform duration-200 hover:scale-90"
                />
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col gap-5 pb-8"
                >
                  <Link
                    to="/browse"
                    className="text-lg font-semibold transition-transform duration-200 hover:scale-95"
                  >
                    Browse
                  </Link>
                  <Link
                    to="/browse/movies"
                    className="text-lg font-semibold transition-transform duration-200 hover:scale-95"
                  >
                    Movies
                  </Link>
                  <Link
                    to="/browse/tvshows"
                    className="text-lg font-semibold transition-transform duration-200 hover:scale-95"
                  >
                    TV Shows
                  </Link>
                  <Link
                    to="/browse/popular"
                    className="text-lg font-semibold transition-transform duration-200 hover:scale-95"
                  >
                    Popular
                  </Link>
                  <Link
                    to="/library"
                    className="text-lg font-semibold transition-transform duration-200 hover:scale-95"
                  >
                    My Library
                  </Link>
                  <Link
                    to="/search"
                    className="text-lg font-semibold transition-transform duration-200 hover:scale-95"
                  >
                    Search
                  </Link>
                  <Link
                    to="/askai"
                    className="text-lg font-semibold transition-transform duration-200 hover:scale-95"
                  >
                    Ask AI
                  </Link>
                  <Link
                    to="/account"
                    className="text-lg font-semibold transition-transform duration-200 hover:scale-95"
                  >
                    Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
