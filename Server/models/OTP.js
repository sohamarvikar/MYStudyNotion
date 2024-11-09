const mongoose = require("mongoose");
const mailSender = require('../Utils/mailSender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate')
const OTPschema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      expires: 5*60,
      default: Date.now(),
    },
});

async function sendVerificationMail(email,otp){
  try{
    const msg = otpTemplate(otp);
    const mailResponse = await mailSender(email, "Verification Email from StudyNotion", msg);
    console.log("Email sent Successfully: ", mailResponse);
  }
catch(error) {
    console.log("error occured while sending mails: ", error);
    throw error;
  }
}

OTPschema.pre("save",async function (next) {
  console.log('email',this.email);
  await sendVerificationMail(this.email,this.otp);
  next();
})

module.exports = mongoose.model("OTP", OTPschema);
