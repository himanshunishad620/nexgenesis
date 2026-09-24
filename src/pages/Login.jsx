import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { login } from "../lib/api/auth";

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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
            P
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Product Admin
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage your products
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter your credentials to continue.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <span className="mt-0.5 text-red-500">!</span>

              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <Input
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>

          {/* Demo credentials */}
          <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-xs leading-5 text-slate-500">
              <span className="font-medium text-slate-700">
                Demo credentials
              </span>
              <br />
              Username:{" "}
              <code className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-700">
                emilys
              </code>
              <br />
              Password:{" "}
              <code className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-700">
                emilyspass
              </code>
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Product Admin Dashboard
        </p>
      </div>
    </div>
  );
}
