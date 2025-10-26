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
    amount: 0,
    forms_link: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // 🕒 Convert UTC date string → IST time formatted for datetime-local
  const toLocalIST = (utcString) => {
    if (!utcString) return "";
    const date = new Date(utcString);
    const istTime = date.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istTime);
    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, "0");
    const day = String(istDate.getDate()).padStart(2, "0");
    const hours = String(istDate.getHours()).padStart(2, "0");
    const minutes = String(istDate.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // 🕒 Convert local datetime string → UTC (assuming local represents IST)
  const toUTC = (localString) => {
    if (!localString) return "";
    const localDate = new Date(localString);
    const localTime = localDate.getTime();
    const localOffset = localDate.getTimezoneOffset() * 60 * 1000;
    const utcTime = localTime - localOffset;
    return new Date(utcTime).toISOString();
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
            forms_link: data.forms_link || "",
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
          name="amount"
          type="text"
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
