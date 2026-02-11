import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function Navbar() {
  const { auth, logout } = useAuthContext();
  const navigate = useNavigate();

  const role = auth?.user?.role;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-indigo-600">
        Eventify
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        {/* Not Logged In */}
        {!auth && (
          <>
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Signup
            </Link>
          </>
        )}

        {/* ADMIN LINKS */}
        {role === "ADMIN" && (
          <>
            <Link to="/admin/dashboard" className="hover:text-indigo-600">
              Dashboard
            </Link>
            <Link to="/admin/create-event" className="hover:text-indigo-600">
              Create Event
            </Link>
            <Link
              to="/admin/create-volunteer"
              className="hover:text-indigo-600"
            >
              Create Volunteer
            </Link>
          </>
        )}

        {/* STUDENT LINKS */}
        {role === "STUDENT" && (
          <>
            <Link to="/events" className="hover:text-indigo-600">
              Events
            </Link>
            <Link to="/my-ticket" className="hover:text-indigo-600">
              My Tickets
            </Link>
          </>
        )}

        {/* VOLUNTEER LINKS */}
        {role === "VOLUNTEER" && (
          <>
            <Link to="/assigned-events" className="hover:text-indigo-600">
              Assigned Events
            </Link>
          </>
        )}

        {/* Logout Button */}
        {auth && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
