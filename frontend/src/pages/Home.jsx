// src/pages/Home.jsx

import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import Events from "../components/Events.jsx";
import About from "../components/About.jsx";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Events />
      <About/>
    </div>
  );
};

export default Home;
