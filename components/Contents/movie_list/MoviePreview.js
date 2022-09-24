import React from "react";
import Image from "next/image";
import ImageHelper from "@utils/ImageHelper";
import tw from "@utils/Tailwind";
import NumberHelper from "@utils/NumberHelper";
import { useState } from "react";
import { useEffect } from "react";
import {
  IconChevronDown,
  IconPlayerPlay,
  IconPlus,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons";

const imageBaseUrl = `https://${process.env.IMAGE_DOMAIN}/t/p/w400`;

function MoviePreview({ popItem, popVideo, mediaGenres, onMouseLeave }) {
  const [randMatching, setRandMatching] = useState(NumberHelper.random(80, 100));

  const getPopY = () => {
    const { y, height } = popItem.targetRef.getBoundingClientRect();
    let popHeight = 0.22 * window.innerWidth < 240 ? 240 : 0.22 * window.innerWidth;
    let heightDiff = popHeight - height;
    let result = window.scrollY + y - heightDiff / 2;
    if (result + popHeight > window.innerHeight) {
      // result = window.innerHeight - 0.032 * window.innerHeight - popHeight;
    } else if (result < 0) {
      // result = window.innerHeight * 0.032;
    }
    return result;
  };

  const getPopX = () => {
    const { x, width } = popItem.targetRef.getBoundingClientRect();
    let popWidth = 0.22 * window.innerWidth < 240 ? 240 : 0.22 * window.innerWidth;
    let widthDiff = popWidth - width;
    let result = window.scrollX + x - widthDiff / 2;
    if (result + popWidth > window.innerWidth - 10) {
      result = window.innerWidth - 0.032 * window.innerHeight - popWidth;
    } else if (result < 0) {
      result = window.innerWidth * 0.032;
    }
    return result;
  };

  useEffect(() => {
    setRandMatching(NumberHelper.random(80, 100));
  }, [popItem]);

  return (
    <div
      className={tw(
        "absolute left-0 top-[-5vw] cursor-pointer",
        popItem?.col === 0 ? "transform-origin-left" : "",
        "rounded-md overflow-hidden",
        "animate-pop-in border-[0.2px] border-[#121212]",
        "z-[1000] w-[22vw] h-[22vw] bg-[#141414] shadow-lg",
        "min-w-[240px] min-h-[240px]"
      )}
      onMouseLeave={onMouseLeave}
      style={{
        top: `${getPopY()}px`,
        left: `${getPopX()}px`,
      }}
    >
      <div className="w-full h-[13vw] min-h-[150px] relative">
        {popVideo ? (
          <iframe
            className="absolute w-full h-full top-0 left-0"
            src={`https://www.youtube.com/embed/${popVideo.key}?controls=0&autoplay=1&modestbranding=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; modestbranding; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image
            className="object-fill w-full h-full"
            src={
              imageBaseUrl +
              (popItem?.targetData?.backdrop_path || popItem?.targetData?.poster_path)
            }
            alt={popItem?.targetData?.name}
            layout="fill"
            objectFit="cover"
            loading="eager"
            placeholder="blur"
            blurDataURL={ImageHelper.getBlurDataUrl("100%", "100%")}
          />
        )}
      </div>
      <div className="w-full h-full p-[1vw] text-[1vw] lg:text-[0.8rem]">
        <div className="flex flex-row items-center space-x-2 lg:space-x-1">
          <WrapIcon>
            <IconPlayerPlay className={popupIconClasses} />
          </WrapIcon>
          <WrapIcon>
            <IconPlus className={popupIconClasses} />
          </WrapIcon>
          <WrapIcon>
            <IconThumbUp className={popupIconClasses} />
          </WrapIcon>
          <WrapIcon>
            <IconThumbDown className={popupIconClasses} />
          </WrapIcon>
          <div className="flex flex-1" />
          <WrapIcon>
            <IconChevronDown className={popupIconClasses} />
          </WrapIcon>
        </div>
        <div className="flex flex-row items-center mt-[.75vw]">
          <span className="text-[#5ddc62] font-bold">{randMatching}% Match</span>
          <span className="border-[1px] border-gray-500 px-[.5vw] ml-[.75vw] text-[#eee] font-semibold">
            16+
          </span>
        </div>
        <div className="flex flex-row flex-wrap mt-[0.8vw] xl:mt-[0.4rem] lg:mt-1">
          {popItem?.targetData?.genre_ids?.map((id, index) => {
            const genreName = mediaGenres.find((item) => item.id === id)?.name;

            if (index > 2) {
              return null;
            }

            if (genreName) {
              return (
                <div className="flex flex-row" key={"genre_" + id}>
                  {index > 0 && (
                    <div className="flex items-center justify-center mx-2">
                      <div className="w-[0.3rem] h-[0.3rem] bg-gray-500 rounded-full" />
                    </div>
                  )}
                  <span className="text-white">{genreName}</span>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default MoviePreview;

const popupIconClasses = "text-gray-500 w-[1.5vw] xl:w-[18px]";

const WrapIcon = (props) => {
  return (
    <span className="flex items-center justify-center border-2 border-gray-500 rounded-full w-[2.2vw] h-[2.2vw] lg:w-[30px] lg:h-[30px]">
      {props.children}
    </span>
  );
};
