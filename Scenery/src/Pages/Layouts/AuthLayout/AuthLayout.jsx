import { Outlet } from "react-router-dom";
import { AuthHeader } from "@/Pages/Shared/Header/Header";
import { AuthFooter } from "@/Pages/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto] bg-gradient-to-b from-bg-topColor to-bg-bottomColor text-text-primary">
      <AuthHeader />
      <div className="w-full p-8 pb-20 lg:px-35">
        <Outlet />
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
