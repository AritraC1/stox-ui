import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

const Topbar = () => {
  const [query, setQuery] = useState("");
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <nav className="h-16 w-full bg-white shadow px-4 flex items-center justify-between z-10">
      {/* Search + icon */}
      <div className="relative w-80">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </span>
        <input
          type="search"
          placeholder="Search for stock/company"
          value={query}
          onChange={handleQuery}
          className="w-full pl-10 pr-2 py-2 border text-gray-800 border-gray-300 rounded-2xl focus:outline-none focus:ring placeholder-gray-400 placeholder:text-sm"
        />
      </div>

      {/* Notification + Profile */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full transition hover:bg-gray-100 cursor-pointer"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>

        {/* Notification Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <span className="text-gray-400"> | </span>

        {/* Profile */}
        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
          <img
            src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </button>
      </div>
    </nav>
  );
};

export default Topbar;
