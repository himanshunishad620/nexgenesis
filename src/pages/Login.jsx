import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // Ignore repeated clicks on "Log in" while a request is already
    // going - this is what stops one click turning into many requests.
    if (submitting) return;
    setError("");
    setSubmitting(true);
    try {
      const data = await login(username, password);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("username", data.username);
      navigate("/products", { replace: true });
    } catch (err) {
      const status = err.response ? err.response.status : null;
      if (status === 400 || status === 401) {
        setError("Wrong username or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Log in</h1>
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border px-3 py-2"
            autoComplete="username"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
        >
          {submitting ? "Logging in..." : "Log in"}
        </button>

        <p className="mt-3 text-xs text-gray-500">
          Try username <code>emilys</code> / password <code>emilyspass</code>.
        </p>
      </form>
    </div>
  );
}
