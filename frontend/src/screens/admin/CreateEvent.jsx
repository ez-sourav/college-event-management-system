import { useRef, useState } from "react";
import {
  Info,
  UploadCloud,
  Calendar,
  CalendarX,
  MapPin,
  Users,
  ChevronDown,
  Save,
} from "lucide-react";

const CreateEvent = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    startTime: "",
    endTime: "",
    venue: "",
    capacity: "",
    banner: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          banner: "File size must be less than 10MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        banner: file,
      }));

      setErrors((prev) => ({
        ...prev,
        banner: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start date & time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End date & time is required";
    }

    if (formData.startTime && formData.endTime) {
      if (new Date(formData.endTime) <= new Date(formData.startTime)) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    if (!formData.venue) {
      newErrors.venue = "Venue is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Event Data:", formData);
      alert("Event created successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* SIMPLE HEADER LIKE OLD VERSION */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Create New Event
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Fill in the details below to add a new event to the tech fest schedule.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Event Information Section */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Info size={20} className="text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Event Information
              </h2>
            </div>

            {/* Event Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Event Name <span className="text-red-500">*</span>
              </label>

              <input
                className={`w-full h-12 px-4 rounded-xl border-2 ${
                  errors.eventName
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all`}
                placeholder="e.g., Hackathon Opening Ceremony"
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
              />

              {errors.eventName && (
                <p className="text-sm text-red-500 mt-1">{errors.eventName}</p>
              )}
            </div>

            {/* Banner Upload (NO PREVIEW) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Event Banner
              </label>

              <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    handleFileChange({ target: { files: [file] } });
                  }
                }}
                className="border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group p-8 sm:p-12"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <UploadCloud size={32} className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-base font-medium text-gray-700 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>

                  {formData.banner && (
                    <p className="text-sm text-green-600 font-medium">
                      Selected: {formData.banner.name}
                    </p>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              {errors.banner && (
                <p className="text-sm text-red-500 mt-1">{errors.banner}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all resize-none"
                placeholder="Describe the event agenda, prerequisites, and what participants can expect..."
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Logistics Section */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Logistics
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Start Date & Time */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Start Date & Time <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Calendar size={18} />
                  </div>

                  <input
                    className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 ${
                      errors.startTime
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    } bg-white text-gray-800 focus:outline-none focus:ring-4 transition-all`}
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                </div>

                {errors.startTime && (
                  <p className="text-sm text-red-500 mt-1">{errors.startTime}</p>
                )}
              </div>

              {/* End Date & Time */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  End Date & Time <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <CalendarX size={18} />
                  </div>

                  <input
                    className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 ${
                      errors.endTime
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    } bg-white text-gray-800 focus:outline-none focus:ring-4 transition-all`}
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>

                {errors.endTime && (
                  <p className="text-sm text-red-500 mt-1">{errors.endTime}</p>
                )}
              </div>

              {/* Venue */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Venue <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <MapPin size={18} />
                  </div>

                  <select
                    className={`w-full h-12 pl-12 pr-10 rounded-xl border-2 ${
                      errors.venue
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    } bg-white text-gray-800 focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer`}
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    <option value="main-auditorium">Main Auditorium</option>
                    <option value="cs-lab-1">CS Lab 1 (Block A)</option>
                    <option value="seminar-hall">Seminar Hall</option>
                    <option value="open-grounds">Open Grounds</option>
                  </select>

                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>

                {errors.venue && (
                  <p className="text-sm text-red-500 mt-1">{errors.venue}</p>
                )}
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Max Capacity
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Users size={18} />
                  </div>

                  <input
                    className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                    type="number"
                    min="1"
                    placeholder="e.g. 100"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 sm:p-8 bg-white border-t-2 border-gray-100">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <Save size={18} />
                Save Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
