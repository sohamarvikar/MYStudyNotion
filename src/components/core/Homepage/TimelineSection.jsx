import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
];

const TimelineSection = () => {
  return (
    <div className='w-full mb-10'>
        <div className='flex flex-row w-full mt-10 justify-between items-center' >
            {/* leftBox */}
            <div className='flex flex-col  w-[45%] items-start '>
                {
                    timeline.map( (element, index) => {
                        return (
                            <div className='flex flex-col items-start '>
                                <div className='flex flex-row gap-6 items-start' key={index}>

                                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full'>
                                        <img src={element.Logo} />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>

                                </div>
                                {index<3 && <div className='w-[26px] h-[42px] border-dashed border-r border-richblack-300 my-2'></div>}
                            </div>

                        )
                    } )
                }
            </div>
            {/* leftBox */}
            <div>
                <div className='relative shadow-[20px_20px_0px_0px_#FFFFFF]'>
                    <img src={timelineImage} alt="timelineImage" className='object-cover h-fit'/>

                    <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-9'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                        </div>

                        <div className='flex gap-5 items-center px-9'>
                        <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm'>TYpe of Courses</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TimelineSection