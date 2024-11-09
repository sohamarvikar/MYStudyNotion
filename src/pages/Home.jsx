import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link} from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from '../components/core/Homepage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/Codeblocks';
import Button from '../components/core/Homepage/Button';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import BecomeIns from '../components/core/Homepage/BecomeIns';
import Footer from '../components/common/Footer';
import ExploreSection from '../components/core/Homepage/ExploreSection';
import Navbar from '../components/common/Navbar';

const Home = () => {
  return (
    <div className='overflow-x-hidden'>

        
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between pb-[500px]'>
        <Link to="/signup">
            <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                            shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset]
                            transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full px-5 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                </div>

            </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
        </div>

        <div className=' mt-4 w-[80%] text-center text-lg font-medium text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex gap-7 mt-8'>
          <CTAButton linkTo={'/signup'} active={true}>
            Learn More
          </CTAButton>
          <CTAButton linkTo={'/login'} active={false} >
            Book a Demo
          </CTAButton>
        </div>
        
        

        <div className='relative z-10 mx-3 my-12 shadow-[20px_20px_0px_0px_#F5F5F5] boxStyle'>
            <video
            muted
            loop
            autoPlay
            >
            <source  src={Banner} type="video/mp4" />
            </video>
        </div>

        <div>
            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold w-[90%]'>
                        Unlock Your
                        <HighlightText text={"coding potential "}/>
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a className="bg-red-500" href="/"></a></h1>\n<nav>\n  <a href="one">One</a>\n</nav>`}
                codeColor={"text-white"}
                backgroudGradient={"type1"}
            />
        </div>

        <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold w-[90%]'>
                        Start 
                        <HighlightText text={"coding "}/>
                        <br />
                        <HighlightText text={"in seconds"}/>
                        
                    </div>
                }
                subheading = {
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {
                        btnText: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a className="bg-red-500" href="/"></a></h1>\n<nav>\n  <a href="one">One</a>\n</nav>`}
                codeColor={"text-white font-bold"}
                backgroudGradient={"type2"}
            />
        </div>

        <ExploreSection/>

      </div>

      <div className='bg-pure-greys-5'>
        <div className='h-[310px] homepage_bg flex justify-center items-center'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                <div className='flex gap-7'>
                    <CTAButton active={true} linkto={'/signup'}>
                        <div className="flex gap-2 items-center">
                            {'Explore Full Catalog'}
                        <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton linkTo={'/login'} active={false} >
                        <span className='text-white'>Learn More</span>
                    </CTAButton>
                </div>
            </div>

                
        </div>

        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='flex flex-row gap-5 mt-[95px]'>
                <div className='w-[50%] text-4xl font-semibold'>
                    Get the skills you need for a 
                    <HighlightText text={"job that is in demand."}/>
                </div>
                <div className='w-[50%] '>
                    <div className='flex flex-col justify-between items-start'>
                        <div className='text-richblack-700 mb-6'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive 
                            specialist requires more than professional skills.
                        </div>
                        <div className='mt-12'>
                            <Button active={true} linkTo={'/login'}>
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <TimelineSection/>

            <LearningLanguageSection/>
        </div>
      </div>

      <BecomeIns/>

      {/* reviews */}

      <Footer/>
    </div>
  )
}

export default Home
