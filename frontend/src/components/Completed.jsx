import React from "react";
import { CheckCircle2, Home, Calendar } from "lucide-react";

const Completed = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 hero bg-gradient-to-br from-green-100 via-white to-blue-100">
      {/* Title */}
      <h1 className="text-5xl font-[sketch] text-blue-700 mb-8 text-center">
        Completed
      </h1>

      {/* Card */}
      <div className="bg-white w-full max-w-4xl border-4 border-black shadow-[12px_12px_0_#000] p-10 space-y-6 rounded-xl text-center">
        {/* Success Icon */}
        <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />

        {/* Message */}
        <p className="text-gray-800 text-lg leading-relaxed">
          Your action has been{" "}
          <span className="font-bold">successfully completed</span>!
        </p>
        <p className="text-gray-800 text-lg leading-relaxed">
          Thank you for participating. You can now return to the events page or
          explore other sections.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="/"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition rounded-md"
          >
            <Home size={18} /> Go to Home
          </a>

        </div>
      </div>
    </main>
  );
};

export default Completed;
