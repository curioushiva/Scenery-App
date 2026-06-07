import { Outlet } from "react-router-dom";
import { AuthHeader } from "@/Pages/Shared/Header/Header";
import { AuthFooter } from "@/Pages/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto]">
      <AuthHeader />
      <Outlet />
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
