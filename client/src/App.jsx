import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/LandingPage';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Main from './pages/FriendyMain';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/friendy" element={<Landing />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friendy-home" element={<Main />} />
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
