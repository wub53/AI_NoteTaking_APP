import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const SERVICE_URL= "http://localhost:5000/";

const conversationHistory = [
  { id: 1, title: "Introduction to React" },
  { id: 2, title: "State and Props" },
  { id: 3, title: "Hooks in React" },
  { id: 4, title: "React Router" },
  { id: 5, title: "Redux Basics" },
];

const ConversationScreen = () => {

  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const [transcript, setTranscript] = useState('Loading transcript...');

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await fetch('/transcript.txt');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setTranscript(text);
      } catch (error) {
        console.error('Error reading transcript file:', error);
        setTranscript('Error loading transcript');
      }
    };

    fetchTranscript();
  }, []);


  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    // if (!question.trim()) return;

    setLoading(true);
    try {
      console.log(" question to be asked : ",question)
      const result = await axios.post(`${SERVICE_URL}api/ask`, { question });
      console.log(result)
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setLoading(false);
    }
    setQuestion('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Divider */}
      <Box sx={{ width: '40%', p: 2, borderRight: 1, borderColor: 'divider', background: 'linear-gradient(to bottom, #99c2ff, #ffffff)' }}>
        <Typography variant="h6" gutterBottom>
            Transcript
        </Typography>
        <Box sx={{
            height: '100vh', // Set a fixed height or use calc() for responsive height
            overflowY: 'auto', // Enable vertical scrolling
            border: '1px solid #ccc', // Optional: adds a border around the transcript
            borderRadius: '4px', // Optional: rounds the corners
            padding: '10px', // Optional: adds some inner spacing
            fontSize: '20px' 
          }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {transcript}
        </Typography>
        </Box>
        {/* <List>
          {conversationHistory.map((item, index) => (
            <React.Fragment key={item.id}>
              <Paper elevation={1} sx={{ mb: 1 }}>
                <ListItem button>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Paper>
              {index < conversationHistory.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List> */}
      </Box>

      {/* Vertical Divider */}
      <Divider orientation="vertical" flexItem />

      {/* Right Divider */}
      <Box sx={{ width: '60%', p: 2, display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, #99c2ff, #ffffff)' }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100% - 70px)',background: 'linear-gradient(to bottom, #99c2ff, #ffffff)' }}>
          <Typography variant="h6" gutterBottom>
            Lecture Summary
          </Typography>
          <Typography variant="body1" style={{ fontSize: '18px' }}>
             The text appears to be a professor's lecture about a world history course. The professor emphasizes that the course will not focus on memorizing dates or facts from the assigned textbook, but rather on thinking critically about its content. Students are encouraged to question and deconstruct the material in it. The professor also discusses the issues and compromises that arise while constructing a world history narrative, the influence of textbook publishers, and expectations for the different sections of the course. It is hinted that the textbook used in the course is one that the professor had significant input in creating or editing. 
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, mb: 2, flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100% - 70px)',background: 'linear-gradient(to bottom, #99c2ff, #ffffff)' }}>
            <Typography variant="h6" gutterBottom style={{ fontSize: '20px' }}>
              Response
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Typography variant="body1" style={{ fontSize: '18px' }}>
                {response}
              </Typography>
            )}
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask anything"
            value={question}
            onChange={handleQuestionChange}
            onKeyDown={handleKeyPress}
            sx={{ mr: 1 }}
          />
          <IconButton color="primary" aria-label="send message" onClick={handleSubmit} disabled={loading}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ConversationScreen;