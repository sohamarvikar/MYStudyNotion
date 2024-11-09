import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { setCourse } from '../slices/courseSlice';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import { formatDate } from '../services/formatDate';

import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import Accordion from '../components/core/Course/Accordion';

const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state)=> state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId}  = useParams();

    const [courseData , setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(()=> {
        const getCourseFullDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                console.log("Printing CourseData-> " , result);
                setCourseData(result);
            }
            catch(error) {
                console.log("Could not fetch coursse details");
            }
        }
        getCourseFullDetails();
        
    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count);
    },[courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=> {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    },[courseData]);


    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
             ? isActive.concat(id)
             : isActive.filter((e)=> e != id)

        )
    }

    const handleBuyCourse = () => {
        
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })


    }

    if(loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }
    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
        category
    } = courseData.data?.courseDetails;

  return (
    <div>
        <div className='bg-richblack-800'>
            <div className='w-11/12 max-w-maxContent mx-auto py-5 flex relative'>
                <div className='w-2/3 flex flex-col gap-2 border-r border-richblack-700'>
                    <p className='text-richblack-300 text-sm'>Home / Learning / <span className='text-yellow-50'>{category.name}</span></p>
                    <h2 className='text-3xl text-richblack-5'>{courseName}</h2>
                    <p className='text-richblack-200'>{courseDescription}</p>
                    <div className='flex gap-4 text-richblack-25 font-light'>
                        <span className=' font-bold'>{avgReviewCount}</span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span>({ratingAndReviews.length}) Ratings</span>
                        <span>{studentsEnrolled.length} Students</span>
                    </div>
                    <div className='text-richblack-25'>Created by {instructor.firstName} {instructor.lastName}</div>
                    <div className='text-richblack-25'>Created at 01/2024</div>
                </div>
                <div className='absolute right-0'>
                    <CourseDetailsCard handleBuyCourse={handleBuyCourse} course={courseData.data?.courseDetails} setConfirmationModal={setConfirmationModal}/>
                </div>
            </div>
        </div>
        <div className='bg-richblack-900 pt-8'>
            <div className='w-11/12 max-w-maxContent mx-auto '>
                <div className='w-2/3 flex flex-col'>
                    <div className='p-5 border border-richblack-700'>
                        <h2 className='text-3xl text-richblack-5'>What You Will Learn</h2>
                        <div className='text-richblack-200 mt-4'>{whatYouWillLearn}</div>
                    </div>
                    <Accordion/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetails
