import React from 'react'
import HighlightText from './HighlightText'
import img1 from '../../../assets/Images/Know_your_progress.png'
import img2 from '../../../assets/Images/Compare_with_others.png'
import img3 from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button'

const LearningLanguageSection = () => {
  return (
    <div className='my-14'>
        <div className='flex flex-col items-center pt-8'>
            <div className='text-4xl font-semibold'>Your swiss knife for 
                <HighlightText text={"learning any language"}/></div>
            <div className='text-richblack-700 w-[70%] text-center mt-2 font-medium'>Using spin making learning multiple languages 
                easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
        </div>
        <div className='flex flex-row mt-7 justify-center'>
            <img src={img1} alt="image" className='object-contain' />
            <img src={img2} alt="image" className='object-contain ml-[-140px]'/>
            <img src={img3} alt="image" className='object-contain ml-[-140px]'/>
        </div>

        <div className='mt-10'>
            <div className='flex flex-row justify-center mx-auto'>
                <Button active={true} linkTo={'/signup'}>Learn More</Button>
            </div>
        </div>

    </div>
  )
}

export default LearningLanguageSection