// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import MovieTile from "@/components/MovieTile";
import SearchBar from "@/components/SearchBar";
import Genre from "@/components/GenreFilter";
import PageButtons from "@/components/PageButtons";

interface Film {
    title: string;
    id: string;
    released: string;
    synopsis: string;
    genre: string;
}

const Home: React.FC = () => {

    const [films, setFilms] = useState<Film[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
	const [refreshKey, setRefreshKey] = useState(0);

    const [searchParams, setSearchParams] = useState<{ query: string; minYear?: number; maxYear?: number }>({
        query: "",
        minYear: undefined,
        maxYear: undefined
    });

    const filmsPerPage = 6;

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const handleTitlesFetched = (titles: Film[]) => {
        setFilms(titles);
    };

    const handleSearch = (params: { query: string; minYear?: number; maxYear?: number }) => {
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
                const url = new URL('/api/titles', window.location.origin);
                url.searchParams.set('page', currentPage.toString());
                url.searchParams.set('query', searchParams.query);
                if (searchParams.minYear !== undefined) {
                    url.searchParams.set('minYear', searchParams.minYear.toString());
                }
                if (searchParams.maxYear !== undefined) {
                    url.searchParams.set('maxYear', searchParams.maxYear.toString());
                }
                if (selectedGenres.length > 0) {
                    url.searchParams.set('genres', selectedGenres.join(','));
                }

                const response = await fetch(url.toString());
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                const data = await response.json();
                setFilms(data.title);
            } catch (error) {
                console.error("Error fetching films:", error);
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
        <div key={refreshKey}>
            <div className="flex flex-col sm:flex-row justify-between mb-4">
                <SearchBar onTitlesFetched={handleTitlesFetched} onSearch={handleSearch} />
                <Genre onGenresSelected={handleGenresSelected} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 pl-6 pr-28 gap-y-4 gap-x-20">
                {films.map((film) => (
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