import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4
                      flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Finance<span className="text-indigo-600">Tracker</span>
        </h1>

        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="h-9 w-9 rounded-full
                          bg-gradient-to-br from-blue-600 to-emerald-500
                          text-white flex items-center justify-center
                          font-semibold">
            {user?.name?.[0]}
          </div>

          {/* Name */}
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight">
              {user?.name}
            </p>
            <p className="text-xs text-slate-500">
              Personal finance
            </p>
          </div>

          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
