import logo from './logo.svg';
import './App.css';
import './Pages/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginScreen from './Pages/LoginScreen';
import CoursesScreen from './Pages/CoursesScreen';
import LecturesScreen from './Pages/LecturesScreen';
import HomeScreen from './Pages/HomeScreen';
import ConversationScreen from './Pages/ConversationScreen';
import VideoUploadButton from './Utils/UploadService';
import PersonalScreen from './Pages/PersonalScreen';

function App() {
  return (
    
    <Router>
        <div className="App">
        <Routes>

          <Route path = '/' element={<LoginScreen/>}/>
          <Route path= '/courses' element={<CoursesScreen/>} />
          <Route path= '/lectures' element={<LecturesScreen/>} />
          <Route path= '/home' element={<HomeScreen/>} />
          <Route path= '/conversations' element={<ConversationScreen/>} />
          <Route path= '/personalNotes' element={<PersonalScreen/>} />
        </Routes> 
      </div>
    </Router>

  );
}

export default App;
