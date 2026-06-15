import { Outlet } from "react-router-dom";
import { CoreHeader } from "@/Pages/Shared/Header/Header";
import { CoreFooter } from "@/Pages/Shared/Footer/Footer";
import { useMediaQuery } from "react-responsive";

const CoreLayout = () => {
  /* Different layouts for different screen sizes */
  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 500px) and (min-height: 650px)",
  });

  return (
    <div
      className={
        isDesktopScreen
          ? "grid grid-cols-[88px_minmax(0,1fr)] min-h-screen text-text-primary bg-bg-coreColor"
          : "relative w-full min-h-screen grid grid-rows-[auto_1fr_auto] text-text-primary bg-bg-coreColor overflow-x-auto"
      }
    >
      <CoreHeader />
      <div
        className={
          isDesktopScreen ? "min-w-0 flex flex-col min-h-screen" : "contents"
        }
      >
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
        <CoreFooter />
      </div>
    </div>
  );
};

export default CoreLayout;
