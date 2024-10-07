import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import CompressIcon from '@mui/icons-material/Compress';
import VideoUploadButton from '../Utils/UploadService';
import { convertToTranscript } from '../Services/convertToTranscript';

const PersonalScreen = () => {
  const [recordings, setRecordings] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch recordings data from your API
    //fetchRecordings();
    console.log("The recordings : ----",recordings)
  }, []);

  const fetchRecordings = async () => {
    // Replace this with your actual API call
    const mockData = [
      { id: 1, title: 'Recording 1', thumbnail: 'https://via.placeholder.com/300x200', url: 'https://example.com/recording1.mp4' },
      { id: 2, title: 'Recording 2', thumbnail: 'https://via.placeholder.com/300x200', url: 'https://example.com/recording2.mp4' },
      // Add more mock data as needed
    ];
    setRecordings(mockData);
  };

  const handlePlay = (recordingUrl) => {
    // Implement play functionality
    console.log('Playing:', recordingUrl);
  };

  const handleConvertToTranscript = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log("file :",file);

    try {
      const response = await convertToTranscript(formData);
      console.log('Response from convertToTranscript:', response.data);

      // Display the alert box
      setOpenSnackbar(true);

    } catch (error) {
      console.error('Error converting transcripts:', error);
      setOpenSnackbar(true);
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleViewTranscript = () => {
    console.log("Opened Transcripts")
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Recordings
      </Typography>
      <VideoUploadButton setRecordings={setRecordings}/>
      <Grid container spacing={4}>
        { recordings && recordings.map((recording) => (
          <Grid item key={recording.id} xs={12} sm={6} md={4}>
            <Card>
            <CardMedia
              component="video"
              controls
              src={recording.url}
              title="Video Player"
              sx={{ height: 240 }}
            />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {recording.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={< CompressIcon/>}
                  onClick={() => handleConvertToTranscript(recording.file)}
                >
                  Convert to Transcript
                </Button>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                  >
                    <Alert onClose={handleCloseSnackbar} severity="success">
                      Your transcripts have been converted
                    </Alert>
                  </Snackbar>
                <Button
                  size="small"
                  startIcon={<DescriptionIcon />}
                  onClick={() => handleViewTranscript(recording.id)}
                >
                Transcript
                </Button>
              </CardActions>
            </Card>
          { videoUrl && <Card>
            <CardMedia
              component="video"
              controls
              src={videoUrl}
              title="Video Player"
              sx={{ height: 240 }}
            />
          </Card> }
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PersonalScreen;