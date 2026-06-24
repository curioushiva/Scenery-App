import { Link, useLocation } from "react-router";
import {
  LandingFooterData,
  SystemFooterData,
  CoreFooterData,
  DevSocials,
} from "@/Utils/Mockdata/Mockdata";

/* Landing Footer */
export const LandingFooter = () => {
  return (
    <div className="w-full flex flex-col gap-8 text-text-secondary p-8 lg:px-35">
      {/* Tagline */}
      <h1 className="font-regular text-base lg:text-lg transition duration-200 ease-in-out hover:underline hover:text-text-primary">
        Curious ? Get to know Scenery
      </h1>
      {/* Elements */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
        {LandingFooterData?.map((val) => {
          return (
            <Link
              key={val.element}
              className="font-normal text-sm lg:text-base transition duration-200 ease-in-out hover:underline hover:text-text-primary"
              to={val.URL}
              target={val.URL.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {val.element}
            </Link>
          );
        })}
      </div>
      {/* Dev socials */}
      <div className="max-w-3xs flex gap-3 justify-between items-center pt-5">
        {DevSocials.map((social) => {
          const ICON = social.ICON;
          return (
            <Link key={social.socialType} to={social.URL} target="_blank">
              <ICON className="h-7 w-7 350:w-8 350:h-8 transition duration-200 ease-in-out hover:scale-[1.1] hover:text-text-primary" />
            </Link>
          );
        })}
      </div>
      {/* Branding */}
      <div className="font-regular text-sm">
        <h1>© 2026 Scenery — Crafted by Curioushiva</h1>
      </div>
    </div>
  );
};

/* System Footer */
export const SystemFooter = () => {
  return (
    <div className="w-full flex flex-col gap-8 text-text-secondary p-8 lg:px-35">
      {/* Tagline */}
      <h1 className="font-regular text-base lg:text-lg transition duration-200 ease-in-out hover:underline hover:text-text-primary">
        Curious ? Get to know Scenery
      </h1>
      {/* Elements */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
        {SystemFooterData.map((val) => {
          return (
            <Link
              key={val.element}
              className="font-normal text-sm lg:text-base transition duration-200 ease-in-out hover:underline hover:text-text-primary"
              to={val.URL}
              target={val.URL.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {val.element}
            </Link>
          );
        })}
      </div>
      {/* Dev socials */}
      <div className="max-w-3xs flex gap-3 justify-between items-center pt-5">
        {DevSocials.map((social) => {
          const ICON = social.ICON;
          return (
            <Link key={social.socialType} to={social.URL} target="_blank">
              <ICON className="h-7 w-7 350:w-8 350:h-8 transition duration-200 ease-in-out hover:scale-[1.1] hover:text-text-primary" />
            </Link>
          );
        })}
      </div>
      {/* Branding */}
      <div className="font-regular text-sm">
        <h1>© 2026 Scenery — Crafted by Curioushiva</h1>
      </div>
    </div>
  );
};

/* Auth Footer */
export const AuthFooter = () => {
  return (
    <div className="w-full flex flex-col gap-8 text-text-secondary p-8 lg:px-35">
      {/* Tagline */}
      <h1 className="font-regular text-base lg:text-lg transition duration-200 ease-in-out hover:underline hover:text-text-primary">
        Curious ? Get to know Scenery
      </h1>
      {/* Elements */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
        {LandingFooterData.slice(0, 4).map((val) => {
          return (
            <Link
              key={val.element}
              className="font-normal text-sm lg:text-base transition duration-200 ease-in-out hover:underline hover:text-text-primary"
              to={val.URL}
              target={val.URL.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {val.element}
            </Link>
          );
        })}
      </div>
      {/* Dev socials */}
      <div className="max-w-3xs flex gap-3 justify-between items-center pt-5">
        {DevSocials.map((social) => {
          const ICON = social.ICON;
          return (
            <Link key={social.socialType} to={social.URL} target="_blank">
              <ICON className="h-7 w-7 350:w-8 350:h-8 transition duration-200 ease-in-out hover:scale-[1.1] hover:text-text-primary" />
            </Link>
          );
        })}
      </div>
      {/* Branding */}
      <div className="font-regular text-sm">
        <h1>© 2026 Scenery — Crafted by Curioushiva</h1>
      </div>
    </div>
  );
};

/* Core Footer */
export const CoreFooter = () => {
  return (
    <div className="w-full flex flex-col gap-10 text-text-secondary p-8">
      {/* About */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
        {CoreFooterData.map((val) => {
          return (
            <Link
              key={val.element}
              className="font-normal text-sm lg:text-base transition duration-200 ease-in-out hover:underline hover:text-text-primary"
              to={val.URL}
              target={val.URL.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {val.element}
            </Link>
          );
        })}
      </div>
      {/* Dev socials */}
      <div className="max-w-3xs flex gap-3 justify-between items-center pt-5">
        {DevSocials.map((social) => {
          const ICON = social.ICON;
          return (
            <Link key={social.socialType} to={social.URL} target="_blank">
              <ICON className="h-7 w-7 350:w-8 350:h-8 transition duration-200 ease-in-out hover:scale-[1.1] hover:text-text-primary" />
            </Link>
          );
        })}
      </div>
      {/* Credit */}
      <div className="font-regular text-sm">
        <h1>© 2026 Scenery — Curioushiva</h1>
      </div>
    </div>
  );
};
