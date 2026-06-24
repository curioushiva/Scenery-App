import React from "react";
import { RiArrowLeftLine, RiRestartLine } from "@remixicon/react";
import { useNavigate } from "react-router";
import NoFetchData from "@/Assets/Images/Placeholders/NoFetchData.gif"

/* Fetch error UI */
export const FetchError = ({ heading, tagline }) => {
    /* To navigate  */
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex justify-center items-center navPadding">
            <div className="max-w-xs text-center h-full flex flex-col justify-center items-center gap-6">
                <div className="flex flex-col items-center gap-4">
                    <img src={NoFetchData} alt="wentWrong" className="w-[80%] rounded-xl" />
                    <h1 className="text-2xl sm:text-3xl font-regular leading-normal bg-gradient-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
                        {heading ? heading : "Something went wrong"}
                    </h1>
                    <p className="text-sm font-regular text-text-secondary">
                        {tagline ? tagline : (<>The developer whispered<span className="text-text-primary">{" "}it works on my machine{" "}</span>and the machine lied. Please try again.</>)}
                    </p>
                </div>
                <div className="w-full flex flex-wrap justify-center gap-2">
                    <div
                        onClick={() => location.reload()}
                        className="w-full 295:w-fit text-text-primary/80 flex flex-row items-center justify-center gap-2 py-2 px-3 bg-cardColor-secondary border border-br-primary/60 rounded-md cursor-pointer transition duration-200 ease-in-out active:scale-95"
                    >
                        <RiRestartLine className="w-4 h-4" />
                        <h1 className="text-sm">Try Again</h1>
                    </div>
                    <div
                        onClick={() => navigate(-1)}
                        className="w-full 295:w-fit text-text-primary/80 flex flex-row items-center justify-center gap-2 py-2 px-3 bg-cardColor-secondary border border-br-primary/60 rounded-md cursor-pointer transition duration-200 ease-in-out active:scale-95"
                    >
                        <RiArrowLeftLine className="w-4 h-4" />
                        <h1 className="text-sm">Go Back</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
