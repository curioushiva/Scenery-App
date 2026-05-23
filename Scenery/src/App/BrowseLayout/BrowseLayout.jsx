import { Outlet } from "react-router-dom";
import Header from "../../Pages/Shared/Header/Header";
import Footer from "../../Pages/Shared/Footer/Footer";
import { useMediaQuery } from 'react-responsive';

const BrowseLayout = () => {
    /* Different layouts for different screen sizes */
    const isDesktopScreen = useMediaQuery({ query: '(min-width: 500px) and (min-height: 500px)', });
    return (
        <div className="min-h-screen text-textcolor-primary bg-bgcolor-fourth">
            <div className={isDesktopScreen ? `desktop-layout grid grid-cols-[88px_minmax(0,1fr)]` : `mobile-layout relative min-h-screen grid grid-cols-[auto_1fr_auto]`}>
                <Header />
                <div className={isDesktopScreen ? `min-w-0 flex flex-col min-h-screen` : ``}>
                    <main className={isDesktopScreen ? `flex-1` : `min-h-screen`}>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default BrowseLayout;