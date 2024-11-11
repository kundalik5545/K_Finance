import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect, createContext } from "react";
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
import { Toaster } from "react-hot-toast";
//Legal Pages imports
import TermsAndConditions from "./components/Legal/TermsAndConditions";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
//Footer page
import Footer from "./components/Navbar/Footer/Footer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import FixFd_Calc from "./components/calculators/FixFd_Calc";
import KnowledgeSection from "./components/KnowledgeGuide/knowledgeSection";

//Newly create context here...
export const LogInContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const setUserLoggInStatus = (status) => {
    setIsLoggedIn(status);
  };

  // const handleLoginUser = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/v1/user/login",
  //       formData
  //     );
  //     //If user is logged In Successfully then
  //     if (response.data.success) {
  //       setFormData({
  //         email: "",
  //         password: "",
  //       });
  //       setUserLoggInStatus(true);
  //       // navigate("/");
  //       navigate("/dashboard", { replace: true });
  //       toast.success(response.data.message);
  //     } else {
  //       setUserLoggInStatus(false);
  //       toast.error("Please contact admin!");
  //     }
  //   } catch (error) {
  //     if (error.message == "Network Error") {
  //       toast.error("Internal Server is Down. Please Try After Some Time.");
  //     }

  //     // if (error.response.status === 400) {
  //     //   toast.error(`${error.response.data.message}`);
  //     // } else if (error.response.status === 401) {
  //     //   toast.error(`${error.response.data.message}`);
  //     // } else if (error.response.status === 404) {
  //     //   toast.error(`${error.response.data.message}`);
  //     // } else if (error.response.status === 500) {
  //     //   toast.error(`${error.response.data.message}`);
  //     // } else {
  //     //   toast.error("error");
  //     // }

  //     console.log("error in catch for login user", error);
  //   }
  // };

  // const handleLoginUser = (e) => {
  //   setUserLoggInStatus(true);
  //   navigate("/");
  // };
  const handleLogoutUser = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/logout"
    );

    console.log(response.data);
    setUserLoggInStatus(false);
    navigate("/login");
  };

  useEffect(() => {}, [isLoggedIn]);

  return (
    <div id="roots">
      <main>
        <LogInContext.Provider
          value={{
            setUserLoggInStatus: setUserLoggInStatus,
            isLoggedIn,
            // onLoginUser: handleLoginUser,
            onLogoutUser: handleLogoutUser,
          }}
        >
          <NavbarMain />
          <Routes>
            {/* Main pages that need user to login */}
            <Route path="/" element={<HomePage />} />
            {/* Auth */}
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* Only show when user is logged in */}
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

        <Routes>
          {/* These are pages that do not need user to login */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* All calculator routs */}
          <Route path="/Calculators" element={<Calculators />} />
          <Route path="/fix-fd" element={<FixFd_Calc />} />
          <Route path="/knowledgeGuide" element={<KnowledgeSection />} />
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
