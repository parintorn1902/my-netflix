import tw from "@utils/Tailwind"

function Divider() {
  return (
    <div
      className={
        tw(
          "w-full h-[0.5px] my-[1em] lg:my-[10px]",
          "bg-[#555]"
        )
      }
    />
  )
}

export default Divider
