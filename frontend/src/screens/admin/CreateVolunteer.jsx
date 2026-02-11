import { useMemo, useState, useRef } from "react";
import {
  UserPlus,
  Badge,
  Mail,
  Lock,
  Save,
  ClipboardList,
  Calendar,
  Search,
  MapPin,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const CreateVolunteer = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const eventsRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    autoGenerate: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    events: "",
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Opening Ceremony & Keynote",
      status: "Active",
      statusStyle: "bg-green-100 text-green-800",
      time: "09:00 AM - 11:30 AM",
      venue: "Main Auditorium",
      selected: false,
      disabled: false,
    },
    {
      id: 2,
      title: "Robotics Workshop: Level 1",
      status: "Pending",
      statusStyle: "bg-yellow-100 text-yellow-800",
      time: "12:00 PM - 02:00 PM",
      venue: "Lab Complex B",
      selected: false,
      disabled: false,
    },
    {
      id: 3,
      title: "Lunch Logistics Team",
      status: "Staff",
      statusStyle: "bg-blue-100 text-blue-800",
      time: "11:30 AM - 01:30 PM",
      venue: "Cafeteria & Lawn",
      selected: false,
      disabled: false,
    },
    {
      id: 4,
      title: "Hackathon: Code Sprint",
      status: "Tech",
      statusStyle: "bg-purple-100 text-purple-800",
      time: "02:00 PM - 06:00 PM",
      venue: "Tech Hub Hall",
      selected: false,
      disabled: false,
    },
    {
      id: 5,
      title: "Guest Speaker Reception",
      status: "VIP",
      statusStyle: "bg-pink-100 text-pink-800",
      time: "06:00 PM - 07:30 PM",
      venue: "VIP Lounge",
      selected: false,
      disabled: false,
    },
    {
      id: 6,
      title: "Networking Mixer (Full)",
      status: "Full",
      statusStyle: "bg-gray-100 text-gray-800",
      time: "08:00 PM - 10:00 PM",
      venue: "Rooftop Terrace",
      selected: false,
      disabled: true,
    },
    {
      id: 7,
      title: "Networking Mixer (Full)",
      status: "Full",
      statusStyle: "bg-gray-100 text-gray-800",
      time: "08:00 PM - 10:00 PM",
      venue: "Rooftop Terrace",
      selected: false,
      disabled: true,
    },
    {
      id: 8,
      title: "Networking Mixer (Full)",
      status: "Full",
      statusStyle: "bg-gray-100 text-gray-800",
      time: "08:00 PM - 10:00 PM",
      venue: "Rooftop Terrace",
      selected: false,
      disabled: true,
    },
  ]);

  const generatePassword = (length = 10) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
  };

  const selectedCount = useMemo(() => {
    return events.filter((e) => e.selected).length;
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const term = searchTerm.toLowerCase();
      return (
        e.title.toLowerCase().includes(term) ||
        e.venue.toLowerCase().includes(term)
      );
    });
  }, [events, searchTerm]);

  const handleToggleEvent = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id && !event.disabled
          ? { ...event, selected: !event.selected }
          : event,
      ),
    );

    setErrors((prev) => ({ ...prev, events: "" }));
  };

  const handleAutoGenerateToggle = (checked) => {
    setFormData((prev) => ({
      ...prev,
      autoGenerate: checked,
      password: checked ? generatePassword() : prev.password,
    }));

    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      events: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
      setErrors(newErrors);

      nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      nameRef.current?.focus();
      return false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      setErrors(newErrors);

      emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      emailRef.current?.focus();
      return false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      setErrors(newErrors);

      passwordRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      passwordRef.current?.focus();
      return false;
    }

    if (selectedCount === 0) {
      newErrors.events = "Select at least 1 event to assign.";
      setErrors(newErrors);

      eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return false;
    }

    setErrors(newErrors);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const selectedEvents = events.filter((e) => e.selected);

    const payload = {
      ...formData,
      assignedEvents: selectedEvents,
    };

    console.log("Volunteer Create Payload:", payload);
    alert("Volunteer Created + Events Assigned Successfully!");
  };

  return (
    <div className="bg-gray-200 text-[#111218] min-h-screen flex flex-col font-sans pb-20 lg:pb-0">
      <main className="flex-1 flex flex-col max-w-360 mx-auto w-full px-4 sm:px-6 md:px-10 py-6 md:py-10 gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#111218] text-2xl sm:text-3xl font-black leading-tight tracking-[-0.033em]">
            Create Volunteer & Assign Event
          </h1>
          <p className="text-[#616589] text-sm sm:text-base font-normal">
            Onboard new staff and allocate responsibilities immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-full">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#f0f0f4] p-5 sm:p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f0f0f4]">
                <UserPlus className="text-[#1121d4]" size={22} />
                <h2 className="text-lg sm:text-xl font-bold text-[#111218]">
                  Volunteer Details
                </h2>
              </div>

              <form
                className="flex flex-col gap-5 flex-1"
                onSubmit={handleSubmit}
              >
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#111218]">
                    Full Name
                  </span>
                  <div className="relative">
                    <Badge
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#616589]"
                    />
                    <input
                      ref={nameRef}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className={`w-full h-12 rounded-lg border bg-white pl-12 pr-4 text-[#111218] focus:outline-none focus:ring-2 placeholder:text-[#616589]
                        ${
                          errors.name
                            ? "border-red-400 focus:ring-red-300"
                            : "border-[#dbdce6] focus:ring-[#1121d4]/50 focus:border-[#1121d4]"
                        }`}
                      placeholder="e.g. Sarah Jenkins"
                      type="text"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  )}
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#111218]">
                    Email Address
                  </span>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#616589]"
                    />
                    <input
                      ref={emailRef}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={`w-full h-12 rounded-lg border bg-white pl-12 pr-4 text-[#111218] focus:outline-none focus:ring-2 placeholder:text-[#616589]
                        ${
                          errors.email
                            ? "border-red-400 focus:ring-red-300"
                            : "border-[#dbdce6] focus:ring-[#1121d4]/50 focus:border-[#1121d4]"
                        }`}
                      placeholder="e.g. sarah@university.edu"
                      type="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.email}
                    </p>
                  )}
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#111218]">
                    Password
                  </span>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#616589]"
                    />

                    <input
                      ref={passwordRef}
                      value={formData.password}
                      disabled={formData.autoGenerate}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      className={`w-full h-12 rounded-lg border pl-12 pr-12 text-[#111218] focus:outline-none focus:ring-2 placeholder:text-[#616589]
                        ${
                          formData.autoGenerate
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-white"
                        }
                        ${
                          errors.password
                            ? "border-red-400 focus:ring-red-300"
                            : "border-[#dbdce6] focus:ring-[#1121d4]/50 focus:border-[#1121d4]"
                        }`}
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                    />

                    {formData.password.trim() !== "" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#616589] hover:text-[#111218]"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    )}
                  </div>

                  {errors.password && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.password}
                    </p>
                  )}
                </label>

                {/* auto generate password */}
                <div className="bg-[#f6f6f8] p-4 rounded-lg border border-[#dbdce6] mt-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[#111218]">
                      Auto Generate Password
                    </span>

                    <label className="inline-flex items-center cursor-pointer shrink-0">
                      <input
                        checked={formData.autoGenerate}
                        onChange={(e) =>
                          handleAutoGenerateToggle(e.target.checked)
                        }
                        className="sr-only peer"
                        type="checkbox"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1121d4]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1121d4]" />
                    </label>
                  </div>

                  <p className="text-xs text-[#616589] mt-3">
                    If enabled, password will be auto-generated and can’t be
                    edited manually.
                  </p>
                </div>

                {/* for desktop button */}
                <button className="hidden lg:flex w-full h-12 bg-[#1121d4] hover:bg-[#1121d4]/90 text-white rounded-lg font-bold text-sm shadow-md transition-all items-center justify-center gap-2 mt-6">
                  <Save size={18} />
                  Create & Assign
                </button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col h-130 sm:h-150 lg:h-[calc(100vh-150px)]">
            <div
              ref={eventsRef}
              className="bg-white rounded-xl shadow-sm border border-[#f0f0f4] flex flex-col h-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-[#f0f0f4] bg-white z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#111218] flex items-center gap-2">
                      <ClipboardList className="text-[#1121d4]" size={22} />
                      Assign Responsibilities
                    </h2>
                    <p className="text-sm text-[#616589] mt-1">
                      Select events this volunteer will manage.
                    </p>
                  </div>

                  <div className="w-fit flex items-center gap-2 bg-[#1121d4]/10 px-3 py-1 rounded-full text-xs font-bold text-[#1121d4]">
                    <Calendar size={14} />
                    {selectedCount} Selected
                  </div>
                </div>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#616589]"
                  />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 rounded-lg border border-[#dbdce6] bg-[#f6f6f8] pl-12 pr-4 text-sm text-[#111218] focus:outline-none focus:ring-2 focus:ring-[#1121d4]/50 focus:border-[#1121d4] placeholder:text-[#616589]"
                    placeholder="Search by event name or venue..."
                    type="text"
                  />
                </div>

                {errors.events && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-3">
                    <AlertCircle size={14} /> {errors.events}
                  </p>
                )}
              </div>

              {/* Scroll List */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-[#fbfbfc]">
                {filteredEvents.map((event) => {
                  const selected = event.selected;

                  return (
                    <label
                      key={event.id}
                      className={`group relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl cursor-pointer transition-all hover:shadow-md
                      ${
                        selected
                          ? "border-2 border-[#1121d4] bg-[#1121d4]/5"
                          : "border border-[#e5e7eb] bg-white hover:border-[#1121d4]/50"
                      }
                      ${event.disabled ? "opacity-60 cursor-not-allowed" : ""}
                      `}
                    >
                      <div className="pt-1">
                        <input
                          checked={event.selected}
                          disabled={event.disabled}
                          onChange={() => handleToggleEvent(event.id)}
                          className="w-5 h-5 text-[#1121d4] border-gray-300 rounded focus:ring-[#1121d4]"
                          type="checkbox"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <h3 className="font-bold text-[#111218] text-base">
                            {event.title}
                          </h3>

                          <span
                            className={`w-fit inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${event.statusStyle}`}
                          >
                            {event.status}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 text-sm text-[#616589]">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            {event.time}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <MapPin size={16} />
                            {event.venue}
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-3 bg-white border-t border-[#f0f0f4] text-center text-xs text-[#616589]">
                Showing {filteredEvents.length} of {events.length} scheduled
                events
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* for Mobile version  Button */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 shadow-lg z-50">
        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-[#1121d4] hover:bg-[#1121d4]/90 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Save size={18} />
          Create & Assign
        </button>
      </div>
    </div>
  );
};

export default CreateVolunteer;
