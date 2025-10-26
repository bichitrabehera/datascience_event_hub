import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../constants/api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(API.EVENTS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    }

    if (!token) navigate("/admin/login");
    else fetchEvents();
  }, [token, navigate]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;
    try {
      const res = await fetch(API.ADMIN_EVENT(id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="p-6 min-h-screen pb-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Link
          to="/admin/events/new"
          className="px-4 py-2 bg-blue-600 text-white rounded mb-6 inline-block"
        >
          + Add New Event
        </Link>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
          {events.map((e) => (
            <div
              key={e.id}
              className="border p-4 rounded shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{e.title}</h2>
              <p>{e.description}</p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(e.starts_at).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(e.ends_at).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>

              <div className="flex gap-2 mt-3">
                <Link
                  to={`/admin/events/${e.id}/edit`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
                <Link
                  to={`/admin/events/${e.id}/registrations`}
                  className="px-2 py-1 bg-green-600 text-white rounded"
                >
                  Registrations
                </Link>
                <Link
                  to={`/admin/events/${e.id}/form`}
                  className="px-2 py-1 bg-purple-600 text-white rounded"
                >
                  Design Form
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
