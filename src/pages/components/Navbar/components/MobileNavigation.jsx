import { useAuth } from "../../../../context/auth";
import "../nav.styles.css";
import { NavDropDownOptions } from "./NavDropDownOptions";
import { NavMenuItems } from "./NavMenuItems";
import { NavSignIn } from "./NavSignIn";
import { NavUser } from "./NavUser";
import { NavUserName } from "./NavUserName";
import { Searchbar } from "./Searchbar";
export function MobileNavigation() {
  const {
    authState: { isUserLogin, userData },
  } = useAuth();

  return (
    <nav className="nav__mobile">
      <div className="nav__search-mobile">
        <Searchbar />
      </div>
      <div className="nav__mobile-right">
        <div className="nav__menu-mobile">
          <NavMenuItems isUserLogin={isUserLogin} />
        </div>
        {!isUserLogin ? (
          <NavSignIn />
        ) : (
          <NavUser>
            <NavUserName
              firstName={userData?.firstName}
              lastName={userData.lastName}
            />
            <NavDropDownOptions />
          </NavUser>
        )}
      </div>
    </nav>
  );
}
