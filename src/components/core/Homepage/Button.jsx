import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,linkTo,active}) => {
  return (
    <Link to={linkTo}>
        <div className={`text-center text-[13px] font-bold px-6 py-3 rounded-md hover:scale-95 transition-transform duration-200 
            ${active ? "bg-yellow-50 text-black shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]":
            "bg-richblack-800 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset]"} `}>
            {children}
        </div>
    </Link>
  )
}

export default Button