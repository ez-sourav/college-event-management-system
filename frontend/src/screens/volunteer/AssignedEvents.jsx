import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Search, CalendarCheck2, AlertTriangle, Loader } from "lucide-react";
import EventCard from "../../components/volunteer/EventCard";
import { useAuthContext } from "../../../hooks/useAuthContext";

const AssignedEvents = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const { auth } = useAuthContext();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [assignedEvents, setAssignedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch Assigned Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${baseURL}/volunteering/me`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const events = res.data.assignedEvents;
        setAssignedEvents(events);
      } catch (error) {
        console.error("Error fetching assigned events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      fetchEvents();
    }
  }, [auth]);

  //  Derived Filtered Events
  const filteredEvents = useMemo(() => {
    return assignedEvents.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "live") return event.status === "LIVE";
      if (filter === "upcoming") return event.status === "UPCOMING";
      if (filter === "completed") return event.status === "COMPLETED";

      return true;
    });
  }, [assignedEvents, search, filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f8] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 text-[#1121d4] font-black text-lg">
            <Loader size={18} />
            Loading Events
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we fetch your assigned events...
          </p>

          <div className="mt-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/5 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f8] min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-6">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <CalendarCheck2 size={20} className="text-[#1121d4]" />
            </div>

            <div>
              <h2 className="font-black text-2xl sm:text-3xl text-gray-900">
                Assigned Events
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">
                Manage your volunteering assignments
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
            You have{" "}
            <span className="text-[#1121d4] font-black">
              {filteredEvents.length}
            </span>{" "}
            assigned events.
          </p>

          {/* Search + Filters */}
          <div className="mt-4 bg-white border border-gray-200 rounded-2xl px-4 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shadow-sm">
            {/* Search */}
            <div className="flex items-center gap-3 w-full lg:max-w-md bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#1121d4] focus-within:ring-2 focus-within:ring-[#1121d4]/20 transition">
              <Search className="text-gray-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search by event name or venue..."
                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-3">
              {["all", "live", "upcoming", "completed"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`w-full px-4 py-2.5 font-bold text-xs sm:text-sm rounded-xl  transition capitalize whitespace-nowrap border
                    ${
                      filter === type
                        ? "bg-[#1121d4] text-white border-[#1121d4] shadow-md shadow-[#1121d4]/20"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="size-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                <AlertTriangle size={26} className="text-red-500" />
              </div>

              <h3 className="mt-4 text-gray-900 font-black text-lg">
                No events found
              </h3>
              <p className="text-gray-500 text-sm mt-1 max-w-md p-2">
                Try changing the filter or searching with a different keyword.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedEvents;
