import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateAccountPage from './components/CreateAccountPage';
import LoginPage from './components/LoginPage';
import MainAppPage from './components/MainAppPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<MainAppPage />} />
      </Routes>
    </Router>
  );
};

export default App;
