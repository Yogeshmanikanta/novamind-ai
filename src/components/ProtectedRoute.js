import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  // If no user is logged in, send them to login page
  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;