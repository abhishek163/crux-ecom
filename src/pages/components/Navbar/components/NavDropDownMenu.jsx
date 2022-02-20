import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/auth";
import { RiAccountBoxLine, RiLogoutBoxRLine } from "react-icons/ri";

export function NavDropDownMenu() {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  function logoutUser() {
    authDispatch({
      type: "LOGOUT_USER",
    });
    navigate("/");
  }

  return (
    <div className="nav__dropdown-content">
      <div onClick={() => navigate("/account/profile")} className="nav__dropdown-item">
        <RiAccountBoxLine color="#37393a" className="dropdown__item-icon" />
        <span className="dropdown__item-name">Account Settings</span>
      </div>
      <hr
        style={{
          color: "gray",
          backgroundColor: "gray",
          height: 2,
        }}
      />
      <span onClick={() => logoutUser()} className="nav__dropdown-item">
        <RiLogoutBoxRLine color="#37393a" className="dropdown__item-icon" />
        <span className="dropdown__item-name">Log out</span>
      </span>
    </div>
  );
}
