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
  onWatchLaterToggle, // Receive the prop
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        console.log("Fetching favorite and watch later status...");
        const response = await fetch("/api/favorites");
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        const favorites: Favorite[] = data.favorites;

        const isFavorited = favorites.some((favorite) => favorite.id === id);
        setIsFavorited(isFavorited);

        // Fetch watch later status
        const watchLaterResponse = await fetch("/api/watchlater");
        if (!watchLaterResponse.ok) {
          throw new Error(
            `API request failed with status ${watchLaterResponse.status}`
          );
        }
        const watchLaterData = await watchLaterResponse.json();
        const watchLaterItems: WatchLater[] = watchLaterData.watchLater;

        const isWatchLater = watchLaterItems.some((item) => item.id === id);
        setIsWatchLater(isWatchLater);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [id]);

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
    console.log("Toggling watch later, current state:", isWatchLater);
    try {
      const response = await fetch(`/api/watchlater/${id}`, {
        method: isWatchLater ? "DELETE" : "POST",
      });

      console.log("API response:", response);
      if (!response.ok) {
        const errorMessage = `API request failed with status ${response.status}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      setIsWatchLater(!isWatchLater);
      console.log("Watch later state updated:", !isWatchLater);
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
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 text-white p-2 text-sm">
          <div className="flex justify-between items-center">
            <div>
              {title} ({released})
            </div>
          </div>
          <div className="mt-1">{synopsis}</div>
          <div className="mt-1">Genre: {genre}</div>
        </div>
      )}
    </div>
  );
};

export default MovieTile;