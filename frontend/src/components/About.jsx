import React from "react";
import dataverseLogo from "../assets/images/dataverse.png";

const About = () => {
  return (
    <main
      id="about"
      className="flex flex-col items-center justify-center px-6 py-20 hero"
    >
      <h1 className="text-5xl md:text-7xl font-[font2] text-blue-600 mb-10 text-center">
        <span className="text-black">What is </span>Data Verse?
      </h1>

      <p className="text-lg text-gray-600 mb-10 text-center italic">
        “Where code meets creativity and students turn ideas into impact.”
      </p>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Logo */}
        <div className="border-2 rounded-full border-black bg-[#ffffff] shadow-[12px_12px_0_#000] p-6 hover:scale-105 transition-transform duration-300">
          <img
            src={dataverseLogo}
            className="h-[200px] md:h-[300px] object-contain"
            alt="DataVerse Logo"
          />
        </div>

        {/* Description */}
        <div className="bg-white w-full max-w-4xl text-md md:text-xl border-2 rounded-md border-black shadow-[12px_12px_0_#000] p-6 space-y-4">
          <p className="text-gray-800 leading-relaxed">
            Welcome to <span className="font-bold">Data Verse</span> — the official student club of the Department of Data Science. We’re a bunch of curious minds who love coding, exploring tech, and bringing ideas to life through fun events and hackathons.
          </p>

          <p className="text-gray-800 leading-relaxed">
            More than just a club, Data Verse is a space where classmates turn into teammates, projects turn into passions, and learning feels less like a chore and more like an adventure 🚀.
          </p>

          <p className="text-gray-800 leading-relaxed">
            <span className="font-bold">Our Aim:</span> To spark creativity, build technical confidence, and create a vibrant community where Data Science students can grow, collaborate, and have fun while shaping the future of tech.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
