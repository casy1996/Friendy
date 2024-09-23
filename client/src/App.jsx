import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Viewer from "./pages/FriendyViewer";
import Member from "./pages/FriendyMember";
import EventViewer from "./pages/EventDetailsViewer";
import EventMember from "./pages/EventDetailsMember";
import EditEvent from "./pages/EditEvent";
import About from "./pages/AboutUs";
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
        <Route path="/viewer/events/:eventId" element={<EventViewer/>} />
        <Route path="/member/events/:eventId" element={<EventMember/>} />
        <Route path="/events/:eventId/edit" element={<EditEvent/>} />
        <Route path="/about-us" element={<About/>} />
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
