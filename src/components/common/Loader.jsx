import React from 'react'

const Loader = () => {
  return (
    <div className=" w-full min-h-[70vh] flex justify-center items-center">
        <div className='spinner '>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Loader