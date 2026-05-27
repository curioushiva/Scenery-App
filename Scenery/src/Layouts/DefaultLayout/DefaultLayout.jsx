import { Outlet } from "react-router-dom";
import Header from "../../Pages/Shared/Header/Header";
import Footer from "../../Pages/Shared/Footer/Footer";

const DefaultLayout = () => {
    return (
        <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default DefaultLayout;