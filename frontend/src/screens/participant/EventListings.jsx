import React, { useEffect, useMemo, useState } from "react";
import { Search, XCircle, AlertCircle, RotateCcw } from "lucide-react";
import EventCard from "../../components/participant/EventCard";
import { useAuthContext } from "../../../hooks/useAuthContext";

const EventListings = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseURL}/events`, {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Explore Events
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover workshops, hackathons, seminars and competitions tailored
            for your career growth.
          </p>
        </div>

        {/* Search Card */}
        <div className="mt-8 sm:mt-10 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events by name or value..."
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-[#1121d4] focus:border-transparent
                transition text-sm sm:text-base"
              />

              {search.trim() && (
                <button
                  onClick={clearFilters}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>

            {/* Clear Button */}
            <button
              onClick={clearFilters}
              className="w-full lg:w-auto px-6 py-3 rounded-xl bg-[#1121d4] text-white
              hover:bg-blue-700 transition shadow-md text-sm sm:text-base font-black flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>

          {/* Result Count */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-black text-gray-900">
                {filteredEvents.length}
              </span>{" "}
              events
            </p>

            {search.trim() ? (
              <span className="inline-flex items-center gap-2 text-[#1121d4] font-bold">
                <Search size={16} />
                Search Applied
              </span>
            ) : (
              <span className="text-gray-500 font-medium">
                Browse all available events
              </span>
            )}
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-10 sm:mt-12">
          {loading ? (
            // Skeleton Loader
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="h-36 bg-gray-200"></div>

                  <div className="p-4 space-y-3">
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>

                    <div className="flex gap-2 mt-3">
                      <div className="h-8 w-20 bg-gray-200 rounded-xl"></div>
                      <div className="h-8 w-20 bg-gray-200 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            // Empty State
            <div className="text-center py-16 sm:py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="mx-auto size-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <AlertCircle size={26} className="text-[#1121d4]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-5">
                No events found
              </h3>

              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Try searching with a different keyword.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-3 rounded-xl bg-[#1121d4] text-white font-black
                hover:bg-blue-700 transition shadow-md inline-flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Reset Search
              </button>
            </div>
          ) : (
            // Events Grid
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
