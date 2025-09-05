import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
          <h3 className="text-lg font-bold text-blue-700 uppercase mb-3">
            About Us
          </h3>
          <p className="text-sm text-gray-800 leading-relaxed">
            Data Verse is a events platform where users can explore, register, and
            manage events. Built for learning, creativity, and collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
          <h3 className="text-lg font-bold text-blue-700 uppercase mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-800">
            <li>
              <Link to="/" className="hover:underline hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="hover:underline hover:text-blue-700"
              >
                Events
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline hover:text-blue-700">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:underline hover:text-blue-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Creators */}
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
          <h3 className="text-lg font-bold text-blue-700 uppercase mb-3">
            Creators
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href="https://bichitrabehera-blue.vercel.app"
                target="_blank"
                className="inline-block border-2 border-black px-3 py-1 bg-blue-600 text-white font-semibold hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] transition"
              >
                Bichitra Behera
              </a>
            </li>
            <li>
              <a
                href="https://port-react.vercel.app/"
                target="_blank"
                className="inline-block border-2 border-black px-3 py-1 bg-blue-600 text-white font-semibold hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] transition"
              >
                Matharishwa S
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-4 border-black bg-white py-6 text-center shadow-[6px_6px_0_#000]">
        <p className="text-sm text-gray-800">
          © {new Date().getFullYear()} Made with ❤️ by{" "}
          <span className="font-bold">Department of Data Science</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
