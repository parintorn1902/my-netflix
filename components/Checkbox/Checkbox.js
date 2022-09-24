import { IconCheck } from "@tabler/icons";

function Checkbox({ checked, onChange }) {
  return (
    <div className="border-[1px] border-[gray] w-[2em] h-[2em]" onClick={onChange}>
      {checked && <IconCheck className="h-full w-full" />}
    </div>
  );
}

export default Checkbox;
