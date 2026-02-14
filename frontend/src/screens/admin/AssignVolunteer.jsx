import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

import {
  Users,
  CalendarCheck2,
  Search,
  BadgeCheck,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";

const AssignVolunteer = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const { auth } = useAuthContext();

  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);

  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);

  const [assignedEventIds, setAssignedEventIds] = useState([]);
  const [searchEvent, setSearchEvent] = useState("");

  const [loading, setLoading] = useState(true);
  const [fetchingAssigned, setFetchingAssigned] = useState(false);
  const [assigning, setAssigning] = useState(false);

  //check status
  const getEventStatus = (event) => {
    const now = new Date();
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);

    if (now > end) return "COMPLETED";
    if (now >= start && now <= end) return "LIVE";
    return "UPCOMING";
  };

  const getStatusStyle = (status) => {
    if (status === "LIVE")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "UPCOMING")
      return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-gray-200 text-gray-700 border-gray-300";
  };

  // Fetch volunteers + events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const volRes = await axios.get(`${baseURL}/volunteering`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        const eventRes = await axios.get(`${baseURL}/events`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        setVolunteers(volRes.data.volunteers || []);
        setEvents(eventRes.data.events || []);
      } catch (error) {
        console.log("Fetch Error:", error);
        alert("Failed to load volunteers/events");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) fetchData();
  }, [auth?.token, baseURL]);

  // Fetch assigned events when volunteer changes
  useEffect(() => {
    const fetchAssigned = async () => {
      if (!selectedVolunteer) {
        setAssignedEventIds([]);
        return;
      }

      try {
        setFetchingAssigned(true);

        const res = await axios.get(
          `${baseURL}/volunteering/${selectedVolunteer}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          },
        );

        setAssignedEventIds(
          (res.data.assignedEventIds || []).map((id) => id.toString()),
        );
      } catch (error) {
        console.log("Fetch Assigned Error:", error);
        alert("Failed to fetch assigned events");
      } finally {
        setFetchingAssigned(false);
      }
    };

    if (auth?.token) fetchAssigned();
  }, [selectedVolunteer, auth?.token, baseURL]);

  // Already assigned events list
  const assignedEvents = useMemo(() => {
    return events.filter((event) => assignedEventIds.includes(event._id));
  }, [events, assignedEventIds]);

  // Available events (not assigned)
  const availableEvents = useMemo(() => {
    return events.filter((event) => !assignedEventIds.includes(event._id));
  }, [events, assignedEventIds]);

  // Search available events
  const filteredAvailableEvents = useMemo(() => {
    if (!searchEvent.trim()) return availableEvents;

    return availableEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(searchEvent.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchEvent.toLowerCase()),
    );
  }, [availableEvents, searchEvent]);

  const selectedEventObjects = useMemo(() => {
    return events.filter((event) => selectedEvents.includes(event._id));
  }, [events, selectedEvents]);

  // Toggle selection
  const handleToggleEvent = (eventId) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  const handleRemoveSelected = (eventId) => {
    setSelectedEvents((prev) => prev.filter((id) => id !== eventId));
  };

  // Assign selected events
  const handleAssign = async () => {
    if (!selectedVolunteer) {
      alert("Select a volunteer first!");
      return;
    }

    if (selectedEvents.length === 0) {
      alert("Select at least 1 event to assign!");
      return;
    }

    try {
      setAssigning(true);

      const res = await axios.post(
        `${baseURL}/volunteering/assign`,
        {
          userId: selectedVolunteer,
          events: selectedEvents,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        },
      );

      alert(res.data.message || "Assigned successfully!");

      // update assigned list instantly
      setAssignedEventIds((prev) =>
        Array.from(new Set([...prev, ...selectedEvents])),
      );

      // clear selection
      setSelectedEvents([]);
      setSearchEvent("");
    } catch (error) {
      console.log("Assign Error:", error);
      alert(error.response?.data?.message || "Failed to assign events");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f8] flex items-center justify-center px-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 w-full max-w-md text-center">
          <p className="text-gray-800 font-bold text-lg animate-pulse">
            Loading...
          </p>
          <p className="text-gray-500 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f8] px-4 sm:px-8 py-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
            <Users className="text-blue-700" size={28} />
            Assign Events to Volunteer
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Select volunteer and assign multiple events easily.
          </p>

          {/* Volunteer Select */}
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select Volunteer
            </label>

            <select
              value={selectedVolunteer}
              onChange={(e) => {
                setSelectedVolunteer(e.target.value);
                setSelectedEvents([]);
              }}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">-- Select Volunteer --</option>
              {volunteers.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.name} ({v.email})
                </option>
              ))}
            </select>

            {fetchingAssigned && selectedVolunteer && (
              <p className="text-xs text-blue-600 mt-2 font-semibold">
                Loading assigned events...
              </p>
            )}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Already Assigned */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
              <BadgeCheck className="text-emerald-600" size={22} />
              Already Assigned Events
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              These events are already assigned to this volunteer.
            </p>

            <div className="mt-5 space-y-3 max-h-100 overflow-y-auto pr-2">
              {selectedVolunteer ? (
                assignedEvents.length > 0 ? (
                  assignedEvents.map((event) => (
                    <div
                      key={event._id}
                      className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-start gap-3"
                    >
                      <div>
                        <p className="font-black text-gray-900 text-sm sm:text-base">
                          {event.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          📍 {event.venue}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(
                          getEventStatus(event),
                        )}`}
                      >
                        {getEventStatus(event)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    No events assigned yet.
                  </div>
                )
              ) : (
                <div className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  Select a volunteer to view assigned events.
                </div>
              )}
            </div>
          </div>

          {/* Available Events */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
              <PlusCircle className="text-blue-700" size={22} />
              Available Events
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Select multiple events and assign them together.
            </p>

            {/* Search */}
            <div className="mt-5 flex items-center gap-3 w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
              <Search className="text-gray-400" size={18} />
              <input
                value={searchEvent}
                onChange={(e) => setSearchEvent(e.target.value)}
                type="text"
                placeholder="Search event by name or venue..."
                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
              />
            </div>

            {/* Events List */}
            <div className="mt-5 space-y-3 max-h-100 overflow-y-auto pr-2">
              {selectedVolunteer ? (
                filteredAvailableEvents.length > 0 ? (
                  filteredAvailableEvents.map((event) => (
                    <label
                      key={event._id}
                      className={`p-4 rounded-xl border flex items-start gap-3 transition
    ${
      selectedEvents.includes(event._id)
        ? "border-blue-600 bg-blue-50"
        : "border-gray-200 bg-white hover:bg-gray-50"
    }
    ${
      getEventStatus(event) === "COMPLETED"
        ? "opacity-60 cursor-not-allowed"
        : "cursor-pointer"
    }
  `}
                    >
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event._id)}
                        disabled={getEventStatus(event) === "COMPLETED"}
                        onChange={() => handleToggleEvent(event._id)}
                        className="mt-1 w-5 h-5 accent-blue-700"
                      />

                      <div className="w-full flex justify-between items-start gap-3">
                        <div>
                          <p className="font-black text-gray-900 text-sm sm:text-base">
                            {event.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            📍 {event.venue}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(
                            getEventStatus(event),
                          )}`}
                        >
                          {getEventStatus(event)}
                        </span>
                      </div>
                    </label>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    No available events found.
                  </div>
                )
              ) : (
                <div className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  Select a volunteer to assign events.
                </div>
              )}
            </div>

            {/* Selected Preview */}
            {selectedEventObjects.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-bold text-gray-800 mb-3">
                  Selected Events ({selectedEventObjects.length})
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedEventObjects.map((ev) => (
                    <div
                      key={ev._id}
                      className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-200"
                    >
                      <span className="truncate max-w-40">{ev.name}</span>

                      <button
                        type="button"
                        onClick={() => handleRemoveSelected(ev._id)}
                        className="text-blue-800 hover:text-red-600 font-black"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assign Button */}
            <button
              onClick={handleAssign}
              disabled={
                assigning || !selectedVolunteer || selectedEvents.length === 0
              }
              className={`mt-6 w-full h-12 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2
                ${
                  assigning || !selectedVolunteer || selectedEvents.length === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800 text-white"
                }
              `}
            >
              <CheckCircle2 size={18} />
              {assigning
                ? "Assigning..."
                : `Assign (${selectedEvents.length}) Events`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignVolunteer;
