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
    <main className=" pt-30 max-w-6xl min-h-screen mx-auto">
      <h2 className="text-3xl font-bold mb-6 ">Registrations</h2>

      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Year</th>
              <th className="border px-2 py-1">Department</th>
              <th className="border px-2 py-1">USN</th>
              <th className="border px-2 py-1">Phone</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id}>
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
      )}

      {registrations.length > 0 && (
        <button
          onClick={handleExport}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Export to Excel
        </button>
      )}
    </main>
  );
}
