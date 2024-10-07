import React, {useEffect, useState} from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
} from '@mui/material';
import {
  Book as BookIcon,
  Mic as MicIcon,
  Description as DescriptionIcon,
  NoteAdd as NoteAddIcon,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import { getLectures } from '../Services/getData';

// const lectures = [
//   { id: 1, name: "Introduction to the Course" },
//   { id: 2, name: "Basic Concepts" },
//   { id: 3, name: "Advanced Topics" },
//   { id: 4, name: "Practical Applications" },
//   { id: 5, name: "Case Studies" },
//   { id: 6, name: "Final Review" },
// ];

const LecturesScreen = () => {

    const navigate = useNavigate();

    const handleonclickTakeNotes = () => {
        navigate ('/conversations')
    }

    const [lectures, setLectures] = useState([]);

    useEffect( () => {

      const fetchLectures = async () => {
          try {
            console.log("Fetching the Lectures says react")
            const lectures = await getLectures()
            console.log("Lectures are arrived in frontend",lectures.Lectures)
            setLectures(lectures.lectures)
          }
          catch (error) {
            console.error("Error getting Lectures to the frontend",error)
          }
      }

      fetchLectures()

    }, [])

  return (
    <Container maxWidth="fullwidth" sx={{ py: 4, background: 'linear-gradient(to bottom, #99c2ff, #ffffff)' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Course: Introduction to World History
      </Typography>
      <List>
        { lectures && lectures.length > 0 ? (
          lectures.map((lecture) => (
          <ListItem key={lecture.id} alignItems="flex-start" sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText 
              primary={lecture.title}
              sx={{ mr: 2 }}
            />
            <Box>
              <Button startIcon={<MicIcon />} variant="outlined" size="small" sx={{ mr: 1 }}>
                Recording
              </Button>
              <Button startIcon={<DescriptionIcon />} variant="outlined" size="small" sx={{ mr: 1 }}>
                Transcript
              </Button>
              <Button startIcon={<NoteAddIcon />} variant="outlined" size="small" onClick = {handleonclickTakeNotes}>
                Take Notes
              </Button>
            </Box>
          </ListItem>
        )) ): 
        <Typography variant="h4" component="h1" gutterBottom align="center">
          No Lectures to show
        </Typography>
      }
      </List>
    </Container>
  );
};

export default LecturesScreen;