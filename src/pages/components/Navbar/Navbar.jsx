import { useState } from "react";
import { Searchbar } from "./components/Searchbar";
import { useAuth } from "../../../context/auth";
import { NavMenuItems } from "./components/NavMenuItems";
import { RiMenu3Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { MobileNavigation } from "./components/MobileNavigation";
import { NavLogo } from "./components/NavLogo";
import { NavSignIn } from "./components/NavSignIn";
import { NavDropDownMenu } from "./components/NavDropDownMenu";
import { NavUser } from "./components/NavUser";
import { NavDropDownOptions } from "./components/NavDropDownOptions";
import { NavUserName } from "./components/NavUserName";
import "./nav.styles.css";

export function NavBar() {
  const {
    authState: { isUserLogin, userData },
  } = useAuth();
  const [isHambugerClick, setHambuger] = useState(false);

  return (
    <nav className="nav">
      <NavLogo />

      <div className="nav__search">
        <Searchbar />
      </div>

      <div className="nav__right">
        <div className="nav__menu">
          <NavMenuItems isUserLogin={isUserLogin} />
        </div>

        {isUserLogin ? (
          <NavUser>
            <NavUserName
              firstName={userData?.firstName}
              lastName={userData.lastName}
            />
            <NavDropDownOptions />
          </NavUser>
        ) : (
          <NavSignIn />
        )}
      </div>

      {/* mobile styles */}

      <div className="nav__hambuger-icon">
        {isHambugerClick && (
          <MdClose
            onClick={() => setHambuger(false)}
            className="hamburger-icon"
            size={"2rem"}
            color={"#37393a"}
          />
        )}
        {!isHambugerClick && (
          <RiMenu3Fill
            onClick={() => setHambuger(true)}
            className="hamburger-icon"
            size={"2rem"}
            color={"#37393a"}
          />
        )}
      </div>
      {isHambugerClick && <MobileNavigation />}
    </nav>
  );
}
