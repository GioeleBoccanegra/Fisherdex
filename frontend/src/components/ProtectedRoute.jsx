import { Navigate } from "react-router-dom";


export function ProtectedRoute({isAuthenticated, children}){
  if (!isAuthenticated){
    return <Navigate to="/login" />;
  }
  return children;
}

