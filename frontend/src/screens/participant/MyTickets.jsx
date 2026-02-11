import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const MyTicket = () => {
  const { auth } = useAuthContext();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:8000/participations/me", {
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

  if (loading) {
    return <div className="p-10 text-center">Loading tickets...</div>;
  }

  if (!tickets.length) {
    return <div className="p-10 text-center">No tickets found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => {
          const qrData = JSON.stringify({
            participationId: ticket._id,
          });

          return (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
            >
              {/* Visible Preview */}
              <div className="bg-white p-6 text-center">
                <h2 className="text-lg font-bold mb-4">
                  {ticket.eventId.name}
                </h2>

                <div className="flex justify-center items-center w-full">
                  <QRCode value={qrData} size={180} />
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Ticket ID: {ticket._id}
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(ticket._id)}
                className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
              >
                <Download size={16} />
                Download PDF
              </button>

              <div
                id={`print-${ticket._id}`}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: 0,
                  width: "400px",
                  backgroundColor: "#ffffff",
                  padding: "40px",
                  textAlign: "center",
                  fontFamily: "Arial, sans-serif",
                  color: "#000000",
                }}
              >
                <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>
                  Event Participation Ticket
                </h2>

                <QRCode value={qrData} size={200} />

                <p style={{ marginTop: "20px", fontSize: "14px" }}>
                  Ticket ID: {ticket._id}
                </p>

                <p style={{ marginTop: "10px", fontSize: "12px" }}>
                  Present this QR code at the event entrance.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTicket;
