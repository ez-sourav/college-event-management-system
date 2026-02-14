import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


import {
  Search,
  Ticket,
  Trash2,
  Users,
  HandHeart,
  IndianRupee,
  Code,
  Bot,
  Terminal,
  Gamepad2,
  Mic,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

const AdminDashboard = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [searchQuery, setSearchQuery] = useState("");

  // ================== REAL DATA STATES ==================
  const [statsData, setStatsData] = useState({
    totalRegistrations: 0,
    liveAttendance: 0,
    volunteersActive: 0,
    revenueCollected: 0,
  });

  const [events, setEvents] = useState([]);

  // ================== DELETE EVENT ==================
  const handleDeleteEvent = async (eventId) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      if (!token) {
        alert("Login required!");
        return;
      }

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this event?",
      );

      if (!confirmDelete) return;

      await axios.delete(`${baseURL}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents((prev) => prev.filter((e) => e.id !== eventId));

      alert("Event deleted successfully!");
    } catch (error) {
      console.log("Delete Event Error:", error);
      alert(error.response?.data?.message || "Failed to delete event!");
    }
  };

  // ================== FETCH REAL DATA ==================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;

        if (!token) {
          console.log("Token not found!");
          return;
        }

        // Fetch Dashboard Stats
        const statsRes = await axios.get(
          `${baseURL}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStatsData(statsRes.data);

        // Fetch Events List
        const eventsRes = await axios.get(`${baseURL}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedEvents = eventsRes.data.events.map((event) => {
          const start = new Date(event.startTime);
          const end = new Date(event.endTime);
          const now = new Date();

          let tag = "Upcoming";
          let tagColor = "bg-gray-100 text-gray-600";

          if (now >= start && now <= end) {
            tag = "Live Now";
            tagColor = "bg-green-100 text-green-800";
          } else if (now < start) {
            tag = "Upcoming";
            tagColor = "bg-blue-100 text-blue-800";
          } else {
            tag = "Completed";
            tagColor = "bg-gray-200 text-gray-700";
          }

          const registered = event.registrationsCount || 0;
          const target = event.maxParticipants || 0;

          const progress =
            target > 0 ? Math.min((registered / target) * 100, 100) : 0;

          let note = "";
          let noteIcon = null;
          let noteColor = "";

          if (target > 0 && registered >= target) {
            note = "Full Capacity";
            noteIcon = CheckCircle2;
            noteColor = "text-emerald-600";
          } else if (target > 0 && target - registered <= 20) {
            note = `Only ${target - registered} spots left`;
            noteIcon = AlertTriangle;
            noteColor = "text-orange-600";
          }

          const name = (event.name || "").toLowerCase();

          let icon = Ticket;
          let iconBg = "bg-blue-100";
          let iconColor = "text-blue-700";

          if (name.includes("hack") || name.includes("code")) {
            icon = Code;
            iconBg = "bg-blue-100";
            iconColor = "text-blue-700";
          } else if (name.includes("robo") || name.includes("robot")) {
            icon = Bot;
            iconBg = "bg-purple-100";
            iconColor = "text-purple-700";
          } else if (name.includes("contest")) {
            icon = Terminal;
            iconBg = "bg-orange-100";
            iconColor = "text-orange-700";
          } else if (name.includes("game")) {
            icon = Gamepad2;
            iconBg = "bg-pink-100";
            iconColor = "text-pink-700";
          } else if (name.includes("lecture")) {
            icon = Mic;
            iconBg = "bg-teal-100";
            iconColor = "text-teal-700";
          }

          return {
            id: event._id,
            title: event.name,
            tag,
            tagColor,
            date: start.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            time: `${start.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })} - ${end.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}`,
            venue: event.venue,
            registered,
            target,
            progress: Math.round(progress),
            progressColor: progress >= 100 ? "bg-emerald-500" : "bg-blue-700",
            note,
            noteIcon,
            noteColor,
            icon,
            iconBg,
            iconColor,
          };
        });

        setEvents(formattedEvents);

      } catch (error) {
        console.log("Dashboard Fetch Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // ================== STATS UI DATA ==================
  const stats = [
    {
      title: "Total Registrations",
      value: statsData.totalRegistrations.toLocaleString("en-IN"),
      icon: Ticket,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-700",
    },
    {
      title: "Live Attendance",
      value: statsData.liveAttendance.toLocaleString("en-IN"),
      icon: Users,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-700",
    },
    {
      title: "Volunteers Active",
      value: statsData.volunteersActive.toLocaleString("en-IN"),
      icon: HandHeart,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-700",
    },
    {
      title: "Revenue Collected",
      value: `₹${statsData.revenueCollected.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-700",
    },
  ];

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;

    const q = searchQuery.toLowerCase();

    return events.filter((event) => {
      return (
        event.title.toLowerCase().includes(q) ||
        event.tag.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.date.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, events]);

  return (
    <div className="bg-[#f6f6f8] min-h-screen text-slate-900">
      {/* ================= TOP OVERVIEW BAR ================= */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sticky top-0 z-40">
        {/* Desktop / Tablet */}
        <div className="hidden sm:flex items-center justify-between gap-5 px-2">
          <h2 className="text-lg lg:text-xl font-bold text-gray-900">
            Overview
          </h2>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Search */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56 lg:w-72">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search participants, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full pl-2 text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Overview</h2>
          </div>

          <div className="mt-3 flex gap-2">
            {/* Search */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full pl-2 text-xs text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= DASHBOARD CONTENT ================= */}
      <div className="p-3 sm:p-4 lg:p-8 pb-16 sm:pb-20">
        
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3 lg:mb-4">
                  <div
                    className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${item.iconBg} ${item.iconColor}`}
                  >
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="text-slate-500 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 leading-tight">
                  {item.title}
                </h3>

                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 lg:p-6 border-b border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Events Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
              Manage capacity and check details for today's schedule.
            </p>
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">
              No events found for:{" "}
              <span className="font-semibold text-slate-800">
                {searchQuery}
              </span>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse min-w-225">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="px-6 py-4 text-left">Event Name</th>
                      <th className="px-6 py-4 text-left">Date & Time</th>
                      <th className="px-6 py-4 text-left">Venue</th>
                      <th className="px-6 py-4 min-w-55 text-left">
                        Capacity Status
                      </th>
                      <th className="px-6 py-4 text-left ">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {filteredEvents.map((event) => {
                      const EventIcon = event.icon;
                      const NoteIcon = event.noteIcon;

                      return (
                        <tr
                          key={event.id}
                          className="group hover:bg-slate-50 transition"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${event.iconBg} ${event.iconColor}`}
                              >
                                <EventIcon size={20} />
                              </div>

                              <div>
                                <p className="font-semibold text-slate-900 text-sm">
                                  {event.title}
                                </p>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${event.tagColor}`}
                                >
                                  {event.tag}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex flex-col text-sm text-slate-600">
                              <span className="font-medium">{event.date}</span>
                              <span className="text-slate-500 text-xs">
                                {event.time}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {event.venue}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-700">
                                  {event.registered} Registered
                                </span>
                                <span className="text-slate-500">
                                  Target: {event.target}
                                </span>
                              </div>

                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className={`${event.progressColor} h-2 rounded-full`}
                                  style={{ width: `${event.progress}%` }}
                                ></div>
                              </div>

                              {event.note && (
                                <p
                                  className={`text-xs font-medium mt-0.5 flex items-center gap-1 ${event.noteColor}`}
                                >
                                  <NoteIcon size={14} />
                                  {event.note}
                                </p>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4  w-40 ">
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-lg transition"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-slate-200">
                {filteredEvents.map((event) => {
                  const EventIcon = event.icon;
                  const NoteIcon = event.noteIcon;

                  return (
                    <div
                      key={event.id}
                      className="p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center shrink-0 ${event.iconBg} ${event.iconColor}`}
                        >
                          <EventIcon size={20} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                              {event.title}
                            </h4>

                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium shrink-0 ${event.tagColor}`}
                            >
                              {event.tag}
                            </span>
                          </div>

                          <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-slate-400" />
                              <span>{event.date}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Clock size={14} className="text-slate-400" />
                              <span>{event.time}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <MapPin size={14} className="text-slate-400" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs sm:text-sm font-medium mb-2">
                          <span className="text-slate-700">
                            {event.registered} / {event.target} Registered
                          </span>
                          <span className="text-slate-500">
                            {event.progress}%
                          </span>
                        </div>

                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`${event.progressColor} h-2 rounded-full transition-all`}
                            style={{ width: `${event.progress}%` }}
                          ></div>
                        </div>

                        {event.note && (
                          <p
                            className={`text-xs sm:text-sm font-medium mt-2 flex items-center gap-1.5 ${event.noteColor}`}
                          >
                            <NoteIcon size={14} />
                            {event.note}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition"
                      >
                        <Trash2 size={16} />
                        Delete Event
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs sm:text-sm text-slate-500">
              Showing {filteredEvents.length} of {events.length} events
            </span>

            <div className="flex gap-2">
              <button
                disabled
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Previous
              </button>

              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
