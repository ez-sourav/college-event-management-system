import React, { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import EventCard from "../../components/participant/EventCard";
import { useAuthContext } from "../../../hooks/useAuthContext";

const EventListings = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:8000/events", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });

        const data = await res.json();
        setEvents(data?.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) fetchEvents();
  }, [auth]);

  // Search Filter
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    if (search.trim()) {
      filtered = filtered.filter((event) => {
        const eventName = (event.name || "").toLowerCase();
        const eventValue = (event.value || "").toLowerCase();
        const eventTitle = (event.title || "").toLowerCase();

        const query = search.toLowerCase().trim();

        return (
          eventName.includes(query) ||
          eventValue.includes(query) ||
          eventTitle.includes(query)
        );
      });
    }

    return filtered;
  }, [events, search]);

  const clearFilters = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Explore Events
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Discover workshops, hackathons, seminars and competitions tailored
            for your career growth.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events by name or value..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                transition text-sm sm:text-base"
              />
            </div>

            {/* Clear Button */}
            <button
              onClick={clearFilters}
              className="w-full lg:w-auto px-6 py-3 rounded-xl bg-gray-900 text-white
              hover:bg-black transition shadow-md text-sm sm:text-base font-semibold"
            >
              Clear
            </button>
          </div>

          {/* Result Count */}
          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
            <p>
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredEvents.length}
              </span>{" "}
              events
            </p>

            {search.trim() ? (
              <p className="text-blue-700 font-medium">Search Applied</p>
            ) : null}
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">
                Loading events...
              </p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                No events found 😕
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Try searching with a different keyword.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold
                hover:bg-blue-800 transition shadow-md"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListings;
