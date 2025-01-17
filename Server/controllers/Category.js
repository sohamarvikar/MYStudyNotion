const Category = require('../models/Category')

exports.createCategory = async(req,res) => {
    try{
        const{name,description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All Fields are Required !!!"
            })
        }

        const categoryDetails = await Category.create({name,description});

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
            categoryDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.showAllCategories = async(req,res) => {
    try{
        const allCategories = await Category.find({},{name:true,description:true});

        return res.status(200).json({
            success:true,
            message:'Successfully fetched all categories',
            data:allCategories
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {categoryId} = req.body;
            //get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
                                            .populate({
                                                path:"courses",
                                                match:{status:"Published"}
                                            })
                                            .exec();
            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }
            //get coursesfor different categories
            const differentCategories = await Category.find({
                                         _id: {$ne: categoryId},
                                         })
                                         .populate("courses")
                                         .exec();

            //get top 10 selling courses
            //HW - write it on your own

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}