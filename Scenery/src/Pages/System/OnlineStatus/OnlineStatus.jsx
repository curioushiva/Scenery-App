import React from 'react'
import { RiRestartLine } from '@remixicon/react'

const OnlineStatus = () => {
  return (
    <div className="w-full h-screen min-h-screen p-10 bg-linear-to-b from-bg-topColor to-bg-bottomColor text-text-primary">
      <div className="w-full h-full flex justify-center items-center">
        <div className="max-w-xs text-center h-full flex flex-col justify-center items-center gap-8">
          <div className='flex flex-col gap-4'>
            <p className='text-sm font-regular text-text-secondary'>No Connection</p>
            <h1 className='text-3xl sm:text-4xl font-medium bg-gradient-to-b from-text-primary to-text-secondary bg-clip-text text-transparent'>You're Offline</h1>
            <p className='text-sm text-text-secondary'>Scenery needs a connection to find your next watch. Check your network and try again</p>
          </div>
          <div className='flex flex-col gap-6'>
            <div onClick={() => location.reload()} className='text-text-primary/80 flex flex-col 220:flex-row items-center justify-center gap-2 py-2 px-3 bg-cardColor-secondary border border-br-primary/60 rounded-md cursor-pointer transition duration-200 ease-in-out active:scale-95'>
              <RiRestartLine className='w-4 h-4' />
              <h1 className='text-sm'>Try Again</h1>
            </div>
            <p className="text-sm text-text-secondary">
              Or press <span className="hidden 220:inline">Ctrl + R</span>
              <br className="220:hidden" />
              <span className="220:hidden">Ctrl + R</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineStatus