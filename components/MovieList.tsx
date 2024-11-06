import { MovieCard } from "./MovieCard";

interface Movie {
    id: string;
    title: string;
    synopsis: string;
    released: number;
    genre: string;
    favorited?: boolean;
    watchLater?: boolean;
    image: string;
}

interface MovieListProps {
    movieList: Movie[];
}

export default function MovieList({ movieList }: MovieListProps) {
  return (
    <div className="grid grid-cols-3 gap-x-32 gap-y-4 mb-3">
        {movieList ? (
            movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))
        ) : (
            <h2 className="text-white text-2xl">No titles found.</h2>
        )}
    </div>
  );
}