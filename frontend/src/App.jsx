import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Events from "./components/Events.jsx";
import EventDetails from "./components/EventDetails.jsx";
import Dashboard from "./components/Dashbaord.jsx";
import Login from "./components/Login.jsx";
import EventRegister from "./components/EventRegister.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/:id/register" element={<EventRegister />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
