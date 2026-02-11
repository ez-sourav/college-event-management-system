import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import CreateEvent from "./screens/admin/CreateEvent";
import MyTicket from "./screens/participant/MyTickets";
import EventDetails from "./screens/participant/EventDetails";
import AdminDashboard from "./screens/admin/AdminDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/createevent" element={<CreateEvent />} />
      <Route path="/myticket" element={<MyTicket />} />
      <Route path="/eventdetails" element={<EventDetails/>} />
      <Route path="/admindashboard" element={<AdminDashboard/>} />
    </Routes>
  );
};

export default App;
