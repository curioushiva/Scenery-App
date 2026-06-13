import { Outlet } from "react-router-dom";
import { LandingHeader } from "@/Pages/Shared/Header/Header";
import { LandingFooter } from "@/Pages/Shared/Footer/Footer";

const LandingLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto] bg-gradient-to-b from-bg-topcolor to-bg-bottomcolor text-text-primary overflow-x-auto">
      <LandingHeader />
      <div className="w-full py-10 px-8 lg:px-35 overflow-x-hidden">
        <Outlet />
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
