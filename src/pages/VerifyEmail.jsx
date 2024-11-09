import React, { useState ,useEffect} from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { signUp,sendOtp } from '../services/operations/authAPI';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [otp,setOtp] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {signupData} = useSelector((state) => state.auth)
    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
          navigate("/signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const{accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        } = signupData;

    function handleVerifyAndSignup(e){
        e.preventDefault();
        console.log("otp",otp);
        dispatch(
            signUp(
              accountType,
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              otp,
              navigate
            )
          );
    }
  return (
    <div className='min-h-[85vh] flex justify-center items-center'>
        <form onSubmit={handleVerifyAndSignup}>
        <div className='flex flex-col w-11/12 max-w-[400px]'>
            <h1 className='text-richblack-5 text-3xl font-semibold'>Verify email</h1>
            <p className='text-[18px] leading-6 text-richblack-100 font-normal my-5'>A verification code has been sent to you. Enter the code below</p>
            <OtpInput 
                value={otp}
                onChange={setOtp}
                numInputs={6}
                placeholder='-'
                className='text-white'
                skipDefaultStyles={true}
                renderInput={(props) => <input className='w-[40px]' {...props} />}
                containerStyle='flex gap-2 w-full text-richblack-5 justify-between'
                inputStyle='bg-richblack-600 rounded-md w-[50px] h-[50px] text-xl text-center p-4 focus:outline-1 focus:outline-yellow-100 focus:border-none'
            />
            <button type='submit'
            className={`text-center text-[13px] font-bold px-6 py-3 rounded-md hover:scale-95 transition-transform duration-200 
                bg-yellow-50 text-black shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] mt-6
               } `}>Verify email
            </button>
            <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
        </form>
    </div>
  )
}

export default VerifyEmail