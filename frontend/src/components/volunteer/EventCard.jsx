import React from "react";
import { CalendarDays, MapPin, QrCode, Lock } from "lucide-react";

const EventCard = ({ event }) => {
  const percent =
    event.total === 0 ? 0 : Math.round((event.checked / event.total) * 100);

  return (
    <div className="bg-white rounded-2xl overflow-hidden w-full shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300">
      {/* Image Section */}
      <div className="relative">
        <span className="absolute top-3 left-3 bg-blue-100 text-blue-800 text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold">
          {event.type}
        </span>

        <span
          className={`absolute top-3 right-3 text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold border
            ${
              event.status === "active"
                ? "bg-green-100 text-green-700 border-green-200"
                : event.status === "soon"
                ? "bg-amber-100 text-amber-700 border-amber-200"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }
          `}
        >
          {event.status === "active"
            ? "Active Now"
            : event.status === "soon"
            ? "Starts Soon"
            : "Upcoming"}
        </span>

        <img
          className="w-full h-44 sm:h-48 object-cover"
          src={event.image}
          alt={event.title}
        />

        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-base sm:text-lg">{event.title}</h3>

        <div className="mt-2 text-xs sm:text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} className="text-blue-700" />
            {event.time}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-700" />
            {event.location}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] sm:text-xs text-gray-500 mb-1">
            <span>Check-ins</span>
            <span>
              {event.checked} / {event.total}
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className={`h-2 rounded-full ${
                event.status === "soon"
                  ? "bg-amber-500"
                  : event.status === "active"
                  ? "bg-blue-600"
                  : "bg-gray-400"
              }`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>

        {/* Button */}
        {event.locked ? (
          <button
            disabled
            className="mt-4 w-full bg-gray-200 text-gray-500 py-2 rounded-lg transition flex items-center justify-center gap-2 cursor-not-allowed font-semibold text-sm"
          >
            <Lock size={18} />
            Locked
          </button>
        ) : (
          <button className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2 font-semibold text-sm">
            <QrCode size={18} />
            Start Scanning
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
