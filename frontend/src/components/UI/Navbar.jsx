import { useState,useEffect } from "react";
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

  // Desktop Link Style
  const desktopLinkClass = (path) =>
    `relative font-semibold text-sm lg:text-[17px] transition-colors 
     ${isActive(path) ? "text-blue-700" : "text-gray-600 hover:text-blue-600"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1 
     after:h-[2px] after:w-full after:rounded-full after:bg-linear-to-r after:from-blue-600 after:to-indigo-600
     after:scale-x-0 after:origin-left after:transition-transform after:duration-300
     hover:after:scale-x-100
     ${isActive(path) ? "after:scale-x-100" : ""}`;

  // Mobile Link Style
  const mobileLinkClass = (path) =>
    `block w-full px-4 py-3 rounded-xl font-semibold text-sm transition-colors
     ${
       isActive(path)
         ? "bg-blue-50 text-blue-700"
         : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
     }`;

    //  for stop scrollabe inside slide 
     useEffect(() => {
  if (openMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [openMenu]);


  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* LEFT SIDE (Mobile Menu Button) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpenMenu(true)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition"
          >
            <Menu size={24} />
          </button>

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
        </div>

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

              <Link
                to="/admin/assign-volunteer"
                className={desktopLinkClass("/admin/assign-volunteer")}
              >
                Assign Volunteer
              </Link>
            </>
          )}

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
          {/* Desktop Logout */}
          {auth && (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:text-red-700 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

          {/* Profile */}
          {auth && (
            <div
              title={auth?.user?.name || "Profile"}
              className="size-10 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg cursor-pointer select-none"
            >
              {getInitials(auth?.user?.name)}
            </div>
          )}
        </div>
      </div>

      {/*  Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-999 md:hidden transition-all duration-300 ${
          openMenu ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpenMenu(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            openMenu ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 z-1000 h-full w-72.5 bg-white shadow-2xl border-r border-gray-200 transform transition-transform duration-300 flex flex-col ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="size-9 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <Ticket size={18} className="text-white" />
              </div>

              <h2 className="font-black text-gray-900 text-lg">Eventify</h2>
            </div>

            <button
              onClick={() => setOpenMenu(false)}
              className="p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <X size={22} className="text-gray-700" />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">
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

                <Link
                  to="/admin/assign-volunteer"
                  onClick={() => setOpenMenu(false)}
                  className={mobileLinkClass("/admin/assign-volunteer")}
                >
                  Assign Volunteer
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
          </div>

          {/* Logout Button Fixed at Bottom */}
          {auth && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full bg-linear-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-black shadow-md hover:from-red-600 hover:to-red-700 transition flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
