// components/Favorites.tsx
"use client";

import { useState, useEffect } from "react";
import MovieTile from "./MovieTile";
import PageButtons from "./PageButtons";

interface FavoritesProps {
  activeSection: string;
}

interface Film {
  title: string;
  id: string;
  released: string;
  synopsis: string;
  genre: string;
  favorited: boolean; // Add favorited property
  watchLater: boolean; // Add watchLater property
}

const Favorites: React.FC<FavoritesProps> = ({ activeSection }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 6;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Fetch favorites from the API
        const response = await fetch(`/api/favorites?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setFilms(data.favorites); // Assuming API response has a 'favorites' property
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (activeSection === 'favorites') {
      fetchFavorites();
    }
  }, [currentPage, activeSection]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {activeSection === 'favorites' && (
        <div>
          <div className="grid grid-cols-3 px-6 gap-4">
            {films.map((film) => (
              <MovieTile
                key={film.id}
                title={film.title}
                coverArtUrl={`/images/${film.id}.webp`}
                released={film.released}
                synopsis={film.synopsis}
                genre={film.genre}
              />
            ))}
          </div>
          <PageButtons
            totalItems={100} // Replace with actual total favorites count
            itemsPerPage={filmsPerPage}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default Favorites;