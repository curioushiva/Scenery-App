import { Link, useNavigate, useLocation } from "react-router"
import logo2 from '../../../Assets/Imgs/Logo/logo2.png'
import logo1 from '../../../Assets/Imgs/Logo/logo1.png'
import { useDispatch, useSelector } from "react-redux";
import { AvatarsMockData } from "../../../Utils/Mockdata/Mockdata";
import { RiArrowDropDownFill, RiPencilLine, RiUserLine, RiQuestionLine, RiHome5Line, RiVideoOnLine, RiTvLine, RiFireLine, RiCopyrightLine, RiEyeCloseLine, RiSearchLine, RiShiningLine } from "@remixicon/react";
import { Layers } from "react-bootstrap-icons"
import { useState, useEffect } from "react";
import { useAuth } from "../../../Hooks/useAuth/useAuth";
import Guest from "../../../Assets/Imgs/Avatars/Guest.png"
import useUser from "../../../Hooks/useUser/useUser";

const Header = () => {

  /* Dispatch, get path location & navigate */
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /* User's Info */
  const { usersProfileType, usersAvatarNum } = useSelector((store) => store.user.account)

  /* To open & close navbar is mobile */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* Logic for diff headers at diff pages */
  switch (true) {
    /* For Home, Signin and signup */
    case location.pathname === '/':
    case location.pathname === '/signin':
    case location.pathname === '/signup':
      return (
        <div className={`${location.pathname === '/' ? "w-full flex justify-between bg-[#431518] py-8 px-8 lg:px-35" : "w-full bg-[#431518] border-b-1 border-brcolor-primary py-5 px-8 lg:px-35"}`}>
          <img src={logo1} alt="logo1" className="w-10 sm:w-12" />
          {location.pathname === "/" &&
            <Link to="/signin">
              <button className="px-3 py-1 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium cursor-pointer hover:bg-white/15 transition-all duration-200">
                Sign In
              </button>
            </Link>
          }
        </div>
      )
      break;

    case location.pathname.startsWith('/browse'):
    case location.pathname.startsWith('/account'):
    case location.pathname.startsWith('/movie'):
    case location.pathname.startsWith('/tvshow'):
      return (
        <>
          {/* Desktop Sidebar */}
          <div className="desktop-layout w-[88px] h-[100dvh] sticky top-0 z-[100]">
            <div className="w-full h-full flex flex-col items-center gap-5 bg-bgcolor-fourth p-6">
              <Link to="/browse"><img src={logo1} alt="logo1" className="w-10" /></Link>
              <div className="w-full flex-1 flex flex-col justify-center items-center gap-10">
                <Link to="/browse"><RiHome5Line className="w-[1.45rem] h-[1.45rem] text-textcolor-secondary" /></Link>
                <Link to="/browse/movies"><RiVideoOnLine className="w-[1.45rem] h-[1.45rem] text-textcolor-secondary" /></Link>
                <Link to="/browse/tvshows"><RiTvLine className="w-[1.45rem] h-[1.45rem] text-textcolor-secondary" /></Link>
                <Link to="/browse/popular"><RiFireLine className="w-[1.45rem] h-[1.45rem] text-textcolor-secondary" /></Link>
                <Link to="/search"><RiSearchLine className="w-[1.45rem] h-[1.45rem] text-textcolor-secondary" /></Link>
                <Link to="/askai"><RiShiningLine className="w-[1.45rem] h-[1.45rem] text-textcolor-secondary" /></Link>
                {/* {usersProfileType === "guest" ? <Link to="/account"><img src={Guest} alt="avatar" className="w-9" /></Link> : <Link to="/account"><img src={AvatarsMockData[usersAvatarNum].avatar} alt="avatar" className="w-[1.40rem]" /></Link>} */}
              </div>
            </div>
          </div >

          {/* Mobile Navbar */}
          < div className="mobile-layout w-full" >
            <div className="absolute top-0 left-0 z-30 w-full flex justify-between items-center px-8 py-8">
              <Link to="/browse"><img src={logo1} alt="logo1" className="w-10" /></Link>
              <Layers onClick={() => setIsMenuOpen(true)} className="w-8 h-8 cursor-pointer" />
            </div>
            {/* Drawer */}
            <div className={`fixed inset-0 z-40 bg-black/50 overflow-y-auto no-scrollbar transition-opacity duration-300 ease-out ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
              <div className={`absolute right-0 top-0 min-h-[100dvh] w-[60%] min-w-[200px] bg-bgcolor-fourth px-8 py-10 transition-transform duration-300 ease-out  ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col gap-8">
                  <RiEyeCloseLine onClick={() => setIsMenuOpen(false)} className="cursor-pointer transition-transform duration-200 hover:scale-90" />
                  <div onClick={() => setIsMenuOpen(false)} className="flex flex-col gap-5 pb-8">
                    <Link to="/browse" className="text-lg font-semibold transition-transform duration-200 hover:scale-95">Browse</Link>
                    <Link to="/browse/movies" className="text-lg font-semibold transition-transform duration-200 hover:scale-95">Movies</Link>
                    <Link to="/browse/tvshows" className="text-lg font-semibold transition-transform duration-200 hover:scale-95">TV Shows</Link>
                    <Link to="/browse/popular" className="text-lg font-semibold transition-transform duration-200 hover:scale-95">Popular</Link>
                    <Link to="/search" className="text-lg font-semibold transition-transform duration-200 hover:scale-95">Search</Link>
                    <Link to="/askai" className="text-lg font-semibold transition-transform duration-200 hover:scale-95">Ask AI</Link>
                    <Link to="/account" className="text-lg font-semibold transition-transform duration-200 hover:scale-95">Account</Link>
                  </div>
                </div>
              </div>
            </div>

          </div >
        </>
      );
  }
}

export default Header;