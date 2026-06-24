import React from 'react'
import { RiArrowLeftLine, RiHome5Line } from '@remixicon/react'
import { useRouteError, isRouteErrorResponse } from 'react-router'
import { Link, useNavigate } from 'react-router'

const ErrorPage = () => {

  /* To navigate */
  const navigate = useNavigate();

  /* To get the error */
  const error = useRouteError();

  /* To hold dynamic values for variables */
  let displayStatus = "500";
  let displayTitle = "Something Went Wrong";
  let displayMessage = "An unexpected error occurred while loading this page. Please try again later.";
  let displayErrorMsg = '';

  /* To check for error response type */
  if (isRouteErrorResponse(error)) {
    displayStatus = error?.status;
    displayTitle = error?.statusText;
    displayMessage = "The page you're looking for doesn't exist or may have been moved from Scenery.";
    displayErrorMsg = error?.error?.message;
  } else {
    /* Check for standard js error (Ref/Type) */
    if (error instanceof Error) {
      displayStatus = "500";
      displayTitle = "Application Error";
      displayMessage = "An unexpected error occurred while rendering this page. Please try again later.";
    }
  }

  console.log(displayErrorMsg)

  return (
    <div className="w-full h-screen min-h-screen p-10 bg-linear-to-b from-bg-topColor to-bg-bottomColor text-text-primary">
      <div className="w-full h-full flex justify-center items-center">
        <div className="max-w-xs text-center h-full flex flex-col justify-center items-center gap-8">
          <div className='flex flex-col gap-4'>
            <h1 className='text-6xl sm:text-7xl font-regular bg-gradient-to-b from-text-primary to-text-secondary bg-clip-text text-transparent'>{displayStatus}</h1>
            <p className='text-sm font-regular text-text-secondary'>{displayTitle}</p>
            <p className='text-sm font-regular text-text-primary/95'>{displayMessage}</p>
            {displayErrorMsg && <p className='text-sm text-text-secondary overflow-hidden'>{displayErrorMsg}</p>}
          </div>
          <div className='w-full flex flex-wrap justify-center gap-2'>
            <div onClick={() => navigate(-1)} className='w-full 295:w-fit text-text-primary/80 flex items-center justify-center gap-2 py-2 px-3 bg-cardColor-secondary border border-br-primary/60 rounded-md cursor-pointer transition duration-200 ease-in-out active:scale-95'>
              <RiArrowLeftLine className='w-4 h-4' />
              <h1 className='text-sm'>Go Back</h1>
            </div>
            <Link to="/" className='w-full 295:w-fit text-text-primary/80 flex items-center justify-center gap-2 py-2 px-3 bg-cardColor-secondary border border-br-primary/60 rounded-md cursor-pointer transition duration-200 ease-in-out active:scale-95'>
              <RiHome5Line className='w-4 h-4' />
              <h1 className='text-sm'>Home</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage