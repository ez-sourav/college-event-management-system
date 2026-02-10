import {
  Ticket,
  Bell,
  CalendarDays,
  MapPin,
  BadgeCheck,
  CheckCircle2,
  Hourglass,
  Lock,
  ZoomIn,
  Wallet,
  Download,
  Headset,
  ArrowRight,
  X,
} from "lucide-react";
import { useState } from "react";

const MyTicket = () => {
  const [selectedQR, setSelectedQR] = useState(null);

  const tickets = [
    {
      status: "Confirmed",
      statusColor: "text-blue-700",
      bannerBg: "bg-blue-100 border-blue-200",
      ticketId: "#TKT-8921",
      title: "Hackathon Opening Ceremony",
      date: "Oct 12",
      time: "10:00 AM",
      location: "Main Auditorium",
      qr: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_S8BFGY8xjbI-5s0UcWveX7Vmpecsd3PC1Pa-810KsP2behXo26ftoI4vELvxeZwZrAUy_s6mhCHgkNhBgAO0WGEYjGz_NegbG77Jnh9-NiVL3pzmgZBqW5DFfgDeHGjBAoYenHlid4zP79cXbtNo0jHLe0WLWxLF2H1606BNpGMfl9k9Thf1Nz-JxITx_Eag-nnrnY_eEU0cqmVV2G0e1-K0NLWURF-Lxrx_U-znjvl0ncffRdKt80wwcIaIOfRfAbNwCKQNapM",
      icon: <BadgeCheck size={16} />,
      active: true,
    },
    {
      status: "Active",
      statusColor: "text-green-700",
      bannerBg: "bg-green-100 border-green-200",
      ticketId: "#TKT-4402",
      title: "Drone Racing League",
      date: "Oct 12",
      time: "02:00 PM",
      location: "Open Ground B",
      qr: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp2JXo73FwWyyfMh09K5PISfv_rhTF_yuV_-OSWKeZOoRAjinJU1YEJho7CZwDH_wVjEyykjHkdrzfgJ8BZBM_ReeLR443Z89IS84Zb8MQcVICLwkU9Y2SChT9MtdqGtHmDDrf10fj3hJyEI6LcRi1EzZmYYNTtXCNRC37o-jOILifRRmPh4KAf6KwgR_cPCJUao77knqAg6orxsS6bKlf4RTqI-qiQEyTpPbHRzat6-L83TxdV8d9KJucMU-hu9DR0N5iL_bY6uA",
      icon: <CheckCircle2 size={16} />,
      active: true,
    },
    {
      status: "Waitlisted",
      statusColor: "text-orange-700",
      bannerBg: "bg-orange-100 border-orange-200",
      ticketId: "#REQ-1102",
      title: "AI & Ethics Workshop",
      date: "Oct 13",
      time: "04:30 PM",
      location: "Lab 304",
      qr: "https://lh3.googleusercontent.com/aida-public/AB6AXuAorgNrE9gmyVVG4yW4RlMbGh5DH-5J8Di4TAxOv3bPo1jPZYT-HuGnUZ9OsWzkbflxcod39wLC5cmMUUyx6uIx6PAbg8_UxvYi6ano8_-0G5YaUq7yHr52d_Qgv8QvhEqh_wADOl-AQu3bSjcbxSQ5_6jQ8x-lOSFhTi4MPV_cltwftDO4eZQ64pyJk6C-TdblJIyJIJjg4SplXws6TP860hQ9P6JlfUAYDAEviogUFI9qOu643QNccnO-RBmUSW-Sev16ifeTMfE",
      icon: <Hourglass size={16} />,
      active: false,
    },
    {
      status: "Confirmed",
      statusColor: "text-blue-700",
      bannerBg: "bg-blue-100 border-blue-200",
      ticketId: "#TKT-5590",
      title: "Robowars Finals",
      date: "Oct 14",
      time: "05:00 PM",
      location: "Main Arena",
      qr: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMjbnM1Hu4MnttJQv_FlC0yuvB50kqsi4GGBdBYjnI9innZ9_fyTAIA4KmuELPaymsGritLSmg3maebZ4luD_q5bevY0qMSow6nLez2lN9Je2NKjAViIEwpEvmZx3yQztvQyMG3odZOlSV8zGzbcVdXjRlRm3r73-TOdwm9P2OfMns_b5sJJ7eB3pS_XiFmlikHmIlgzaPOXnKK7c1OSpsTb8FZtrIQwzPoDOSt8EiuNhvsU_CtkrZoWLFXOLEJE8kJ8IV2ta7G28",
      icon: <BadgeCheck size={16} />,
      active: true,
    },
    {
      status: "Confirmed",
      statusColor: "text-blue-700",
      bannerBg: "bg-blue-100 border-blue-200",
      ticketId: "#TKT-5590",
      title: "Robowars Finals",
      date: "Oct 14",
      time: "05:00 PM",
      location: "Main Arena",
      qr: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMjbnM1Hu4MnttJQv_FlC0yuvB50kqsi4GGBdBYjnI9innZ9_fyTAIA4KmuELPaymsGritLSmg3maebZ4luD_q5bevY0qMSow6nLez2lN9Je2NKjAViIEwpEvmZx3yQztvQyMG3odZOlSV8zGzbcVdXjRlRm3r73-TOdwm9P2OfMns_b5sJJ7eB3pS_XiFmlikHmIlgzaPOXnKK7c1OSpsTb8FZtrIQwzPoDOSt8EiuNhvsU_CtkrZoWLFXOLEJE8kJ8IV2ta7G28",
      icon: <BadgeCheck size={16} />,
      active: true,
    },
  ];

  return (
    <div className="bg-[#f6f7fb] min-h-screen flex flex-col text-[#111218]">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              My Tickets
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
              Manage your event passes. Brighten your screen when presenting QR
              codes at entry points.
            </p>
          </div>

          <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
            <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded bg-blue-700 text-white shadow-sm whitespace-nowrap">
              Upcoming
            </button>
            <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap">
              Past Events
            </button>
            <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap">
              Workshops
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tickets.map((ticket, index) => (
            <article
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Status */}
              <div
                className={`px-4 sm:px-5 py-2 flex justify-between items-center border-b ${ticket.bannerBg}`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${ticket.statusColor}`}
                >
                  {ticket.icon}
                  {ticket.status}
                </span>

                <span className="text-xs font-mono text-gray-600">
                  {ticket.ticketId}
                </span>
              </div>

              <div
                className={`p-4 sm:p-5 flex flex-col items-center gap-4 sm:gap-6 flex-1 ${
                  ticket.active ? "" : "opacity-60"
                }`}
              >
                {/* QR */}
                <div className="relative group">
                  <div
                    className={`bg-white p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 shadow-inner ${
                      ticket.active ? "cursor-pointer" : ""
                    } ${ticket.active ? "" : "blur-[2px] grayscale"}`}
                    onClick={() => ticket.active && setSelectedQR(ticket)}
                  >
                    <img
                      alt="QR Code"
                      className="w-32 h-32 sm:w-40 sm:h-40 mix-blend-multiply"
                      src={ticket.qr}
                    />
                  </div>

                  {ticket.active ? (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-xl backdrop-blur-sm pointer-events-none">
                      <ZoomIn
                        size={32}
                        className="text-blue-700 sm:w-10 sm:h-10"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock
                        size={32}
                        className="text-gray-400 sm:w-10 sm:h-10"
                      />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="text-center space-y-2 sm:space-y-3 w-full">
                  <h3 className="text-lg sm:text-xl font-bold leading-tight px-2">
                    {ticket.title}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 bg-gray-100 py-2 px-3 rounded-lg w-full">
                    <CalendarDays
                      size={14}
                      className="sm:w-4 sm:h-4 shrink-0"
                    />
                    <span className="whitespace-nowrap">{ticket.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400 mx-0.5 sm:mx-1"></span>
                    <span className="whitespace-nowrap">{ticket.time}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 w-full">
                    <MapPin size={14} className="sm:w-4 sm:h-4 shrink-0" />
                    <span>{ticket.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
                {ticket.active ? (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-black text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity">
                      <Wallet size={16} className="sm:w-4.5 sm:h-4.5" />
                      <span className="hidden xs:inline">Wallet</span>
                      <span className="xs:hidden">Add</span>
                    </button>

                    <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-black border border-gray-200 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors">
                      <Download size={16} className="sm:w-4.5 sm:h-4.5" />
                      PDF
                    </button>
                  </div>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-500 border border-gray-200 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium cursor-not-allowed">
                    Ticket Unavailable
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center text-center gap-3 sm:gap-4 py-8 sm:py-12 border-t border-gray-200 px-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-700">
            <Headset size={24} className="sm:w-6.5 sm:h-6.5" />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold">
              Having trouble with your tickets?
            </h3>
            <p className="text-gray-500 mt-1 text-xs sm:text-sm max-w-md">
              Visit the Help Desk near the Main Entrance or contact support.
            </p>
          </div>

          <a className="text-blue-700 font-medium hover:underline flex items-center gap-1 text-sm sm:text-base cursor-pointer">
            Contact Volunteer Support <ArrowRight size={16} />
          </a>
        </div>
      </main>

      {/* QR Modal - Fullscreen on mobile */}
      {selectedQR && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedQR(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setSelectedQR(null)}
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className={`px-4 py-2 rounded-lg ${selectedQR.bannerBg}`}>
                <span
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${selectedQR.statusColor}`}
                >
                  {selectedQR.icon}
                  {selectedQR.status}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-center">
                {selectedQR.title}
              </h3>

              <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-dashed border-gray-300">
                <img
                  alt="QR Code"
                  className="w-64 h-64 sm:w-72 sm:h-72 mx-auto"
                  src={selectedQR.qr}
                />
              </div>
 
              <div className="text-center space-y-2 w-full">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <CalendarDays size={16} />
                  <span>{selectedQR.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400 mx-1"></span>
                  <span>{selectedQR.time}</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{selectedQR.location}</span>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Present this QR code at the entrance
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTicket;
