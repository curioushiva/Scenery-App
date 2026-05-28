import { Link, useLocation } from "react-router"
import { DevSocials } from "../../../Utils/Mockdata/Mockdata"
import { store } from "../../../Redux/Store/Store";
import { RiGithubFill, RiInstagramFill, RiLinkedinBoxFill, RiLinkedinFill, RiTwitchFill, RiTwitterXFill, RiInstagramLine, RiDrinksLine } from "@remixicon/react";

const Footer = () => {
  /* To get path location */
  const location = useLocation();

  /* Logic for diff footers at diff pages */
  switch (true) {
    /* For Home, signup & signin */
    case location.pathname === '/':
    case location.pathname === '/signup':
    case location.pathname === '/signin':
      return (
        <div className={`${location.pathname === '/' ? "w-full flex flex-col gap-10 bg-[#000000] py-20 px-8 lg:px-35" : "w-full flex flex-col gap-10  bg-bgcolor-ternary border-t-1 border-brcolor-primary py-10 px-8 lg:px-35"}`}>
          {/* About Dev */}
          <div className="font-regular text-base text-textcolor-secondary lg:text-lg">
            <h1>Curious ? <span className="underline decoration-solid">Know About Developer</span></h1>
          </div>
          {/* Dev Socials */}
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
            {DevSocials.map((val, idx) => {
              const SocialName = val.SocialName;
              const SocialUrl = val.SocialUrl;
              return (
                <Link key={idx} className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid" to={SocialUrl} target="_blank">
                  {SocialName}
                </Link>
              )
            })}
          </div>
          {/* Credit */}
          <div className="font-regular text-sm text-textcolor-secondary lg:text-base">
            <h1>© 2026 Scenery</h1>
          </div>
        </div>
      )
      break;

    /* For Browse & options and Media - (movies and tvshows) */
    case location.pathname.startsWith('/browse'):
    case location.pathname.startsWith('/library'):
    case location.pathname.startsWith('/search'):
    case location.pathname.startsWith('/askai'):
    case location.pathname.startsWith('/account'):
    case location.pathname.startsWith('/movie'):
    case location.pathname.startsWith('/tvshow'):
      return (
        <>
          <div className="w-full flex flex-col gap-10 bg-bgcolor-fourth p-8 pt-13">
            {/* About Dev */}
            <div className="max-w-3xs flex gap-2 justify-between items-center">
              <Link to="https://www.linkedin.com/in/curioushiva/" target="_blank"><RiLinkedinBoxFill className="h-7 w-7 xs:w-8 xs:h-8" /></Link>
              <Link to="https://github.com/curioushiva/" target="_blank"><RiGithubFill className="h-7 w-7 xs:w-8 xs:h-8" /> </Link>
              <Link to="https://www.instagram.com/curioushiva/" target="_blank"><RiInstagramFill className="h-7 w-7 xs:w-8 xs:h-8" /></Link>
              <Link to="https://x.com/curioushiva" target="_blank"><RiTwitterXFill className="h-7 w-7 xs:w-8 xs:h-8" /></Link>
              <Link to="https://buymeacoffee.com/curioushiva" target="_blank"><RiDrinksLine className="h-7 w-7 xs:w-8 xs:h-8" /></Link>
            </div>
            {/* Dev Socials */}
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
              <h1 className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid cursor-pointer">Manage Profile</h1>
              <h1 className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid cursor-pointer">Account</h1>
              <Link to="https://curioushiva.in/" className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid" target="_blank">Website</Link>
              <Link to="https://github.com/curioushiva/Scenery" className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid" target="_blank">Scenery Github</Link>
              <Link to="https://restro.curioushiva.in/" className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid" target="_blank">Restro</Link>
            </div>
            {/* Credit */}
            <div className="font-regular text-sm text-textcolor-secondary">
              <h1>© 2026 Scenery</h1>
            </div>
          </div>
        </>
      )
      break;
  }
}

export default Footer