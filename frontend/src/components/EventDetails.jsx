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
      <p className="text-red-600 text-center mt-10 ">
        Error loading event details.
      </p>
    );
  if (!event)
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 hero bg-gradient-to-br from-blue-100 via-white to-green-100">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-[sketch] text-blue-700 mt-10 text-center">
        Event Details
      </h1>
      <p className="text-xl mb-10 text-center text-gray-700">
        Everything you need to know about the upcoming event
      </p>

      {/* Event Card */}
      <div className="bg-white w-full max-w-3xl border-4 border-black shadow-[12px_12px_0_#000] p-6 space-y-6">
        {/* Event Image */}
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-60 object-cover rounded-lg border-2 border-black"
          />
        )}

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>

        {/* Key Info */}
        <div className="grid sm:grid-cols-2 gap-4 text-gray-800 ">
          <div className="flex items-center space-x-2">
            <span className="text-blue-700 font-semibold">Starts:</span>
            <span>
              {new Date(event.starts_at).toLocaleDateString()}{" "}
              {new Date(event.starts_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-700 font-semibold">Ends:</span>
            <span>
              {new Date(event.ends_at).toLocaleDateString()}{" "}
              {new Date(event.ends_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:col-span-2">
            <span className="text-blue-700 font-semibold">Location:</span>
            <span>{event.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed">{event.description} </p>

        {/* Organizer Info */}
        <div className="border-t-2 border-black pt-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Organized by:</span> Data Verse
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4 text-center">
          <Link
            to={`/events/${id}/register`}
            className="inline-block px-6 py-3 bg-green-600 text-white font-bold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition"
          >
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
}
