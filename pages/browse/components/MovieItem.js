import tw from '@utils/Tailwind';
import ThreadHelper from '@utils/ThreadHelper';
import Image from 'next/image';
import { useState } from 'react';

const imageBaseUrl = "https://image.tmdb.org/t/p/w400";

function MovieItem({ movie, isFirstChild = false }) {

  const [showSkeleton, setShowSkeleton] = useState(true);
  const [zIndex, setZIndex] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);

  const imagePath = movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path;

  const handleImageLoaded = async ({ target }) => {
    setShowSkeleton(false);
  }

  const handleImageError = () => {
    setShowSkeleton(true);
  }

  const handleMouseOver = () => {
    setZIndex("z-[100]");
    setIsMouseOver(true);
  }

  const handleMouseOut = async () => {
    setIsMouseOver(false);
    await ThreadHelper.sleep(250);
    setZIndex("");
  }

  return (
    <div
      className={tw(
        "group relative inline-block movie-item",
        "w-[15.2vw] mr-[5px] h-[9vw]",
        "rounded-md overflow-hidden",
        isFirstChild ? "ml-[3.2vw]": "",
        "transform transition duration-300 delay-100",
        zIndex
      )}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <Image
        src={imageBaseUrl + imagePath}
        alt={movie?.name}
        layout="fill"
        objectFit="cover"
        loading="eager"
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