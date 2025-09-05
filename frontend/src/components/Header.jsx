import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#fcfcfc] fixed  top-0 left-0 right-0 text-black px-6 py-2 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="">
          <Link
            to="/"
            className="text-3xl text-[#6f00ff] transition font-[sketch]"
          >
            deh
          </Link>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <Link to="/">Home</Link>
          {/* <Link to="/events">Events</Link> */}
          {/* <Link to="/login">Login</Link> */}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200 transition"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-black text-2xl z-50">
          {/* Close Button inside overlay */}
          <button
            className="absolute top-6 right-6 p-2 hover:bg-gray-700 rounded"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>

          <Link
            to="/"
            className="hover:text-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </div>
      )}
    </header>
  );
}
