import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(event.startTime).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">
      {/* Banner Image */}
      <div className="h-40">
        <img
          src={
            event.bannerImageUrl ||
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
          }
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-bold text-gray-800">{event.name}</h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {event.description}
        </p>

        {/* Event Info */}
        <div className="text-sm text-gray-600 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-600" />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaUsers className="text-blue-600" />
            <span>
              Team: {event.teamSize?.min} - {event.teamSize?.max}
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto flex justify-between items-center pt-3">
          <span className="font-semibold text-blue-700">
            {event.entryFee === 0 ? "Free" : `₹${event.entryFee}`}
          </span>

          <button
            onClick={() => navigate(`/events/${event._id}`)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
