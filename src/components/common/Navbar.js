import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from '../../data/navbar-links'
import { Link, useLocation,matchPath } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import {categories} from '../../services/apis'


const Navbar = () => {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart )
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])
    
  return ( 
    <div className='border-b border-richblack-700 pb-5'>
        <div className='max-w-maxContent w-11/12 flex justify-between items-start mx-auto h-[32px] py-2'>
            <div>
                <Link to={'/'}>
                 <img src={logo}  />
                </Link>
                
            </div>
            <div className='flex gap-4 text-richblack-300 font-normal'>
                {
                    NavbarLinks.map((ele,index) => (
                        ele.title === 'Catalog' ? 
                        (<div className='flex gap-2 p-2 relative group'>
                            <div>{ele.title}</div>
                            <FaChevronDown className='w-[14px] h-[14px] mt-1'/>
                            <div className='transition-all duration-500 invisible absolute rounded-md bg-richblack-5 lg:w-[200px] text-richblack-800 text-lg font-semibold
                            flex flex-col top-[0%] left-[-50%] translate-y-[30%] translate-x-[-20%]  group-hover:visible min-h-[150px] z-20'>
                                <div className='absolute left-[66%] top-[0]
                                translate-x-[90%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 z-[-1]'>
                                </div>
                                {loading ? (
                                <p className="text-center">Loading...</p>
                                ) : subLinks.length ? (
                                <>
                                    {subLinks
                                    ?.map((subLink, i) => (
                                        <Link
                                        to={`/catalog/${subLink.name
                                            .split(" ")
                                            .join("-")
                                            .toLowerCase()}`}
                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                        key={i}
                                        >
                                        <p>{subLink.name}</p>
                                        </Link>
                                    ))}
                                </>
                                ) : (
                                <p className="text-center">No Courses Found</p>
                                )}
                                </div>
                            </div>):
                        (<div className={`${ matchRoute(ele?.path) ? "text-yellow-25" : "text-richblack-300"} p-2`}>
                            <Link to={ele.path}>{ele.title}</Link>
                        </div>)
                    ))
                }
            </div>
            
            {/* Login/SignUp/Dashboard */}
        <div className='flex gap-x-4 items-center'>

            {
                user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className='relative text-richblack-100 text-2xl'>
                        <AiOutlineShoppingCart />
                        {
                            totalItems > 0 && (
                                <span>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[8px] py-[4px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[8px] py-[4px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token!==null && <ProfileDropDown/>
            }

            </div>
        </div>
    </div>
  )
}

export default Navbar