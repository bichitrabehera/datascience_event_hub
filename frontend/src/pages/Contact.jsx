import React from "react";

const Contact = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 hero">
      <h1 className="text-4xl md:text-[5vw] font-[sketch] text-blue-700 m-10 text-center">
        Contact Us
      </h1>

      <div className="bg-white w-full max-w-4xl border-4 border-black md:text-xl shadow-[12px_12px_0_#000] p-6 space-y-4">
        <p className="text-gray-800 text leading-relaxed">
          Have questions or need assistance? We’re here to help!
        </p>

        <p className="text-gray-800 text leading-relaxed">
          <span className="font-bold">Email:</span> 1am23cd020@amceducation.in,
          1am23cd053@amceducation.in
        </p>

        <p className="text-gray-800 text leading-relaxed">
          <span className="font-bold">Phone:</span> +91 99999 99999
        </p>

        <p className="text-gray-800 text leading-relaxed">
          <span className="font-bold">Address:</span> AMC Engineering College ,
          Bangalore , Karnataka
        </p>

        <button className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition">
          <a href="/">Go Back To Home</a>
          {/* <Link to="/">Go Back To Home</Link> */}
        </button>
      </div>
    </main>
  );
};

export default Contact;
