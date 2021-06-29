function Tooltip({ text, tooltipMessage }) {
  return (
    <div className="relative group">
      <span className="text-white tooltip">
      {text}
        <span className="tooltiptext text-[1vw] lg:text-[12px]">
        {tooltipMessage}
        </span>
      </span>
    </div>
  )
}

export default Tooltip;
