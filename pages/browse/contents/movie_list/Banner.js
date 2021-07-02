import Service from "@app/core/Service";
import APIConstant from "@constants/APIConstant";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import tw from "@utils/Tailwind";
import { useEffect, useState } from "react";

function Banner() {

  const [movie, setMovie] = useState(null);

  useEffect(() => {

    const fetchMovie = async () => {
      let fetchResponse = await Service.get(APIConstant.URL.NEXTFLEX_ORIGINALS);
      let randomBanner = fetchResponse.results[Math.floor(Math.random() * fetchResponse.results.length - 1)];
      // console.log("banner movie", randomBanner);
      if(randomBanner) {
        setMovie(randomBanner);
      } else {
        setMovie(fetchResponse.results[0]);
      }
    }

    fetchMovie();

  }, []);

  return (
    <header
      className={tw(
        "flex flex-col justify-end",
        "h-[38vw] w-full"
      )}
    >
      <div
        className="absolute top-0 left-0 w-full h-[56.25vw]"
        style={
          movie && {
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
          }
        }
      >
        <div className="absolute bottom-0 bg-gradient-to-t from-[#141414] to-transparent h-[5vw] w-full" />
      </div>
      <div className="text-white pl-[3.2vw] z-20 pb-[3vw]">
        <h1
          className={tw(
            "text-[3.5vw] leading-none",
            "max-w-lg"
          )}
        >
          {movie?.name}
        </h1>
        <span className="max-w-lg line-clamp-3 mt-[2vw]">
          {movie?.overview}
        </span>
        <div className="flex flex-row mt-[2vw] space-x-[1vw]">
          <span
            className={tw(
              "flex flex-row w-[fit-content]",
              "py-[.5vw] px-[1.5vw]",
              "bg-white rounded-md cursor-pointer",
              "text-black text-[1.2vw] font-bold",
              "hover:bg-[#d1cac7]"
            )}
          >
            <PlayIcon width="1.8vw" />
            <span className="ml-[.7vw]">Play</span>
          </span>
          <a
            className={tw(
              "flex flex-row w-[fit-content]",
              "py-[.5vw] px-[1.5vw]",
              "bg-[#6d6d6eb3] rounded-md cursor-pointer",
              "text-white text-[1.2vw] font-bold",
              "hover:bg-[#6d6d6e80]"
            )}
          >
            <InformationCircleIcon width="1.8vw" />
            <span className="ml-[.7vw]">More Info</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Banner
