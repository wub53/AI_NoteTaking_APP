import mongoose from "mongoose";

const coursesSchema =  new mongoose.Schema(
    {
        course: { type: String},
        image: {type : String}
    }
)

const Courses = mongoose.model("courses", coursesSchema);

export default Courses;

