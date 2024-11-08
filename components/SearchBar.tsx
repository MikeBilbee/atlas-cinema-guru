// SearchBar.tsx
"use client";

import { useState } from "react";

interface SearchBarProps {
    onTitlesFetched: (titles: Film[]) => void;
	onSearch: (params: { query: string; minYear?: number; maxYear?: number }) => void;
}

interface Film {
    title: string;
    id: string;
	released: string;
    synopsis: string;
    genre: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onTitlesFetched, onSearch  }) => {
    const [title, setTitle] = useState("");
    const [minYear, setMinYear] = useState<number | undefined>(undefined);
    const [maxYear, setMaxYear] = useState<number | undefined>(undefined);

    const handleSearch = async () => {
    const url = new URL('/api/titles', window.location.origin);
    url.searchParams.set('query', title);
    if (minYear !== undefined) {
      url.searchParams.set('minYear', minYear.toString());
    }
    if (maxYear !== undefined) {
      url.searchParams.set('maxYear', maxYear.toString());
    }

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();

      onTitlesFetched(data.title);

      // Call onSearch to update Home component's state
      onSearch({ query: title, minYear, maxYear }); 
    } catch (error) {
      console.error("Error fetching titles:", error);
    }
  };

    return (
        <div className="bg-lumi-navy p-4 rounded-full shadow-md">
            <div>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-lumi-teal rounded-full text-black"

                />
            </div>
            <div className="flex items-center mt-2 space-x-2">
        <div>
          <input
            type="number"
            placeholder="Min Year"
            // Use conditional rendering to set the value only if minYear is defined
            value={minYear ?? ""} // Or value={minYear !== undefined ? minYear : ""} 
            onChange={(e) => setMinYear(parseInt(e.target.value) || undefined)}
            className="w-24 p-2 border border-lumi-teal rounded-full text-black"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Max Year"
            // Use conditional rendering to set the value only if maxYear is defined
            value={maxYear ?? ""} // Or value={maxYear !== undefined ? maxYear : ""}
            onChange={(e) => setMaxYear(parseInt(e.target.value) || undefined)}
            className="w-24 p-2 border border-lumi-teal rounded-full text-black"
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