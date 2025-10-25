import React from "react";

const About = () => {
  return (
    <main
      id="about"
      className="flex flex-col items-center justify-center px-6 py-20 hero"
    >
      <h1 className="text-5xl md:text-7xl font-[font2] text-blue-600 mb-10 text-center">
        <span className="text-black">What is </span>Data Verse ?
      </h1>

      <p className="text-lg text-gray-600 mb-10 text-center italic">
        “Where code meets creativity and students turn ideas into impact.”
      </p>

      <div className="bg-white w-full text-md  max-w-4xl md:text-xl border-2 rounded-md border-black shadow-[12px_12px_0_#000] p-8 space-y-4">
        <p className="text text-gray-800 leading-relaxed">
          Welcome to <span className="font-bold">Data Verse</span> — the
          official student club of the Department of Data Science. We’re a bunch
          of curious minds who love coding, exploring tech, and bringing ideas
          to life through fun events and hackathons.
        </p>

        <p className="text text-gray-800 leading-relaxed">
          More than just a club, Data Verse is a space where classmates turn
          into teammates, projects turn into passions, and learning feels less
          like a chore and more like an adventure 🚀.
        </p>

        <p className="text text-gray-800 leading-relaxed">
          <span className="font-bold">Our Aim:</span> To spark creativity, build
          technical confidence, and create a vibrant community where Data
          Science students can grow, collaborate, and have fun while shaping the
          future of tech.
        </p>
      </div>
    </main>
  );
};

export default About;
