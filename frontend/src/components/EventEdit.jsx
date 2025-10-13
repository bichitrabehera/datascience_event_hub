import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API } from "../constants/api";

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [event, setEvent] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // 🕒 Convert UTC date string → Asia/Kolkata local string for datetime-local
  const toLocalIST = (utcString) => {
    if (!utcString) return "";
    const date = new Date(utcString);
    if (isNaN(date)) return "";
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const localDate = new Date(date.getTime() + IST_OFFSET_MS);
    const pad = (n) => String(n).padStart(2, "0");
    const year = localDate.getUTCFullYear();
    const month = pad(localDate.getUTCMonth() + 1);
    const day = pad(localDate.getUTCDate());
    const hours = pad(localDate.getUTCHours());
    const minutes = pad(localDate.getUTCMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // 🕒 Convert Asia/Kolkata local datetime → UTC for backend
  const toUTC = (localString) => {
    if (!localString) return "";
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const [datePart, timePart] = localString.split("T");
    if (!datePart || !timePart) return "";
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);
    if ([year, month, day, hour, minute].some((v) => Number.isNaN(v))) return "";
    const utcMillis = Date.UTC(year, month - 1, day, hour, minute) - IST_OFFSET_MS;
    return new Date(utcMillis).toISOString();
  };

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(API.ADMIN_EVENT(id), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load event");
        const data = await res.json();

        // Convert backend UTC timestamps → local IST time for the input fields
        setEvent({
          ...data,
          starts_at: toLocalIST(data.starts_at),
          ends_at: toLocalIST(data.ends_at),
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvent();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (imageFile) formData.append("image", imageFile);

    // Replace local IST input values with UTC before sending
    formData.set("starts_at", toUTC(formData.get("starts_at")));
    formData.set("ends_at", toUTC(formData.get("ends_at")));

    try {
      const res = await fetch(API.ADMIN_EVENT(id), {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        alert("Event updated successfully!");
        navigate("/dashboard");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update event");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!event) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col mt-30 items-center justify-center px-6 py-12 bg-gray-50">
      <div className="bg-white w-full max-w-2xl border-4 mt-30 border-black shadow-[12px_12px_0_#000] p-8">
        <h2 className="text-3xl font-[sketch] text-blue-700 mb-6 text-center">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            defaultValue={event.title}
            placeholder="Event Title"
            required
            className="w-full border rounded p-2"
          />

          <textarea
            name="description"
            defaultValue={event.description}
            placeholder="Description"
            required
            className="w-full border rounded p-2"
          />

          {/* 🕐 Start & End Time (IST Local) */}
          <label className="block text-sm font-medium">Start Time (IST)</label>
          <input
            type="datetime-local"
            name="starts_at"
            defaultValue={event.starts_at}
            required
            className="w-full border rounded p-2"
          />

          <label className="block text-sm font-medium">End Time (IST)</label>
          <input
            type="datetime-local"
            name="ends_at"
            defaultValue={event.ends_at}
            required
            className="w-full border rounded p-2"
          />

          <input
            name="location"
            defaultValue={event.location}
            placeholder="Location"
            required
            className="w-full border rounded p-2"
          />

          <input
            name="category"
            defaultValue={event.category || "general"}
            placeholder="Category"
            className="w-full border rounded p-2"
          />

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-1">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border rounded p-2"
            />
            {event.image_url && (
              <img
                src={event.image_url}
                alt="Current event"
                className="mt-2 h-32 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Event
          </button>

          <Link
            to={`/admin/events/${id}/form`}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 inline-block ml-4"
          >
            Design Form
          </Link>
        </form>

        {/* Optional: Preview the IST time in 12-hour format below */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            <strong>Start:</strong>{" "}
            {new Date(toUTC(event.starts_at)).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              dateStyle: "medium",
            })}
          </p>
          <p>
            <strong>End:</strong>{" "}
            {new Date(toUTC(event.ends_at)).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              dateStyle: "medium",
            })}
          </p>
        </div>
      </div>
    </main>
  );
}
