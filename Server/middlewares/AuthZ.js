const jwt = require("jsonwebtoken")

exports.auth = async(req,res,next) => {
    try{
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(403).json({
                success:true,
                message:'Token is not present !!!'
            })
        }

        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
            console.log(decode);
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while verifying the token'
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Student") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Students only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Instructor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}