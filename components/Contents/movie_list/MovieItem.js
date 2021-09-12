import ImageHelper from "@utils/ImageHelper";
import tw from "@utils/Tailwind";
import ThreadHelper from "@utils/ThreadHelper";
import Image from "next/image";
import { useState } from "react";

const imageBaseUrl = `https://${process.env.IMAGE_DOMAIN}/t/p/w400`;

function MovieItem({ movie, isFirstChild = false }) {
  const [zIndex, setZIndex] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);

  const imagePath = movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path;

  const handleMouseOver = () => {
    setZIndex("z-[100]");
    setIsMouseOver(true);
  };

  const handleMouseOut = async () => {
    setIsMouseOver(false);
    await ThreadHelper.sleep(75);
    setZIndex("");
  };

  return (
    <div
      className={tw(
        "relative",
        "min-w-[15.2vw] mr-[5px] min-h-[9vw]",
        "lg:min-w-[175px] lg:min-h-[96px]",
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
        placeholder="blur"
        blurDataURL={ImageHelper.getBlurDataUrl("100%", "100%")}
      />
      <div
        className={tw(
          "absolute flex flex-col justify-end px-[1vw] py-[.5vw] w-full h-full",
          "bg-[#00000080] text-white",
          "transform transition duration-300 delay-75",
          isMouseOver ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="whitespace-pre-wrap text-[1vw] lg:text-[14px] font-bold">
          {movie?.name || movie?.title}
        </span>
        <span className="whitespace-pre-wrap text-[.75vw] lg:text-[12px] line-clamp-2">
          {movie?.overview}
        </span>
      </div>
    </div>
  );
}

export default MovieItem;
