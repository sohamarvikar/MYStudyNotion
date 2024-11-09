import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';
import ShopButton from './ShopButton';
import { FaShareSquare } from "react-icons/fa";

function CourseDetailsCard({course, setConfirmationModal, handleBuyCourse}) {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,

    } = course;


    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if(token) {
            console.log("dispatching add to cart")
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

    return (
        <div className='bg-richblack-700'>
            <img 
                src={ThumbnailImage}
                alt='Thumbnail Image'
                className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl object-cover'
            />
            <div className='px-4 flex flex-col gap-3'>
                <div className='mt-4 text-3xl font-semibold text-richblack-5'>
                    Rs. {CurrentPrice}
                </div>
                <div className='flex flex-col gap-y-3 '>
                    
                    <ShopButton text={user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"}
                    onClick={
                        user && course?.studentsEnrolled.includes(user?._id)
                        ? ()=> navigate("/dashboard/enrolled-courses")
                        : handleBuyCourse
                    } active={true}/>

                    {
                        (!course?.studentsEnrolled.includes(user?._id)) && (
                            
                            <ShopButton onClick={handleAddToCart} text={"Add to Cart"} active={false}/>
                        )
                    }
                    <span className='text-center text-richblack-300'>
                        30-Day Money-Back Guarantee
                    </span>
                </div>

                <div>
                    
                    <p className='text-richblack-25'>
                        This Course Includes :
                    </p>
                    <div className='flex flex-col gap-y-2'>
                        {
                            course?.instructions?.map((item, index)=> (
                                <p 
                                key={index} className='flex gap-2 text-caribbeangreen-100 text-sm'>
                                    <span>{item}</span>
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <button
                    className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
                    onClick={handleShare}
                    >
                        <FaShareSquare />
                        Share
                    </button>
                </div>
            </div>
        </div>
    );

}

export default CourseDetailsCard