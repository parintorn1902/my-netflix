import DeviceHelper from "@utils/DeviceHelper";
import ImageHelper from "@utils/ImageHelper";
import tw from "@utils/Tailwind";
import Image from "next/image";
import { useRef, useState } from "react";

const imageBaseUrl = `https://${process.env.IMAGE_DOMAIN}/t/p/w400`;

function MovieItem({ movie, isFirstChild = false, itemIndex, onMouseEnter }) {
  const [timeStamp, setTimeStamp] = useState(0);
  const itemRef = useRef();
  const timeStampRef = useRef(timeStamp);
  timeStampRef.current = timeStamp;
  const imagePath = movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path;

  const handleMouseEnter = (e) => {
    setTimeStamp(1);
    if (!DeviceHelper.isTouchDevice()) {
      setTimeout(() => {
        if (timeStampRef.current) {
          onMouseEnter({
            col: itemIndex,
            targetData: movie,
            targetRef: e.target,
            isTouch: false,
          });
        }
      }, 400);
    }
  };

  const handleMouseOut = () => {
    setTimeStamp(0);
  };

  const handlePress = (e) => {
    if (DeviceHelper.isTouchDevice()) {
      onMouseEnter({
        col: itemIndex,
        targetData: movie,
        targetRef: e.target,
        isTouch: true,
      });
    }
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
      onClick={handlePress}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
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
