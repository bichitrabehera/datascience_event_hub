import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link as ScrollLink } from "react-scroll";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(''); // 'success', 'error', ''

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('success');
          form.current.reset(); // Clear form fields
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStatus('error');
        }
      );
  };

  return (
    <main id="contact" className="min-h-screen flex flex-col text-md items-center justify-center px-6 py-12 hero">
      <h1 className="text-5xl md:text-7xl font-[font2] mb-10 text-center">
        Get in <span className="text-blue-600">Touch</span>
      </h1>
      <p className="text-center text-gray-700 md:text-lg mb-10 max-w-2xl mx-auto">
        Whether you have questions, feedback, or want to collaborate, we’re here to help.
        Fill out the form or use the contact details below and we’ll get back to you as soon as possible.
      </p>

      <div className="flex flex-col md:flex-row gap-20 mt-10 w-full max-w-5xl">
        {/* Contact Info Box */}
        <div className="bg-white border-2 border-black shadow-[12px_12px_0_#000] p-6 rounded-md flex-1 space-y-4">
          <p className="text-gray-800 leading-relaxed">
            Have questions or need assistance? We’re here to help!
          </p>
          <p className="text-gray-800 leading-relaxed">
            <span className="font-bold">Email:</span> <br />
            1am23cd020@amceducation.in, <br />
            1am23cd053@amceducation.in
          </p>
          <p className="text-gray-800 leading-relaxed">
            <span className="font-bold">Address:</span> <br />
            AMC Engineering College, <br />
            Bangalore, Karnataka
          </p>
          <div className="pb-10">
            <h1 className="text-xl font-bold">Follow Us</h1>
            <ul>
              <a href="https://www.instagram.com/amcec_cse_ds" className="underline">Instagram</a>
            </ul>
            <ul>
              <a href="" className='underline'>LinkedIn</a>
            </ul>
          </div>

        </div>

        {/* Contact Form Box */}
        <div className="bg-white border-2 border-black shadow-[12px_12px_0_#000] p-6 rounded-md flex-1 space-y-4">
          <p className="text-center text-gray-700 md:text-lg max-w-2xl mx-auto">
            Drop us a message below and we’ll respond within 86400 seconds.
          </p>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="text-green-700 font-semibold text-center">
              ✅ Message sent successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-700 font-semibold text-center">
              ❌ Message could not be delivered. Please try again.
            </div>
          )}

          <form className="space-y-4" ref={form} onSubmit={sendEmail}>
            <div>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="user_name"
                className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="user_email"
                className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Message</label>
              <textarea
                name="message"
                rows="4"
                className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              value="send"
              className="w-full px-4 py-3 rounded-lg bg-green-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
