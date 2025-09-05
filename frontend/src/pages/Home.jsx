// src/pages/Home.jsx

import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import Events from "../components/Events.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Events />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
