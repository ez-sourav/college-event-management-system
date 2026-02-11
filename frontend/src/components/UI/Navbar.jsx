import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Ticket, Menu, X, LogOut } from "lucide-react";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function Navbar() {
  const { auth, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);

  const role = auth?.user?.role;

  const handleLogout = () => {
    logout();
    setOpenMenu(false);
    navigate("/login");
  };

  const getInitials = (name = "") => {
    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 0) return "?";
    if (words.length === 1) return words[0][0].toUpperCase();

    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const isActive = (path) => location.pathname === path;

  // Desktop Link Style (Full underline effect)
  const desktopLinkClass = (path) =>
    `relative font-semibold text-sm lg:text-base transition-colors 
     ${
       isActive(path)
         ? "text-blue-700"
         : "text-gray-600 hover:text-blue-600"
     }
     after:content-[''] after:absolute after:left-0 after:-bottom-1 
     after:h-[2px] after:w-full after:rounded-full after:bg-linear-to-r after:from-blue-600 after:to-indigo-600
     after:scale-x-0 after:origin-left after:transition-transform after:duration-300
     hover:after:scale-x-100
     ${isActive(path) ? "after:scale-x-100" : ""}`;

  // Mobile Link Style
  const mobileLinkClass = (path) =>
    `font-semibold text-sm transition-colors
     ${
       isActive(path)
         ? "text-blue-700 underline decoration-blue-500 decoration-2 underline-offset-4"
         : "text-gray-600 hover:text-blue-600 hover:underline hover:decoration-blue-500 hover:decoration-2 hover:underline-offset-4"
     }`;

  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-900 hover:opacity-90 transition"
        >
          <div className="size-9 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <Ticket size={18} className="text-white" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Eventify
          </h2>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {!auth && (
            <>
              <Link to="/" className={desktopLinkClass("/")}>
                Home
              </Link>

              <Link to="/login" className={desktopLinkClass("/login")}>
                Login
              </Link>

              <Link to="/signup" className={desktopLinkClass("/signup")}>
                Signup
              </Link>
            </>
          )}

          {/* ADMIN LINKS */}
          {role === "ADMIN" && (
            <>
              <Link
                to="/admin/dashboard"
                className={desktopLinkClass("/admin/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                to="/admin/create-event"
                className={desktopLinkClass("/admin/create-event")}
              >
                Create Event
              </Link>

              <Link
                to="/admin/create-volunteer"
                className={desktopLinkClass("/admin/create-volunteer")}
              >
                Create Volunteer
              </Link>
            </>
          )}

          {/* STUDENT LINKS */}
          {role === "STUDENT" && (
            <>
              <Link to="/events" className={desktopLinkClass("/events")}>
                Events
              </Link>

              <Link to="/my-ticket" className={desktopLinkClass("/my-ticket")}>
                My Tickets
              </Link>
            </>
          )}

          {/* VOLUNTEER LINKS */}
          {role === "VOLUNTEER" && (
            <Link
              to="/assigned-events"
              className={desktopLinkClass("/assigned-events")}
            >
              Assigned Events
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop Logout Button */}
          {auth && (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:text-red-700 hover:cursor-pointer transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

          {/* Profile Initials */}
          {auth && (
            <div
              title={auth?.user?.name || "Profile"}
              className="size-10 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg cursor-pointer select-none"
            >
              {getInitials(auth?.user?.name)}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            {openMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden px-6 py-5 bg-white/90 backdrop-blur-xl border-t border-white/30 shadow-md flex flex-col gap-4">
          {!auth && (
            <>
              <Link
                to="/"
                onClick={() => setOpenMenu(false)}
                className={mobileLinkClass("/")}
              >
                Home
              </Link>

              <Link
                to="/login"
                onClick={() => setOpenMenu(false)}
                className={mobileLinkClass("/login")}
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpenMenu(false)}
                className={mobileLinkClass("/signup")}
              >
                Signup
              </Link>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <Link
                to="/admin/dashboard"
                onClick={() => setOpenMenu(false)}
                className={mobileLinkClass("/admin/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                to="/admin/create-event"
                onClick={() => setOpenMenu(false)}
                className={mobileLinkClass("/admin/create-event")}
              >
                Create Event
              </Link>

              <Link
                to="/admin/create-volunteer"
                onClick={() => setOpenMenu(false)}
                className={mobileLinkClass("/admin/create-volunteer")}
              >
                Create Volunteer
              </Link>
            </>
          )}

          {role === "STUDENT" && (
            <>
              <Link
                to="/events"
                onClick={() => setOpenMenu(false)}
                className={mobileLinkClass("/events")}
              >
                Events
              </Link>

              <Link
                to="/my-ticket"
                onClick={() => setOpenMenu(false)}
                className={mobileLinkClass("/my-ticket")}
              >
                My Tickets
              </Link>
            </>
          )}

          {role === "VOLUNTEER" && (
            <Link
              to="/assigned-events"
              onClick={() => setOpenMenu(false)}
              className={mobileLinkClass("/assigned-events")}
            >
              Assigned Events
            </Link>
          )}

          {/* Logout in Mobile */}
          {auth && (
            <button
              onClick={handleLogout}
              className="w-full bg-linear-to-r from-red-500 to-red-600 text-white py-2.5 rounded-xl font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
