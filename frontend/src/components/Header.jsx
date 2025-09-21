import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { Link as ScrollLink } from "react-scroll"; // Smooth scrolling

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation items
  const navItems = [
    { name: "Home", to: "home", type: "scroll" },
    { name: "Events", to: "events", type: "scroll" },
    { name: "About", to: "about", type: "scroll" },
    { name: "Contact", to: "contact", type: "scroll" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white px-6 py-3 md:py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1>
          <Link
            to="/"
            className="text-xl md:text-2xl text-[#6f00ff] font-[font2] transition"
          >
            Data Verse
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-sm font-medium">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth="easeInOutCubic"
              duration={100} // smooth + quick
              className="cursor-pointer hover:text-blue-400 transition"
              offset={-80}
            >
              {item.name}
            </ScrollLink>

          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-1 rounded hover:bg-gray-200 transition"
          onClick={() => setIsOpen(true)}
        >
          <i className="ri-menu-4-line text-3xl"></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-2xl z-50">
          {/* Close Button */}
          <button
            className="absolute top-5 right-6 p-2 rounded hover:bg-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>

          {/* Mobile Nav Items */}
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-blue-400 transition"
              offset={-80} // adjust for header height
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </ScrollLink>
          ))}
        </div>
      )}
    </header>
  );
}
