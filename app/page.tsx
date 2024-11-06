"use client";
import GenreFilter from "@/components/GenreFilter";
import MovieList from "@/components/MovieList";
import PageButtons from "@/components/PageButtons";
import SearchFilter from "@/components/SearchFilter";
import { useEffect, useState } from "react";

// homepage for non-logged-in users

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image: string;
}
export default function Page() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState(2024);
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])

  // fetch funciton
  async function fetchMovies() {
    if (isLoading) return;
    setIsLoading(true);
    try {
        const params = new URLSearchParams({
          page: "1",
          minYear: minYear.toString(),
          maxYear: maxYear.toString(),
        });
    
        if (query) {
          params.append("query", query);
        }
    
        if (genres.length > 0) {
          params.append("genres", genres.join(","));
        }
    
        const fetchURL = `/api/titles?${params.toString()}`;
        console.log(fetchURL);
    
        const response = await fetch(`/api/titles?${params.toString()}`);
        const data = await response.json();
    
        console.log(data);
        setAllMovies(data.title);
    
        setIsLoading(false);
    } catch (err) {
        console.error('Error fetching titles: ', err);
    }
  }

  // fetch upon initial load
  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = allMovies.filter((movie) => {
        // search query
        const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase())
        // genre
        const matchesGenre = genres.length === 0 || genres.includes(movie.genre);
        // min/max year range
        const matchesYears = movie.released >= minYear && movie.released <= maxYear;

        return matchesGenre && matchesGenre && matchesYears;
    });
    setFilteredMovies(filtered)
  }, [allMovies, query, genres, minYear, maxYear])

  return (
    <main className="flex flex-col mb-0">
      <div className="search-filter w-full p-4 pb-0 mb-0 flex justify-between text-white">
        {/* Search Forms */}
        <SearchFilter
          onSearch={(query, minYear, maxYear) => {
            setQuery(query);
            setMinYear(minYear);
            setMaxYear(maxYear);
          }}
        />
        <GenreFilter
          onGenreSelect={(selectedGenres) => setGenres(selectedGenres)}
        />
      </div>
      <div className="w-auto p-5 mx-0 flex justify-center">
        <div className="w-full flex justify-center">
          <MovieList movieList={filteredMovies} />
        </div>
      </div>
    </main>
  );
}
