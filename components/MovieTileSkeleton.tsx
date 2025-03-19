// components/HomeLoadingSkelly.tsx
import Image from 'next/image';
import placeholder from '@/assets/placeholder.svg';

const MovieTileSkeleton = () => {
	return (
	  <div className="animate-pulse">
		<div className="rounded-lg border border-lumi-teal overflow-hidden shadow-md relative">
		<Image
            src={placeholder}
            alt="Placeholder"
            width={100}
            height={100}
			className="w-full"
          />
		</div>
	  </div>
	);
  };
  
  export default MovieTileSkeleton;