import { ChevronRightIcon } from '@heroicons/react/outline';
import tw from '@utils/Tailwind';
import Image from 'next/image';

const imageBaseUrl = "https://image.tmdb.org/t/p/w400";

function MovieItem({ movie, isLastChildInScreen = false, onLastChildInScreenClick }) {
  const imagePath = movie.backdrop_path ? movie.backdrop_path : movie.poster_path;
  return (
    <div
      className={tw(
        "relative inline-block",
        "w-[15.2vw] mr-[5px] h-[9vw]",
        'rounded-md overflow-hidden'
      )}
    >
      <Image
        // className="w-[100%]"
        src={imageBaseUrl + imagePath}
        alt={movie.name}
        layout="fill"
        objectFit="cover"
      />
      {
        isLastChildInScreen && (
          <div
            className={tw(
              "absolute w-full h-full",
              "transition duration-300",
              "bg-[#00000030] hover:bg-[#00000080]",
              "opacity-0 group-hover:opacity-100",
              "cursor-pointer"
            )}
            onClick={onLastChildInScreenClick}
          >
            <ChevronRightIcon className="text-white" width={40} height="100%" />
          </div>
        )
      }
    </div>
  )
}

export default MovieItem
