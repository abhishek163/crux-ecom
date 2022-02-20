import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

export function NavSignIn() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/login")} className="nav__icon nav__sign-in">
      <MdAccountCircle className="icon-ac" />
      <span className="nav__icon-name"> SIGN IN </span>
    </div>
  );
}
