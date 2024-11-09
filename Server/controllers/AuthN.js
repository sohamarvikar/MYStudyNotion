const User = require("../models/User");
const OTP = require("../models/OTP");
const profile = require("../models/Profile")
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const mailSender = require("../Utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const jwt = require('jsonwebtoken')
require("dotenv").config();
//send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const isPresent = await User.findOne({ email });

    if (isPresent) {
      return res.status(404).json({
        success: false,
        message: "User already registered !!!",
      });
    }

    let otp = otpgenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpgenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp });
    }

    let record = await OTP.create({ email, otp });
    console.log('otp record',record);

    res.status(200).json({
      success: true,
      message: "OTP sent !!!",
      otp,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//signup
exports.signup = async (req, res) => {
    try{
        const{firstName
            ,lastName
            ,accountType
            ,email
            ,password
            ,confirmPassword
            ,otp
            ,contactNumber
        } = req.body;
        
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ){
            return res.status(403).json({
                success:false,
                message:'Please fill all the required fields'
            })
        }

        if(password !== confirmPassword){
            return res.status(406).json({
                success:true,
                message:'Password and ConfirmPassword Value does not match, please try again'
            })
        }

        const isPresent = await User.findOne({ email });

        if (isPresent) {
        return res.status(404).json({
            success: false,
            message: "User already registered !!!",
        });
        }

        const recentotp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        // console.log('rotp',recentotp)
        if(!recentotp || recentotp.length===0){
            return res.status(400).json({
                success:false,
                message:'OTP not Found !!!'
            })
        }
        if(otp !== recentotp[0].otp){
            return res.status(400).json({
                success:false,
                message:" OTP does not match.....Please Try Again "
            })
        }
        let hashedPass;
        try{
            hashedPass = await bcrypt.hash(password,18);
        }catch(err){
            return res.status(500).json({
                message:"unable to hash the pasword"
            })
        }

        const Profile = await profile.create({
            gender:null,
            dateOfBirthnull:null,
            contactNumber:contactNumber,
            about:null
        })

        const user = await User.create({
            email:email,
            password:hashedPass,
            accountType,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            additionalDetails:Profile._id,
            firstName,
            lastName,
        })

        return res.status(200).json({
            success:true,
            message:'User is registered Successfully',
            user,
        });
    
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Something went Wrong...User cannot be registrered'
        })
    }

};

//login
exports.login = async (req, res) => {
    try {
        console.log("jwt",process.env.JWT_SECRET)
        //get data from req body
        const {email, password} = req.body;
        // validation data
        if(!email || !password) {
            return res.status(403). json({
                success:false,
                message:'All fields are required, please try again',
            });
        }
        //user check exist or not
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registrered, please signup first",
            });
        }
        //generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user.token = token;
            user.password= undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            })

        }
        else {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        });
    }
};

//change password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                "Password for your account is CHANGED !!!",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};