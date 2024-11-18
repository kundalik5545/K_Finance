import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import "./App.css";

// Navbar and Footer
import AdminNavbar from "./components/Navbar/TopNav/AdminNavbar";
import AdminFooter from "./components/Navbar/FotterNav/AdminFooter";

// Basic Pages
import AdminHomePage from "./Pages/AdminHomePage";
import About from "./Pages/About";
import AdminServices from "./Pages/AdminServices";

// Auth Components
import AdminLogin from "./components/Auth/AdminLogin";
import AdminProtectedRoute from "./components/Auth/AdminProtectedRoute";

// Dashboard
import AdminDashboard from "./components/Dashboard/AdminDashboard";

// Context for Login State
export const LogInContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Rehydrate state from session storage on load
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const login = (userData) => {
    console.log("userData", userData);
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <LogInContext.Provider value={{ isLoggedIn, login, logout, user }}>
      <div id="roots">
        <main>
          <AdminNavbar />

          {/* Public Routes */}
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>

          {/* Protected Routes */}
          <Routes>
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

          <AdminFooter />
        </main>
      </div>
    </LogInContext.Provider>
  );
}

export default App;
