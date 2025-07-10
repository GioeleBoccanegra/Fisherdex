import { Navigate, useLocation } from "react-router-dom";


export function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, sessionExpired: true }} replace />;
  }
  return children;
}

