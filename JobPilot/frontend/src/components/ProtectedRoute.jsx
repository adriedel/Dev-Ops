import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // Nicht eingeloggt -> Redirect zu Login
    return <Navigate to="/login" replace />;
  }

  // Eingeloggt -> Zeige Component
  return children;
}

export default ProtectedRoute;
