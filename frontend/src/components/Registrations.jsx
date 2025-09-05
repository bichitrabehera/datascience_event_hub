import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../constants/api";

export default function Registrations() {
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRegistrations();
  }, [id]);

  async function fetchRegistrations() {
    try {
      const res = await fetch(API.ADMIN_EVENT_REGISTRATIONS(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRegistrations(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleExport() {
    window.open(API.ADMIN_EVENT_EXPORT(id, token));
  }

  return (
    <main className="pt-28 max-w-6xl min-h-screen mx-auto px-4 md:px-0">
      <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Registrations
      </h2>

      {registrations.length === 0 ? (
        <p className="text-center">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-left">Name</th>
                <th className="border px-2 py-1 text-left">Email</th>
                <th className="border px-2 py-1 text-left">Year</th>
                <th className="border px-2 py-1 text-left">Department</th>
                <th className="border px-2 py-1 text-left">USN</th>
                <th className="border px-2 py-1 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{r.name}</td>
                  <td className="border px-2 py-1">{r.email}</td>
                  <td className="border px-2 py-1">{r.year}</td>
                  <td className="border px-2 py-1">{r.department}</td>
                  <td className="border px-2 py-1">{r.usn}</td>
                  <td className="border px-2 py-1">{r.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {registrations.length > 0 && (
        <div className="flex justify-center sm:justify-start">
          <button
            onClick={handleExport}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Export to Excel
          </button>
        </div>
      )}
    </main>
  );
}
