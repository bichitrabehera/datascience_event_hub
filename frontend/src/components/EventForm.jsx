import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../constants/api";

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    starts_at: "",
    ends_at: "",
    location: "",
    category: "general",
  });
  const [imageFile, setImageFile] = useState(null);

  // 🕒 Convert UTC date string → Asia/Kolkata local string for datetime-local input
  const toLocalIST = (utcString) => {
    if (!utcString) return "";
    const date = new Date(utcString);
    if (isNaN(date)) return "";
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const localDate = new Date(date.getTime() + IST_OFFSET_MS);
    // Format as yyyy-MM-ddTHH:mm suitable for <input type="datetime-local">
    const pad = (n) => String(n).padStart(2, "0");
    const year = localDate.getUTCFullYear();
    const month = pad(localDate.getUTCMonth() + 1);
    const day = pad(localDate.getUTCDate());
    const hours = pad(localDate.getUTCHours());
    const minutes = pad(localDate.getUTCMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // 🕒 Convert Asia/Kolkata local datetime-local value → UTC for backend
  const toUTC = (localString) => {
    if (!localString) return "";
    // Expecting format: YYYY-MM-DDTHH:mm
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const [datePart, timePart] = localString.split("T");
    if (!datePart || !timePart) return "";
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);
    if ([year, month, day, hour, minute].some((v) => Number.isNaN(v))) return "";
    // Create a UTC millis value for the wall-clock IST time, then subtract IST offset to get true UTC
    const utcMillis = Date.UTC(year, month - 1, day, hour, minute) - IST_OFFSET_MS;
    return new Date(utcMillis).toISOString();
  };

  useEffect(() => {
    if (id) {
      // edit mode
      async function fetchEvent() {
        try {
          const res = await fetch(API.EVENT_DETAILS(id), {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setEventData({
            ...data,
            starts_at: toLocalIST(data.starts_at),
            ends_at: toLocalIST(data.ends_at),
          });
        } catch (err) {
          console.error(err);
        }
      }
      fetchEvent();
    }
  }, [id, token]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // Convert IST → UTC before sending
    const eventToSubmit = {
      ...eventData,
      starts_at: toUTC(eventData.starts_at),
      ends_at: toUTC(eventData.ends_at),
    };

    Object.entries(eventToSubmit).forEach(([key, val]) =>
      formData.append(key, val)
    );
    if (imageFile) formData.append("image", imageFile);

    const url = id ? API.ADMIN_EVENT(id) : API.ADMIN_EVENTS;
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        alert(`Event ${id ? "updated" : "created"} successfully!`);
        navigate("/dashboard");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save event");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 py-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow max-w-lg w-full space-y-4"
      >
        <h2 className="text-2xl font-bold">
          {id ? "Edit Event" : "Create Event"}
        </h2>

        <input
          name="title"
          placeholder="Title"
          value={eventData.title}
          onChange={(e) =>
            setEventData({ ...eventData, title: e.target.value })
          }
          required
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
          required
          className="w-full border rounded p-2"
        />

        {/* 🕐 Start & End Date/Time Inputs (IST local) */}
        <label className="block text-sm font-medium">Start Time (IST)</label>
        <input
          type="datetime-local"
          name="starts_at"
          value={eventData.starts_at}
          onChange={(e) =>
            setEventData({ ...eventData, starts_at: e.target.value })
          }
          required
          className="w-full border rounded p-2"
        />

        <label className="block text-sm font-medium">End Time (IST)</label>
        <input
          type="datetime-local"
          name="ends_at"
          value={eventData.ends_at}
          onChange={(e) =>
            setEventData({ ...eventData, ends_at: e.target.value })
          }
          required
          className="w-full border rounded p-2"
        />

        <input
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={(e) =>
            setEventData({ ...eventData, location: e.target.value })
          }
          required
          className="w-full border rounded p-2"
        />
        <input
          name="category"
          placeholder="Category"
          value={eventData.category}
          onChange={(e) =>
            setEventData({ ...eventData, category: e.target.value })
          }
          className="w-full border rounded p-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        {eventData.image_url && (
          <img
            src={eventData.image_url}
            alt="Event"
            className="h-32 mt-2 rounded"
          />
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {id ? "Update Event" : "Create Event"}
        </button>
      </form>
    </main>
  );
}
