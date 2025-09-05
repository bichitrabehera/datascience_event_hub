import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../constants/api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [showFormBuilder, setShowFormBuilder] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(API.EVENTS);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error loading events:", err);
      }
    }
    fetchEvents();
  }, []);

  // Save (create or update) event
  // Save (create or update) event
  async function handleSaveEvent(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const url = editingEvent
      ? API.ADMIN_EVENT(editingEvent.id)
      : API.ADMIN_EVENTS;
    const method = editingEvent ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`, // do NOT set Content-Type for FormData
        },
        body: formData,
      });

      if (res.ok) {
        alert("Event saved successfully!");
        setShowEventForm(false);
        setEditingEvent(null);
        const refreshed = await fetch(API.EVENTS);
        setEvents(await refreshed.json());
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save event");
      }
    } catch (err) {
      console.error("Error saving event:", err);
    }
  }

  async function handleEdit(id) {
    try {
      const res = await fetch(API.EVENT_DETAILS(id));
      const data = await res.json();
      setEditingEvent(data);
      setShowEventForm(true);
    } catch (err) {
      console.error("Error loading event:", err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(API.ADMIN_EVENT(id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEvents(events.filter((e) => e.id !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  }

  async function handleViewRegistrations(id) {
    try {
      const res = await fetch(API.ADMIN_EVENT_REGISTRATIONS(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const regs = await res.json();
      let msg = `Registrations for event ${id}:\n\n`;
      if (regs.length === 0) msg += "No registrations yet.";
      else regs.forEach((r) => (msg += `${r.name} - ${r.email}\n`));
      alert(msg);
      if (regs.length > 0 && window.confirm("Export registrations?")) {
        window.open(API.ADMIN_EVENT_EXPORT(id, token));
      }
    } catch (err) {
      console.error("Error loading registrations:", err);
    }
  }

  async function handleOpenFormBuilder(eventId) {
    try {
      const res = await fetch(API.ADMIN_EVENT_FORM(eventId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFormFields(data.form_data || []);
      setShowFormBuilder(true);
    } catch (err) {
      console.error("Error loading form:", err);
    }
  }

  function addFormField() {
    setFormFields([
      ...formFields,
      { label: "New Field", type: "text", required: false },
    ]);
  }

  function updateFormField(index, updates) {
    const newFields = [...formFields];
    newFields[index] = { ...newFields[index], ...updates };
    setFormFields(newFields);
  }

  function removeFormField(index) {
    setFormFields(formFields.filter((_, i) => i !== index));
  }

  async function saveForm(eventId) {
    try {
      const res = await fetch(API.ADMIN_EVENT_FORM(eventId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ form_data: formFields }),
      });
      if (res.ok) {
        alert("Form saved successfully!");
        setShowFormBuilder(false);
      } else {
        alert("Failed to save form");
      }
    } catch (err) {
      console.error("Error saving form:", err);
    }
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Manage Events</h2>
        <button
          className="px-4 py-2 mb-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => setShowEventForm(true)}
        >
          Create New Event
        </button>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm mt-2">
                <strong>Starts:</strong>{" "}
                {new Date(event.starts_at).toLocaleDateString()}{" "}
                {new Date(event.starts_at).toLocaleTimeString()}
              </p>
              <p className="text-sm">
                <strong>Location:</strong> {event.location}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => handleEdit(event.id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
                <button
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                  onClick={() => handleOpenFormBuilder(event.id)}
                >
                  Create Form
                </button>
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleViewRegistrations(event.id)}
                >
                  View Registrations
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Form Modal */}
      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEventForm(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {editingEvent ? "Edit Event" : "Create Event"}
            </h2>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <input
                name="title"
                defaultValue={editingEvent?.title}
                placeholder="Event Title"
                required
                className="w-full border rounded p-2"
              />
              <textarea
                name="description"
                defaultValue={editingEvent?.description}
                placeholder="Description"
                required
                className="w-full border rounded p-2"
              />
              <input
                type="datetime-local"
                name="starts_at"
                defaultValue={editingEvent?.starts_at?.slice(0, 16)}
                required
                className="w-full border rounded p-2"
              />
              <input
                type="datetime-local"
                name="ends_at"
                defaultValue={editingEvent?.ends_at?.slice(0, 16)}
                required
                className="w-full border rounded p-2"
              />
              <input
                name="category"
                defaultValue={editingEvent?.category || "general"}
                placeholder="Category"
                className="w-full border rounded p-2"
              />
              <input
                name="location"
                defaultValue={editingEvent?.location}
                placeholder="Location"
                required
                className="w-full border rounded p-2"
              />

              {/* File upload */}
              <div>
                <label className="block font-semibold mb-1">Event Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full border rounded p-2"
                />
                {editingEvent?.image_url && (
                  <img
                    src={editingEvent.image_url}
                    alt="Current event"
                    className="mt-2 h-32 object-cover rounded"
                  />
                )}
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Form Builder Modal */}
      {showFormBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowFormBuilder(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">
              Custom Registration Form
            </h2>
            <div className="space-y-3">
              {formFields.map((field, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) =>
                      updateFormField(i, { label: e.target.value })
                    }
                    className="border rounded p-1 flex-1"
                  />
                  <select
                    value={field.type}
                    onChange={(e) =>
                      updateFormField(i, { type: e.target.value })
                    }
                    className="border rounded p-1"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="number">Number</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Select</option>
                  </select>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateFormField(i, { required: e.target.checked })
                      }
                    />
                    Required
                  </label>
                  <button
                    type="button"
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => removeFormField(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={addFormField}
              >
                Add Field
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => saveForm(editingEvent?.id)}
              >
                Save Form
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
