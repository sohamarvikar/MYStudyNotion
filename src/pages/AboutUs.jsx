import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import img1 from '../assets/Images/aboutus1.webp'
import img2 from '../assets/Images/aboutus2.webp'
import img3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import Footer from '../components/common/Footer'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

const AboutUs = () => {
  return (
    <div>
        <div className=' bg-richblack-800'>
            <div className='w-11/12 max-w-maxContent flex flex-col pt-24 mx-auto items-center relative pb-[300px] aboutGradient '>
                <p className='text-richblack-300'>About us</p>
                <p className='font-inter font-semibold text-4xl leading-10 w-[80%] text-richblack-5 text-center px-20 mt-12'>Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"}/>
                </p>
                <p className='text-richblack-300 w-[60%] text-center mt-4'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                <div className='absolute bottom-0 translate-y-[30%]
                flex justify-between gap-5 h-[310px] w-full z-10'>
                    <img src={img1} className='w-full '/>
                    <img src={img2} className='w-full'/>
                    <img src={img3} className='w-full'/>
                </div>
                
            </div>
        </div>
        <div className='bg-richblack-900 border-b border-richblack-700 '>
            <div className='w-11/12 max-w-maxContent  mx-auto items-center pt-[240px] relative pb-[150px]'>
                <span className='text-richblack-600 text-[70px] absolute top-[205px] left-14'>"</span>
                <div className='text-4xl leading-[52px] font-semibold text-richblack-50 text-center '>{"    "}We are passionate about {"        "}revolutionizing the way we learn. Our <br />innovative platform 
                    <HighlightText text={'combines technology'}/>, 
                    <span className='highLightColor3'>expertise</span>, and community to create an <span className='text-yellow-200'>unparalleled educational experience</span>.
                    <span className='text-richblack-600 text-[70px] absolute font-normal ml-2'>"</span></div>
                    
            </div>
        </div>
        <div className='bg-richblack-900 '>
            <div className='w-11/12 max-w-maxContent mx-auto items-center flex flex-col '>
                <div className='flex gap-[5%] justify-between items-center py-[90px]'>
                    <div className='flex flex-col w-[43%]'>
                        <h2 className='story text-4xl font-semibold'>Our Founding Story </h2>
                        <p className='text-richblack-300 mt-4'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality 
                            learning opportunities in a rapidly evolving digital world.</p>
                        <p className='text-richblack-300 mt-3'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals 
                            from all walks of life to unlock their full potential.</p>
                    </div>
                    <div className='w-[45%] h-full flex justify-center items-center'>
                        <img src={FoundingStory} className='object-cover' />
                    </div>
                </div>
                <div className='flex gap-[5%] justify-between items-center py-[90px]'>
                    <div className='flex flex-col w-[43%]'>
                        <h2 className='text-4xl font-semibold highLightColor3'>Our Vision</h2>
                        <p className='text-richblack-300 mt-4'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='w-[45%] flex flex-col pl-11'>
                        <h2 className='text-4xl font-semibold'>
                        <HighlightText text={"Our Mission"}  />
                        </h2>
                        
                        <p className='text-richblack-300 mt-4'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </div>
        <StatsComponent/>
        <div className='bg-richblack-900 pb-20'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col '>
                <div className='mt-28'><LearningGrid/></div>
                <ContactFormSection/>
            </div>
        </div>
        
        <Footer/>
        
    </div>
  )
}

export default AboutUs