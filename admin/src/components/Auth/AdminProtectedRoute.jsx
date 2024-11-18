import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LogInContext } from "../../App";

const AdminProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(LogInContext);

  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
