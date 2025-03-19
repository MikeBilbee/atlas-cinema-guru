// components/MovieTile.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ClockFull from "@/assets/clockfull.svg";
import ClockOutline from "@/assets/clockoutline.svg";
import StarFull from "@/assets/starfull.svg";
import StarOutline from "@/assets/staroutline.svg";

interface MovieTileProps {
  title: string;
  coverArtUrl: string;
  released: string;
  synopsis: string;
  genre: string;
  id: string;
  onFavoriteToggle: () => void;
  onWatchLaterToggle: () => void;
  favorited: boolean;
  watchLater: boolean;
  currentPage: number;
}

const MovieTile: React.FC<MovieTileProps> = ({
  title,
  coverArtUrl,
  released,
  synopsis,
  genre,
  id,
  onFavoriteToggle,
  onWatchLaterToggle,
  favorited,
  watchLater,
  currentPage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [isWatchLater, setIsWatchLater] = useState(watchLater);

  useEffect(() => {
    setIsFavorited(favorited);
  }, [favorited]);

  useEffect(() => {
    setIsWatchLater(watchLater);
  }, [watchLater]);

  const toggleFavorite = async () => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: isFavorited ? "DELETE" : "POST",
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      setIsFavorited(!isFavorited);
      onFavoriteToggle();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const toggleWatchLater = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(`/api/watch-later/${id}`, {
        method: isWatchLater ? "DELETE" : "POST",
      });

      if (!response.ok) {
        const errorMessage = `API request failed with status ${response.status}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      setIsWatchLater(!isWatchLater);
      onWatchLaterToggle();
    } catch (error) {
      console.error("Error toggling watch later:", error);
    }
  };

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
          <button onClick={toggleFavorite}>
            <Image
              src={isFavorited ? StarFull : StarOutline}
              alt={
                isFavorited ? "Remove from favorites" : "Add to favorites"
              }
              width={20}
              height={20}
            />
          </button>
          <button onClick={toggleWatchLater}>
            <Image
              src={isWatchLater ? ClockFull : ClockOutline}
              alt={
                isWatchLater ? "Remove from watch later" : "Add to watch later"
              }
              width={20}
              height={20}
            />
          </button>
        </div>
      )}
      {isHovered && (
        <div className="absolute bottom-0 left-0 w-full bg-lumi-light-navy text-white py-4 px-2 text-md">
          <div className="flex justify-between items-center">
            <div>
              {title} ({released})
            </div>
          </div>
          <div className="mt-1 text-sm py-4">{synopsis}</div>
          <div className="mt-1">
            <span className=" px-2 py-1 rounded-full border-2 border-lumi-dark-teal bg-lumi-dark-teal">
              {genre}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTile;