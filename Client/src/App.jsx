import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import "./App.css";
//Navbar page
import NavbarMain from "./components/Navbar/NavbarMain";
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
import Footer from "./components/Footer";

//Newly create context here...
export const logInContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userLoggInStatus = (item) => {
    setIsLoggedIn(item);
  };

  useEffect(() => {
    // const userToken = localStorage.getItem("token");
  }, [isLoggedIn]);

  return (
    <div id="roots">
      <Router>
        <main>
          <logInContext.Provider
            value={{
              userLoggInStatus: userLoggInStatus,
              isLoggedIn,
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
              {isLoggedIn ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/credit-card" element={<CreditCardPage />} />
                </>
              ) : (
                <></>
              )}
            </Routes>
          </logInContext.Provider>

          <Routes>
            {/* These are pages that do not need user to login */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Calculators" element={<Calculators />} />
            <Route path="/services" element={<Services />} />
            {/* Legal Page Routes */}
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
