import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Viewer from "./pages/FriendyViewer";
import Member from "./pages/FriendyMember";
import Event from "./pages/EventDetails";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/friendy" element={<Landing />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friendy-guest" element={<Viewer />} />
        <Route path="/friendy-home" element={<Member />} />
        <Route path="/events/:eventId" element={<Event/>} />
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
