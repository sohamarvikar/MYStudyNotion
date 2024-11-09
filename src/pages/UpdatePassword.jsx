import React, { useState } from 'react'
import Button from '../components/core/Homepage/Button'
import { getPasswordResetToken } from '../services/operations/authAPI'

const UpdatePassword = () => {
    const[mail,setMail] = useState("")
    const[isMailSent,setIsMailSent] = useState(null)
    const sendHandler = async (e) => {
        const res = await getPasswordResetToken(mail,setIsMailSent)
    }
  return (
    <div className='min-h-[60vh] flex place-items-center bg-richblack-900'>
        <div className='flex flex-col gap-6'>
            <h2 className='text-4xl font-semibold text-richblack-5'>{!isMailSent ? "Reset Your Password":"Check email"}</h2>
            <p>{!isMailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            :`We have sent the reset email to ${mail}`}</p>
            {!isMailSent && (
                <div className='flex flex-col'>
                    <label className="text-richblack-100 text-sm" htmlFor="email">Email Address<sup>*</sup></label>
                    <input type="email" id='email' 
                    className='p-2 rounded-md text-richblack-5 bg-richblack-800'
                    onChange={(e) => setMail(e.target.value)}/>
                </div>
            )}
            {!isMailSent ? (
                <button onClick={sendHandler} className='text-center text-[13px] font-bold px-6 py-3 rounded-md hover:scale-95 transition-transform duration-200
                bg-yellow-50 text-black shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]'>
                    Reset Password
                </button>)
            :(<Button linkTo={"https://mail.google.com/mail/u/0/#inbox"}/>)}
        </div>
    </div>
  )
}

export default UpdatePassword