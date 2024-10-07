import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { 
  Container, 
  Typography, 
  Grid2, 
  Card, 
  CardMedia, 
  CardContent 
} from '@mui/material';

import { getCourses } from '../Services/getData';

// const courses = [
//   { id: 1, name: "Introduction to World History", image: "https://via.placeholder.com/300x200/579bff/FFFFFF?text=History",  },
//   { id: 2, name: "Advanced JavaScript", image: "https://via.placeholder.com/300x200/579bff/FFFFFF?text=JavaScript", },
//   { id: 3, name: "Python for Beginners", image: "https://via.placeholder.com/300x200/579bff/FFFFFF?text=Python",  },
//   { id: 4, name: "Data Structures and Algorithms", image: "https://via.placeholder.com/300x200/579bff/FFFFFF?text=DSA", },
//   { id: 5, name: "Machine Learning Basics", image: "https://via.placeholder.com/300x200/579bff/FFFFFF?text=ML", },
//   { id: 6, name: "Web Development Bootcamp", image: "https://via.placeholder.com/300x200/579bff/FFFFFF?text=Web+Dev",}
// ];

const CoursesScreen = () => { 

  const navigate = useNavigate();

  const [ courses , setCourses] = useState([])

  useEffect( () => {
    const fetchCourses = async () =>{

      try {
          const courses_ = await getCourses()
          console.log("Courses Arrived in frontend",courses_)
          setCourses(courses_.coursesFromDb)
      }
      catch (error) {
          console.error("Error getting the courses to the frontend",error)
      }
    }
    fetchCourses();

  },[])

  const handleOnClickCourse = () => {
    navigate('/lectures');
  }

  return (
    <Container maxWidth="fullwidth" sx={{ py: 4 , background: 'linear-gradient(to bottom, #99c2ff, #ffffff)'}}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Your Courses
      </Typography>
      <Grid2 container spacing={4}>
        { courses && courses.length > 0 ? (
          courses.map((course) => (
          <Grid2 item key={course._id} xs={12} sm={6} md={4}>
            <Card sx={{ flex: 1, cursor: 'pointer','&:hover': { boxShadow: 6, } }} onClick = {handleOnClickCourse}>
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.course}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {course.course}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        )) ) : (
          <Grid2 item xs={12}>
            <Typography variant="body1" align="center">
              No courses available.
            </Typography>
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};

export default CoursesScreen;