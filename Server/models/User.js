const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true, 
        trim:true
    },
    firstName:{
        type:String,
        required:true, 
        trim:true
    },
    lastName:{
        type:String,
        required:true, 
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Student","Instructor","Admin"],
        required:true
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    additionalDetails: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    courseProgress: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ],
    image:{
        type:String,
        required:true,
    },
    token :{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },

})

module.exports = mongoose.model("User",userSchema);