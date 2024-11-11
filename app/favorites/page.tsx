// app/favorites/page.tsx
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

const Favorites: React.FC = () => {
    const [films, setFilms] = useState<Film[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 6;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`/api/favorites?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                const data = await response.json();
                setFilms(data.favorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, [currentPage]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
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
    );
};

export default Favorites;