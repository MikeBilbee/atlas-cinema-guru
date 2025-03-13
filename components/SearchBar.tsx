// components/SearchBar.tsx
"use client";

import { useState, KeyboardEvent } from "react";

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

      onSearch({ query: title, minYear, maxYear }); 
    } catch (error) {
      console.error("Error fetching titles:", error);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
	if (e.key === 'Enter') {
		handleSearch();
	}
};

    return (
        <div className="bg-lumi-navy p-4">
            <div>
			<h3 className="text-sm font-semibold mb-2 text-white">Search</h3>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
					onKeyDown={handleKeyPress}
                    className="w-full p-2 border border-lumi-teal bg-lumi-light-navy rounded-full text-white"

                />
				</div>
				<div className="flex items-center mt-2 space-x-2">
				<div>
				<h3 className="text-sm font-semibold mb-2 text-white">Min Year</h3>
					<input
						type="number"
						placeholder="Min Year"
						value={minYear ?? ""}
						onChange={(e) => setMinYear(parseInt(e.target.value) || undefined)}
						onKeyDown={handleKeyPress}
						className="w-24 p-2 border border-lumi-teal bg-lumi-light-navy rounded-full text-white"
					/>
				</div>
				<div>
				<h3 className="text-sm font-semibold mb-2 text-white">Max Year</h3>
					<input
						type="number"
						placeholder="Max Year"
						value={maxYear ?? ""}
						onChange={(e) => setMaxYear(parseInt(e.target.value) || undefined)}
						onKeyDown={handleKeyPress}
						className="w-24 p-2 border border-lumi-teal bg-lumi-light-navy rounded-full text-white"
					/>
				</div>
			</div>
        </div>
    );
};

export default SearchBar;