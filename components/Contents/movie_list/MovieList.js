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
import Service from "@app/core/Service";
import APIConstant from "@constants/APIConstant";

const imageBaseUrl = `https://${process.env.IMAGE_DOMAIN}/t/p/w400`;

function MovieList({ profileData }) {
  const [loading, setLoading] = useState(false);
  const [popItem, setPopItem] = useState(null);
  const [popVideo, setPopVideo] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);

  useEffect(() => {
    if (profileData?.isLocked) {
      // do nothing
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }

    if (profileData) {
      fetchMovieGenres();
      fetchTvGenres();
    }
  }, [profileData]);

  useEffect(() => {
    if (popItem) {
      console.log("Pop", popItem);
      fetchPopVideos();
    }
  }, [popItem]);

  const fetchPopVideos = async () => {
    try {
      const fetchMovieVideos = async () => {
        try {
          const response = await Service.get(APIConstant.URL.MOVIE_VIDEOS(popItem.targetData.id));
          if (response.success) {
            return response.data.results;
          } else {
            return [];
          }
        } catch (error) {
          return [];
        }
      };

      const fetchTvVideos = async () => {
        try {
          const response = await Service.get(APIConstant.URL.TV_VIDEOS(popItem.targetData.id));
          if (response.success) {
            return response.data.results.flat();
          } else {
            return [];
          }
        } catch (error) {
          return [];
        }
      };

      const rawFetchList = await Promise.all([fetchMovieVideos(), fetchTvVideos()]);
      const foundVideos = rawFetchList.reduce((result, item) => result.concat(item), []);

      if (foundVideos.length > 0) {
        const filterYoutubeVideos = foundVideos.filter(
          (item) => item.site.toLowerCase() === "youtube"
        );
        setPopVideo(filterYoutubeVideos[0]);
      } else {
        setPopVideo({ key: "Amq-qlqbjYA" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieGenres = async () => {
    try {
      const fetchResponse = await Service.get(APIConstant.URL.MOVIE_GENRES);
      if (fetchResponse.success) {
        const genres = fetchResponse.data.genres || [];
        const convertGenres = genres.map((item) => ({
          ...item,
          name: item.name.split("&")[0],
        }));
        setMovieGenres(convertGenres);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTvGenres = async () => {
    try {
      const fetchResponse = await Service.get(APIConstant.URL.TV_GENRES);
      if (fetchResponse.success) {
        const genres = fetchResponse.data.genres || [];
        const convertGenres = genres.map((item) => ({
          ...item,
          name: item.name.split("&")[0],
        }));
        setTvGenres(convertGenres);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = (data) => {
    const { y } = data.targetRef.getBoundingClientRect();
    let popHeight = 0.22 * window.innerWidth < 240 ? 240 : 0.22 * window.innerWidth;
    if (y + 68 - popHeight / 2 < 0) {
      return;
    }
    setPopItem(data);
    // setTimeout(() => {
    //   setPopItem(data);
    // }, 200);
  };

  const handleMouseLeave = () => {
    setPopItem(null);
    setPopVideo(null);
  };

  const getPopY = (popItem) => {
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

  const getPopX = (overItem) => {
    const { x, width } = overItem.targetRef.getBoundingClientRect();
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
          {popItem && (
            <div
              className={tw(
                "absolute left-0 top-[-5vw] cursor-pointer",
                popItem?.col === 0 ? "transform-origin-left" : "",
                "rounded-md overflow-hidden",
                "animate-pop-in border-[0.2px] border-[#121212]",
                "z-[1000] w-[22vw] h-[22vw] bg-[#141414] shadow-lg",
                "min-w-[240px] min-h-[240px]"
              )}
              onMouseLeave={handleMouseLeave}
              style={{
                top: `${getPopY(popItem)}px`,
                left: `${getPopX(popItem)}px`,
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
                <div className="flex flex-row items-center mt-[.75vw]">
                  <span className="text-[#5ddc62] font-bold">98% Match</span>
                  <span className="border-[1px] border-gray-500 px-[.5vw] ml-[.75vw] text-[#eee] font-semibold">
                    16+
                  </span>
                </div>
                <div className="flex flex-row flex-wrap mt-[0.8vw] xl:mt-[0.4rem] lg:mt-1">
                  {popItem?.targetData?.genre_ids?.map((id, index) => {
                    const movieGenreName = movieGenres.find((item) => item.id === id)?.name;
                    const tvGenreName = tvGenres.find((item) => item.id === id)?.name;

                    if (index > 2) {
                      return null;
                    }

                    if (movieGenreName || tvGenreName) {
                      return (
                        <div className="flex flex-row" key={"genre_" + id}>
                          {index > 0 && (
                            <div className="flex items-center justify-center mx-2">
                              <div className="w-[0.3rem] h-[0.3rem] bg-gray-500 rounded-full" />
                            </div>
                          )}
                          <span className="text-white">{movieGenreName || tvGenreName}</span>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
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

const popupIconClasses = "w-[1.5vw] xl:w-[18px]";

const WrapIcon = (props) => {
  return (
    <span className="flex items-center justify-center border-2 border-gray-500 rounded-full w-[2.2vw] h-[2.2vw] lg:w-[30px] lg:h-[30px]">
      {props.children}
    </span>
  );
};
