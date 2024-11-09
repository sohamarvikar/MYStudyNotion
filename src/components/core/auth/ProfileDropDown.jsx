import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { VscDashboard ,VscSignOut } from "react-icons/vsc";
import useOutsideClick from '../../../hooks/useOutsideClick'
import { logout } from '../../../services/operations/authAPI'

const ProfileDropDown = () => {
    const user = useSelector((state) => state.profile.user)
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const imgSrc = user?.image;
    const ref = useRef(null);
    useOutsideClick(ref,()=>setOpen(false))
  return (
    <div>
        <div className='relative flex items-center' >
            <div onClick={()=> setOpen(true)}>
                <img src={imgSrc} className='w-[30px] aspect-square object-cover rounded-full'/>
            </div>
            {open &&
            <div onClick={(e) => e.stopPropagation()}
            className='absolute w-[200px] text-richblack-300 z-10 top-14 right-0 font-semibold border-[1px] border-richblack-700 bg-richblack-800 p-2 rounded-md
            flex flex-col gap-2 transition-all duration-200'
            ref={ref}>
                <div className='flex gap-2 rounded-md items-center transition-all duration-200 text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                    <VscDashboard className='text-richblack-5 h-6 w-[20%]'/>
                    <Link to='/dashboard/my-profile'>
                    Dashboard
                    </Link>
                </div>
                <div onClick={() => dispatch(logout(navigate))}
                className='flex gap-2 rounded-md items-center transition-all duration-200 text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                    <VscSignOut className='text-richblack-5 h-6 w-[20%]'/>
                    <span>Log out</span>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default ProfileDropDown