import { Outlet } from "react-router-dom";
import Header from "../../Pages/Shared/Header/Header";
import Footer from "../../Pages/Shared/Footer/Footer";
import { useMediaQuery } from 'react-responsive';

const BrowseLayout = () => {
    /* Different layouts for different screen sizes */
    const isDesktopScreen = useMediaQuery({ query: '(min-width: 500px) and (min-height: 500px)', });
    return (
        <div className={isDesktopScreen ? "grid grid-cols-[88px_minmax(0,1fr)] min-h-screen" : "relative w-full min-h-screen grid grid-rows-[auto_1fr_auto]"}>
            <Header />
            <div className={isDesktopScreen ? "min-w-0 flex flex-col min-h-screen" : "contents"}>
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default BrowseLayout;