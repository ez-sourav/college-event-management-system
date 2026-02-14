import React from "react";
import { CalendarDays, MapPin, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const startDate = new Date(event.startTime);

  //  status comes from backend
  const status = event.status || "UPCOMING";

  const isLive = status === "LIVE";
  const isUpcoming = status === "UPCOMING";
  const isCompleted = status === "COMPLETED";

  const statusStyles = isLive
    ? "bg-green-100 text-green-700 border border-green-200"
    : isUpcoming
      ? "bg-blue-100 text-blue-700 border border-blue-200"
      : "bg-gray-200 text-gray-700 border border-gray-300";

  const statusText = isLive
    ? "Live Now"
    : isUpcoming
      ? "Upcoming"
      : "Completed";

  // progress bar safe
  const progress =
    event.maxParticipants > 0
      ? Math.min((event.totalCheckedIn / event.maxParticipants) * 100, 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden w-full shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300">
      {/* Banner */}
      <div className="relative">
        {event.bannerImageUrl ? (
          <img
            src={event.bannerImageUrl}
            alt={event.name}
            className="w-full h-44 sm:h-48 object-cover"
          />
        ) : (
          <div className="w-full h-44 sm:h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            No Banner
          </div>
        )}

        <div className="absolute inset-0 bg-black/20" />

        {/* Status Badge */}
        <span
          className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-bold ${statusStyles}`}
        >
          {statusText}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.name}</h3>

        <div className="text-sm text-gray-600 space-y-2">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} className="text-blue-600" />
            {startDate.toLocaleDateString()} •{" "}
            {startDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-600" />
            {event.venue}
          </p>
        </div>

        {/* Capacity Info */}
        <div className="mt-3 text-xs text-gray-500 flex justify-between">
          <span>Checked In: {event.totalCheckedIn}</span>
          <span>Max: {event.maxParticipants}</span>
        </div>

        <div className="mt-2">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Start Scanning Button */}
        <button
          onClick={() => navigate(`/scan/${event._id}`)}
          className={`mt-5 w-full py-2 rounded-lg transition font-semibold text-sm flex items-center justify-center gap-2
            ${
              isLive
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }
          `}
          disabled={!isLive}
        >
          <QrCode size={18} />
          {isCompleted ? "Event Completed" : isUpcoming ? "Not Started" : "Start Scanning"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
