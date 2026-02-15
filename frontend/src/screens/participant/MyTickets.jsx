import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Download,
  Ticket,
  AlertCircle,
  CalendarDays,
  MapPin,
  Eye,
  X,
} from "lucide-react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const MyTicket = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const { auth } = useAuthContext();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Modal State
  const [selectedTicket, setSelectedTicket] = useState(null);
    //  Stop background scroll when modal open
  useEffect(() => {
    if (selectedTicket) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedTicket]);


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`${baseURL}/participations/me`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        setTickets(res.data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      fetchTickets();
    }
  }, [auth]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const handleDownload = async (id) => {
    const element = document.getElementById(`print-${id}`);
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "pt", "a4");

    const imgWidth = 350;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 120, 80, imgWidth, imgHeight);
    pdf.save(`ticket-${id}.pdf`);
  };

  //  Loading Skeleton UI
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f8] px-4 sm:px-8 lg:px-10 py-8">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-10 w-56 bg-gray-200 rounded-xl mb-10"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="h-28 bg-gray-200"></div>

                <div className="p-6 space-y-4">
                  <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>

                  <div className="h-44 bg-gray-200 rounded-2xl"></div>

                  <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  //  Empty State UI
  if (!tickets.length) {
    return (
      <div className="min-h-screen bg-[#f6f6f8] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 max-w-md w-full text-center">
          <div className="mx-auto size-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <AlertCircle size={26} className="text-[#1121d4]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-5">
            No Tickets Found
          </h2>

          <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
            You haven't registered for any event yet. Once you register, your
            tickets will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f8] px-4 sm:px-8 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
            <Ticket className="text-[#1121d4]" size={28} />
            My Tickets
          </h1>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            View and download your event tickets. Show the QR code at the event
            entrance.
          </p>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tickets.map((ticket) => {
            const qrData = JSON.stringify({
              participationId: ticket._id,
            });

            return (
              <div
                key={ticket._id}
                
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition "
              >
                {/* Top Header */}
                <div className="bg-linear-to-br from-[#1121d4] to-blue-700 px-6 py-5 text-white">
                  <h2 className="font-black text-lg leading-snug line-clamp-2 min-h-12">
                    {ticket.eventId?.name}
                  </h2>

                  <div className="mt-3 space-y-1 text-xs text-blue-100">
                    <p className="flex items-center gap-2 min-h-4">
                      <CalendarDays size={14} />
                      {ticket.eventId?.startTime
                        ? formatDate(ticket.eventId.startTime)
                        : "N/A"}
                    </p>

                    <p className="flex items-center gap-2 line-clamp-1 min-h-4">
                      <MapPin size={14} />
                      {ticket.eventId?.venue || "N/A"}
                    </p>
                  </div>
                </div>

                {/* QR Section */}
                <div className="p-6 flex flex-col items-center">
                  <div 
                  onClick={() => setSelectedTicket(ticket)}
                  className="bg-gray-50 border border-gray-200 rounded-2xl hover:cursor-zoom-in p-4 flex items-center justify-center w-full">
                    <QRCode value={qrData} size={160} />
                  </div>

                  <p className="mt-4 text-xs text-gray-500 font-semibold">
                    Ticket ID
                  </p>

                  <p className="text-sm font-black text-gray-900 text-center break-all">
                    {ticket._id}
                  </p>

                  {/* View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTicket(ticket);
                    }}
                    className="mt-5 w-full flex items-center justify-center gap-2 hover:cursor-pointer bg-gray-100 text-gray-800 px-4 py-3 rounded-xl hover:bg-gray-200 transition font-black text-sm border border-gray-200 active:scale-95"
                  >
                    <Eye size={18} />
                    View Ticket
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(ticket._id);
                    }}
                    className="mt-3 w-full flex items-center hover:cursor-pointer justify-center gap-2 bg-[#1121d4] text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition font-black text-sm shadow-md active:scale-95"
                  >
                    <Download size={18} />
                    Download PDF
                  </button>
                </div>

                {/* Hidden Print Layout */}
                <div
                  id={`print-${ticket._id}`}
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: 0,
                    width: "420px",
                    backgroundColor: "#ffffff",
                    padding: "35px",
                    textAlign: "center",
                    fontFamily: "Arial, sans-serif",
                    color: "#000000",
                    border: "2px solid #e5e7eb",
                    borderRadius: "18px",
                  }}
                >
                  <h2
                    style={{
                      marginBottom: "14px",
                      fontSize: "22px",
                      fontWeight: "800",
                      color: "#1121d4",
                    }}
                  >
                    Event Ticket
                  </h2>

                  <p style={{ fontSize: "14px", marginBottom: "20px" }}>
                    {ticket.eventId?.name}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <QRCode value={qrData} size={210} />
                  </div>

                  <p style={{ fontSize: "13px", marginTop: "15px" }}>
                    Ticket ID:
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      marginTop: "6px",
                      wordBreak: "break-all",
                      fontWeight: "700",
                    }}
                  >
                    {ticket._id}
                  </p>

                  <p style={{ marginTop: "18px", fontSize: "12px" }}>
                    Present this QR code at the event entrance.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Ticket Preview Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-start justify-between p-5 border-b border-gray-200">
                <div>
                  <h2 className="font-black text-lg text-gray-900 leading-snug">
                    {selectedTicket.eventId?.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Ticket Preview</p>
                </div>

                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <X size={20} className="text-gray-700" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex flex-col items-center">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <QRCode
                    value={JSON.stringify({
                      participationId: selectedTicket._id,
                    })}
                    size={220}
                  />
                </div>

                <div className="w-full mt-5 space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-[#1121d4]" />
                    {selectedTicket.eventId?.startTime
                      ? formatDate(selectedTicket.eventId.startTime)
                      : "N/A"}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#1121d4]" />
                    {selectedTicket.eventId?.venue || "N/A"}
                  </p>

                  <p className="text-xs text-gray-500 font-semibold mt-4">
                    Ticket ID
                  </p>

                  <p className="font-black text-gray-900 break-all text-sm">
                    {selectedTicket._id}
                  </p>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(selectedTicket._id)}
                  className="mt-6 w-full hover:cursor-pointer flex items-center justify-center gap-2 bg-[#1121d4] text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition font-black text-sm shadow-md active:scale-95"
                >
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicket;
