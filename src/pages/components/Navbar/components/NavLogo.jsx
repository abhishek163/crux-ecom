import { useNavigate } from "react-router-dom";
import BrandLogo from "../../../../assets/BrandLogo.png";

export function NavLogo() {
  
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className="nav__logo">
      <div className="brand__logo">
        <img className="brand-logo__img" src={BrandLogo} />
      </div>
      <span className="brand__name">Crux Store</span>
    </div>
  );
}
