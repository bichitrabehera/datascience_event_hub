import { Link as ScrollLink } from "react-scroll";
import DSLogo from "../assets/images/csds.png"; // replace with your logo path

const HeroSection = () => {
  return (
    <section
      id="home"
      className="hero min-h-[100vh] flex items-center justify-center relative bg-[#white] overflow-hidden px-10 md:px-0"
    >

      <div className="absolute md:right-20 right-3 top-1/3 md:top-1/3 text-[12px] -translate-y-1/2 flex flex-col items-center text-blue-700 font-bold md:text-md md:text-base tracking-widest space-y-0 opacity-80 select-none font-[sketch]">
        {/* CODE */}
        <span>C</span>
        <span>O</span>
        <span>D</span>
        <span>E</span>

        <span className="my-3 bg-black p-[3px] rounded-full"></span>

        {/* LEARN */}
        <span>L</span>
        <span>E</span>
        <span>A</span>
        <span>R</span>
        <span>N</span>

        <span className="my-3 bg-black p-[3px] rounded-full"></span>

        {/* LEAD */}
        <span>L</span>
        <span>E</span>
        <span>A</span>
        <span>D</span>
      </div>

      <div className="absolute bottom-24 left-4 md:left-24 flex flex-col items-center space-y-0 font-[Font2]">
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">4</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">2</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">0</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">2</span>

        <span className="block mt-3 -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">N</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">I</span>

        <span className="block mt-3  -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">D</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">E</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">H</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">S</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">I</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">L</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">B</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">A</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">T</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">S</span>
        <span className="block -rotate-90 text-gray-600 text-xs md:text-sm font-medium opacity-70 select-none">E</span>

      </div>

      <div className="text-center max-w-4xl mx-auto">
        {/* Logo */}
        <img
          src={DSLogo}
          alt="Data Science Logo"
          loading="lazy"
          className="w-45 md:w-48 lg:w-60 mx-auto mb-6 p-3 bg-white border-2 border-black rounded-full shadow-[4px_4px_0_#000] transition-transform duration-300 hover:scale-105"
        />

        {/* Department Title */}
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-[5vw] font-[font2] text-gray-900">
          Department of
        </h1>
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-[5vw] leading-tight font-[sketch] text-blue-700">
          Data Science
        </h1>

        {/* College Info */}
        <p className="mt-4 text-xl sm:text-xl md:text-2xl text-gray-700 font-[font2] max-w-2xl mx-auto">
          AMC Engineering College, Bangalore
        </p>

        {/* Short Description */}
        <p className="mt-2 text-md sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          Join our vibrant community of innovators and coders. Learn, compete, and build the future with us.
        </p>

        {/* Call-to-Action Button */}
        <div className="mt-6 flex justify-center">
          <ScrollLink
            to="events"
            smooth={true}
            duration={500}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold border-2 border-black rounded-lg shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition-all duration-300 text-sm sm:text-base"
            offset={-80}
          >
            Explore Events
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
