"use client";

import { useState } from "react";

interface SearchBarProps {
  onTitlesFetched: (titles: any[]) => void; // Replace 'any' with the actual type of your titles
}

const SearchBar: React.FC<SearchBarProps> = ({ onTitlesFetched }) => {
  const [title, setTitle] = useState("");
  const [minYear, setMinYear] = useState<number | undefined>(undefined);
  const [maxYear, setMaxYear] = useState<number | undefined>(undefined);

  const handleSearch = async () => {
    const url = new URL('/api/titles', window.location.origin); 
    url.searchParams.set('query', title);
    if (minYear) url.searchParams.set('minYear', minYear.toString());
    if (maxYear) url.searchParams.set('maxYear', maxYear.toString());

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      onTitlesFetched(data.title); 
    } catch (error) {
      console.error("Error fetching titles:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="bg-lumi-navy p-4 rounded-lg shadow-md">
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded-md"
        />
      </div>
      <div className="flex items-center mt-2 space-x-2"> {/* Added flex and space-x-2 */}
        <div>
          <input
            type="number"
            placeholder="Min Year"
            value={minYear}
            onChange={(e) => setMinYear(parseInt(e.target.value) || undefined)}
            className="w-24 p-2 border border-gray-400 rounded-md"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Max Year"
            value={maxYear}
            onChange={(e) => setMaxYear(parseInt(e.target.value) || undefined)}
            className="w-24 p-2 border border-gray-400 rounded-md"
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 bg-lumi-teal hover:bg-lumi-dark-teal text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;