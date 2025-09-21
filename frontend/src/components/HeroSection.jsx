import { Link, ChevronDown } from "lucide-react";
import DSLogo from "../assets/images/csds.png"; // replace with your logo path
import { Link as ScrollLink } from "react-scroll"; // Smooth scrolling

const HeroSection = () => {
  return (
    <section id="home" className="hero h-[90vh] flex items-center justify-center mt-12 relative bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">


      <div className="text-center px-6">
        <img
          src={DSLogo}
          alt="Data Science Logo"
          className="w-42 md:w-60 mx-auto mb-6 border-2 bg-white p-3 rounded-full border-black shadow-[4px_4px_0_#000]"
        />

        <h1 className="text-5xl md:text-[4vw] pb-3 font-[font2] text-gray-900">
          Department
        </h1>
        <h1 className="text-5xl md:text-[4vw] leading-tight font-[sketch] text-blue-700">
          Data Science
        </h1>

        {/* <p className="mt-3 text-2xl md:text-3xl text-gray-800 max-w-2xl mx-auto font-[font2]">
          Estd : 2k24
        </p> */}
        <p className="m-4 text-2xl md:text-3xl text-gray-700 max-w-2xl mx-auto font-[font2]">
          AMC Engineering College, Bangalore
        </p>
        <p className="mt-2 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Join our vibrant community of innovators and coders. Learn, compete, and build the future with us.
        </p>

        <div className="mt-4 flex gap-2 justify-center">

          <ScrollLink

            to='events'
            smooth={true}
            duration={500}
            className="inline-block rounded-lg px-6 py-3 mt-4 bg-blue-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition"
            offset={-80} // adjust for header height
          >
            Explore Events
          </ScrollLink>
        </div>
      </div>
    </section >

  );
};

export default HeroSection;
