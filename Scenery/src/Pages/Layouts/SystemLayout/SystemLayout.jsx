import { Outlet } from "react-router-dom";
import { SystemHeader } from "@/Pages/Shared/Header/Header";
import { SystemFooter } from "@/Pages/Shared/Footer/Footer";

const SystemLayout = () => {
    return (
        <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto]">
            <SystemHeader />
            <Outlet />
            <SystemFooter />
        </div>
    );
}

export default SystemLayout