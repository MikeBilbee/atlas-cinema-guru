// components/MovieTile.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import ClockFull from "@/assets/clockfull.svg"
import ClockOutline from "@/assets/clockoutline.svg"
import StarFull from "@/assets/starfull.svg"
import StarOutline from "@/assets/staroutline.svg"
interface MovieTileProps {
  title: string;
  coverArtUrl: string;
  released: string;  // Use "released" instead of "releaseDate"
  synopsis: string;
  genre: string;
}

const MovieTile: React.FC<MovieTileProps> = ({ title, coverArtUrl, released, synopsis, genre }) => { // Use "released"
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false); // State for favorited
  const [isWatchLater, setIsWatchLater] = useState(false); // State for watch later


  return (
    <div
      className="rounded-lg border border-lumi-teal overflow-hidden shadow-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={coverArtUrl}
        alt={`${title} cover art`}
        width={100}
        height={100}
        className="w-full"
      />
	  {isHovered && (
        <div className="absolute top-2 right-2">
          <button onClick={() => setIsFavorited(!isFavorited)}> {/* Toggle favorited */}
            <Image
              src={isFavorited ? StarFull : StarOutline}
              alt={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              width={20}
              height={20}
            />
          </button>
          <button onClick={() => setIsWatchLater(!isWatchLater)}> {/* Toggle watch later */}
            <Image
              src={isWatchLater ? ClockFull : ClockOutline}
              alt={isWatchLater ? 'Remove from watch later' : 'Add to watch later'}
              width={20}
              height={20}
            />
          </button>
        </div>
      )}
      {isHovered && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 text-white p-2 text-sm">
          <div className="flex justify-between items-center">
            <div>{title} ({released})</div> {/* Use "released" here */}
          </div>
          <div className="mt-1">{synopsis}</div>
          <div className="mt-1">Genre: {genre}</div>
        </div>
      )}
    </div>
  );
};

export default MovieTile;