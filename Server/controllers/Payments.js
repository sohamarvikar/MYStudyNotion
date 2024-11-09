const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../Utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require('crypto')
const paymentSuccessEmail = require('../mail/templates/paymentSuccessEmail')

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {

    const {courses} = req.body;
    console.log("cousres",courses)
    const userId = req.user.id;

    const uId = new mongoose.Types.ObjectId(userId);

    if(courses.length === 0) return res.status(404).json({success:false,message:"No courses to buy"});

    let totalAmount = 0;
    try{
        for(const courseId of courses){
            const isCoursePresent = await Course.findById(courseId);
            if(!isCoursePresent) return  res.status(404).json({success:false,message:"course not present"});
            isStudentEnrolled = isCoursePresent.studentsEnrolled.includes(uId);
            if(isStudentEnrolled) return res.status(400).json({success:false,message:"Student is already enrolled"});
            totalAmount += isCoursePresent?.price;
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Somethong went wrong "
        })
    }
    const options = {
        amount : totalAmount*100,
        currency : "INR",
        receipt : Math.random().toString().slice(4,12)
    }
    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }



    // //get courseId and UserID
    // const {course_id} = req.body;
    // const userId = req.user.id;
    // //validation
    // //valid courseID
    // if(!course_id) {
    //     return res.json({
    //         success:false,
    //         message:'Please provide valid course ID',
    //     })
    // };
    // //valid courseDetail
    // let course;
    // try{
    //     course = await Course.findById(course_id);
    //     if(!course) {
    //         return res.json({
    //             success:false,
    //             message:'Could not find the course',
    //         });
    //     }

    //     //user already pay for the same course
    //     const uid = new mongoose.Types.ObjectId(userId);
    //     if(course.studentsEnrolled.includes(uid)) {
    //         return res.status(200).json({
    //             success:false,
    //             message:'Student is already enrolled',
    //         });
    //     }
    // }
    // catch(error) {
    //     console.error(error);
    //     return res.status(500).json({
    //         success:false,
    //         message:error.message,
    //     });
    // }
    
    // //order create
    // const amount = course.price;
    // const currency = "INR"; 

    // const options = {
    //     amount: amount * 100,
    //     currency,
    //     receipt: Math.random(Date.now()).toString(),
    //     notes:{
    //         courseId: course_id,
    //         userId,
    //     }
    // };

    // try{
    //     //initiate the payment using razorpay
    //     const paymentResponse = await instance.orders.create(options);
    //     console.log(paymentResponse);
    //     //return response
    //     return res.status(200).json({
    //         success:true,
    //         courseName:course.courseName,
    //         courseDescription:course.courseDescription,
    //         thumbnail: course.thumbnail,
    //         orderId: paymentResponse.id,
    //         currency:paymentResponse.currency,
    //         amount:paymentResponse.amount,
    //     });
    // }
    // catch(error) {
    //     console.log(error);
    //     res.json({
    //         success:false,
    //         message:"Could not initiate order",
    //     });
    // }
    

};

//verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
    
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

};

const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}