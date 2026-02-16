import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function Login() {
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password", "");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError("");

      const res = await loginUser(data);

      login(res);

      if (res.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (res.user.role === "STUDENT") {
        navigate("/events");
      } else {
        navigate("/assigned-events");
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
        <div className="bg-white/90 backdrop-blur-md p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>

            <p className="text-sm sm:text-base text-gray-600">
              Login to continue to your account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className={`h-5 w-5 transition-colors ${
                      errors.email ? "text-red-400" : "text-gray-400"
                    }`}
                  />
                </div>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-200 bg-white text-sm ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />

                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>

              {errors.email && (
                <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <p className="text-xs font-medium">{errors.email.message}</p>
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className={`h-5 w-5 transition-colors ${
                      errors.password ? "text-red-400" : "text-gray-400"
                    }`}
                  />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-2.5 sm:py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-200 bg-white text-sm ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {passwordValue.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:opacity-70 transition z-10"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                )}
              </div>

              {errors.password && (
                <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <p className="text-xs font-medium">
                    {errors.password.message}
                  </p>
                </div>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Login Failed</p>
                    <p className="text-sm mt-1">{serverError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:active:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
              >
                Create new account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
