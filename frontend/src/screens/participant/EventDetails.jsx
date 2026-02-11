import React from "react";

export default function EventDetails() {
  const event = {
    name: "Inter-College Hackathon 2026",
    tagline: "24 hours to code the future. Innovate. Build. Win.",
    description:
      "A 24-hour coding competition where teams build innovative solutions to real-world problems. Open to all departments.",
    bannerImageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    startTime: "2026-03-15T09:00:00.000Z",
    registrationDeadline: "2026-03-10T23:59:59.000Z",
    teamSize: { min: 2, max: 4 },
    entryFee: 199,
    maxParticipants: 200,
    prizes: [
      { position: "Winner", amount: 25000, perks: "Trophy + Certificate" },
      { position: "Runner Up", amount: 15000, perks: "Certificate" },
      { position: "2nd Runner Up", amount: 10000, perks: "Swag Kit" },
    ],
    rules: [
      "All code must be written during the event.",
      "Teams must consist of 2 to 4 members.",
      "Use of open-source libraries is allowed.",
      "Plagiarism will result in disqualification.",
      "Judges' decision is final.",
    ],
    coordinators: [
      { name: "Rahul Mehta", role: "Faculty Advisor" },
      { name: "Ananya Sharma", role: "Student Lead" },
    ],
    resources: [
      { name: "Problem Statement.pdf", size: "2.4 MB" },
      { name: "Rulebook_v2.docx", size: "1.1 MB" },
    ],
  };

  const totalPrize = event.prizes.reduce(
    (acc, prize) => acc + prize.amount,
    0
  );

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
          <div className="bg-linear-to-r from-[#0f172a]/90 via-[#0f172a]/80 to-[#1e293b]/80 
                          p-8 md:p-10 lg:p-14 
                          flex flex-col lg:flex-row 
                          justify-between items-start lg:items-center gap-10">

            <div className="text-white max-w-2xl">
              <div className="flex gap-3 mb-5">
                <span className="bg-blue-600 text-xs px-4 py-1 rounded-full font-semibold shadow">
                  CODING
                </span>
                <span className="bg-emerald-600 text-xs px-4 py-1 rounded-full font-semibold shadow">
                  IN-PERSON
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                {event.name}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg mb-6">
                {event.tagline}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                <span>📅 {formatDate(event.startTime)}</span>
                <span>👥 {event.teamSize.min}-{event.teamSize.max}</span>
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

          {/* RIGHT SIDEBAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">

            {/* Coordinators */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-6 text-slate-800">
                👥 Event Coordinators
              </h2>

              <div className="space-y-5">
                {event.coordinators.map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{c.name}</p>
                      <p className="text-sm text-slate-500">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-6 text-slate-800">
                📂 Resources
              </h2>

              <div className="space-y-4">
                {event.resources.map((file, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {file.size}
                      </p>
                    </div>
                    <button className="text-blue-600 text-sm font-semibold hover:underline">
                      Download
                    </button>
                  </div>
                ))}
              </div>
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
          <p className="text-slate-500 text-sm">
            Entry Fee: ₹{event.entryFee}
          </p>
        </div>

        <button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition">
          Register Now →
        </button>
      </div>

    </div>
  );
}
