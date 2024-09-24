import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [localQuery, setLocalQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${localQuery}?page=1`);
  };

  return (
    <form className="w-7/12 md:w-1/3" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50  focus:outline-none"
          placeholder="Search movies..."
          value={localQuery}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
