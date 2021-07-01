import tw from '@utils/Tailwind';
import Image from 'next/image';
import { useState } from 'react';

const imageBaseUrl = "https://image.tmdb.org/t/p/w400";

function MovieItem({ movie, isFirstChild = false }) {

  const [showSkeleton, setShowSkeleton] = useState(true);
  const imagePath = movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path;

  const handleImageLoaded = async ({ target }) => {
    setShowSkeleton(false);
  }

  const handleImageError = () => {
    setShowSkeleton(true);
  }

  return (
    <div
      className={tw(
        "group relative inline-block",
        "w-[15.2vw] mr-[5px] h-[9vw]",
        "rounded-md overflow-hidden",
        "transform transition duration-300",
        isFirstChild ? "ml-[3.2vw]": ""
      )}
    >
      <Image
        src={imageBaseUrl + imagePath}
        alt={movie?.name}
        layout="fill"
        objectFit="cover"
        onLoad={handleImageLoaded}
        onError={handleImageError}
      />
      <div
        className={tw(
          "absolute w-full h-full bg-[gray] z-10",
          "animate-image-loading transition duration-300",
          (showSkeleton ? "visible" : "hidden")
        )}
      />
    </div>
  )
}

export default MovieItem