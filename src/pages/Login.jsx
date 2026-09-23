import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api/auth";
import Input from "../components/Input";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
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

        <Input
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

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
