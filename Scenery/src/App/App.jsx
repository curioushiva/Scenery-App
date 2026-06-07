import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import useAppInit from "@/Utils/Hooks/useAppInit/useAppInit";
import LandingLayout from "@/Pages/Layouts/LandingLayout/LandingLayout";
import Landing from "@/Pages/Public/Landing/Landing";
import SystemLayout from "@/Pages/Layouts/SystemLayout/SystemLayout";
import AboutUs from "@/Pages/System/AboutUs/AboutUs";
import Privacy from "@/Pages/System/Privacy/Privacy";
import WhatsNew from "@/Pages/System/WhatsNew/WhatsNew";
import AuthLayout from "@/Pages/Layouts/AuthLayout/AuthLayout";
import Signup from "@/Pages/Public/Auth/Signup/Signup";
import Signin from "@/Pages/Public/Auth/Signin/Signin";
import CoreLayout from "@/Pages/Layouts/CoreLayout/CoreLayout";
import Account from "@/Pages/Core/Account/Account/Account";
import Profile from "@/Pages/Core/Account/Profile/Profile/Profile";
import UpdateName from "@/Pages/Core/Account/Profile/Security/UpdateName/UpdateName";
import UpdateEmail from "@/Pages/Core/Account/Profile/Security/UpdateEmail/UpdateEmail";
import ResetPassword from "@/Pages/Core/Account/Profile/Security/ResetPassword/ResetPassword";
import DeleteAccount from "@/Pages/Core/Account/Profile/Security/DeleteAccount/DeleteAccount";
import Browse from "@/Pages/Core/Browse/Browse/Browse";
import Movies from "@/Pages/Core/Browse/Movies/Movies";
import TVShows from "@/Pages/Core/Browse/TVShows/TVShows";
import Popular from "@/Pages/Core/Browse/Popular/Popular";
import Library from "@/Pages/Core/Library/Library";
import Search from "@/Pages/Core/Search/Search";
import Askai from "@/Pages/Core/Askai/Askai";
import MovieInfo from "@/Pages/Core/Browse/MediaInfo/MovieInfo/MovieInfo";
import TVShowInfo from "@/Pages/Core/Browse/MediaInfo/TVShowInfo/TVShowInfo";

const Layout = () => {

    /* To initialize user's data using scenery */
    useAppInit();

    /* Main layout for the app */
    return (
        <div className="text-textcolor-primary bg-bgcolor-fourth">
            <Outlet />
        </div>
    );
};

const App = () => {
    /* App routers */
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [

                /* Landing Layout */
                {
                    element: <LandingLayout />,
                    children: [
                        { path: "", element: <Landing /> },
                    ],
                },

                /* System Layout */
                {
                    element: <SystemLayout />,
                    children: [
                        { path: "aboutus", element: <AboutUs /> },
                        { path: "privacy", element: <Privacy /> },
                        { path: "whatsnew", element: <WhatsNew /> },
                    ]
                },

                /* Auth Layout */
                {
                    element: <AuthLayout />,
                    children: [
                        { path: "/signin", element: <Signin /> },
                        { path: "/signup", element: <Signup /> },
                    ]
                },

                /* Core Layout */
                {
                    element: <CoreLayout />,
                    children: [
                        {
                            path: "browse",
                            children: [
                                { index: true, element: <Browse /> },
                                { path: "movies", element: <Movies /> },
                                { path: "tvshows", element: <TVShows /> },
                                { path: "popular", element: <Popular /> },
                            ],
                        },

                        { path: "library", element: <Library /> },

                        { path: "search", element: <Search /> },

                        { path: "askai", element: <Askai /> },

                        { path: "account", element: <Account /> },

                        { path: "account/name", element: <UpdateName /> },

                        { path: "account/email", element: <UpdateEmail /> },

                        { path: "account/password", element: <ResetPassword /> },

                        { path: "account/delete", element: <DeleteAccount /> },

                        { path: "movie/:mediaID", element: <MovieInfo /> },

                        { path: "tvshow/:mediaID", element: <TVShowInfo /> },
                    ],
                },

                /* Choose Profile */
                {
                    path: "account/profile",
                    element: <Profile />
                },
            ],
        },
    ]);
    return <RouterProvider router={appRouter} />;
};

export default App;
