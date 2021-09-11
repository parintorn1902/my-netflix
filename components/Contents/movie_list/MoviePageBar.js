import tw from "@utils/Tailwind"

function MoviePageBar({ currentPage, pageSize = 0 }) {
  return (
    <div
      className={tw(
        "opacity-0 group-hover:opacity-100",
        "flex flex-row justify-end items-center",
        "mr-[3.2vw] top-[0px]",
        "h-[1.5vw] lg:h-[16px] space-x-[5px]",
        "transform transition duration-300"
      )}
    >
      {
        Array.from(new Array(pageSize)).map((number, index) => (
          <div
            key={"MoviePage_" + index}
            className={tw(
              (currentPage - 1) === index ? "bg-white" : "bg-[gray]",
              "h-[2px] w-[12px]"
            )}
          />
        ))
      }
    </div>
  )
}

export default MoviePageBar
