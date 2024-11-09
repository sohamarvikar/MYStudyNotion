import React, { useState } from 'react'
import HighlightText from './HighlightText'
import {HomePageExplore} from '../../../data/homepage-explore'
import { IoMdPeople } from "react-icons/io";
import { ImTree } from "react-icons/im";

const ExploreSection = () => {
    const [tag,setTag] = useState(HomePageExplore[0]?.tag)
    const [cards,setCards] = useState(HomePageExplore[0]?.courses)
    const [selectedCard,setSelectedCard] = useState(0)
  return (
    <div className='absolute bottom-0 translate-y-[50px] flex flex-col items-center'>
        <div className='text-4xl font-semibold text-white'>
            Unlock the <HighlightText text={'Power of Code'}/>
        </div>
        <div className='text-base font-medium text-richblack-300 mt-5'>Learn to Build Anything You Can Imagine</div>

        {/* slider */}
        <div className='mb-14 mt-10 flex gap-5 bg-richblack-800 p-2 rounded-full '>
            {
                HomePageExplore.map((ele,index)=> (
                    <div className={`rounded-2xl px-3 py-1 transition-all duration-200
                    ${ele.tag===tag ? 'bg-richblack-900 text-richblack-5':'text-richblack-300 hover:text-richblack-50'} `}
                    onClick={(e)=> {
                        setTag(ele.tag);
                        setCards(HomePageExplore[index]?.courses);
                        setSelectedCard(0)
                    }}
                    key={index}>
                        {ele.tag}
                    </div>
                ))
            }
        </div>

        {/* cards */}
        <div className='flex justify-between gap-8 w-[85%]'>
            {cards.map((card,index) => (
                <div key={index} onClick={(e)=> setSelectedCard(index)}
                className={`transition-all duration-200 p-8 pb-2 ${index===selectedCard ? 'bg-white shadow-[12px_12px_0px_0px_#FFD60A]':
                                                                    'bg-richblack-800'}`}>
                    <h3 className={`font-semibold font-inter ${index===selectedCard ? 'text-richblack-900':'text-richblack-25'} `}>{card.heading}</h3>
                    <p className={`mt-4 w-[95%] ${index===selectedCard ? 'text-richblack-500':'text-richblack-400'}`}>{card.description}</p>
                    <div className={`flex justify-between items-center mt-20 ${index===selectedCard ? 'text-blue-300':'text-richblack-500'}`}>
                        <div className='flex gap-1 items-center font-semibold'>
                            <IoMdPeople className='w-[18px] h-[18px]'/>
                            <span>{card.level}</span>
                        </div>
                        <div className='flex gap-1 items-center font-semibold'>
                            <ImTree className='w-[18px] h-[18px]'/>
                            <span>{card.lessionNumber} Lessons</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default ExploreSection