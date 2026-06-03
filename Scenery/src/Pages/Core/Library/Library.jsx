import { useSelector } from "react-redux";

const Library = () => {
    
    /* To select usersName */
    const { usersName } = useSelector((store) => store.user.account);

    return (
        <div className="w-full p-8 mobileNavPad">
            <div className="w-full flex flex-col gap-10">
                {/* Intro */}
                <div className="flex">
                    <h1 className='text-3xl lg:text-4xl font-bold leading-[0.7]'>My Library</h1>
                </div>

                {/* Welcome msg */}
                <div className="flex">
                    <h1 className='text-sm lg:text-base font-regular'>Hey, <span className="italic font-medium text-textcolor-secondary">{usersName}</span>. Welome back to your Library</h1>
                </div>

                {/*  */}
                <div className="flex flex-col gap-10 pt-5">

                </div>
            </div>
        </div >
    )
}

export default Library;