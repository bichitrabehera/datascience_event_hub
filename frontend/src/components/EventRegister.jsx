import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../constants/api";

export default function EventRegister() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventRes, formRes] = await Promise.all([
          fetch(API.EVENT_DETAILS(id)),
          fetch(API.EVENT_FORM(id)),
        ]);
        if (eventRes.ok) setEvent(await eventRes.json());
        if (formRes.ok) {
          const formJson = await formRes.json();
          setCustomFields(formJson.form_data || []);
        }
      } catch (err) {
        console.error("Error loading register page:", err);
      }
    }
    fetchData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const extraData = {};
    customFields.forEach((field) => {
      extraData[field.label] = formData[field.label] || "";
    });

    try {
      const res = await fetch(API.REGISTER_EVENT(id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          form_data: extraData,
        }),
      });
      if (res.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed. Try again.");
      }
    } catch {
      alert("Registration failed. Try again.");
    }
  }

  if (!event)
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      {/* Title */}
      <h1 className="text-4xl font-[sketch] text-blue-700 mb-10 text-center">
        Register for {event.title}
      </h1>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl border-4 border-black shadow-[12px_12px_0_#000] p-8 space-y-4 transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[17px_17px_0_#000]"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full border-2 border-black px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full border-2 border-black px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {customFields.map((field) => (
          <div key={field.label} className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-900">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                required={field.required}
                onChange={(e) =>
                  setFormData({ ...formData, [field.label]: e.target.value })
                }
                className="w-full border-2 border-black px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : field.type === "select" ? (
              <select
                required={field.required}
                onChange={(e) =>
                  setFormData({ ...formData, [field.label]: e.target.value })
                }
                className="w-full border-2 border-black px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                required={field.required}
                onChange={(e) =>
                  setFormData({ ...formData, [field.label]: e.target.value })
                }
                className="w-full border-2 border-black px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 border-2 border-black shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] transition"
        >
          Submit Registration
        </button>
      </form>
    </main>
  );
}
