import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

import {
  CalendarDays,
  Users,
  Ticket,
  Trophy,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function EventDetails() {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const { auth } = useAuthContext();

  const { id: eventId } = useParams();

  useEffect(() => {
    if (!auth?.token) return;

    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`${baseURL}/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!res.ok) {
          navigate("/404");
          return;
        }

        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, auth?.token, navigate]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 w-full max-w-md text-center">
          <p className="text-gray-800 font-bold text-lg animate-pulse">
            Loading Event Details...
          </p>
          <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 w-full max-w-md text-center">
          <p className="text-gray-800 font-bold text-lg">Event Not Found</p>
          <p className="text-gray-500 text-sm mt-2">
            This event does not exist.
          </p>
        </div>
      </div>
    );
  }

  const totalPrize = event.prizes?.reduce((acc, prize) => acc + prize.amount, 0);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const now = new Date();
  const deadline = new Date(event.registrationDeadline);

  const diffInMs = deadline - now;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  const isClosingSoon = diffInDays <= 2 && diffInDays > 0;

  // ✅ NEW: event closed logic
  const isExpired = event.isExpired || new Date(event.endTime) < new Date();
  const isRegistrationClosed =
    event.isRegistrationClosed ||
    new Date(event.registrationDeadline) < new Date();

  const isClosed = isExpired || isRegistrationClosed;

  async function handleRegistration() {
    // ✅ prevent registration if closed
    if (isClosed) {
      alert("Registration is closed!");
      return;
    }

    setIsRegistering(true);

    try {
      const res = await fetch(`${baseURL}/participations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Successfully registered");

        setEvent((prev) => ({
          ...prev,
          hasRegistered: true,
        }));

        return;
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Couldn't register to event!");
      console.log(error.message);
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen pb-28">
      {/* CENTER CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* HERO */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200"
          style={{
            backgroundImage: `url(${event.bannerImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-linear-to-r from-[#0f172a]/95 via-[#0f172a]/80 to-[#1e293b]/70 p-6 sm:p-10 lg:p-14">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              {/* LEFT */}
              <div className="text-white max-w-2xl">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
                  {event.name}
                </h1>

                <p className="text-slate-300 text-sm sm:text-lg mt-3">
                  {event.tagline}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-200">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <CalendarDays size={16} className="text-blue-300" />
                    <span>{formatDate(event.startTime)}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <Users size={16} className="text-blue-300" />
                    <span>
                      {event.teamSize?.min}-{event.teamSize?.max}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <Ticket size={16} className="text-blue-300" />
                    <span>₹{event.entryFee}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT PRIZE CARD */}
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl text-white text-center shadow-xl border border-white/10">
                <div className="flex items-center justify-center gap-2 text-slate-200 text-sm font-semibold">
                  <Trophy size={18} className="text-amber-300" />
                  TOTAL PRIZE POOL
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-amber-400 mt-4">
                  ₹{totalPrize?.toLocaleString() || 0}
                </h2>

                {event.prizes?.[0]?.amount && (
                  <p className="text-emerald-300 font-semibold mt-3 text-sm sm:text-base flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} />
                    1st Prize: ₹{event.prizes[0].amount.toLocaleString()}
                  </p>
                )}

                {event.hasRegistered && (
                  <div className="mt-5 bg-emerald-500/20 border border-emerald-300/30 text-emerald-200 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl">
                    ✅ Already Registered
                  </div>
                )}

                {isClosed && !event.hasRegistered && (
                  <div className="mt-5 bg-gray-500/20 border border-gray-300/30 text-gray-200 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl">
                    ❌ Registration Closed
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-start">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardList size={22} className="text-[#1121d4]" />
                About the Event
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Prizes */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Trophy size={22} className="text-amber-500" />
                Prizes & Rewards
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.prizes?.map((prize, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border border-gray-200 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition bg-linear-to-br from-gray-50 to-white"
                  >
                    <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                      {prize.position}
                    </h3>

                    <p className="text-xl sm:text-2xl font-black text-blue-600">
                      ₹{prize.amount.toLocaleString()}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      + {prize.perks}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-5 flex items-center gap-2">
                <AlertTriangle size={22} className="text-red-500" />
                Rules & Requirements
              </h2>

              <ul className="space-y-3">
                {event.rules?.map((rule, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-gray-700 text-sm sm:text-base"
                  >
                    <span className="text-emerald-600 font-black">✔</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200 sticky top-6">
              <h3 className="text-lg font-black text-gray-900 mb-4">
                Quick Info
              </h3>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Start Date</span>
                  <span className="font-bold">
                    {formatDate(event.startTime)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">End Date</span>
                  <span className="font-bold">{formatDate(event.endTime)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Entry Fee</span>
                  <span className="font-bold">₹{event.entryFee}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Team Size</span>
                  <span className="font-bold">
                    {event.teamSize?.min}-{event.teamSize?.max}
                  </span>
                </div>
              </div>

              {/* DESKTOP REGISTER BUTTON */}
              <button
                disabled={event.hasRegistered || isRegistering || isClosed}
                className={`mt-8 w-full h-12 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center
                  ${
                    event.hasRegistered
                      ? "bg-green-200 text-green-900 cursor-not-allowed"
                      : isClosed
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-[#1121d4] hover:bg-[#1121d4]/90 text-white"
                  }
                `}
                onClick={handleRegistration}
              >
                {event.hasRegistered
                  ? "Already Registered"
                  : isClosed
                    ? "Registration Closed"
                    : isRegistering
                      ? "Registering..."
                      : "Register Now"}
              </button>

              {/* CLOSED WARNING */}
              {isClosed && !event.hasRegistered && (
                <div className="mt-5 bg-gray-50 border border-gray-200 rounded-2xl p-4">
                  <p className="text-gray-700 font-bold text-sm flex items-center gap-2">
                    <AlertTriangle size={16} />
                    This event is no longer accepting registrations.
                  </p>
                </div>
              )}

              <div className="space-y-8 mt-6">
                {/* Venue Card */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">
                    📍 Venue
                  </h3>
                  <p className="text-slate-600">{event.venue}</p>
                </div>

                {/* Coordinator Card */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">
                    👤 Event Coordinator
                  </h3>

                  <p className="text-slate-700 font-medium">
                    {event.createdBy?.name || "Admin"}
                  </p>

                  {event.createdBy?.email && (
                    <p className="text-sm text-slate-500 mt-1">
                      {event.createdBy.email}
                    </p>
                  )}
                </div>

                {isClosingSoon && !isClosed && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <p className="text-red-600 font-bold flex items-center gap-2 text-sm">
                      <AlertTriangle size={16} />
                      Registration closing soon!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Register Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 px-4 py-3 shadow-xl z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            {isClosingSoon && !isClosed && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1">
                <AlertTriangle size={14} />
                Registration closing soon
              </p>
            )}

            <p className="text-gray-600 text-xs mt-1">
              Entry Fee: ₹{event.entryFee}
            </p>
          </div>

          <button
            disabled={event.hasRegistered || isRegistering || isClosed}
            onClick={handleRegistration}
            className={`px-5 py-2 rounded-xl font-bold text-xs shadow-md transition
              ${
                event.hasRegistered
                  ? "bg-green-200 text-green-900 cursor-not-allowed"
                  : isClosed
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-[#1121d4] hover:bg-[#1121d4]/90 text-white"
              }
            `}
          >
            {event.hasRegistered
              ? "Registered"
              : isClosed
                ? "Closed"
                : isRegistering
                  ? "..."
                  : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
