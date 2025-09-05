// import React, { useEffect, useRef } from "react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-8xl font-[sketch] text-blue-700 drop-shadow-lg">
          Data Science
        </h1>
        <h1 className="text-5xl md:text-8xl font-[sketch] text-blue-700 drop-shadow-lg">
          Department
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-gray-900 max-w-2xl mx-auto font-[sketch]">
          Explore upcoming workshops, hackathons, and seminars organized by the
          Department of Data Science. Stay ahead with innovation and knowledge.
        </p>
        <p className="mt-6 text-2xl md:text-3xl text-black max-w-2xl mx-auto font-[sketch]">
          AMC Engineering College , Bangalore
        </p>
        <div className="mt-8 flex gap-2 justify-center">
          <button className="btn">
            <a href="#events"> Explore Events</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
