import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';
import { corsConfiguration } from './cors.js';
import { askAndAnswer, generateAnswer, queryVectorDB } from './askAndAnswer.mjs';
import connect_to_db from './db/index.mjs';
import Courses from './models/courses.mjs';
import Transcripts from './models/transcripts.mjs';
import Lectures from './models/lectures.mjs';
import axios from 'axios';
config(); // This loads the .env file

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // File name format
  },
});

const upload = multer({ storage: storage });
const app = express();
const PORT = process.env.PORT || 5000;

// connect to database
connect_to_db(app)
app.use(express.json());
app.use(corsConfiguration);

// Add a sample route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'get response from the server!' });
});

app.post('/api/ask', async (req, res) => {
  let llm_response = '';
  try {
    llm_response =  await askAndAnswer(req.body.question);
    //console.log(llm_response, "response from llm in server.mjs");
    res.json({ response: llm_response, message: 'get response from LLM' });

  } catch (error) {
    console.error("Error getting response from LLM:", error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.get('/api/getAllCourses' , async (req,res) => {
    // add the code to query db's Courses Model and get courses and then return the reponse

    //console.log(" iam in the api handler for get all courses")
    try {
      const coursesFromDb = await Courses.find({});
      //console.log("Successfully recieved courses from db",coursesFromDb);
      return res.status(200).json({coursesFromDb})
    }
    catch (error){
      console.error("Error fetching the courses from db",error)
      throw error
    }
})

app.get('/api/getAllTranscripts/:courseId', async (req,res) => {
    // first take the course ID from the request obj and look for all the transcripts based on this id 

    try {
      const courseId = req.params.courseId
      if (!courseId)
      { return res.status(400).json({message:"Course Id is required"})}

      const transcripts = await Transcripts.find({course_id : courseId})

      if (transcripts.length == 0 )
      { return res.status(404).json({message:"no Transcripts found for this course "}) }

      res.json({transcripts})
    }

    catch (error){
      return res.status(500).json({messsage:"Error connecting to database"})
    }

})

app.get('/api/getAllLectures', async (req , res) => {

  try{
    //console.log("I am in the getAllLectures handler")
    const lectures = await Lectures.find({});
    //console.log("Lectures:",lectures)
    if (!lectures)
    {
      return res.status(404).json({message:"no lectures found for this course "})
    }

    return res.status(200).json({lectures})
  }
  catch(error){
    console.error("Error getting the Lectures from database",error)
  }
})

app.post('/api/convertToTranscript',upload.single('file'), async (req,res) => {

  console.log("Request Object",req.file)
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
   // File path
   const filePath = path.resolve(req.file.path);
   const fileName = (req.file.originalname);
   console.log('File uploaded to:', filePath);

   // call the first get api to get the bucket url using file name 
   const language = 'en-US'

    const params = {
      "language" : language,
      "file_name" : fileName
    }
    const url = 'https://api.tor.app/features/transcribe-file'

    const headers = {
      "Authorization" : `Bearer ${process.env.TRANSCRIPTOR_API_KEY}`,
    } 

    try {
      const response = await axios.get(url, { params, headers });
      if (!response) {
        return res.status(400).send('Error getting the presigned URL');
      }
  
      console.log("Response from the transcriptor API", response.data);

      const order_id = response.data.fields.key.split("-+-")[0];
      console.log("Order_id =", order_id);
  
      // Now put the data in the bucket
      const formData = new FormData();
      // Append fields from response.data.fields
      for (const [key, value] of Object.entries(response.data.fields)) {
        formData.append(key, value);
      }
      // Append the file
      formData.append('file', fs.createReadStream(filePath));
  
     const response_from_bucket = await axios.post(response.data.url, formData);

      if(!response_from_bucket){
        return res.status(400).send('Error uploading the file to the bucket');
      }
  
      console.log("Response from bucket", response_from_bucket);
  
      //Now get the transcript
      const transcript_data = await axios.get('https://api.transkriptor.com/3/Get-Content',  { params: { orderid: "1728266582661" },
        headers: {
        'Content-Type': 'multipart/form-data'} } );
        // Convert the data to a JSON string
      const jsonData = JSON.stringify(transcript_data.data.content, null, 2);

      // Write the JSON string to a file
      fs.writeFileSync('transcript_data.json', jsonData, 'utf8');
      console.log('Transcript data saved to transcript_data.json');

      return res.status(200).json({message:"Transcript generated"})
      
       } catch (error) {
      console.error('Error calling API:', error);
      res.status(500).send('Error processing the file.');
    }



})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
