import mongoose from "mongoose";

const lecturesSchema = new mongoose.Schema(
    {
        title : {type : String},
    }
)

const Lectures = mongoose.model("lectures",lecturesSchema)

export default Lectures;