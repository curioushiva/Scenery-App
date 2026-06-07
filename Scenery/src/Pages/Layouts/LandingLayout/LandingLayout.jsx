import { Outlet } from "react-router-dom";
import { LandingHeader } from "@/Pages/Shared/Header/Header";
import { LandingFooter } from "@/Pages/Shared/Footer/Footer";

const LandingLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto]">
      <LandingHeader />
      <Outlet />
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
