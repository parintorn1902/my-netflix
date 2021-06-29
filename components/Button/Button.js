/**
 * 
 * @param {ButtonProps} props 
 * @returns {React.Component}
 */
function Button(props) {
  const { active, variant, buttonText, onClick } = props;
  if (variant === "contained") {
    return (
      <a
        className={
          "cursor-pointer bordor-2 border-transparent px-10 py-2 font-bold hover:bg-[#e50914] hover:text-white tracking-widest w-[fit-content] " +
          (active ? "bg-[#e50914] text-white" : "bg-white text-[#131313]")
        }
        onClick={onClick}
      >
        {buttonText}
      </a>
    );
  } else {
    return (
      <a
        className="cursor-pointer border-2 border-[gray] text-[gray] px-10 py-2 hover:border-white hover:text-white tracking-widest w-[fit-content]"
        onClick={onClick}
      >
        {buttonText}
      </a>
    );
  }

}

export default Button

class ButtonProps {
  constructor() {
    this.active = false;
    /**
     * @type {"contained" | "outlined"}
     */
    this.variant = "";
    this.buttonText = "";
    this.onClick = () => { };
  }
}