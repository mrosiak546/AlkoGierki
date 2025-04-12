import { Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import GameRoom from './pages/GameRoom';
import AddQuestionForm from './pages/AddQuestionForm';
import RoomList from './pages/RoomsList';
import { Moon, Sun } from 'react-bootstrap-icons';
import './styles/themes.css';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

export default function AppRoutes() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
      document.body.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);
  
    return (
      <Router>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className="d-flex flex-column py-4  w-100 px-4" style={{ maxWidth: '400px' }}>
                <Button
                  className='btnChangeMode'
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun/> : <Moon />}
                </Button>
          </div>
        </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/room/:roomId" element={<GameRoom />} />
            <Route path="/addQuestion" element={<AddQuestionForm/>} />
            <Route path="/rooms" element={<RoomList />} />
          </Routes>
      </Router>
    );
}
