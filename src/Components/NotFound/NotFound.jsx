import React from 'react'
import error from './../../assets/error.svg'
const NotFound = () => {
  return (
    <div className='p-8 mt-14' >
        <div className='w-[60%] mx-auto'>
        <img src={error} alt="error" className='w-full'/>
        </div>
    </div>
  )
}

export default NotFound
