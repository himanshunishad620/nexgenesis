export default function Navbar({ username, onLogout }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
            P
          </div>

          <div>
            <h1 className="text-sm font-bold text-slate-900 sm:text-base">
              Product Admin
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">Dashboard</p>
          </div>
        </div>

        {/* User section */}
        <div className="flex items-center gap-3">
          {username && (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                {username.charAt(0).toUpperCase()}
              </div>

              <div className="max-w-[180px]">
                <p className="truncate text-sm font-medium text-slate-700">
                  {username}
                </p>

                <p className="text-xs text-slate-400">Signed in</p>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
