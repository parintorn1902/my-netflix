import MovieDataList from "@app/master/movies/MovieDataList";
import tw from "@utils/Tailwind";
import { useEffect, useRef, useState } from "react";
import Banner from "./Banner";
import MovieRow from "./MovieRow";
import Image from "next/image";
import ImageHelper from "@utils/ImageHelper";
import {
  ChevronDownIcon,
  PlayIcon,
  PlusIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";

const imageBaseUrl = `https://${process.env.IMAGE_DOMAIN}/t/p/w400`;

function MovieList({ profileData }) {
  const [loading, setLoading] = useState(false);
  const [overItem, setOverItem] = useState(null);

  useEffect(() => {
    if (profileData?.isLocked) {
      // do nothing
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [profileData]);

  useEffect(() => {
    if (overItem) {
      console.log("Enter");
    } else {
      console.log("Leave");
    }
  }, [overItem]);

  const handleMouseEnter = (data) => {
    const { y } = data.targetRef.getBoundingClientRect();
    let popHeight = 0.22 * window.innerWidth < 240 ? 240 : 0.22 * window.innerWidth;
    if (y + 68 - popHeight / 2 < 0) {
      return;
    }
    setTimeout(() => {
      setOverItem(data);
    }, 150);
  };

  const handleMouseLeave = () => {
    console.log("Mouse leave");
    setOverItem(null);
  };

  const getPopY = (overItem) => {
    const { y, height } = overItem.targetRef.getBoundingClientRect();
    let popHeight = 0.22 * window.innerWidth < 240 ? 240 : 0.22 * window.innerWidth;
    let heightDiff = popHeight - height;
    let result = window.scrollY + y - heightDiff / 2;
    if (result + popHeight > window.innerHeight) {
      // result = window.innerHeight - 0.032 * window.innerHeight - popHeight;
    } else if (result < 0) {
      // result = window.innerHeight * 0.032;
    }
    console.log("result y = ", result);
    return result;
  };

  const getPopX = (overItem) => {
    const { x, width } = overItem.targetRef.getBoundingClientRect();
    let popWidth = 0.22 * window.innerWidth < 240 ? 240 : 0.22 * window.innerWidth;
    let widthDiff = popWidth - width;
    let result = window.scrollX + x - widthDiff / 2;
    if (result + popWidth > window.innerWidth) {
      result = window.innerWidth - 0.032 * window.innerHeight - popWidth;
    } else if (result < 0) {
      result = window.innerWidth * 0.032;
    }
    return result;
  };

  const renderContent = () => {
    if (loading) {
      return null;
    } else {
      return (
        <>
          <Banner />
          <div className="my-[3vw] overflow-x-hidden">
            {MovieDataList.map((item, index) => (
              <MovieRow
                title={item.title}
                fetchUrl={item.fetchUrl}
                position={index + 1}
                key={"_movieRow_" + index}
                onMouseEnter={handleMouseEnter}
                rowIndex={index}
              />
            ))}
          </div>
          {overItem && (
            <div
              className={tw(
                "absolute left-0 top-[-5vw] cursor-pointer",
                "rounded-md overflow-hidden",
                "animate-pop-in border-[0.2px] border-[#121212]",
                "z-[1000] w-[22vw] h-[22vw] bg-[#141414] shadow-lg",
                "min-w-[240px] min-h-[240px]"
              )}
              onMouseLeave={handleMouseLeave}
              style={{
                top: `${getPopY(overItem)}px`,
                left: `${getPopX(overItem)}px`,
              }}
            >
              <div className="w-full h-[13vw] min-h-[150px] relative">
                <Image
                  src={
                    imageBaseUrl + (overItem?.movie?.backdrop_path || overItem?.movie?.poster_path)
                  }
                  alt={overItem?.movie?.name}
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={ImageHelper.getBlurDataUrl("100%", "100%")}
                />
                {/* <iframe
                  className="absolute w-full h-full top-0 left-0"
                  src="https://www.youtube.com/embed/Cl2Z_iog0cM?controls=0&autoplay=1&modestbranding=1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; modestbranding; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                /> */}
              </div>
              <div className="w-full h-full p-[1vw]">
                <div className="flex flex-row items-center space-x-2 lg:space-x-1">
                  <WrapIcon>
                    <PlusIcon className={popupIconClasses} />
                  </WrapIcon>
                  <WrapIcon>
                    <ThumbUpIcon className={popupIconClasses} />
                  </WrapIcon>
                  <WrapIcon>
                    <ThumbDownIcon className={popupIconClasses} />
                  </WrapIcon>
                  <WrapIcon>
                    <ChevronDownIcon className={popupIconClasses} />
                  </WrapIcon>
                </div>
                <div className="flex flex-row items-center mt-[.75vw] text-[1.2rem] 2xl:text-[1rem] lg:text-[0.8rem]">
                  <span className="text-[#5ddc62] font-bold">98% Match</span>
                  <span className="border-[1px] border-gray-500 px-[.5vw] py-[.05vw] ml-[.75vw] text-[#eee] font-bold">
                    16+
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return <div className="flex flex-col animate-fade-in">{renderContent()}</div>;
}

export default MovieList;

const popupIconClasses = "w-[1.75vw] xl:w-[18px]";

const WrapIcon = (props) => {
  return (
    <span className="flex items-center justify-center border-2 border-gray-500 rounded-full w-[2.5vw] h-[2.5vw] lg:w-[30px] lg:h-[30px]">
      {props.children}
    </span>
  );
};
