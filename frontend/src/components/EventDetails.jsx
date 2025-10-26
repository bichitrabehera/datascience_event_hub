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
        console.log("useParams id:", id);

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

  // --- Event status check ---
  const now = new Date();
  const startDate = new Date(event.starts_at);
  const endDate = new Date(event.ends_at);

  let isUpcoming = startDate > now;
  // let isOngoing = startDate <= now && endDate >= now;
  // let isPast = endDate < now;

  return (
    <main className="min-h-screen text-sm flex flex-col items-center justify-center px-6 py-20 hero bg-gradient-to-br from-blue-100 via-white to-green-100">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-[sketch] text-blue-700 mt-10 text-left md:text-center">
        Event Details
      </h1>
      <p className="text-sm py-3 mb-3 md:text-lg text-left md:text-center text-gray-700">
        Everything you need to know about the upcoming event
      </p>

      <div className="md:flex gap-5 flex-col">
        {/* Event Card */}
        <div className="bg-white w-full max-w-3xl border-2 border-black rounded-xl shadow-[12px_12px_0_#000] p-6 space-y-6">
          {/* Event Image */}
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-100  object-cover rounded-lg border-1 border-black"
            />
          )}
        </div>

        <div className="bg-white w-full max-w-3xl mt-10 border-2 border-black rounded-xl shadow-[12px_12px_0_#000] p-6 space-y-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>

          {/* Key Info */}
          <div className="grid sm:grid-cols-2 gap-1 text-gray-800 ">
            <div className="flex items-center space-x-1">
              <span className="text-blue-700 font-semibold">Starts:</span>
              <span>
                {startDate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}{" "}
                {startDate.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-700 font-semibold">Ends:</span>
              <span>
                {endDate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}{" "}
                {endDate.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:col-span-2">
              <span className="text-blue-700 font-semibold">Location:</span>
              <span>{event.location}</span>
            </div>
            {event.amount > 0 && (
              <div className="flex items-center space-x-2 sm:col-span-2">
                <span className="text-blue-700 font-semibold">Amount:</span>
                <span>₹{event.amount}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{event.description} </p>

          {/* Organizer Info */}
          <div className="border-t-2 border-black pt-4 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Organized by:</span> Department Of Data Science
            </p>
          </div>

          {/* CTA */}
          {isUpcoming && (
            <div className="pt-4 text-center">
              <Link
                to={`/events/${id}/register`}
                className="inline-block px-6 py-3 bg-green-600 rounded-md text-white font-bold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition"
              >
                Register Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
