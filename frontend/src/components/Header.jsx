import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { scroller } from "react-scroll"; // Smooth scrolling between sections

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Define navigation items (sections)
  const navItems = [
    { name: "Home", to: "home" },
    { name: "Events", to: "events" },
    { name: "About", to: "about" },
    { name: "Contact", to: "contact" },
  ];

  // Handles navigation or smooth scroll depending on current route
  const handleNavClick = (section) => {
    const scrollToSection = () => {
      scroller.scrollTo(section, {
        duration: 600,
        smooth: "easeInOutCubic",
        offset: -80, // adjust for header height
      });
    };

    if (location.pathname === "/") {
      scrollToSection(); // Already on home page → just scroll
    } else {
      // Navigate to home first, then scroll
      navigate("/", { state: { scrollTo: section } });
      // Small delay to ensure scroll happens after navigation
      setTimeout(scrollToSection, 500);
    }

    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white px-6 py-3 md:py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1>
          <Link
            to="/"
            className="text-xl md:text-2xl text-[#1100ff] font-[font2] transition"
            onClick={() => handleNavClick("home")}
          >
            Data Verse
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.to)}
              className="cursor-pointer hover:text-blue-500 transition"
            >
              {item.name}
            </button>
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
            <button
              key={item.name}
              onClick={() => handleNavClick(item.to)}
              className="cursor-pointer hover:text-blue-500 transition"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
