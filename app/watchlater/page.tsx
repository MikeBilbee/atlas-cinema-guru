// app/watch-later/page.tsx
"use client";

import { useState, useEffect } from "react";
import MovieTile from "@/components/MovieTile";
import PageButtons from "@/components/PageButtons";

interface Film {
  title: string;
  id: string;
  released: string;
  synopsis: string;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
}

const WatchLater: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 6;
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await fetch(`/api/watchlater?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setFilms(data.watchLater);
      } catch (error) {
        console.error("Error fetching watch later films:", error);
      }
    };

    fetchWatchLater();
  }, [currentPage, refreshKey]);

  const handleFavoriteToggle = () => {
    setRefreshKey(refreshKey + 1);
  };

  const handleWatchLaterToggle = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div key={refreshKey}>
      <div className="grid grid-cols-3 px-6 gap-4 mt-8" key={refreshKey}>
        {films.map((film) => (
          <MovieTile
            key={film.id}
            title={film.title}
            coverArtUrl={`/images/${film.id}.webp`}
            released={film.released}
            synopsis={film.synopsis}
            genre={film.genre}
            id={film.id}
			onFavoriteToggle={handleFavoriteToggle}
            onWatchLaterToggle={handleWatchLaterToggle} // Use a different prop for watch later
          />
        ))}
      </div>
      <PageButtons
        totalItems={100} // Replace with actual total watch later count
        itemsPerPage={filmsPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default WatchLater;