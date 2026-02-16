import React, { useMemo, useState } from "react";
import {
  Search,
  Users,
  Mail,
  Phone,
  Calendar,
  BadgeCheck,
  AlertTriangle,
  Download,
  Filter,
} from "lucide-react";

const Participants = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy Data (replace with API later)
  const participants = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 98765 43210",
      event: "Hackathon 2026",
      status: "Confirmed",
      registeredAt: "12 Feb 2026",
    },
    {
      id: 2,
      name: "Anjali Das",
      email: "anjali@gmail.com",
      phone: "+91 99887 77665",
      event: "RoboWar League",
      status: "Pending",
      registeredAt: "10 Feb 2026",
    },
    {
      id: 3,
      name: "Sourav Roy",
      email: "sourav@gmail.com",
      phone: "+91 90909 10101",
      event: "Coding Contest",
      status: "Confirmed",
      registeredAt: "09 Feb 2026",
    },
    {
      id: 4,
      name: "Priya Singh",
      email: "priya@gmail.com",
      phone: "+91 70000 11122",
      event: "Guest Lecture",
      status: "Cancelled",
      registeredAt: "08 Feb 2026",
    },
  ];

  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return participants;

    const q = searchQuery.toLowerCase();
    return participants.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.event.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const getStatusBadge = (status) => {
    if (status === "Confirmed") {
      return {
        text: "Confirmed",
        color: "bg-green-100 text-green-700",
        icon: BadgeCheck,
      };
    }
    if (status === "Pending") {
      return {
        text: "Pending",
        color: "bg-orange-100 text-orange-700",
        icon: AlertTriangle,
      };
    }
    return {
      text: "Cancelled",
      color: "bg-gray-200 text-gray-700",
      icon: AlertTriangle,
    };
  };

  return (
    <div className="bg-[#f6f6f8] min-h-screen text-slate-900">
      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sticky top-0 z-40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">
              Participants
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              View and manage event participants.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            {/* Search */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-72">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search participants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full pl-2 text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Filter Button */}
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-4 py-2 rounded-xl transition">
              <Filter size={16} />
              Filter
            </button>

            {/* Export Button */}
            <button className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-4 py-2 rounded-xl transition">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 lg:p-8 pb-16">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <Users size={18} />
              Total Participants
            </div>
            <p className="text-2xl font-bold mt-2">
              {participants.length.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-green-700 font-semibold">
              <BadgeCheck size={18} />
              Confirmed
            </div>
            <p className="text-2xl font-bold mt-2">
              {participants.filter((p) => p.status === "Confirmed").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-orange-700 font-semibold">
              <AlertTriangle size={18} />
              Pending
            </div>
            <p className="text-2xl font-bold mt-2">
              {participants.filter((p) => p.status === "Pending").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <AlertTriangle size={18} />
              Cancelled
            </div>
            <p className="text-2xl font-bold mt-2">
              {participants.filter((p) => p.status === "Cancelled").length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Participants List
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Search, filter and manage registered participants.
            </p>
          </div>

          {filteredParticipants.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">
              No participants found for:{" "}
              <span className="font-semibold text-slate-800">
                {searchQuery}
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-225">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                    <th className="px-6 py-4 text-left">Participant</th>
                    <th className="px-6 py-4 text-left">Event</th>
                    <th className="px-6 py-4 text-left">Contact</th>
                    <th className="px-6 py-4 text-left">Registered</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {filteredParticipants.map((p) => {
                    const badge = getStatusBadge(p.status);
                    const StatusIcon = badge.icon;

                    return (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900 text-sm">
                            {p.name}
                          </p>
                          <p className="text-xs text-slate-500">{p.email}</p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                          {p.event}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-2">
                              <Mail size={14} className="text-slate-400" />
                              {p.email}
                            </span>
                            <span className="flex items-center gap-2">
                              <Phone size={14} className="text-slate-400" />
                              {p.phone}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          <span className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400" />
                            {p.registeredAt}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}
                          >
                            <StatusIcon size={14} />
                            {badge.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs sm:text-sm text-slate-500">
              Showing {filteredParticipants.length} of {participants.length}{" "}
              participants
            </span>

            <div className="flex gap-2">
              <button
                disabled
                className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Previous
              </button>

              <button className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
