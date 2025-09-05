import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../constants/api";
import { useNavigate } from "react-router-dom";

export default function EventRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    department: "",
    usn: "",
    phone_number: "",
  });
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
          year: formData.year,
          department: formData.department,
          usn: formData.usn,
          phone_number: formData.phone_number,
          form_data: extraData,
        }),
      });
      if (res.ok) {
        navigate("/completed");
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
    <main className="min-h-screen flex flex-col justify-center items-center px-6 py-16">
      {/* Title */}
      <h1 className="text-5xl font-[font2] text-blue-700 mb-10 text-center">
        Register for {event.title}
      </h1>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl border-4 border-black shadow-[12px_12px_0_#000] p-8 space-y-6"
      >
        {/* Grid for basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full border-2 border-black px-3 py-2 rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full border-2 border-black px-3 py-2 rounded-md"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block mb-1 font-semibold">Year</label>
            <input
              type="text"
              placeholder="e.g., 2nd Year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              required
              className="w-full border-2 border-black px-3 py-2 rounded-md"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1 font-semibold">Department</label>
            <input
              type="text"
              placeholder="e.g., CSE"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
              className="w-full border-2 border-black px-3 py-2 rounded-md"
            />
          </div>

          {/* USN */}
          <div>
            <label className="block mb-1 font-semibold">USN</label>
            <input
              type="text"
              value={formData.usn}
              onChange={(e) =>
                setFormData({ ...formData, usn: e.target.value })
              }
              required
              className="w-full border-2 border-black px-3 py-2 rounded-md"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              required
              className="w-full border-2 border-black px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* Render custom event-specific fields */}
        {customFields.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Additional Information</h2>
            {customFields.map((field) => (
              <div key={field.label} className="flex flex-col">
                <label className="mb-1 font-semibold">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    required={field.required}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.label]: e.target.value,
                      })
                    }
                    className="w-full border-2 border-black px-3 py-2 rounded-md"
                  />
                ) : field.type === "select" ? (
                  <select
                    required={field.required}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.label]: e.target.value,
                      })
                    }
                    className="w-full border-2 border-black px-3 py-2 rounded-md"
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
                      setFormData({
                        ...formData,
                        [field.label]: e.target.value,
                      })
                    }
                    className="w-full border-2 border-black px-3 py-2 rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 rounded-md border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] transition"
        >
          Submit Registration
        </button>
      </form>
    </main>
  );
}
