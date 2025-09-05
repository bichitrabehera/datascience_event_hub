import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../constants/api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(API.EVENT_DETAILS(id));
        if (!response.ok) throw new Error("Failed to load event");
        const data = await response.json();
        setEvent(data);
      } catch {
        setEvent("error");
      }
    }
    fetchEvent();
  }, [id]);

  if (event === "error")
    return (
      <p className="text-red-600 text-center mt-10">
        Error loading event details.
      </p>
    );
  if (!event)
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gray-50">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-[sketch] text-blue-700 m-10 text-center">
        Event Details
      </h1>

      {/* Event Card */}
      <div className="bg-white w-full max-w-3xl border-4 border-black shadow-[12px_12px_0_#000] p-8 space-y-4 transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[17px_17px_0_#000]">
        {/* Event Image */}
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg mb-4 border-2 border-black"
          />
        )}

        <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>
        <p className="text-gray-700">{event.description}</p>

        <div className="text-sm text-gray-800 space-y-2">
          <p>
            <span className="font-semibold">Starts:</span>{" "}
            {new Date(event.starts_at).toLocaleDateString()}{" "}
            {new Date(event.starts_at).toLocaleTimeString()}
          </p>
          <p>
            <span className="font-semibold">Ends:</span>{" "}
            {new Date(event.ends_at).toLocaleDateString()}{" "}
            {new Date(event.ends_at).toLocaleTimeString()}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {event.location}
          </p>
        </div>

        <div className="pt-4">
          <Link
            to={`/events/${id}/register`}
            className="inline-block px-6 py-3 bg-green-600 text-white font-bold border-2 border-black shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
