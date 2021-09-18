import Service from "@app/core/Service";
import APIConstant from "@constants/APIConstant";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import ImageHelper from "@utils/ImageHelper";
import tw from "@utils/Tailwind";
import Image from "next/image";
import { useEffect, useState } from "react";

const imageBaseUrl = `https://${process.env.IMAGE_DOMAIN}/t/p/original`;

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      let fetchResponse = await Service.get(APIConstant.URL.NEXTFLEX_ORIGINALS);
      if (fetchResponse.success) {
        let results = fetchResponse.data.results;
        let randomBanner = results[Math.floor(Math.random() * results.length - 1)];
        // console.log("banner movie", randomBanner);
        if (randomBanner) {
          setMovie(randomBanner);
        } else {
          setMovie(results[0]);
        }
      }
    };

    fetchMovie();
  }, []);

  return (
    <header className={tw("flex flex-col justify-end", "h-[38vw] w-full md:mt-[70px] z-[-1]")}>
      <div className={tw("absolute top-0 left-0", "w-full h-[56.25vw]")}>
        <Image
          src={imageBaseUrl + movie?.backdrop_path}
          layout="fill"
          placeholder="blur"
          blurDataURL={ImageHelper.getBlurDataUrl("100%", "100%")}
          loading="eager"
          // quality={65}
          priority
        />
        <div
          className={tw(
            "absolute bottom-0",
            "h-[5vw] w-full",
            "bg-gradient-to-t from-[#141414] to-transparent"
          )}
        />
      </div>
      <div className="text-white pl-[3.2vw] z-20 pb-[3vw]">
        <h1 className={tw("text-[3.5vw] lg:text-[16px] lg:font-bold leading-none", "max-w-lg")}>
          {movie?.name}
        </h1>
        <span className="max-w-lg line-clamp-3 mt-[2vw] pr-[10px] xl:text-[14px]">
          {movie?.overview}
        </span>
        <div className="flex flex-row mt-[2vw] space-x-[1vw]">
          <span
            className={tw(
              "flex flex-row w-[fit-content] lg:h-8",
              "py-[.5vw] px-[1.5vw] xl:px-[15px] xl:py-[5px]",
              "bg-white rounded-md cursor-pointer",
              "text-black text-[1.2vw] xl:text-[14px] font-bold",
              "hover:bg-[#d1cac7]"
            )}
          >
            <PlayIcon className="w-[1.8vw] xl:w-[18px]" />
            <span className="ml-[.7vw]">Play</span>
          </span>
          <a
            className={tw(
              "flex flex-row w-[fit-content] lg:h-8",
              "py-[.5vw] px-[1.5vw] xl:px-[15px] xl:py-[5px]",
              "bg-[#6d6d6eb3] rounded-md cursor-pointer",
              "text-white text-[1.2vw] xl:text-[14px] font-bold",
              "hover:bg-[#6d6d6e80]"
            )}
          >
            <InformationCircleIcon className="w-[1.8vw] xl:w-[18px]" />
            <span className="ml-[.7vw]">More Info</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Banner;
