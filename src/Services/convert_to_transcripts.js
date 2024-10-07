/* first request to get the presigned url through which we will upload our audio file to bucket
       resp = requests.get(url, params=params, headers=headers)
    #upload  the audio file and initiate the transcription
        r = requests.post(url, data= decoded_resp['fields'], files=files)
    #get the transcription
        response = requests.get(url, params = parameters)
    */
        import axios from 'axios';
        const SERVICE_URL= "http://localhost:5000";
        //language spoken in the audio file
        // language = 'en-US'
        // //local file path of the audio file
        // filepath = 'user/example.mp3'
        
        // params = {
        //   "language" : language,
        //   "file_name" : filepath.split("/")[-1]
        // }
        
        // headers = {
        //   "Authorization" : f`Bearer ${React_APP_API_KEY}`,
        // } 
        
            export function convertToTranscript (formData) {
                console.log("formdata sent to backend :",formData)
                    return new Promise((resolve , reject) => {
                        axios
                            .post(`${SERVICE_URL}/api/convertToTranscript`,formData)
                            
                        .then((response) => {
                            resolve(response.data)
                        })
                        .catch((error) => {
                            reject(error)
                        })
                
                    }) 
            }
        
            export function putInBucket (audioFileName) {
                
                return new Promise((resolve , reject) => {
                    axios
                        .post(`${SERVICE_URL}`,audioFileName)
                        
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            
                }) 
            }