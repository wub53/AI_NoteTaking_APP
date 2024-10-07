import React, { useState } from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
let count= 0;

const VideoUploadButton = ({ setRecordings}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadFileNameButton, setShowUploadFileNameButton] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setShowUploadFileNameButton(true);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      console.log(selectedFile)
      count++;
      const newRecording = {id: count, title: selectedFile.name, url:url, file:selectedFile}
      setRecordings((prevRecordings) => 
        [...prevRecordings,newRecording]
      );
      setShowUploadFileNameButton(false);
    }
  };

  const handlePlay = () => {
    const videoElement = document.getElementById('video-player');
    if (videoElement) {
      videoElement.play();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        id="video-upload-input"
        onChange={handleFileSelect}
      />
      <label htmlFor="video-upload-input">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Select Video
        </Button>
      </label>
      {( showUploadFileNameButton && selectedFile) && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpload}
          style={{ marginLeft: '10px' }}
        >
          Upload {selectedFile.name}
        </Button>
      )}
      {/* {videoUrl && (
        <Grid xs={12} sm={6} md={4}>
         <Card>
            <CardMedia
              component="video"
              controls
              src={videoUrl}
              title="Video Player"
              sx={{ height: 240 }}
            />
          </Card>
        </Grid>
      )} */}
    </div>
  );
};

export default VideoUploadButton;
