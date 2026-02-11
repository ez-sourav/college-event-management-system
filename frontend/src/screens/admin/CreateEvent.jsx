import { useRef, useState } from "react";
import axios from "axios";

import {
  Info,
  UploadCloud,
  Calendar,
  CalendarX,
  MapPin,
  Users,
  ChevronDown,
  Save,
  Plus,
  Trash2,
  Wallet,
  ClipboardList,
  Trophy,
  CheckCircle2,
} from "lucide-react";

const UPLOAD_API_URL = "http://localhost:8000/uploads/banner";
const CREATE_EVENT_API_URL = "http://localhost:8000/events";

const CreateEvent = () => {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [bannerPreview, setBannerPreview] = useState("");
  const [openPreview, setOpenPreview] = useState(false);

  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    startTime: "",
    endTime: "",
    registrationStartDate: "",
    registrationDeadline: "",
    venue: "",
    capacity: "",
    entryFee: "",
    teamSizeMin: "",
    teamSizeMax: "",
    rules: [""],
    prizes: [
      {
        position: "",
        amount: "",
        perks: "",
      },
    ],
    bannerUrl: "",
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

  // UPLOAD IMAGE TO BACKEND
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        banner: "File size must be less than 3MB",
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      banner: "",
    }));

    try {
      setUploading(true);
      setUploadProgress(0);
      setBannerPreview("");
      setFormData((prev) => ({ ...prev, bannerUrl: "" }));

      const data = new FormData();
      data.append("image", file);

      const token = localStorage.getItem("token");

      if (!token) {
        setErrors((prev) => ({
          ...prev,
          banner: "You are not logged in. Please login first.",
        }));
        setUploading(false);
        return;
      }

      const res = await axios.post(UPLOAD_API_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });

      // SUCCESS RESPONSE
      setFormData((prev) => ({
        ...prev,
        bannerUrl: res.data.url,
      }));

      setUploadProgress(100);

      // Preview after upload success
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);

      setTimeout(() => {
        setUploading(false);
      }, 500);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        banner: error.response?.data?.message || error.message,
      }));

      setBannerPreview("");
      setFormData((prev) => ({
        ...prev,
        bannerUrl: "",
      }));

      setUploading(false);
      setUploadProgress(0);
    }
  };

  // RULES HANDLING
  const handleRuleChange = (index, value) => {
    const updatedRules = [...formData.rules];
    updatedRules[index] = value;

    setFormData((prev) => ({
      ...prev,
      rules: updatedRules,
    }));

    if (errors.rules) {
      setErrors((prev) => ({
        ...prev,
        rules: "",
      }));
    }
  };

  const addRule = () => {
    setFormData((prev) => ({
      ...prev,
      rules: [...prev.rules, ""],
    }));
  };

  const removeRule = (index) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      rules: updatedRules.length > 0 ? updatedRules : [""],
    }));
  };

  // PRIZES HANDLING
  const handlePrizeChange = (index, field, value) => {
    const updatedPrizes = [...formData.prizes];
    updatedPrizes[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      prizes: updatedPrizes,
    }));

    if (errors.prizes) {
      setErrors((prev) => ({
        ...prev,
        prizes: "",
      }));
    }
  };

  const addPrize = () => {
    setFormData((prev) => ({
      ...prev,
      prizes: [
        ...prev.prizes,
        {
          position: "",
          amount: "",
          perks: "",
        },
      ],
    }));
  };

  const removePrize = (index) => {
    const updatedPrizes = formData.prizes.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      prizes: updatedPrizes.length > 0 ? updatedPrizes : prev.prizes,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eventName.trim()) {
      newErrors.eventName = "Event name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
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

    if (!formData.registrationStartDate) {
      newErrors.registrationStartDate = "Registration start date is required";
    }

    if (!formData.registrationDeadline) {
      newErrors.registrationDeadline = "Registration deadline is required";
    }

    if (formData.registrationStartDate && formData.registrationDeadline) {
      if (
        new Date(formData.registrationDeadline) <=
        new Date(formData.registrationStartDate)
      ) {
        newErrors.registrationDeadline =
          "Registration deadline must be after start date";
      }
    }

    if (!formData.venue) {
      newErrors.venue = "Venue is required";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Max capacity is required";
    }

    if (formData.teamSizeMin && formData.teamSizeMax) {
      if (Number(formData.teamSizeMin) > Number(formData.teamSizeMax)) {
        newErrors.teamSizeMax = "Max team size must be greater than Min";
      }
    }

    const validRules = formData.rules.filter((r) => r.trim() !== "");
    if (validRules.length === 0) {
      newErrors.rules = "At least one rule is required";
    }

    const validPrizes = formData.prizes.filter(
      (p) =>
        p.position.trim() !== "" &&
        p.amount.toString().trim() !== "" &&
        p.perks.trim() !== "",
    );

    if (validPrizes.length === 0) {
      newErrors.prizes = "At least one complete prize is required";
    }

    if (!formData.bannerUrl) {
      newErrors.banner = "Banner image upload is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) {
      alert("Banner is uploading... Please wait!");
      return;
    }

    if (validateForm()) {
      const finalPayload = {
        name: formData.eventName,
        description: formData.description,
        bannerImageUrl: formData.bannerUrl,
        startTime: formData.startTime,
        endTime: formData.endTime,
        registrationStartDate: formData.registrationStartDate,
        registrationDeadline: formData.registrationDeadline,
        venue: formData.venue,
        maxParticipants: Number(formData.capacity),
        entryFee: formData.entryFee ? Number(formData.entryFee) : 0,
        teamSize: {
          min: formData.teamSizeMin ? Number(formData.teamSizeMin) : 1,
          max: formData.teamSizeMax ? Number(formData.teamSizeMax) : 1,
        },
        rules: formData.rules.filter((r) => r.trim() !== ""),
        prizes: formData.prizes
          .filter(
            (p) =>
              p.position.trim() !== "" &&
              p.amount.toString().trim() !== "" &&
              p.perks.trim() !== "",
          )
          .map((p) => ({
            position: p.position,
            amount: Number(p.amount),
            perks: p.perks,
          })),
      };

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Login required!");
          return;
        }

        const res = await axios.post(CREATE_EVENT_API_URL, finalPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Saved Event:", res.data);
        alert("Event created successfully!");
      } catch (error) {
        alert(error.response?.data?.message || "Event create failed!");
        console.log(error);
        return;
      }

      setFormData({
        eventName: "",
        description: "",
        startTime: "",
        endTime: "",
        registrationStartDate: "",
        registrationDeadline: "",
        venue: "",
        capacity: "",
        entryFee: "",
        teamSizeMin: "",
        teamSizeMax: "",
        rules: [""],
        prizes: [
          {
            position: "",
            amount: "",
            perks: "",
          },
        ],
        bannerUrl: "",
      });

      setErrors({});
      setBannerPreview("");
      setUploadProgress(0);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      eventName: "",
      description: "",
      startTime: "",
      endTime: "",
      registrationStartDate: "",
      registrationDeadline: "",
      venue: "",
      capacity: "",
      entryFee: "",
      teamSizeMin: "",
      teamSizeMax: "",
      rules: [""],
      prizes: [
        {
          position: "",
          amount: "",
          perks: "",
        },
      ],
      bannerUrl: "",
    });

    setErrors({});
    setBannerPreview("");
    setUploadProgress(0);
    setUploading(false);
    setOpenPreview(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Create New Event
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Fill in the details below to add a new event to the tech fest
          schedule.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Event Info */}
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
                placeholder="e.g., Inter College Hackathon"
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
              />

              {errors.eventName && (
                <p className="text-sm text-red-500 mt-1">{errors.eventName}</p>
              )}
            </div>

            {/* Banner Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Event Banner <span className="text-red-500">*</span>
              </label>

              <div
                onClick={() => {
                  if (!uploading) fileInputRef.current.click();
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (uploading) return;

                  const file = e.dataTransfer.files[0];
                  if (file) {
                    handleFileChange({ target: { files: [file] } });
                  }
                }}
                className={`border-2 border-dashed rounded-xl transition-all group p-6 sm:p-10
                  ${
                    uploading
                      ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-80"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                  }`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <UploadCloud size={32} className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-base font-medium text-gray-700 mb-1">
                      {uploading
                        ? "Uploading banner..."
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 3MB
                    </p>
                  </div>

                  {/*  Progress Bar */}
                  {uploading && (
                    <div className="w-full max-w-md space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 bg-linear-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-xs font-semibold text-gray-600">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                    </div>
                  )}

                  {formData.bannerUrl && !uploading && (
                    <p className="text-sm text-green-600 font-semibold flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-600" />
                      Uploaded Successfully
                    </p>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={uploading}
                />
              </div>

              {/* Preview  */}
              {formData.bannerUrl && bannerPreview && !uploading && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Banner Preview:
                  </p>

                  <div
                    onClick={() => setOpenPreview(true)}
                    className="group relative w-full sm:w-[320px] cursor-pointer overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all"
                  >
                    <img
                      src={bannerPreview}
                      alt="Banner Preview"
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-semibold text-sm bg-black/50 px-4 py-2 rounded-full">
                        Click to View Full Image
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {errors.banner && (
                <p className="text-sm text-red-500 mt-1">{errors.banner}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all resize-none"
                placeholder="Describe the event agenda, prerequisites, and what participants can expect..."
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Logistics */}
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
              {/* Start */}
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors.startTime}
                  </p>
                )}
              </div>

              {/* End */}
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

              {/* Registration Start */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Registration Start <span className="text-red-500">*</span>
                </label>

                <input
                  className={`w-full h-12 px-4 rounded-xl border-2 ${
                    errors.registrationStartDate
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  } bg-white text-gray-800 focus:outline-none focus:ring-4 transition-all`}
                  type="datetime-local"
                  name="registrationStartDate"
                  value={formData.registrationStartDate}
                  onChange={handleChange}
                />

                {errors.registrationStartDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.registrationStartDate}
                  </p>
                )}
              </div>

              {/* Registration Deadline */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Registration Deadline <span className="text-red-500">*</span>
                </label>

                <input
                  className={`w-full h-12 px-4 rounded-xl border-2 ${
                    errors.registrationDeadline
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  } bg-white text-gray-800 focus:outline-none focus:ring-4 transition-all`}
                  type="datetime-local"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                />

                {errors.registrationDeadline && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.registrationDeadline}
                  </p>
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
                    placeholder="e.g. 200"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </div>
                {errors.capacity && (
                  <p className="text-sm text-red-500 mt-1">{errors.capacity}</p>
                )}
              </div>

              {/* Entry Fee */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Entry Fee (₹)
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Wallet size={18} />
                  </div>

                  <input
                    className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                    type="number"
                    min="0"
                    placeholder="e.g. 199"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Team Size */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Team Size (Min / Max)
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                    type="number"
                    min="1"
                    placeholder="Min"
                    name="teamSizeMin"
                    value={formData.teamSizeMin}
                    onChange={handleChange}
                  />

                  <input
                    className={`w-full h-12 px-4 rounded-xl border-2 ${
                      errors.teamSizeMax
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all`}
                    type="number"
                    min="1"
                    placeholder="Max"
                    name="teamSizeMax"
                    value={formData.teamSizeMax}
                    onChange={handleChange}
                  />
                </div>

                {errors.teamSizeMax && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.teamSizeMax}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClipboardList size={20} className="text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Rules & Guidelines <span className="text-red-500">*</span>
              </h2>
            </div>

            <div className="space-y-4">
              {formData.rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                >
                  <input
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                    placeholder={`Rule ${index + 1}`}
                    value={rule}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => removeRule(index)}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              ))}

              {errors.rules && (
                <p className="text-sm text-red-500 mt-2">{errors.rules}</p>
              )}

              <button
                type="button"
                onClick={addRule}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add New Rule
              </button>
            </div>
          </div>

          {/* Prizes */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Trophy size={20} className="text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Prize Details <span className="text-red-500">*</span>
              </h2>
            </div>

            <div className="space-y-5">
              {formData.prizes.map((prize, index) => (
                <div
                  key={index}
                  className="p-5 border-2 border-gray-200 rounded-2xl space-y-4"
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Position
                      </label>
                      <input
                        className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                        placeholder="e.g. Winner"
                        value={prize.position}
                        onChange={(e) =>
                          handlePrizeChange(index, "position", e.target.value)
                        }
                      />
                    </div>

                    <div className="w-full space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Amount (₹)
                      </label>
                      <input
                        className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                        type="number"
                        min="0"
                        placeholder="e.g. 25000"
                        value={prize.amount}
                        onChange={(e) =>
                          handlePrizeChange(index, "amount", e.target.value)
                        }
                      />
                    </div>

                    <div className="w-full space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Perks
                      </label>
                      <input
                        className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                        placeholder="e.g. Trophy + Certificate"
                        value={prize.perks}
                        onChange={(e) =>
                          handlePrizeChange(index, "perks", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removePrize(index)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Remove Prize
                  </button>
                </div>
              ))}

              {errors.prizes && (
                <p className="text-sm text-red-500 mt-2">{errors.prizes}</p>
              )}

              <button
                type="button"
                onClick={addPrize}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add New Prize
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="p-6 sm:p-8 bg-white border-t-2 border-gray-100">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={uploading}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 flex items-center justify-center gap-2 transform hover:scale-105
                ${
                  uploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-300"
                }`}
              >
                <Save size={18} />
                {uploading ? "Uploading..." : "Save Event"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Full Image Modal */}
      {openPreview && (
        <div
          onClick={() => setOpenPreview(false)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
          >
            <img
              src={bannerPreview}
              alt="Full Banner"
              className="w-full max-h-[80vh] object-contain bg-black"
            />

            <button
              onClick={() => setOpenPreview(false)}
              className="absolute top-3 right-3 bg-white text-gray-700 font-bold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
