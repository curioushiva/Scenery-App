import { Outlet } from "react-router-dom";
import { LandingHeader } from "@/Pages/Shared/Header/Header";
import { LandingFooter } from "@/Pages/Shared/Footer/Footer";

const LandingLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto] bg-gradient-to-b from-bg-topColor to-bg-bottomColor text-text-primary overflow-x-auto">
      <LandingHeader />
      <div className="w-full overflow-x-hidden p-8 lg:px-35">
        <Outlet />
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
