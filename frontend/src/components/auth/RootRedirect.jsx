import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

function getDefaultRoute(role) {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "STUDENT":
      return "/events";
    case "VOLUNTEER":
      return "/assigned-events";
    default:
      return "/login";
  }
}

export default function RootRedirect() {
  const { isAuthenticated, auth } = useAuthContext();

  console.log(auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDefaultRoute(auth.user.role)} replace />;
}
