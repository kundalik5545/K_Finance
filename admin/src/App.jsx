import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import "./App.css";
// Navbar page
import AdminNavbar from "./components/Navbar/TopNav/AdminNavbar";
// Basic Pages
import AdminHomePage from "./Pages/AdminHomePage";
import AdminFooter from "./components/Navbar/FotterNav/AdminFooter";
import About from "./Pages/About";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import AdminServices from "./Pages/AdminServices";
import AdminLogin from "./components/Auth/AdminLogin";
import AdminProtectedRoute from "./components/Auth/AdminProtectedRoute";

// Newly created context here
export const LogInContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const setUserLoggInStatus = (status) => {
    setIsLoggedIn(status);
  };

  const handleLoginUser = () => {
    setUserLoggInStatus(true);
    navigate("/");
  };
  const handleLogoutUser = () => {
    setUserLoggInStatus(false);
    navigate("/admin-login");
  };

  useEffect(() => {}, [isLoggedIn]);

  return (
    <div id="roots">
      <main>
        {/* Login required ROutes */}
        <LogInContext.Provider
          value={{
            setUserLoggInStatus: setUserLoggInStatus,
            isLoggedIn,
            onLoginUser: handleLoginUser,
            onLogoutUser: handleLogoutUser,
          }}
        >
          <AdminNavbar />
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            {/* Login Page Route*/}
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* Routes that needs login */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-services"
              element={
                <AdminProtectedRoute>
                  <AdminServices />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </LogInContext.Provider>

        {/* No login required routes */}
        <Routes>
          <Route path="/admin-about" element={<About />} />
        </Routes>
        <AdminFooter />
      </main>
    </div>
  );
}

export default App;
