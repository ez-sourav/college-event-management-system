import { useState } from "react";
import { Search, Plus, Download } from "lucide-react";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { title: "Total Registrations", value: "1,245", change: "+12%" },
    { title: "Live Attendance", value: "850", change: "+5%" },
    { title: "Volunteers Active", value: "42", change: "0%" },
    { title: "Revenue Collected", value: "$12,500", change: "+8%" },
  ];

  const events = [
    {
      name: "Hackathon 2024",
      badge: "Live Now",
      badgeColor: "bg-green-100 text-green-700",
      date: "Oct 12, 2024",
      time: "09:00 AM - 09:00 PM",
      venue: "Main Auditorium",
      registered: 185,
      target: 200,
    },
    {
      name: "RoboWar League",
      badge: "Starts in 1h",
      badgeColor: "bg-blue-100 text-blue-700",
      date: "Oct 12, 2024",
      time: "11:00 AM - 02:00 PM",
      venue: "Open Ground Area",
      registered: 45,
      target: 80,
    },
    {
      name: "Coding Contest",
      badge: "Upcoming",
      badgeColor: "bg-gray-200 text-gray-700",
      date: "Oct 12, 2024",
      time: "02:00 PM - 05:00 PM",
      venue: "Lab Complex B",
      registered: 100,
      target: 100,
      full: true,
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Monitor events and manage operations
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">

            {/* SEARCH */}
            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm whitespace-nowrap">
              <Plus size={16} /> Create Event
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  {item.title}
                </span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  {item.change}
                </span>
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* EVENTS TABLE */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Ongoing & Upcoming Events
            </h2>

            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition w-fit">
              <Download size={14} /> Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-180 w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-6 py-4 font-medium">Event Name</th>
                  <th className="text-left px-6 py-4 font-medium">Date & Time</th>
                  <th className="text-left px-6 py-4 font-medium">Venue</th>
                  <th className="text-left px-6 py-4 font-medium">Capacity Status</th>
                  <th className="text-left px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEvents.map((event, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5 align-top">
                      <div className="font-medium text-gray-800">
                        {event.name}
                      </div>
                      <span
                        className={`inline-block mt-2 text-xs px-2 py-1 rounded ${event.badgeColor}`}
                      >
                        {event.badge}
                      </span>
                    </td>

                    <td className="px-6 py-5 align-top">
                      <div>{event.date}</div>
                      <div className="text-xs text-gray-400">
                        {event.time}
                      </div>
                    </td>

                    <td className="px-6 py-5 align-top text-gray-600">
                      {event.venue}
                    </td>

                    <td className="px-6 py-5 align-top">
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            event.full
                              ? "bg-green-700"
                              : "bg-blue-600"
                          }`}
                          style={{
                            width: `${
                              (event.registered / event.target) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {event.registered} / {event.target}
                      </div>
                    </td>

                    <td className="px-6 py-5 align-top">
                      <button className="text-blue-600 hover:underline text-sm">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredEvents.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-8 text-gray-400"
                    >
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
