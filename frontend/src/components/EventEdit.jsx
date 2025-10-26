import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API } from "../constants/api";

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [event, setEvent] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    starts_at: "",
    ends_at: "",
    location: "",
    category: "general",
    amount: 0,
    forms_link: "",
  });

  // 🕒 Convert UTC date string → IST date formatted for date input
  const toLocalIST = (utcString) => {
    if (!utcString) return "";
    const date = new Date(utcString);
    const istTime = date.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istTime);
    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, "0");
    const day = String(istDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 🕒 Convert IST date string → UTC timestamp (assuming 00:00:00 IST)
  const toUTC = (istString) => {
    if (!istString) return "";
    // Parse the IST date string as YYYY-MM-DD, assume 00:00:00 IST
    const [year, month, day] = istString.split("-").map(Number);
    if ([year, month, day].some((v) => Number.isNaN(v))) return "";
    // Create UTC timestamp by treating input as IST at midnight
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const utcMillis = Date.UTC(year, month - 1, day, 0, 0, 0) - istOffsetMs;
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
        setEventData({
          ...data,
          starts_at: toLocalIST(data.starts_at),
          ends_at: toLocalIST(data.ends_at),
          forms_link: data.forms_link || "",
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvent();
  }, [id, token]);

  const handleSubmit = async (e) => {
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
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
            placeholder="Event Title"
            required
            className="w-full border rounded p-2"
          />

          <textarea
            name="description"
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
            placeholder="Description"
            required
            className="w-full border rounded p-2"
          />

          {/* 🕐 Start & End Date (IST Local) */}
          <label className="block text-sm font-medium">Start Date (IST)</label>
          <input
            type="date"
            name="starts_at"
            value={eventData.starts_at}
            onChange={(e) =>
              setEventData({ ...eventData, starts_at: e.target.value })
            }
            required
            className="w-full border rounded p-2"
          />

          <label className="block text-sm font-medium">End Date (IST)</label>
          <input
            type="date"
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
            value={eventData.location}
            onChange={(e) =>
              setEventData({ ...eventData, location: e.target.value })
            }
            placeholder="Location"
            required
            className="w-full border rounded p-2"
          />

          <input
            name="category"
            value={eventData.category}
            onChange={(e) =>
              setEventData({ ...eventData, category: e.target.value })
            }
            placeholder="Category"
            className="w-full border rounded p-2"
          />

          <input
            name="amount"
            type="number"
            step="0.01"
            placeholder="Amount (₹)"
            value={eventData.amount}
            onChange={(e) =>
              setEventData({
                ...eventData,
                amount: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full border rounded p-2"
          />

          <input
            name="forms_link"
            placeholder="Forms Link (optional)"
            value={eventData.forms_link}
            onChange={(e) =>
              setEventData({ ...eventData, forms_link: e.target.value })
            }
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

        {/* Optional: Preview the IST date below */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            <strong>Start:</strong>{" "}
            {new Date(toUTC(eventData.starts_at)).toLocaleDateString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </p>
          <p>
            <strong>End:</strong>{" "}
            {new Date(toUTC(eventData.ends_at)).toLocaleDateString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </p>
        </div>
      </div>
    </main>
  );
}
