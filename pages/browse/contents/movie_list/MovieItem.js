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
    await ThreadHelper.sleep(75);
    setZIndex("");
  }

  return (
    <div
      className={tw(
        "relative inline-block movie-item",
        "w-[15.2vw] mr-[5px] h-[9vw]",
        "rounded-md overflow-hidden cursor-pointer",
        isFirstChild ? "ml-[3.2vw]" : "",
        "transform transition duration-300",
        zIndex,
        "hover:scale-125"
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
          "absolute flex flex-col justify-end px-[1vw] py-[.5vw] w-full h-full",
          "bg-[#00000080] text-white",
          "transform transition duration-300 delay-75",
          isMouseOver ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="whitespace-pre-wrap text-[1vw] font-bold">{movie?.name || movie?.title}</span>
        <span className="whitespace-pre-wrap text-[.75vw] line-clamp-2">
          {movie?.overview}
        </span>
      </div>
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