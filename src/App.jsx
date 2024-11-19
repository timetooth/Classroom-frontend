import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeachersPortal from './pages/TeachersPortal';
import StudentsPortal from './pages/StudentsPortal';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/teachers-portal" element={<TeachersPortal />} />
        <Route path="/students-portal" element={<StudentsPortal />} />
      </Routes>
    </Router>
  );
};

export default App;
