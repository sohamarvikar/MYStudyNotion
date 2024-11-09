const nodemailer=require("nodemailer");
require('dotenv').config();

const mailSender = async(email,subject,body)=>{
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        const mailOptions={
            from:"StudyNotion || An EdTech Platform",
            to:`${email}`,
            subject: `${subject}`,
            html: `${body}`
        }
        console.log('mailoptions',mailOptions);
        const mail = await transporter.sendMail(mailOptions);
        console.log('after email sent',mail);
        return mail;
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = mailSender;