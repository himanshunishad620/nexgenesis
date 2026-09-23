// Stage 1 goal: prove the Vite + React + Tailwind pipeline works before
// building any real feature. If this renders with a working Tailwind
// class (the blue background, the rounded corners), the setup is good.
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-xl bg-white p-8 shadow text-center">
        <h1 className="text-2xl font-semibold text-blue-600">
          Product Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-500">Stage 1: project setup ✅</p>
      </div>
    </div>
  );
}
