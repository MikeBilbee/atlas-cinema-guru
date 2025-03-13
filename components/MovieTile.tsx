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
}

interface Favorite {
  id: string;
}

interface WatchLater {
  id: string;
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
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const favoriteResponse = await fetch("/api/favorites");
        if (!favoriteResponse.ok) {
          throw new Error(
            `API request failed with status ${favoriteResponse.status}`
          );
        }
        const favoriteData = await favoriteResponse.json();
        const favorites: Favorite[] = favoriteData.favorites;
        const isFavorited = favorites.some((favorite) => favorite.id === id);
        setIsFavorited(isFavorited);

        const watchLaterResponse = await fetch(`/api/watch-later?page=1`);
        if (!watchLaterResponse.ok) {
          throw new Error(
            `API request failed with status ${watchLaterResponse.status}`
          );
        }
        const watchLaterData = await watchLaterResponse.json();
        const watchLaterItems: WatchLater[] = watchLaterData.watchLater;
        const isWatchLater = watchLaterItems.some((watchLater) => watchLater.id === id);
        setIsWatchLater(isWatchLater);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: isFavorited ? "DELETE" : "POST",
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      if (isFavorited) {
        onFavoriteToggle();
      } else {
        setIsFavorited(true);
      }

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

      if (isWatchLater) {
        onWatchLaterToggle();
      } else {
        setIsWatchLater(true);
      }

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
          <div className="mt-1"><span className=" px-2 py-1 rounded-full border-2 border-lumi-dark-teal bg-lumi-dark-teal">
            {genre}
          </span></div>
        </div>
      )}
    </div>
  );
};

export default MovieTile;