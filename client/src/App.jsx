import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/LandingPage';
import CreateAccount from './components/Create_Account';
import Login from './components/Login';
import Main from './components/Friendy_Main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/friendy" element={<Landing />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friendy-home" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
