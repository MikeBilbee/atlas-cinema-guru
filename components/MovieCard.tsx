import Link from "next/link";
import StarOutline from "@/assets/icons/staroutline.svg";
import StarFull from "@/assets/icons/starfull.svg";
import ClockOutline from "@/assets/icons/clockoutline.svg";
import ClockFull from "@/assets/icons/clockfull.svg";
import Image from "next/image";

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

type MovieProps = {
    movie: Movie;
};

export function MovieCard({ movie }: MovieProps) {
  return (
    <div className="relative group  shadow-lg w-full border-2 border-teal rounded-2xl flex justify-center">
      <img src={movie.image} alt={movie.title} className="size-96 rounded-2xl" />

      {/* Overlay */}
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
        <button>
            <Image
              src={StarFull.src}
              alt="Favorites Icon"
              width={30}
              height={30}
              className="object-cover transition-transform duration-200 transform group-hover:scale-105"
            />
        </button>
        <button>
            <Image
              src={ClockFull.src}
              alt="Watch Later Icon"
              width={30}
              height={30}
              className="object-cover transition-transform duration-200 transform group-hover:scale-105"
            />
        </button>
      </div>
      <div className="rounded-b-2xl absolute bottom-0 left-0 right-0 h-2/5 bg-navy opacity-0 group-hover:opacity-90 transition-opacity duration-200 flex flex-col p-4 text-left">
        <h1 className="text-lg mb-2">
          {movie.title} ({movie.released})
        </h1>
        <p className="mb-3 text-sm">{movie.synopsis}</p>
        <div className="genre rounded-full bg-teal p-2 w-fit gap-2 text-black">{movie.genre}</div>
      </div>
    </div>
  );
}