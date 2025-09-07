import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API } from "../constants/api";

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [event, setEvent] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(API.ADMIN_EVENT(id), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load event");
        const data = await res.json();
        setEvent(data);
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
          <input
            type="datetime-local"
            name="starts_at"
            defaultValue={event.starts_at?.slice(0, 16)}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="datetime-local"
            name="ends_at"
            defaultValue={event.ends_at?.slice(0, 16)}
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
      </div>
    </main>
  );
}
