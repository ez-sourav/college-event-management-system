import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto">
          <ShieldAlert size={32} />
        </div>

        {/* Text */}
        <div className="text-center mt-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Unauthorized Access
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            You don’t have permission to view this page.  
            Please login with the correct account or go back.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-[#1121d4] text-white font-semibold hover:bg-[#1121d4]/90 transition shadow-md"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Error Code: <span className="font-semibold">401</span> | Access Denied
        </p>
      </div>
    </div>
  );
}

export default Unauthorized;
