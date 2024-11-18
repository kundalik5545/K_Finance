import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import axiosInstance from "./api/AxiosInstance";
import "./App.css";

//Navbar page
import NavbarMain from "./components/Navbar/TopNav/NavbarMain";
// Basic Pages
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
//Pages that need user to login
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Services from "./pages/ServicesPage";
import Calculators from "./pages/CalculatorPage";
import CreditCardPage from "./pages/CreditCardPage";
//Extra plugin
import toast, { Toaster } from "react-hot-toast";
//Legal Pages imports
import TermsAndConditions from "./components/Legal/TermsAndConditions";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
//Footer page
import Footer from "./components/Navbar/Footer/Footer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import FixFd_Calc from "./components/calculators/FixFd_Calc";
import KnowledgeSection from "./components/Blog/knowledgeSection";
import Blog from "./pages/Blog";

//Newly create context here...
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

  //-----------------
  // const [userDBId, setUserDBId] = useState({
  //   _id: "",
  //   fullName: "",
  //   email: "",
  //   phone: "",
  // });

  // const navigate = useNavigate();

  // const setUserLoggInStatus = (status) => {
  //   setIsLoggedIn(status);
  // };
  // const setUserPersonalID = (dbUserId) => {
  //   setUserDBId(dbUserId);
  // };

  // const handleLogoutUser = async () => {
  //   try {
  //     const response = await axiosInstance.post(
  //       "/user/logout",
  //       {},
  //       { withCredentials: true }
  //     );

  //     setUserLoggInStatus(false);
  //     navigate("/login");
  //     toast.success("User logged out successfully!");
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //     toast.error("Failed to log out. Please try again.");
  //   }
  // };

  // useEffect(() => {}, [isLoggedIn]);

  return (
    <div id="roots">
      <main>
        <LogInContext.Provider
          value={{
            isLoggedIn,
            login,
            logout,
            user,
            // setUserLoggInStatus: setUserLoggInStatus,
            // setUserPersonalID: setUserPersonalID,
            // isLoggedIn,
            // userDBId,
            // onLogoutUser: handleLogoutUser,
          }}
        >
          <NavbarMain />
          {/* Public Routes */}
          <Routes>
            {/* Main pages that need user to login */}
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUp />} />
            {isLoggedIn ? <></> : <Route path="/login" element={<Login />} />}
          </Routes>

          {/* Protected Routes */}
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/credit-card"
              element={
                <ProtectedRoute>
                  <CreditCardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
          </Routes>
        </LogInContext.Provider>

        {/* Common free public routes */}
        <Routes>
          {/* These are pages that do not need user to login */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* All calculator routs */}
          <Route path="/Calculators" element={<Calculators />} />
          <Route path="/fix-fd" element={<FixFd_Calc />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/study-resources" element={<KnowledgeSection />} />
          {/* Legal Page Routes */}
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
}

export default App;
