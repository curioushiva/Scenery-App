import { useState } from "react"
import { RiArrowUpWideLine, RiArrowDownWideLine } from "@remixicon/react";
import { WhatsNewMockData } from "@/Utils/Mockdata/Mockdata";

const WhatsNew = () => {
    /* Select question type obsidian */
    const [aboutQueType, setAboutQueType] = useState(null);
    return (
        <div className="w-full bg-gradient-to-b from-[#431518] to-[#000000] p-8 pt-13 lg:px-35">
            <div className='w-full flex flex-col gap-10'>
                {/* Overview */}
                <div className='flex flex-col gap-4'>
                    <h1 className='text-3xl font-medium lg:text-4xl'>What's New</h1>
                    <p className='text-base font-regular leading-relaxed text-textcolor-secondary lg:text-lg'>
                        Welcome to What's New, where you'll discover the latest features, improvements, and updates added to Scenery,
                        keeping your entertainment experience evolving.
                    </p>
                </div>

                {/* Whats New Obsidian */}
                <div className='flex flex-col gap-4'>
                    {WhatsNewMockData.map((update) => {
                        return (
                            <div className='flex flex-col gap-1'>
                                <div onClick={() => setAboutQueType(prev => prev === update.id ? null : update.id)} className={`w-full flex justify-between items-center gap-5 py-2 px-5 border border-white/10 rounded-2xl cursor-pointer transition-all ease-in duration-100 ${aboutQueType === update.id ? "bg-bgcolor-ternary/80" : "bg-white/1"}`}>
                                    <div className="flex flex-col gap-1 350:flex-row 350:justify-center 350:items-center">
                                        <h1 className='text-sm font-medium lg:text-base text-nowrap'>{update.version}</h1>
                                        <span className="hidden 350:block">—</span>
                                        <h2 className='text-xs font-regular lg:text-sm text-nowrap italic'>({update.time})</h2>
                                    </div>
                                    {aboutQueType === update.id ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
                                </div>
                                {aboutQueType === update.id &&
                                    <div className='py-5 px-5'>
                                        <h1 className='text-sm text-textcolor-secondary font-regular lg:text-base'>{update.updation}</h1>
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default WhatsNew