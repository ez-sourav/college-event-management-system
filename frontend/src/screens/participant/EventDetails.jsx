import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const { auth } = useAuthContext();

  const { id: eventId } = useParams();

  async function handleRegistration() {
    setIsRegistering(true);

    try {
      const res = await fetch(`http://localhost:8000/participations`, {
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

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8000/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setEvent(data.event);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  console.log(event);

  if (loading) return <p>Loading...</p>;

  const totalPrize = event.prizes.reduce((acc, prize) => acc + prize.amount, 0);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="bg-linear-to-b from-slate-100 to-slate-200 min-h-screen pb-28">
      {/* CENTER CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* HERO */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url(${event.bannerImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="bg-linear-to-r from-[#0f172a]/90 via-[#0f172a]/80 to-[#1e293b]/80 
                          p-8 md:p-10 lg:p-14 
                          flex flex-col lg:flex-row 
                          justify-between items-start lg:items-center gap-10"
          >
            <div className="text-white max-w-2xl">
              {/* <div className="flex gap-3 mb-5">
                <span className="bg-blue-600 text-xs px-4 py-1 rounded-full font-semibold shadow">
                  CODING
                </span>
                <span className="bg-emerald-600 text-xs px-4 py-1 rounded-full font-semibold shadow">
                  IN-PERSON
                </span>
              </div> */}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                {event.name}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg mb-6">
                {event.tagline}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                <span>📅 {formatDate(event.startTime)}</span>
                <span>
                  👥 {event.teamSize.min}-{event.teamSize.max}
                </span>
                <span>🎟 ₹{event.entryFee}</span>
              </div>
            </div>

            {/* Prize Card */}
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl p-8 rounded-2xl text-white text-center shadow-2xl">
              <p className="text-slate-300 text-sm tracking-widest mb-2">
                TOTAL PRIZE POOL
              </p>
              <h2 className="text-4xl font-bold text-amber-400 mb-3">
                ₹{totalPrize.toLocaleString()}
              </h2>
              <p className="text-emerald-400 font-medium">
                🏆 1st Prize: ₹{event.prizes[0].amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16 items-start">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                About the Event
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Prizes */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-8 text-slate-800">
                🏆 Prizes & Rewards
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.prizes.map((prize, i) => (
                  <div
                    key={i}
                    className="rounded-md p-6 border border-gray-200 text-center shadow-md 
                               hover:scale-105 hover:shadow-lg 
                               transition duration-300 
                               bg-linear-to-br from-slate-50 to-white"
                  >
                    <h3 className="font-semibold mb-2 text-slate-800">
                      {prize.position}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{prize.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      + {prize.perks}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                📜 Rules & Requirements
              </h2>

              <ul className="space-y-4">
                {event.rules.map((rule, i) => (
                  <li key={i} className="flex gap-3 text-slate-600">
                    <span className="text-emerald-500 font-bold">✔</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Register Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.15)] px-6 py-4 flex justify-between items-center">
        <div>
          <p className="text-red-500 text-sm font-semibold">
            Registration closes soon!
          </p>
          <p className="text-slate-500 text-sm">Entry Fee: ₹{event.entryFee}</p>
        </div>

        <button
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
          onClick={handleRegistration}
        >
          {isRegistering ? "Registering..." : "Register Now →"}
        </button>
      </div>
    </div>
  );
}
