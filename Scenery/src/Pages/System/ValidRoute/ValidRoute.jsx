import React from 'react'
import { RiArrowLeftLine, RiHome5Line } from '@remixicon/react'
import { useRouteError } from 'react-router'
import { Link, useNavigate } from 'react-router'

const ValidRoute = () => {
  /* To navigate */
  const navigate = useNavigate();

  /* To get the error */
  const routeError = useRouteError();

  return (
    <div className="w-full h-screen min-h-screen p-10 bg-linear-to-b from-bg-topColor to-bg-bottomColor text-text-primary">
      <div className="w-full h-full flex justify-center items-center">
        <div className="max-w-xs text-center h-full flex flex-col justify-center items-center gap-8">
          <div className='flex flex-col gap-4'>
            <h1 className='text-6xl sm:text-7xl font-medium bg-gradient-to-b from-text-primary to-text-secondary bg-clip-text text-transparent'>{routeError?.status}</h1>
            <p className='text-sm font-regular text-text-secondary'>{routeError?.statusText}</p>
            <p className='text-sm font-regular text-text-primary/95'>The page you're looking for doesn't exist or may have been moved from Scenery</p>
            <p className='text-sm text-text-secondary overflow-hidden'>{routeError?.error?.message}</p>
          </div>
          <div className='w-full flex flex-col 295:flex-row justify-center gap-2'>
            <div onClick={() => navigate(-1)} className='w-full 295:w-fit text-text-primary/80 flex flex-col 220:flex-row items-center justify-center gap-2 py-2 px-3 bg-cardColor-secondary border border-br-primary/60 rounded-md cursor-pointer transition duration-200 ease-in-out active:scale-95'>
              <RiArrowLeftLine className='w-4 h-4' />
              <h1 className='text-sm'>Go Back</h1>
            </div>
            <Link to="/" className='w-full 295:w-fit text-text-primary/80 flex flex-col 220:flex-row items-center justify-center gap-2 py-2 px-3 bg-cardColor-secondary border border-br-primary/60 rounded-md cursor-pointer transition duration-200 ease-in-out active:scale-95'>
              <RiHome5Line className='w-4 h-4' />
              <h1 className='text-sm'>Home</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValidRoute