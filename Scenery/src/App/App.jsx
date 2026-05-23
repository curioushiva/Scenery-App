import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import DefaultLayout from "./DefaultLayout/DefaultLayout";
import Home from '../Pages/Home/Home'
import Signup from "../Pages/Auth/Signup/Signup";
import Signin from "../Pages/Auth/Signin/Signin";
import BrowseLayout from "./BrowseLayout/BrowseLayout";
import Account from "../Pages/User/Account";
import Profile from "../Pages/User/Profile/Profile";
import Browse from "../Pages/Browse/Browse";
import Movies from "../Pages/Browse/Movies/Movies";
import TVShows from "../Pages/Browse/TVShows/TVShows"
import Popular from "../Pages/Browse/Popular/Popular";
import MovieInfo from "../Pages/Browse/MediaInfo/MovieInfo";
import TVShowInfo from "../Pages/Browse/MediaInfo/TVShowInfo";
import useUser from "../Hooks/useUser/useUser";
import useContent from "../Hooks/useContent/useContent";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
    /* Calling to get : Signed-in User's data | Account details (email, name, avatar) | Fetch Saved Media | User's region */
    useUser();

    /* Main layout for the app */
    return (
        <div className="w-full h-screen min-h-screen text-textcolor-primary overflow-x-hidden overflow-y-auto no-scrollbar">
            <Outlet />
        </div>
    )
};

const App = () => {

    /* App routers */
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    element: <DefaultLayout />,
                    children: [
                        { path: "", element: <Home /> },
                        { path: "signup", element: <Signup /> },
                        { path: "signin", element: <Signin /> },
                    ],
                },
                {
                    element: <BrowseLayout />,
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

                        {
                            path: "account",
                            element: <Account />
                        },

                        {
                            path: "movie/:mediaID",
                            element: <MovieInfo />,
                        },

                        {
                            path: "tvshow/:mediaID",
                            element: <TVShowInfo />,
                        },

                    ],
                },
                {
                    path: "account/profile",
                    element: <Profile />
                },
            ],
        },
    ]);
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default App;