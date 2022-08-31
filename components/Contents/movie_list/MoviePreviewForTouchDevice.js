import React, { useEffect } from "react";
import Image from "next/image";
import ImageHelper from "@utils/ImageHelper";
import {
  ChevronDownIcon,
  PlayIcon,
  PlusIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  XIcon,
} from "@heroicons/react/solid";
import tw from "@utils/Tailwind";
import NumberHelper from "@utils/NumberHelper";

const imageBaseUrl = `https://${process.env.IMAGE_DOMAIN}/t/p/w400`;

function MoviePreviewForTouchDevice({ popItem, popVideo, popCredits, mediaGenres, onMouseLeave }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed w-full h-[100vh] left-0 top-0 p-4 bg-[#141414dd] z-[1000] overflow-y-auto">
      <div
        className={tw(
          "relative animate-pop-in rounded-md",
          "border-[0.2px] border-[#121212]",
          "w-full min-h-full h-auto bg-[#141414] shadow-lg"
        )}
      >
        <div
          className={tw(
            "absolute -top-4 -right-4 w-10 h-10 p-2",
            "bg-[#ddd] z-[1001] rounded-full"
          )}
          onClick={onMouseLeave}
        >
          <XIcon className="text-[#555]" />
        </div>
        <div className="w-full h-[40vh] md:h-[250px] relative">
          {popVideo ? (
            <iframe
              className="absolute w-full h-full top-0 left-0 z-10"
              src={`https://www.youtube.com/embed/${popVideo.key}?controls=0&autoplay=1&modestbranding=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; modestbranding; encrypted-media;"
              allowFullScreen
            ></iframe>
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
        <div className="w-full min-h-[60vh] h-auto p-3 text-base">
          <div className="flex flex-row items-center space-x-2 lg:space-x-1">
            <WrapIcon>
              <PlayIcon className={popupIconClasses} />
            </WrapIcon>
            <WrapIcon>
              <PlusIcon className={popupIconClasses} />
            </WrapIcon>
            <WrapIcon>
              <ThumbUpIcon className={popupIconClasses} />
            </WrapIcon>
            <WrapIcon>
              <ThumbDownIcon className={popupIconClasses} />
            </WrapIcon>
            <div className="flex flex-1" />
            <WrapIcon>
              <ChevronDownIcon className={popupIconClasses} />
            </WrapIcon>
          </div>
          <div className="flex flex-row items-center mt-2">
            <span className="text-[#5ddc62] font-bold">{NumberHelper.random(80, 100)}% Match</span>
            <span className="border-[1px] border-gray-500 px-2 ml-2 text-[#eee] font-semibold">
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
          <div className="mt-2">{popItem.targetData.overview}</div>
          <div className="mt-2 text-white">
            Released on {popItem.targetData.release_date || popItem.targetData.first_air_date}
          </div>
          <div className="mt-2 text-white">
            <span className="text-[#808080] mr-2">Cast:</span>
            {popCredits?.cast?.map((item, index) => {
              return (
                <span className="mr-1" key={"cast_" + index}>
                  {index === popCredits?.cast?.length - 1 ? item.name : `${item.name},`}
                </span>
              );
            })}
          </div>
          <div className="mt-2 text-white">
            <span className="text-[#808080] mr-2">Crew:</span>
            {popCredits?.crew?.map((item, index) => {
              return (
                <span className="mr-1" key={"crew_" + index}>
                  {index === popCredits?.crew?.length - 1 ? item.name : `${item.name},`}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePreviewForTouchDevice;

const popupIconClasses = "w-7";

const WrapIcon = (props) => {
  return (
    <span className="flex items-center justify-center border-2 border-gray-500 rounded-full w-10 h-10">
      {props.children}
    </span>
  );
};
