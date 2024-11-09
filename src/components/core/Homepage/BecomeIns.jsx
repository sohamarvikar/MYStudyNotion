import React from 'react'
import teacher from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa";

const BecomeIns = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto'>
        <div className='flex my-20 gap-20 justify-between'>
            <div className='w-[50%]'>
                <img src={teacher} alt="" />
            </div>
            <div className='flex flex-col justify-center gap-4 '>
                <div className='text-4xl font-semibold text-white'>
                Become an <br />
                <HighlightText text={'instructor'}/>
                
                </div>
                <div className='text-richblack-300 w-[70%]'>
                Instructors from around the world teach millions of students on StudyNotion. 
                We provide the tools and skills to teach what you love.
                </div>

                <div className='w-fit mt-20'>
                    <Button linkTo={'/signup'} active={true}>
                        <div className='flex items-center gap-2 '>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </Button>
                </div>

            </div>

        </div>
    </div>
  )
}

export default BecomeIns