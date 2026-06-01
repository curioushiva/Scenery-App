import { Link, useLocation } from "react-router";
import { LandingFooterData, SystemFooterData, CoreFooterData, DevSocials } from "@/Utils/Mockdata/Mockdata";
import { useState } from "react";

/* Landing Footer */
export const LandingFooter = () => {
  return (
    <div className="w-full flex flex-col gap-10 bg-[#000000] py-20 px-8 lg:px-35">
      {/* Tagline */}
      <div className="font-regular text-base text-textcolor-secondary lg:text-lg">
        <h1>Curious ? <span className="underline decoration-solid">Get to know Scenery</span></h1>
      </div>
      {/* About */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
        {LandingFooterData?.map((val) => {
          return (<Link key={val.element} className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid" to={val.URL} target={val.URL.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">{val.element}</Link>)
        })}
      </div>
      {/* Dev socials */}
      <div className="max-w-3xs flex gap-3 justify-between items-center pt-5">
        {DevSocials.map((social) => {
          const ICON = social.ICON;
          return (<Link key={social.socialType} to={social.URL} target="_blank"><ICON className="h-7 w-7 350:w-8 350:h-8" /></Link>);
        })}
      </div>
      {/* Branding */}
      <div className="font-regular text-sm text-textcolor-secondary">
        <h1>© 2026 Scenery — Crafted by Curioushiva</h1>
      </div>
    </div>
  )
}

/* System Footer */
export const SystemFooter = () => {
  /* To get path's location */
  const location = useLocation();
  return (
    <div className="w-full flex flex-col gap-10 bg-[#000000] py-12 px-8 lg:px-35">
      {/* Tagline */}
      <div className="font-regular text-base text-textcolor-secondary lg:text-lg">
        <h1>Curious ? <span className="underline decoration-solid">Get to know Scenery</span></h1>
      </div>
      {/* About */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
        {SystemFooterData.filter(val => val.element !== (location.pathname === "/about" ? "About" : location.pathname === "/privacy" ? "Privacy" : ""))
          .map((val) => {
            return (<Link key={val.element} className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid" to={val.URL} target={val.URL.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">{val.element}</Link>)
          })}
      </div>
      {/* Dev socials */}
      <div className="max-w-3xs flex gap-3 justify-between items-center pt-5">
        {DevSocials.map((social) => {
          const ICON = social.ICON;
          return (<Link key={social.socialType} to={social.URL} target="_blank"><ICON className="h-7 w-7 350:w-8 350:h-8" /></Link>);
        })}
      </div>
      {/* Branding */}
      <div className="font-regular text-sm text-textcolor-secondary">
        <h1>© 2026 Scenery — Crafted by Curioushiva</h1>
      </div>
    </div>
  )
}

/* Auth Footer */
export const AuthFooter = () => {
  return (
    <div className="w-full flex flex-col gap-10  bg-bgcolor-ternary border-t-1 border-brcolor-primary py-10 px-8 lg:px-35">
      {/* Tagline */}
      <div className="font-regular text-base text-textcolor-secondary lg:text-lg">
        <h1>Curious ? <span className="underline decoration-solid">Get to know Scenery</span></h1>
      </div>
      {/* About */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
        {LandingFooterData.slice(0, 4).map((val) => {
          return (<Link key={val.element} className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid" to={val.URL} target={val.URL.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">{val.element}</Link>)
        })}
      </div>
      {/* Dev socials */}
      <div className="max-w-3xs flex gap-3 justify-between items-center pt-5">
        {DevSocials.map((social) => {
          const ICON = social.ICON;
          return (<Link key={social.socialType} to={social.URL} target="_blank"><ICON className="h-7 w-7 350:w-8 350:h-8" /></Link>);
        })}
      </div>
      {/* Branding */}
      <div className="font-regular text-sm text-textcolor-secondary">
        <h1>© 2026 Scenery — Crafted by Curioushiva</h1>
      </div>
    </div>
  )
}

/* Core Footer */
export const CoreFooter = () => {
  return (
    <div className="w-full flex flex-col gap-10 bg-bgcolor-fourth p-8 pt-13">
      {/* About */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mx-auto">
        {CoreFooterData.map((val) => {
          return (<Link key={val.element} className="font-regular text-sm text-textcolor-secondary lg:text-base underline decoration-solid" to={val.URL} target={val.URL.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">{val.element}</Link>)
        })}
      </div>
      {/* Dev socials */}
      <div className="max-w-3xs flex gap-3 justify-between items-center pt-5">
        {DevSocials.map((social) => {
          const ICON = social.ICON;
          return (<Link key={social.socialType} to={social.URL} target="_blank"><ICON className="h-7 w-7 350:w-8 350:h-8" /></Link>);
        })}
      </div>
      {/* Credit */}
      <div className="font-regular text-sm text-textcolor-secondary">
        <h1>© 2026 Scenery — Curioushiva</h1>
      </div>
    </div>
  )
}