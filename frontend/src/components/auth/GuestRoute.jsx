import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

function getDefaultRoute(role) {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "STUDENT":
      return "/events";
    default:
      return "/assigned-events";
  }
}

export default function GuestRoute() {
  const { isAuthenticated, auth } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={getDefaultRoute(auth.user.role)} replace />;
  }

  return <Outlet />;
}
