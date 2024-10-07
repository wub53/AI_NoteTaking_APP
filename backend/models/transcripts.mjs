import mongoose, { mongo } from "mongoose";

const transcriptsSchema = new mongoose.Schema(
    {
        content : {type : String},
        course_id : {type : mongoose.Schema.Types.ObjectId }
    }
)

const Transcripts = mongoose.model("transcripts",transcriptsSchema)

export default Transcripts;