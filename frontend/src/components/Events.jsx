import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming"); // Track which tab is active

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

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.starts_at) > now);
  const ongoing = events.filter(
    (e) => new Date(e.starts_at) <= now && new Date(e.ends_at) >= now
  );
  const past = events.filter((e) => new Date(e.ends_at) < now);

  function EventGrid({ data }) {
    if (!data.length)
      return (
        <p className="text-center text-gray-600 border-1 border-dashed pt-20 pb-20">
          No events found.
        </p>
      );

    return (
      <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
        {data.map((event) => (
          <div
            key={event.id}
            className="bg-white border-2 border-black shadow-[12px_12px_0_#000] rounded-lg"
          >
            <img
              src={event.image_url}
              alt={`Banner for ${event.title}`}
              className="w-full h-50 object-cover border-b-4 border-black rounded-t-sm"
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
                  {new Date(event.starts_at).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </p>

                <p>
                  <span className="font-medium">Ends:</span>{" "}
                  {new Date(event.ends_at).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </p>

                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {event.location}
                </p>

                {event.amount > 0 && (
                  <p>
                    <span className="font-medium">Amount:</span> ₹{event.amount}
                  </p>
                )}

                {/* Optional additional fields */}
                {event.organizer && (
                  <p>
                    <span className="font-medium">Organizer:</span>{" "}
                    {event.organizer}
                  </p>
                )}
                {event.category && (
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {event.category}
                  </p>
                )}

                <div className="py-2 mt-6 font-bold">
                  Starts in{" "}
                  {Math.max(
                    0,
                    Math.ceil(
                      (new Date(event.starts_at) - now) / (1000 * 60 * 60 * 24)
                    )
                  )}{" "}
                  days
                </div>
              </div>

              <Link
                to={`/events/${event.id}`}
                className="inline-block px-4 rounded py-2 bg-blue-600 text-white font-semibold border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition"
              >
                Start Registration
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="events" className=" py-20 px-6 hero">
      <div className="max-w-6xl mx-auto space-y-2">
        <h1 className="font-[font2] text-5xl md:text-7xl text-blue-600 text-center">
          Events
        </h1>
        <p className="py-8 md:text-xl text-gray-700 text-left md:text-center max-w-4xl mx-auto">
          Explore our ongoing and upcoming events, workshops, and competitions.
          Join the community to learn, collaborate, and innovate with fellow
          developers and tech enthusiasts.
        </p>
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {["ongoing", "upcoming", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold border-2 rounded-md transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-black shadow-[4px_4px_0_#000]"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Event Grid */}
        {activeTab === "ongoing" && <EventGrid data={ongoing} />}
        {activeTab === "upcoming" && <EventGrid data={upcoming} />}
        {activeTab === "past" && <EventGrid data={past} />}
      </div>
    </section>
  );
}
