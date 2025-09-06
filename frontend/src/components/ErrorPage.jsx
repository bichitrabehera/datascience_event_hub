import React from "react";
import { Link } from "react-router-dom"; // only if you're using react-router

const ErrorPage = () => {
  return (
    <main
      id="not-found"
      className="flex flex-col items-center justify-center px-6 border-b py-20 min-h-screen "
    >
      <h1 className="text-6xl font-[font2] text-red-600 mb-6 text-center">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
        Oops! Page Not Found
      </h2>

      <div className="bg-white w-full max-w-2xl border-2 border-black shadow-[12px_12px_0_#000] p-8 space-y-4 text-center">
        <p className="text-gray-800 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <p className="text-gray-800 leading-relaxed">
          Don’t worry — you can always head back to the homepage.
        </p>

        <Link
          to="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
