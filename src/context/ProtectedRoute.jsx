import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role-based protection (Admin)
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
