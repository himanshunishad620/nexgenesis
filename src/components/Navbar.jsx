export default function Navbar({ username, onLogout }) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3">
      <span className="font-semibold">Product Admin Dashboard</span>
      <div className="flex items-center gap-3 text-sm text-gray-600">
        {username && <span>Signed in as {username}</span>}
        <button
          onClick={onLogout}
          className="rounded border px-3 py-1.5 hover:bg-gray-50"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
