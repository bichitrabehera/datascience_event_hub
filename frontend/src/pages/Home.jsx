// src/pages/Home.jsx

import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import Events from "../components/Events.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Stats from "../components/Stats.jsx";
import Contact from "../pages/Contact.jsx"

const Home = () => {
  return (
    <div>
      <Header/>
      <HeroSection />
      <Events />
      <About />
      <Stats/>
      <Contact/>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
