import { useState } from "react";
import { NavDropDownMenu } from "./NavDropDownMenu";
import { RiAccountBoxFill } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";


export function NavDropDownOptions() {

  const [isDropDownModal, setDropDownModal] = useState(false);

  function openDropDownOption() {
    setDropDownModal((isDropDownModal) => !isDropDownModal);
  }

  return (
    <>
      <button onClick={()=>openDropDownOption()} className="nav__dropdown-btn">
        <RiAccountBoxFill />
        <MdArrowDropDown />
      </button>
      {isDropDownModal && (
        <div className="nav__dropdown-option">
          <NavDropDownMenu />
        </div>
      )}
    </>
  );
}
