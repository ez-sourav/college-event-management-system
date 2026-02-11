import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import EventCard from "../../components/volunteer/EventCard";
import { useAuthContext } from "../../../hooks/useAuthContext";

const AssignedEvents = () => {
  const { auth } = useAuthContext();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [assignedEvents, setAssignedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Assigned Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/volunteering/me", {
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

  console.log(assignedEvents);

  // ✅ Derived Filtered Events
  const filteredEvents = useMemo(() => {
    return assignedEvents.filter((event) => {
      const now = new Date();
      const start = new Date(event.startTime);
      const end = new Date(event.endTime);

      const isLive = now >= start && now <= end;
      const isUpcoming = now < start;
      const isCompleted = now > end;

      // 🔎 Search match (name + venue)
      const matchesSearch =
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // 🎯 Filter logic
      if (filter === "live") return isLive;
      if (filter === "upcoming") return isUpcoming;
      if (filter === "completed") return isCompleted;

      return true; // all
    });
  }, [assignedEvents, search, filter]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading assigned events...
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 lg:px-10 py-6 bg-[#f6f6f8] min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h2 className="font-black text-2xl sm:text-3xl">Assigned Events</h2>

        <p className="text-gray-500 text-sm sm:text-base max-w-3xl">
          You have{" "}
          <span className="text-blue-800 font-semibold">
            {filteredEvents.length}
          </span>{" "}
          assigned events.
        </p>

        {/* Search + Filters */}
        <div className="mt-4 bg-white border border-gray-200 rounded-2xl px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shadow-sm">
          {/* 🔎 Search */}
          <div className="flex items-center gap-3 w-full lg:max-w-md bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            <Search className="text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by event name or venue..."
              className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
            />
          </div>

          {/* 🎯 Filters */}
          <div className="grid grid-cols-4 gap-2 sm:flex sm:w-auto sm:gap-3">
            {["all", "live", "upcoming", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`py-2 px-4 text-xs sm:text-sm rounded-lg font-semibold transition capitalize
                  ${
                    filter === type
                      ? "bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
          <p className="text-gray-500 text-sm col-span-full text-center py-10">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AssignedEvents;
