import { Outlet } from "react-router-dom";
import { SystemHeader } from "@/Pages/Shared/Header/Header";
import { SystemFooter } from "@/Pages/Shared/Footer/Footer";

const SystemLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto] bg-gradient-to-b from-bg-topColor to-bg-bottomColor text-text-primary overflow-x-auto">
      <SystemHeader />
      <div className="w-full p-8 pb-20 lg:px-35">
        <Outlet />
      </div>
      <SystemFooter />
    </div>
  );
};

export default SystemLayout;
