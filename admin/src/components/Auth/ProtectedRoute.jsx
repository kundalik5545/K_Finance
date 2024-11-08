// ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LogInContext } from "@/App"; // Adjust the path as needed to match your App context location

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(LogInContext);

  // If the user is logged in, allow access to the component (children)
  // If not, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/admin-login" replace />;
}

export default ProtectedRoute;
