import axios from "axios";
const SERVICE_URL= "http://localhost:5000";


export function getCourses () {

    return new Promise((resolve , reject) => {
        axios
            .get(`${SERVICE_URL}/api/getAllCourses`)
            
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error)
        })

    })
}

export function getLectures () {

    return new Promise((resolve , reject) => {
        axios
            .get(`${SERVICE_URL}/api/getAllLectures`)
            
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error)
        })

    })
}

/* first request to get the presigned url through which we will upload our audio file to bucket
       resp = requests.get(url, params=params, headers=headers)
    #upload  the audio file and initiate the transcription
        r = requests.post(url, data= decoded_resp['fields'], files=files)
    #get the transcription
        response = requests.get(url, params = parameters)
    */

export function getTranscript (audioFile) {
        
        return new Promise((resolve , reject) => {
            axios
                .post(`${SERVICE_URL}/api/getTranscript`,audioFile)
                
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    
        }) 
}