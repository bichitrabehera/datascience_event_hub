import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Smooth scrolling

const Footer = () => {
  const navItems = [
    { name: "Home", to: "home", type: "scroll" },
    { name: "Events", to: "events", type: "scroll" },
    { name: "About", to: "about", type: "scroll" },
    { name: "Contact", to: "contact", type: "scroll" },
  ];
  return (
    <footer className="bg-blue-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000] rounded-xl">
          <h3 className="text-lg font-bold text-blue-700 uppercase mb-3">
            About Us
          </h3>
          <p className="text-sm text-gray-800 leading-relaxed">
            Data Verse is a events platform where users can explore, register, and
            manage events. Built for learning, creativity, and collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000] rounded-xl">
          <h3 className="text-lg font-bold text-blue-700 uppercase mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-800">
            <li className="flex flex-col">{navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                smooth="easeInOutCubic"
                duration={100} // smooth + quick
                className="cursor-pointer hover:text-blue-700 transition"
                offset={-80}
              >
                {item.name}
              </ScrollLink>

            ))}</li>
          </ul>
        </div>

        {/* Creators */}
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000] rounded-xl">
          <h3 className="text-lg font-bold text-blue-700 uppercase mb-3">
            Creators
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href="https://bichitrabehera-blue.vercel.app"
                target="_blank"
                className="inline-block border-2 rounded-sm border-black px-3 py-1 bg-blue-600 text-white font-semibold hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] transition"
              >
                Bichitra Behera
              </a>
            </li>
            <li>
              <a
                href="https://port-react.vercel.app/"
                target="_blank"
                className="inline-block border-2 rounded-sm border-black px-3 py-1 bg-blue-600 text-white font-semibold hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] transition"
              >
                Matharishwa S
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-4 border-black bg-white py-10 text-center shadow-[6px_6px_0_#000]">
        <p className="text-sm text-gray-800">
          © {new Date().getFullYear()} Made with ❤️ for{" "}
          <span className="font-bold">Engineers</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
