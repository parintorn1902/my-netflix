import Service from "@app/core/Service";
import tw from "@utils/Tailwind";
import { createRef, useEffect, useState } from "react"
import MovieItem from "./MovieItem";

function MovieRow({ title, fetchUrl }) {

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(6);

  const rowRef = createRef();

  useEffect(() => {

    const fetchMovies = async () => {
      const fetchResponse = await Service.get(fetchUrl);
      // console.log(`${title} :`, fetchResponse.results)
      setMovies(fetchResponse.results);
    }

    fetchMovies();

  }, [fetchUrl]);

  const handleLastChildInScreenClick = () => {
    let nextTargetIndex = (currentPage * sizePerPage);
    let nextTargetElement = rowRef.current.children[nextTargetIndex];
    if (nextTargetElement) {
      rowRef.current.scrollLeft = nextTargetElement.offsetLeft;
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div
      className={tw(
        "flex flex-col",
        "py-[2em]"
      )}
    >
      <div
        className={tw(
          "text-[1.3em] text-white font-bold",
          "mb-[.5em] z-10"
        )}
      >
        {title}
      </div>
      <div
        id="movie-slide"
        ref={rowRef}
        className={tw(
          "group relative",
          "whitespace-nowrap w-full",
          "overflow-y-hidden overflow-x-scroll scrollbar-hide"
        )}
      >
        {
          movies.map((item, index) => {
            const isLastChildInScreen = (index === (currentPage * sizePerPage)); 
            return (
              <MovieItem
                key={item.id}
                movie={item}
                isLastChildInScreen={isLastChildInScreen}
                onLastChildInScreenClick={handleLastChildInScreenClick}
              />
            )
          })
        }
      </div>

    </div>
  )
}

export default MovieRow
