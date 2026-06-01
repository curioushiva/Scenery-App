import React, { useState } from 'react'
import { RiArrowUpWideLine, RiArrowDownWideLine } from "@remixicon/react";
import { AboutObsidianMockData } from '@/Utils/Mockdata/Mockdata';

const Privacy = () => {
  /* Select question type obsidian */
  const [aboutQueType, setAboutQueType] = useState(null);

  return (
    <div className="w-full bg-gradient-to-b from-[#431518] to-black p-8 pt-13 lg:px-35">
      <div className="flex flex-col gap-12">

        {/* Overview */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-medium lg:text-4xl ">Privacy Policy</h1>
          <span className="text-sm text-textcolor-secondary">Last updated: 2026</span>
          <p className="text-base text-textcolor-secondary leading-relaxed lg:text-lg">
            Your privacy matters. Scenery only collects the information
            necessary to provide account-related features and improve your
            experience.
          </p>
        </div>
        
        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Information we store */}
          <div className="bg-white/1 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-xl font-medium">Information We Store</h2>
            <p className="text-textcolor-secondary"> Scenery stores only the information required to support your account and personalize your experience.</p>
            <ul className="flex flex-col gap-2 text-sm lg:text-base">
              <li>• Email address</li>
              <li>• Profile name</li>
              <li>• Selected avatar</li>
              <li>• Watch Later collections</li>
              <li>• Favorites</li>
              <li>• Basic profile preferences</li>
            </ul>
          </div>

          {/* How we use it */}
          <div className="bg-white/1 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-xl font-medium">How We Use It</h2>
            <ul className="flex flex-col gap-2 text-sm lg:text-base">
              <li>• Authenticate your account</li>
              <li>• Save profile preferences</li>
              <li>• Sync favorites across devices</li>
              <li>• Personalize your experience</li>
            </ul>
            <p className="text-textcolor-secondary">Scenery does not sell, rent, or share your personalinformation with advertisers.</p>
          </div>

          {/* Third Party */}
          <div className="bg-white/1 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-xl font-medium">Third-Party Services</h2>
            <p className="text-textcolor-secondary leading-relaxed">
              Scenery uses Firebase for authentication and account storage,
              and TMDB for movie and TV show information, images, ratings,
              and metadata.
            </p>
          </div>

          {/* Local Storage */}
          <div className="bg-white/1 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-xl font-medium">Local Storage</h2>
            <p className="text-textcolor-secondary leading-relaxed">
              To improve performance and reduce loading times, some
              application data may be stored locally on your device.
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white/1 border border-white/10 rounded-2xl p-8 flex flex-col gap-4">
          <h2 className="text-xl font-medium">Questions?</h2>
          <p className="text-textcolor-secondary">
            If you have questions about your account data or this privacy
            policy, you can contact the developer through the links
            available within Scenery.
          </p>
        </div>

        {/* Ending Note */}
        <div className="text-sm text-textcolor-secondary italic">
          By using Scenery, you agree to this Privacy Policy.
        </div>
      </div>
    </div>

  )
}

export default Privacy