import { GrFormSubtract } from "react-icons/gr";
import { MdAdd } from "react-icons/md";

export function ToggleFilterIcons({ isVisible, setVisible }) {
  return isVisible ? (
    <GrFormSubtract
      onClick={() => setVisible((isVisible) => !isVisible)}
      size="1rem"
      className="filter__show-button"
    ></GrFormSubtract>
  ) : (
    <MdAdd
      onClick={() => setVisible((isVisible) => !isVisible)}
      size="1rem"
      className="filter__show-button"
    ></MdAdd>
  );
}
