import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LandingLayout from "@/Pages/Layouts/LandingLayout/LandingLayout";
import Landing from "@/Pages/Public/Landing/Landing";
import SystemLayout from "@/Pages/Layouts/SystemLayout/SystemLayout";
import About from "@/Pages/System/About/About";
import Privacy from "@/Pages/System/Privacy/Privacy";
import AuthLayout from "@/Pages/Layouts/AuthLayout/AuthLayout";
import Signup from "@/Pages/Public/Auth/Signup/Signup";
import Signin from "@/Pages/Public/Auth/Signin/Signin";
import CoreLayout from "@/Pages/Layouts/CoreLayout/CoreLayout";
import Account from "@/Pages/Core/User/Account/Account";
import Profile from "@/Pages/Core/User/Profile/Profile";
import Browse from "@/Pages/Core/Browse/Browse/Browse";
import Movies from "@/Pages/Core/Browse/Movies/Movies";
import TVShows from "@/Pages/Core/Browse/TVShows/TVShows";
import Popular from "@/Pages/Core/Browse/Popular/Popular";
import Library from "@/Pages/Core/Library/Library";
import Search from "@/Pages/Core/Search/Search";
import Askai from "@/Pages/Core/Askai/Askai";
import MovieInfo from "@/Pages/Core/Browse/MediaInfo/MovieInfo/MovieInfo";
import TVShowInfo from "@/Pages/Core/Browse/MediaInfo/TVShowInfo/TVShowInfo";
import useUser from "@/Utils/Hooks/useUser/useUser";

const Layout = () => {
    /* Calling to get : Signed-in User's data | Account details (email, name, avatar) | Fetch Saved Media | User's region */
    useUser();

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
                        { path: "about", element: <About /> },
                        { path: "privacy", element: <Privacy /> },
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
