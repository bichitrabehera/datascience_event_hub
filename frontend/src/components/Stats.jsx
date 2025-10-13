import React from "react";

const Stats = () => {
  const stats = [
    { label: "Members", value: "300+" },
    { label: "Events Organized", value: "30+" },
    { label: "Workshops", value: "15+" },
    { label: "Tech Events / Seminars", value: "50+" },
    { label: "Hackathons & Techfest", value: "2 Hackathons, 1 Techfest" },
  ];

  return (
    <main id="stats" className="flex flex-col items-center justify-center px-6 py-20 hero">
      <h1 className="text-5xl md:text-7xl font-[font2] text-blue-600 mb-20 text-center">
        Stats
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border-1 rounded border-black shadow-[12px_12px_0_#000] p-8 text-center hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[17px_17px_0_#000] transition-transform"
          >
            <p className="text-4xl font-bold text-purple-700 mb-2">
              {stat.value}
            </p>
            <p className="text text-gray-800">{stat.label}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Stats;
