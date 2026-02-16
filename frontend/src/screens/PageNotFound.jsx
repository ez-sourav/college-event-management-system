import { Frown, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-[#1121d4] mx-auto">
          <Frown size={32} />
        </div>

        {/* Text */}
        <div className="text-center mt-6">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
            Page Not Found
          </h2>

          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            Oops! The page you’re looking for doesn’t exist or may have been
            moved.
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
          Error Code: <span className="font-semibold">404</span> | Page Missing
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
