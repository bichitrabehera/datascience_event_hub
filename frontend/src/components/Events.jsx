import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(API.EVENTS);
        if (!response.ok) throw new Error("Failed to load events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Error loading events. Please try again later.");
      }
    }
    fetchEvents();
  }, []);

  if (error)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 font-medium">{error}</p>
      </main>
    );

  // Split events into categories
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.starts_at) > now);
  const ongoing = events.filter(
    (e) => new Date(e.starts_at) <= now && new Date(e.ends_at) >= now
  );
  const past = events.filter((e) => new Date(e.ends_at) < now);

  function EventGrid({ data }) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {data.map((event) => (
          <div
            key={event.id}
            className="bg-white border-4 border-black shadow-[12px_12px_0_#000]"
          >
            <img
              src={event.image_url}
              alt={`Banner for ${event.title}`}
              className="w-full h-64 object-cover border-b-4 border-black"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {event.description}
              </p>

              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p>
                  <span className="font-medium">Starts:</span>{" "}
                  {new Date(event.starts_at).toLocaleDateString()}{" "}
                  {new Date(event.starts_at).toLocaleTimeString()}
                </p>
                <p>
                  <span className="font-medium">Ends:</span>{" "}
                  {new Date(event.ends_at).toLocaleDateString()}{" "}
                  {new Date(event.ends_at).toLocaleTimeString()}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {event.location}
                </p>
              </div>

              <Link
                to={`/events/${event.id}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 px-6 border-b">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Upcoming Events */}
        <section id="events">
          <h2 className="text-4xl font-[font2] text-blue-700 text-center mb-20">
            Upcoming Events
          </h2>
          {upcoming.length > 0 ? (
            <EventGrid data={upcoming} />
          ) : (
            <p className="text-center text-gray-600">
              No upcoming events available. Please check back later.
            </p>
          )}
        </section>

        <section>
          <h2 className="text-4xl font-[font2] text-blue-700 text-center mb-20">
            Ongoing Events
          </h2>
          {ongoing.length > 0 ? (
            <EventGrid data={ongoing} />
          ) : (
            <div className="h-50 border-1  items-center flex justify-center">
              {" "}
              <p className="text-center  text-gray-600">
                No ongoing events at the moment.
              </p>
            </div>
          )}
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-4xl font-[font2] text-blue-700 text-center mb-20">
            Past Events
          </h2>
          {past.length > 0 ? (
            <EventGrid data={past} />
          ) : (
            <p className="text-center text-gray-600">No past events found.</p>
          )}
        </section>
      </div>
    </main>
  );
}
