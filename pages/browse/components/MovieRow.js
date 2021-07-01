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
    console.log("currentPage", currentPage)
    console.log("sizePerPage", sizePerPage)

    console.log("movies.length", movies.length)
    let nextTargetIndex = (currentPage * sizePerPage);
    if (nextTargetIndex > movies.length) {
      nextTargetIndex = (currentPage - 1) * sizePerPage;
    }

    console.log("nextTargetIndex", nextTargetIndex)

    let nextTargetElement = rowRef.current.children[nextTargetIndex];
    if (nextTargetElement) {
      console.log("nextTargetElement", nextTargetElement);
      console.log("dff ele", rowRef.current.children[nextTargetIndex - sizePerPage]);
      let paddingLeft = (currentPage - 1 > 1 ? rowRef.current.children[0].offsetLeft : 0);
      let diffElement = currentPage - 1 > 1 ? rowRef.current.children[nextTargetIndex - sizePerPage] : null;
      let diffValue = diffElement ? diffElement.offsetLeft - paddingLeft : 0;
      rowRef.current.scrollLeft -= nextTargetElement.offsetLeft - diffValue - paddingLeft;
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPageClick = () => {
    // setScrollPosition(-90 * currentPage);
    // rowRef.current.classList.add("translate-x-[-calc(100% - 3.2vw)]");
    return;
    let nextTargetIndex = (currentPage * sizePerPage);
    let nextTargetElement = rowRef.current.children[nextTargetIndex];
    if (nextTargetElement) {
      let paddingLeft = rowRef.current.children[0].offsetLeft;
      rowRef.current.scrollLeft = nextTargetElement.offsetLeft - paddingLeft;
      setCurrentPage(currentPage + 1);
    }
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
          "first:ml-[20px]",
          "transform transition duration-1000"
        )}
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
