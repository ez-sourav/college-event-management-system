import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
//auth
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
//admin
import AdminDashboard from "./screens/admin/AdminDashboard";
import CreateVolunteer from "./screens/admin/CreateVolunteer";
import CreateEvent from "./screens/admin/CreateEvent";
//participant
import EventListings from "./screens/participant/EventListings";
import MyTicket from "./screens/participant/MyTickets";
import EventDetails from "./screens/participant/EventDetails";
//volunteer
import AssignedEvents from "./screens/volunteer/AssignedEvents";
import PageNotFound from "./screens/PageNotFound";
import Unauthorized from "./screens/Unauthorized";
import GuestRoute from "./components/auth/GuestRoute";
import RootRedirect from "./components/auth/RootRedirect";
import Navbar from "./components/UI/Navbar";
import QrScanner from "./screens/volunteer/QrScanner";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        {/* Public Routes */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-event" element={<CreateEvent />} />
          <Route path="/admin/create-volunteer" element={<CreateVolunteer />} />
        </Route>

        {/* PARTICIPANT ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
          <Route path="/events" element={<EventListings />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/my-ticket" element={<MyTicket />} />
        </Route>

        {/* VOLUNTEER ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["VOLUNTEER"]} />}>
          <Route path="/assigned-events" element={<AssignedEvents />} />
          <Route path="/scan/:eventId" element={<QrScanner />} />
        </Route>

        {/*Unauthorized*/}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Catch All */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
