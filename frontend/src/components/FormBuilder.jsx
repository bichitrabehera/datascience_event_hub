import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../constants/api";

export default function FormBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForm() {
      try {
        const res = await fetch(API.ADMIN_EVENT_FORM(id), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setFields(data.form_data || []);
        }
      } catch (err) {
        console.error("Failed to fetch form:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, [id, token]);

  const addField = () => {
    setFields([...fields, { label: "", type: "text", required: false, options: [] }]);
  };

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleOptionsChange = (index, optionsStr) => {
    const options = optionsStr.split(",").map(opt => opt.trim()).filter(opt => opt);
    updateField(index, "options", options);
  };

  const saveForm = async () => {
    try {
      const res = await fetch(API.ADMIN_EVENT_FORM(id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ form_data: fields }),
      });
      if (res.ok) {
        alert("Form saved successfully!");
        navigate("/dashboard");
      } else {
        alert("Failed to save form");
      }
    } catch (err) {
      console.error("Failed to save form:", err);
      alert("Failed to save form");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="p-6 min-h-screen">
      <div className="max-w-4xl pt-20 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Design Form for Event {id}</h1>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="border p-4 rounded flex items-center space-x-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                  className="border rounded p-2"
                />
                <select
                  value={field.type}
                  onChange={(e) => updateField(index, "type", e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                </select>
                {field.type === "select" && (
                  <input
                    type="text"
                    placeholder="Options (comma separated)"
                    value={field.options.join(", ")}
                    onChange={(e) => handleOptionsChange(index, e.target.value)}
                    className="border rounded p-2"
                  />
                )}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(index, "required", e.target.checked)}
                    className="mr-2"
                  />
                  Required
                </label>
              </div>
              <button
                onClick={() => removeField(index)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-x-4">
          <button
            onClick={addField}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Add Field
          </button>
          <button
            onClick={saveForm}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Form
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
