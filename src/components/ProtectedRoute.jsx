import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser.infoCompleted) {
    return <Navigate to="/user-info" replace />;
  }

  return children;
}

export default ProtectedRoute;