import React from "react";

const Completed = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-[sketch] text-blue-700 mb-10 text-center">
        Completed
      </h1>

      <div className="bg-white w-full max-w-4xl border-4 border-black shadow-[12px_12px_0_#000] p-8 space-y-4 text-center">
        <p className="text-gray-800 text-lg leading-relaxed">
          ✅ Your action has been{" "}
          <span className="font-bold">successfully completed</span>!
        </p>

        <p className="text-gray-800 text-lg leading-relaxed">
          Thank you for participating. You can now return to the events page or
          explore other sections.
        </p>

        <button className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition">
          <a href="/"> Go to Events</a>
        </button>
      </div>
    </main>
  );
};

export default Completed;
