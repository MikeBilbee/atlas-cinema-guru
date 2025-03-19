// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import MovieTile from "@/components/MovieTile";
import SearchBar from "@/components/SearchBar";
import Genre from "@/components/GenreFilter";
import PageButtons from "@/components/PageButtons";
import LoadingSkelly from "@/components/MovieTileSkeleton"

interface Film {
  title: string;
  id: string;
  released: string;
  synopsis: string;
  genre: string;
}

interface FilmWithStatus extends Film {
  favorited: boolean;
  watchLater: boolean;
}

const Home: React.FC = () => {
  const [films, setFilms] = useState<FilmWithStatus[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useState<{
    query: string;
    minYear?: number;
    maxYear?: number;
  }>({
    query: "",
    minYear: undefined,
    maxYear: undefined,
  });

  const filmsPerPage = 6;

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleTitlesFetched = (titles: Film[]) => {
    setFilms(titles as FilmWithStatus[]);
  };

  const handleSearch = (params: {
    query: string;
    minYear?: number;
    maxYear?: number;
  }) => {
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleGenresSelected = (genres: string[]) => {
    setSelectedGenres(genres);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const url = new URL("/api/titles", window.location.origin);
        url.searchParams.set("page", currentPage.toString());
        url.searchParams.set("query", searchParams.query);
        if (searchParams.minYear !== undefined) {
          url.searchParams.set("minYear", searchParams.minYear.toString());
        }
        if (searchParams.maxYear !== undefined) {
          url.searchParams.set("maxYear", searchParams.maxYear.toString());
        }
        if (selectedGenres.length > 0) {
          url.searchParams.set("genres", selectedGenres.join(","));
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const filmsData: Film[] = data.title;

        const filmsWithStatus = await Promise.all(
          filmsData.map(async (film) => {
            const favoriteResponse = await fetch(
              `/api/favorites?page=${currentPage}`
            );
            const favoriteData = await favoriteResponse.json();
            const favorites = favoriteData.favorites;
            const isFavorited = favorites.some((fav: any) => fav.id === film.id);

            const watchLaterResponse = await fetch(
              `/api/watch-later?page=${currentPage}`
            );
            const watchLaterData = await watchLaterResponse.json();
            const watchLaterItems = watchLaterData.watchLater;
            const isWatchLater = watchLaterItems.some(
              (watchLaterItem: any) => watchLaterItem.id === film.id
            );

            return {
              ...film,
              favorited: isFavorited,
              watchLater: isWatchLater,
            };
          })
        );

        setFilms(filmsWithStatus);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [currentPage, searchParams, selectedGenres, refreshKey]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFavoriteToggle = () => {
    setRefreshKey(refreshKey + 1);
  };

  const handleWatchLaterToggle = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <SearchBar onTitlesFetched={handleTitlesFetched} onSearch={handleSearch} />
        <Genre onGenresSelected={handleGenresSelected} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 pl-6 pr-28 gap-y-4 gap-x-20">
	  {loading
          ? Array.from({ length: filmsPerPage }).map((_, index) => (
              <LoadingSkelly key={index} />
            ))
          : films.map((film) => (
              <MovieTile
                key={film.id}
                id={film.id}
                title={film.title}
                coverArtUrl={`/images/${film.id}.webp`}
                released={film.released}
                synopsis={film.synopsis}
                genre={film.genre}
                onFavoriteToggle={handleFavoriteToggle}
                onWatchLaterToggle={handleWatchLaterToggle}
                favorited={film.favorited}
                watchLater={film.watchLater}
                currentPage={currentPage}
              />
            ))}
      </div>
      <PageButtons
        totalItems={100}
        itemsPerPage={filmsPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Home;