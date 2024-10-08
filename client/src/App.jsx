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
import CreateEvent from "./pages/CreateEvent";
import EditProfile from "./pages/EditProfile";
import About from "./pages/AboutUs";
import MyEvents from "./pages/MyEvents";
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
        <Route path="/viewer/events/:id" element={<EventViewer/>} />
        <Route path="/member/events/:id" element={<EventMember/>} />
        <Route path="/events/:id/edit" element={<EditEvent/>} />
        <Route path="/host-event" element={<CreateEvent/>} />
        <Route path="/users/:id/edit" element={<EditProfile/>} />
        <Route path="/about-us" element={<About/>} />
        <Route path="/my-events" element={<MyEvents/>} />
        <Route path="/my-profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
