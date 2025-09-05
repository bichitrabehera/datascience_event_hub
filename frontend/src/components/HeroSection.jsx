// import React, { useEffect, useRef } from "react";

const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Overlay */}
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-8xl font-[sketch] text-blue-700">
          Data Science
        </h1>
        <h1 className="text-5xl md:text-8xl font-[sketch] text-blue-700">
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
          <button className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition">
            <a href="#events">Explore Events</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
