import React, { useEffect, useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import EventCard from "../../components/participant/EventCard";
import { useAuthContext } from "../../../hooks/useAuthContext";

const EventListings = () => {
  const [events, setEvents] = useState([]);
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8000/events", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const data = await res.json();
        setEvents(data.events);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [auth]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-7xl px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-black text-4xl text-gray-800">Explore Events</h2>

          <p className="text-gray-500 text-sm max-w-xl">
            Discover workshops, hackathons, and seminars tailored for you.
          </p>

          {/* Search Bar */}
          <div className="mt-6 w-full max-w-2xl relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search hackathons, workshops, coding challenges..."
              className="w-full pl-12 pr-20 py-3 rounded-full 
              bg-white shadow-md 
              border border-gray-200 
              focus:outline-none 
              focus:ring-2 focus:ring-blue-600 
              focus:border-transparent 
              transition"
            />

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 
              bg-blue-700 hover:bg-blue-800 
              text-white px-5 py-2 rounded-full 
              transition duration-200 shadow-md"
            >
              Search
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListings;
