import React, { useState } from "react";
import { Search } from "lucide-react";
import EventCard from "../../components/volunteer/EventCard";

const AssignedEvents = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "AI Robotics Workshop",
      type: "Workshop",
      status: "active",
      time: "09:00 AM - 11:00 AM",
      location: "Engineering Block, Room 304",
      checked: 45,
      total: 60,
      locked: false,
      image:
        "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=600",
    },
    {
      id: 2,
      title: "Future of Tech: Keynote",
      type: "Keynote",
      status: "soon",
      time: "01:00 PM - 03:00 PM",
      location: "Main Auditorium Hall",
      checked: 312,
      total: 500,
      locked: false,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600",
    },
    {
      id: 3,
      title: "Hackathon: Final Round",
      type: "Competition",
      status: "upcoming",
      time: "04:00 PM - 08:00 PM",
      location: "Innovation Hub, Lab 1",
      checked: 0,
      total: 80,
      locked: true,
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "active") return matchesSearch && event.status === "active";
    if (filter === "upcoming")
      return matchesSearch && event.status !== "active";

    return matchesSearch;
  });

  return (
    <div className="px-4 sm:px-8 lg:px-10 py-6 bg-[#f6f6f8] min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h2 className="font-black text-2xl sm:text-3xl">
          Welcome Back, <span className="text-blue-700">Name</span>!
        </h2>

        <p className="text-gray-500 text-sm sm:text-base max-w-3xl">
          You have{" "}
          <span className="text-blue-800 font-semibold">
            {events.length} assigned events
          </span>{" "}
          today. Select an event below to begin managing check-ins and accessing
          scanner tools.
        </p>

        {/* Search + Filters */}
        <div className="mt-4 bg-white border border-gray-200 rounded-2xl px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shadow-sm">
          {/* Search */}
          <div className="flex items-center gap-3 w-full lg:max-w-md bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            <Search className="text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search event by name or location..."
              className="w-full bg-transparent outline-none text-sm sm:text-base placeholder-gray-400"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-2 w-full sm:flex sm:w-auto sm:gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`py-2 px-2 sm:px-5 text-xs sm:text-sm rounded-lg font-semibold transition ${
                filter === "all"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Events
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`py-2 px-2 sm:px-5 text-xs sm:text-sm rounded-lg font-semibold transition ${
                filter === "active"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Active Now
            </button>

            <button
              onClick={() => setFilter("upcoming")}
              className={`py-2 px-2 sm:px-5 text-xs sm:text-sm rounded-lg font-semibold transition ${
                filter === "upcoming"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
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
