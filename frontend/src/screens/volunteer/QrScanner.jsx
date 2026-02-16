import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useAuthContext } from "../../../hooks/useAuthContext";

const QrScanner = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const { eventId } = useParams();
  const { auth } = useAuthContext();

  const [scanning, setScanning] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (result) => {
    if (!result || !scanning) return;

    try {
      setScanning(false);

      // If QR contains JSON
      let participationId;
      try {
        const parsed = JSON.parse(result[0].rawValue);
        participationId = parsed.participationId;
      } catch {
        // If QR is plain ID
        participationId = result[0].rawValue;
      }

      const res = await axios.post(
        `${baseURL}/participations/${participationId}/checkin`,
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      setMessage(res.data.message);
      setError(null);
      alert("✅ " + res.data.message);
    } catch (err) {
      const errorMsg =
        err.response?.data?.messsage ||
        err.response?.data?.message ||
        "Invalid QR Code";

      setError(errorMsg);
      setMessage(null);
      alert("❌ " + errorMsg);
    } finally {
      setTimeout(() => {
        setScanning(true);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Scan QR Code</h1>

      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-md">
        <Scanner
          onScan={handleScan}
          onError={(err) => console.error(err)}
          constraints={{ facingMode: "environment" }}
        />
      </div>

      {message && (
        <div className="mt-6 text-green-600 font-semibold">{message}</div>
      )}

      {error && <div className="mt-6 text-red-600 font-semibold">{error}</div>}
    </div>
  );
};

export default QrScanner;
