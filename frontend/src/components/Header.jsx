import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import Hamburger from "./HamBurger";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", to: "home" },
    { name: "Events", to: "events" },
    { name: "About", to: "about" },
    { name: "Contact", to: "contact" },
  ];

  const handleNavClick = (section) => {
    const scrollToSection = () => {
      scroller.scrollTo(section, {
        duration: 600,
        smooth: "easeInOutCubic",
        offset: -80,
      });
    };

    if (location.pathname === "/") scrollToSection();
    else {
      navigate("/", { state: { scrollTo: section } });
      setTimeout(scrollToSection, 500);
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white px-6 py-3 md:py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1>
          <Link
            to="/"
            className="text-2xl md:text-3xl text-blue-600 font-[font2] transition"
            onClick={() => handleNavClick("home")}
          >
            Data Verse
          </Link>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 text-xl font-bold">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.to)}
              className="cursor-pointer text-[#353535] hover:text-blue-500 transition"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden relative z-50">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Hamburger isOpen={isOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center space-y-8 text-2xl z-40 transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavClick(item.to)}
            className="cursor-pointer hover:text-blue-500 transition text-3xl md:text-2xl"
          >
            {item.name}
          </button>
        ))}
      </div>
    </header>
  );
}
