import { CheckIcon } from "@heroicons/react/solid";

function Checkbox({ checked, onChange }) {
  return (
    <div
      className="border-[1px] border-[gray] w-[2em] h-[2em]"
      onClick={onChange}
    >
      {checked && <CheckIcon />}
    </div>
  )
}

export default Checkbox;
