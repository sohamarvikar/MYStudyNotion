const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SubSection",
    },
  ],
});

sectionSchema.pre("save",async function (next) {
    console.log('saving section');
    next();
  });

sectionSchema.pre("deleteOne",{document:true,query:false} ,async function (next) {
  console.log("deleting section from course 1");
  await mongoose
    .model("Course")
    .findOneAndUpdate(
      { courseContent: { $eleMatch: { $eq: this._id } } },
      { $pull: { courseContent: this._id } }
    );
  console.log("deleted section from course");
  next();
});
sectionSchema.pre("deleteOne",{document:false,query:true} ,async function (next) {
  console.log("deleting section from course 2");
  let conditionID = this._conditions._id;
  console.log("conditionID",conditionID);
  const filterId = this.getFilter()._id;
  console.log("filterId",filterId);
  await mongoose
    .model("Course")
    .findOneAndUpdate(
      { courseContent: { $elemMatch: { $eq: filterId } } },
      { $pull: { courseContent: filterId } }
    );
  console.log("deleted section from course");
  next();
});

module.exports = mongoose.model("Section", sectionSchema);
