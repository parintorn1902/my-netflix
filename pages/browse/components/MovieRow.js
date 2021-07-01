import Service from "@app/core/Service";
import tw from "@utils/Tailwind";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { createRef, useEffect, useState } from "react"
import MovieItem from "./MovieItem";

function MovieRow({ title, fetchUrl }) {

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(6);
  const [scrollPosition, setScrollPosition] = useState(0);

  const rowRef = createRef();

  useEffect(() => {

    const fetchMovies = async () => {
      const fetchResponse = await Service.get(fetchUrl);
      console.log(`${title} :`, fetchResponse.results)
      let filterMoviesThatHasImage = fetchResponse.results.filter(item => item.backdrop_path || item.poster_path);
      setMovies(filterMoviesThatHasImage);
    }

    fetchMovies();

  }, [fetchUrl]);

  const handlePreviousPageClick = () => {
    let child = rowRef.current.children[0];
    let childWidth = child.offsetWidth;
    let previousPage = currentPage - 2;
    let diff = (5 * sizePerPage * previousPage);
    let calScrollPosition = -Math.abs(previousPage * childWidth * sizePerPage + diff);
    setScrollPosition(calScrollPosition);
    setCurrentPage(currentPage - 1);
  }

  const handleNextPageClick = () => {
    let child = rowRef.current.children[0];
    let childWidth = child.offsetWidth;
    let diff = (5 * sizePerPage * currentPage);
    let nextTargetIndex = (currentPage * sizePerPage);
    let calScrollPosition = -Math.abs(childWidth * nextTargetIndex + diff);
    setScrollPosition(calScrollPosition);
    setCurrentPage(currentPage + 1);
  }

  return (
    <div
      className={tw(
        "group flex flex-col relative",
        "py-[2em]"
      )}
    >
      <div
        className={tw(
          "text-[1.3em] text-white font-bold",
          "mb-[.5em] z-10 ml-[3.2vw]"
        )}
      >
        {title}
      </div>
      <div
        ref={rowRef}
        className={tw(
          "group relative movie-row",
          "whitespace-nowrap w-full h-[9vw]",
          "scrollbar-hide",
          "transform transition duration-1000"
        )}
        style={{
          transform: `translateX(${scrollPosition}px)`
        }}
      >
        {
          movies.map((item, index) => (
            <MovieItem
              key={item.id}
              movie={item}
              isFirstChild={index === 0}
            />
          ))
        }
      </div>
      {/** Control slide */}
      {
        currentPage > 1 && (
          <div
            className={
              tw(
                "absolute left-0 bottom-[2em] w-[3.2vw] h-[9vw]",
                "flex items-center justify-center",
                "transition duration-300",
                "bg-[#00000030] hover:bg-[#00000080]",
                "opacity-0 group-hover:opacity-100",
                "cursor-pointer"
              )}
            onClick={handlePreviousPageClick}
          >
            <ChevronLeftIcon className="text-white" width={40} height="100%" />
          </div>
        )
      }
      {
        ((currentPage * sizePerPage) <= movies.length) && (
          <div
            className={
              tw(
                "absolute right-0 bottom-[2em] w-[3.2vw] h-[9vw]",
                "flex items-center justify-center",
                "transition duration-300",
                "bg-[#00000030] hover:bg-[#00000080]",
                "opacity-0 group-hover:opacity-100",
                "cursor-pointer"
              )}
            onClick={handleNextPageClick}
          >
            <ChevronRightIcon className="text-white" width={40} height="100%" />
          </div>
        )
      }

    </div>
  )
}

export default MovieRow
