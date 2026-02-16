import React, { useMemo, useState } from "react";
import {
  Search,
  HandHeart,
  BadgeCheck,
  AlertTriangle,
  User,
  Phone,
  Mail,
  Calendar,
  ClipboardList,
  Filter,
  Download,
} from "lucide-react";

const Volunteers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy Data (replace with API later)
  const volunteers = [
    {
      id: 1,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "+91 98765 11122",
      assignedEvent: "Hackathon 2026",
      duty: "Registration Desk",
      status: "Active",
      joinedAt: "05 Feb 2026",
    },
    {
      id: 2,
      name: "Neha Roy",
      email: "neha@gmail.com",
      phone: "+91 99887 44556",
      assignedEvent: "RoboWar League",
      duty: "Stage Management",
      status: "Inactive",
      joinedAt: "06 Feb 2026",
    },
    {
      id: 3,
      name: "Rohit Das",
      email: "rohit@gmail.com",
      phone: "+91 90909 22334",
      assignedEvent: "Coding Contest",
      duty: "Technical Support",
      status: "Active",
      joinedAt: "08 Feb 2026",
    },
  ];

  const filteredVolunteers = useMemo(() => {
    if (!searchQuery.trim()) return volunteers;

    const q = searchQuery.toLowerCase();
    return volunteers.filter((v) => {
      return (
        v.name.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.phone.toLowerCase().includes(q) ||
        v.assignedEvent.toLowerCase().includes(q) ||
        v.duty.toLowerCase().includes(q) ||
        v.status.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const getStatusBadge = (status) => {
    if (status === "Active") {
      return {
        text: "Active",
        color: "bg-green-100 text-green-700",
        icon: BadgeCheck,
      };
    }

    return {
      text: "Inactive",
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
              Volunteers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage volunteer assignments and activity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            {/* Search */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-72">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search volunteers..."
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
            <div className="flex items-center gap-2 text-amber-700 font-semibold">
              <HandHeart size={18} />
              Total Volunteers
            </div>
            <p className="text-2xl font-bold mt-2">
              {volunteers.length.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-green-700 font-semibold">
              <BadgeCheck size={18} />
              Active Volunteers
            </div>
            <p className="text-2xl font-bold mt-2">
              {volunteers.filter((v) => v.status === "Active").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <AlertTriangle size={18} />
              Inactive Volunteers
            </div>
            <p className="text-2xl font-bold mt-2">
              {volunteers.filter((v) => v.status === "Inactive").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <ClipboardList size={18} />
              Assignments
            </div>
            <p className="text-2xl font-bold mt-2">
              {volunteers.length.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Volunteer List
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage assigned duties and volunteer activity.
            </p>
          </div>

          {filteredVolunteers.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">
              No volunteers found for:{" "}
              <span className="font-semibold text-slate-800">
                {searchQuery}
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-225">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                    <th className="px-6 py-4 text-left">Volunteer</th>
                    <th className="px-6 py-4 text-left">Contact</th>
                    <th className="px-6 py-4 text-left">Assigned Event</th>
                    <th className="px-6 py-4 text-left">Duty</th>
                    <th className="px-6 py-4 text-left">Joined</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {filteredVolunteers.map((v) => {
                    const badge = getStatusBadge(v.status);
                    const StatusIcon = badge.icon;

                    return (
                      <tr key={v.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                              <User size={18} />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900 text-sm">
                                {v.name}
                              </p>
                              <p className="text-xs text-slate-500">{v.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-2">
                              <Mail size={14} className="text-slate-400" />
                              {v.email}
                            </span>
                            <span className="flex items-center gap-2">
                              <Phone size={14} className="text-slate-400" />
                              {v.phone}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                          {v.assignedEvent}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {v.duty}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          <span className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400" />
                            {v.joinedAt}
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
              Showing {filteredVolunteers.length} of {volunteers.length}{" "}
              volunteers
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

export default Volunteers;
