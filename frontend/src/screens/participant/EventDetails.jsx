import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  CalendarDays,
  Users,
  Ticket,
  Trophy,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MapPin,
  UserCircle2,
  Mail,
  ArrowRight,
  Gavel,
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
    <div className="bg-[#f6f6f8] min-h-screen pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 animate-pulse">
        
        {/* HERO SKELETON */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-65 sm:min-h-80 border border-gray-200 shadow-xl bg-gray-200">
          <div className="absolute inset-0 bg-linear-to-t from-gray-300/70 via-gray-200/40 to-transparent" />

          <div className="relative z-10 p-4 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
            
            {/* LEFT */}
            <div className="flex flex-col gap-3 sm:gap-4 max-w-2xl w-full">
              <div className="flex gap-2">
                <div className="h-6 w-24 rounded-full bg-gray-300"></div>
                <div className="h-6 w-28 rounded-full bg-gray-300"></div>
              </div>

              <div className="h-8 sm:h-10 w-3/4 rounded-xl bg-gray-300"></div>
              <div className="h-4 sm:h-5 w-2/3 rounded-lg bg-gray-300"></div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-2">
                <div className="h-4 w-40 rounded-lg bg-gray-300"></div>
                <div className="h-4 w-40 rounded-lg bg-gray-300"></div>
                <div className="h-4 w-28 rounded-lg bg-gray-300"></div>
              </div>
            </div>

            {/* RIGHT PRIZE CARD */}
            <div className="w-full sm:w-auto sm:max-w-sm bg-white/40 backdrop-blur-xl p-5 sm:p-8 rounded-2xl shadow-2xl border border-white/30 flex flex-col items-center justify-center">
              <div className="h-3 w-32 rounded bg-gray-300 mb-3"></div>
              <div className="h-8 sm:h-10 w-44 rounded-xl bg-gray-300"></div>
              <div className="w-full h-px bg-gray-300 my-4"></div>
              <div className="h-4 w-56 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* MAIN GRID SKELETON */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-start">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Skeleton */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <div className="h-6 w-52 rounded-lg bg-gray-200 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                <div className="h-4 w-4/6 rounded bg-gray-200"></div>
              </div>
            </div>

            {/* Prize Skeleton */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <div className="h-6 w-52 rounded-lg bg-gray-200 mb-6"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border border-gray-200 text-center bg-gray-50"
                  >
                    <div className="mx-auto size-12 rounded-2xl bg-gray-200 mb-3"></div>
                    <div className="h-4 w-20 mx-auto rounded bg-gray-200 mb-3"></div>
                    <div className="h-6 w-28 mx-auto rounded bg-gray-200 mb-3"></div>
                    <div className="h-3 w-24 mx-auto rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules Skeleton */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <div className="h-6 w-64 rounded-lg bg-gray-200 mb-5"></div>

              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-gray-200"></div>
                    <div className="h-4 w-full rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <div className="h-6 w-32 rounded bg-gray-200 mb-5"></div>

              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between gap-4">
                    <div className="h-4 w-20 rounded bg-gray-200"></div>
                    <div className="h-4 w-24 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl p-5 border border-gray-200 bg-gray-50">
                <div className="h-5 w-28 rounded bg-gray-200 mb-3"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
              </div>

              <div className="mt-6 rounded-2xl p-5 border border-gray-200 bg-gray-50">
                <div className="h-5 w-40 rounded bg-gray-200 mb-3"></div>
                <div className="h-4 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-44 rounded bg-gray-200 mt-2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar Skeleton */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 py-4 px-4 sm:px-8 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:flex flex-col gap-2">
              <div className="h-4 w-52 rounded bg-gray-200"></div>
              <div className="h-5 w-40 rounded bg-gray-200"></div>
            </div>

            <div className="sm:hidden flex flex-col gap-2 w-full">
              <div className="h-4 w-32 rounded bg-gray-200"></div>
              <div className="h-5 w-24 rounded bg-gray-200"></div>
            </div>

            <div className="h-12 w-40 rounded-xl bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );


  if (!event) {
    return (
      <div className="min-h-screen bg-[#f6f6f8] flex items-center justify-center px-4">
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-7 w-full max-w-md text-center">
          <p className="text-gray-900 font-black text-lg">Event Not Found</p>
          <p className="text-gray-500 text-sm mt-2">
            This event does not exist.
          </p>
        </div>
      </div>
    );
  }

  const totalPrize = event.prizes?.reduce(
    (acc, prize) => acc + prize.amount,
    0,
  );

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

  const isExpired = event.isExpired || new Date(event.endTime) < new Date();
  const isRegistrationClosed =
    event.isRegistrationClosed ||
    new Date(event.registrationDeadline) < new Date();

  const isClosed = isExpired || isRegistrationClosed;

  async function handleRegistration() {
    if (isClosed) {
      toast.error("Registration is closed!");
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
        toast.success("Successfully registered!");

        setEvent((prev) => ({
          ...prev,
          hasRegistered: true,
        }));

        return;
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Couldn't register to event!");
      console.log(error.message);
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <div className="bg-[#f6f6f8] min-h-screen pb-30">
      {/* CENTER CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* HERO */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-65 sm:min-h-80 flex flex-col justify-end group border border-gray-200 shadow-xl">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url(${event.bannerImageUrl})`,
            }}
          />

          {/* linear Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-transparent" />

          {/* CONTENT */}
          <div className="relative z-10 p-4 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
            {/* LEFT */}
            <div className="flex flex-col gap-3 sm:gap-4 max-w-2xl text-white">
              {/* BADGES */}
              <div className="flex flex-wrap gap-2">
                {isClosingSoon && !isClosed && (
                  <span className="bg-red-500/25 text-red-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-sm border border-red-300/20 flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    Closing Soon
                  </span>
                )}

                {isClosed && !event.hasRegistered && (
                  <span className="bg-gray-500/25 text-gray-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-sm border border-gray-200/20 flex items-center gap-1.5">
                    <XCircle size={14} />
                    Closed
                  </span>
                )}

                {event.hasRegistered && (
                  <span className="bg-emerald-600 text-emerald-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-sm border border-emerald-300/20 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Registered
                  </span>
                )}
              </div>

              {/* TITLE */}
              <h1 className="text-xl sm:text-3xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
                {event.name}
              </h1>

              {/* TAGLINE */}
              <p className="text-gray-200 text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-xl">
                {event.tagline}
              </p>

              {/* META INFO */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-5 mt-2 text-gray-200 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-[#1121d4]" />
                  <span>{formatDate(event.startTime)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#1121d4]" />
                  <span>
                    Team Size: {event.teamSize?.min}-{event.teamSize?.max}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Ticket size={16} className="text-[#1121d4]" />
                  <span>₹{event.entryFee}</span>
                </div>
              </div>
            </div>

            {/* RIGHT PRIZE CARD */}
            <div className="w-full sm:w-auto sm:max-w-sm bg-white/10 backdrop-blur-xl p-5 sm:p-8 rounded-2xl text-white text-center shadow-2xl border border-white/10 flex flex-col items-center justify-center">
              <span className="text-gray-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
                Total Prize Pool
              </span>

              <span className="text-2xl sm:text-4xl font-black text-white drop-shadow-md mt-2">
                ₹{totalPrize?.toLocaleString() || 0}
              </span>

              <div className="w-full h-px bg-white/20 my-3"></div>

              {event.prizes?.[0]?.amount && (
                <div className="flex items-center justify-center gap-2 text-emerald-300 text-xs sm:text-sm font-black">
                  <Trophy size={16} className="text-amber-300" />
                  <span className="truncate">
                    1st Prize: ₹{event.prizes[0].amount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 items-start">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardList size={22} className="text-[#1121d4]" />
                About the Event
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Prizes */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Trophy size={22} className="text-amber-500" />
                Prizes & Rewards
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.prizes?.map((prize, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border border-gray-200 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition bg-linear-to-br from-gray-50 to-white"
                  >
                    <div className="mx-auto size-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                      <Trophy size={20} className="text-[#1121d4]" />
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                      {prize.position}
                    </h3>

                    <p className="text-xl sm:text-2xl font-black text-[#1121d4]">
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
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-5 flex items-center gap-2">
                <Gavel size={22} className="text-blue-500 " />
                Rules & Requirements
              </h2>

              <ul className="space-y-3">
                {event.rules?.map((rule, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-gray-700 text-sm sm:text-base"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-emerald-600 mt-0.5"
                    />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200 lg:sticky lg:top-6">
              <h3 className="text-lg font-black text-gray-900 mb-4">
                Quick Info
              </h3>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">
                    Start Date
                  </span>
                  <span className="font-bold">
                    {formatDate(event.startTime)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">End Date</span>
                  <span className="font-bold">{formatDate(event.endTime)}</span>
                </div>

                {/* Registration End */}
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Reg. End</span>
                  <span className="font-bold">
                    {event.registrationDeadline
                      ? formatDate(event.registrationDeadline)
                      : "N/A"}
                  </span>
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

              {/* Venue */}
              <div className="mt-7 bg-linear-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-200 shadow-sm">
                <h3 className="text-base font-black text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-[#1121d4]" />
                  Venue
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {event.venue}
                </p>
              </div>

              {/* Coordinator */}
              <div className="mt-6 bg-linear-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-200 shadow-sm">
                <h3 className="text-base font-black text-gray-900 mb-2 flex items-center gap-2">
                  <UserCircle2 size={18} className="text-[#1121d4]" />
                  Event Coordinator
                </h3>

                <p className="text-gray-800 font-bold text-sm">
                  {event.createdBy?.name || "Admin"}
                </p>

                {event.createdBy?.email && (
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <Mail size={14} />
                    {event.createdBy.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED BOTTOM ACTION BAR (DESKTOP + MOBILE ) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 py-4 px-4 sm:px-8 z-40 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.25)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Text */}
          <div className="hidden sm:flex flex-col">
            {isClosingSoon && !isClosed && (
              <span className="text-xs font-black text-red-600 uppercase tracking-wide flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Registration closing soon
              </span>
            )}

            <p className="text-sm sm:text-lg text-gray-500 font-medium mt-1">
              Entry Fee:{" "}
              <span className="font-black text-[#1c1d1d]">
                ₹{event.entryFee}
              </span>
            </p>
          </div>

          {/* Mobile Left */}
          <div className="sm:hidden flex flex-col min-w-0">
            {isClosingSoon && !isClosed && (
              <span className="text-xs font-black text-red-600 flex items-center gap-2 truncate">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Closing soon
              </span>
            )}

            <p className="text-lg text-gray-500 truncate font-medium">
              Fee:{" "}
              <span className="font-black text-[#1c1d1d]">
                ₹{event.entryFee}
              </span>
            </p>
          </div>

          {/* Register Button */}
          <button
            disabled={event.hasRegistered || isRegistering || isClosed}
            onClick={handleRegistration}
            className={`min-w-40 sm:min-w-45 px-6 py-3 rounded-xl font-black text-sm shadow-lg transition-all duration-200 
              flex items-center justify-center gap-2 active:scale-95
              ${
                event.hasRegistered
                  ? "bg-emerald-100 text-emerald-900 cursor-not-allowed shadow-none"
                  : isClosed
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed shadow-none"
                    : "bg-[#1121d4] hover:bg-blue-700 text-white hover:shadow-[#1121d4]/40"
              }
            `}
          >
            {event.hasRegistered ? (
              <>
                <CheckCircle2 size={18} />
                Registered
              </>
            ) : isClosed ? (
              <>
                <XCircle size={18} />
                Closed
              </>
            ) : isRegistering ? (
              "Registering..."
            ) : (
              <>
                Register Now
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
