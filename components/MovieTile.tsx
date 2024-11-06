"use client";

import Image from "next/image";

interface MovieTileProps {
  title: string;
  coverArtUrl: string; 
}

const MovieTile: React.FC<MovieTileProps> = ({ title, coverArtUrl }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <Image
        src={coverArtUrl}
        alt={`${title} cover art`}
        width={200} 
        height={300} 
        className="w-full" 
      />
      <div className="p-2">
        <p className="font-semibold text-gray-800">{title}</p>
        {/* You can add more details like year, rating, etc. here */}
      </div>
    </div>
  );
};

export default MovieTile;