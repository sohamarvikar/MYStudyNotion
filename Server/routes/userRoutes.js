const express = require('express');
const router = express.Router();

//middlewares
const {auth} = require('../middlewares/AuthZ')

//authN
const {sendOTP,signup,login,changePassword} = require('../controllers/AuthN')

const {resetPasswordToken,resetPassword} = require("../controllers/ResetPassword")

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


module.exports = router;