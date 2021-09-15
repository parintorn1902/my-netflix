import ImageHelper from "@utils/ImageHelper";
import tw from "@utils/Tailwind";
import Image from "next/image";
import { useRef } from "react";

const imageBaseUrl = `https://${process.env.IMAGE_DOMAIN}/t/p/w400`;

function MovieItem({ movie, isFirstChild = false, itemIndex, onMouseEnter }) {
  const itemRef = useRef();
  const imagePath = movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path;

  const handleMouseOver = (e) => {
    onMouseEnter(movie, itemIndex, e.target);
  };

  return (
    <div
      itemRef={itemRef}
      className={tw(
        "w-[15.2vw] mr-[5px] h-[9vw]",
        "lg:min-w-[175px] lg:min-h-[96px]",
        "rounded-md overflow-hidden cursor-pointer",
        isFirstChild ? "ml-[3.2vw]" : ""
      )}
      onMouseEnter={handleMouseOver}
    >
      <div
        className={tw(
          "relative w-full mr-[5px] h-[9vw]",
          "lg:min-w-[175px] lg:min-h-[96px] bg-[gray]"
        )}
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
      </div>
    </div>
  );
}

export default MovieItem;
