import React from "react";

const About = () => {
  return (
    <main id="about" className=" flex flex-col items-center justify-center px-6 border-b py-20">
      <h1 className="text-5xl font-[font2] text-blue-700 mb-10 text-center">
        About <br /> Data Verse
      </h1>

      <div className="bg-white w-full max-w-4xl border-2 border-black shadow-[12px_12px_0_#000] p-8 space-y-4">
        <p className="text text-gray-800 leading-relaxed">
          Welcome to <span className="font-bold">Data Verse</span> — your one-stop
          destination for discovering, creating, and experiencing amazing
          events. From local community meetups to grand international
          conferences, we aim to connect people through shared passions and
          unforgettable experiences.
        </p>

        <p className="text text-gray-800 leading-relaxed">
          EventHub was built with simplicity and creativity in mind. Organizers
          can easily set up events, design custom registration forms, and manage
          attendees, while participants can browse, register, and join events
          with just a few clicks.
        </p>

        <p className="text text-gray-800 leading-relaxed">
          Whether you’re an event planner looking to grow your audience or an
          enthusiast searching for your next adventure, EventHub brings it all
          together in one place — with a touch of retro flair 🎉.
        </p>
      </div>
    </main>
  );
};

export default About;
