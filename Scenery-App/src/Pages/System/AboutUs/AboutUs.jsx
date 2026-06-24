import React, { useState } from "react";
import { RiArrowUpWideLine, RiArrowDownWideLine } from "@remixicon/react";
import { AboutObsidianMockData } from "@/Utils/Mockdata/Mockdata";

const About = () => {
  /* Select question type obsidian */
  const [aboutQueType, setAboutQueType] = useState(null);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Overview */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-medium lg:text-4xl">About Scenery</h1>
        <p className="text-base font-regular leading-relaxed text-text-secondary lg:text-lg">
          Scenery is a modern, Netflix-inspired movie and TV show discovery
          platform built for people who love exploring stories. From finding
          your next favorite series to checking cast details, reviews,
          trailers, and streaming availability, Scenery brings entertainment
          information together in one clean experience. With watchlists,
          favorites, and AI-assisted recommendations, discovering content
          becomes simple and enjoyable.
        </p>
      </div>

      {/* Obsidian */}
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-medium lg:text-xl">
          Frequently Asked Questions :
        </h1>
        <div className="flex flex-col gap-4">
          {AboutObsidianMockData.map((about, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <div
                  onClick={() =>
                    setAboutQueType((prev) =>
                      prev === about.questionID ? null : about.questionID,
                    )
                  }
                  className="w-full flex justify-between items-center gap-5 py-6 px-5 bg-cardColor-primary"
                >
                  <h1 className="text-base font-medium lg:text-lg">
                    {about.question}
                  </h1>
                  {aboutQueType === about.questionID ? (
                    <RiArrowUpWideLine />
                  ) : (
                    <RiArrowDownWideLine />
                  )}
                </div>
                {aboutQueType === about.questionID && (
                  <div className="bg-cardColor-primary py-5 px-5">
                    <h1 className="text-base font-regular lg:text-lg">
                      {about.answer}
                    </h1>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Conclusion */}
      <div className="flex flex-col gap-10">
        <p className="text-base font-regular leading-relaxed text-text-secondary lg:text-lg">
          Scenery continues to grow with new features and improvements.
          Whether you're discovering something new or keeping track of what
          you love, Scenery is built to make entertainment exploration
          enjoyable.
        </p>
        <span className="text-sm font-regular text-text-secondary italic">
          Thank you for visiting Scenery and being part of the journey.
        </span>
      </div>
    </div>
  );
};

export default About;
