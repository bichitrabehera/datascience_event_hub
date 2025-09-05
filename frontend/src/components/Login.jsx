import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../constants/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch(API.ADMIN_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch {
      setMessage("Login failed. Please try again.");
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen max-w-[300px] md:max-w-3xl mx-auto">
      <div className="bg-white  border-4 border-black shadow-[12px_12px_0_#000] p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3  font-medium shadow-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
        )}
      </div>
    </main>
  );
}
