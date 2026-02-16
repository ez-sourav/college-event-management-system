import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, auth } = useAuthContext();

  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
