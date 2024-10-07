import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { AccountCircle as AccountCircleIcon, Note as NoteIcon, School as SchoolIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const HomeScreen = () => {

    const navigate = useNavigate();

    const handleOnClickCourses = () => {
        navigate('/courses');
    } 

    const handleOnClickPersonalNotes = () => {
        navigate('/personalNotes')
    }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Division */}
      <Box sx={{ 
        width: '30%', 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #99c2ff, #ffffff)', // Light blue gradient
        boxShadow: '0 0 10px rgba(0,0,0,0.1)', // Optional: adds a subtle shadow
    }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 60 }} />
        </Avatar>
        <Typography variant="h6" gutterBottom>John Doe</Typography>
        <Typography variant="body1" gutterBottom>School ID: 12345678</Typography>
        <Typography variant="body1">Current Semester: Fall 2024</Typography>
      </Box>

      {/* Vertical Divider */}
      <Divider orientation="vertical" flexItem />

      {/* Right Division */}
      <Box sx={{ width: '70%', p: 3, display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, #99c2ff, #ffffff)' }}>
        <Card sx={{ mb: 2, flex: 1 , background: 'linear-gradient(to bottom, #99c2ff, #ffffff)', }} onClick={handleOnClickPersonalNotes}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NoteIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Your Personal Notes and Recordings</Typography>
            </Box>
            <Typography variant="body2" style={{fontSize:'18px'}}>
              Access and manage your personal notes here. Click to view or create new notes.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, cursor: 'pointer','&:hover': { boxShadow: 6, }, background: 'linear-gradient(to bottom, #99c2ff, #ffffff)' }} onClick={handleOnClickCourses}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Your Courses</Typography>
            </Box>
            <Typography variant="body2" style={{fontSize:'18px'}}>
              View and access your enrolled courses. Click to see course details and materials.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HomeScreen;
