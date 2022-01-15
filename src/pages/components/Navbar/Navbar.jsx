import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { Searchbar } from "./components/Searchbar";
import { useAuth } from "../../../context/auth";
import { useWishList } from "../../../context/wishList";
import { useCart } from "../../../context/cart";
import BrandLogo from "../../../assets/BrandLogo.png";
import {
  RiAccountBoxFill,
  RiAccountBoxLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import {
  MdAccountCircle,
  MdShoppingCart,
  MdArrowDropDown,
} from "react-icons/md";
import "./nav.styles.css";

export function NavBar() {
  const navigate = useNavigate();
  const {
    authDispatch,
    authState: { isUserLogin, userData },
  } = useAuth();

  const { cartItems } = useCart();

  const { wishListItems } = useWishList();

  const [isDropDownModal, setDropDownModal] = useState(false);

  function openDropDownOption() {
    setDropDownModal((isDropDownModal) => !isDropDownModal);
  }
  function logoutUser() {
    authDispatch({
      type: "LOGOUT_USER",
    });
    navigate("/");
  }

  return (
    <>
      <nav className="nav">
        <div onClick={() => navigate("/")} className="nav__logo">
          <div className="brand__logo">
            <img className="brand-logo__img" src={BrandLogo} />
          </div>
          <span className="brand__name">Crux Store</span>
        </div>

        <Searchbar />

        <div className="nav__menu">
          <ul className="nav__menu-items">
            <li className="nav__items">
              <Link className="nav__items-link" to="/">
                HOME
              </Link>
            </li>
            <li className="nav__items">
              <Link className="nav__items-link" to="/products">
                SHOP
              </Link>
            </li>

            <li className="nav__items">
              <div className="nav__items icon-badges">
                <Link className="nav__items-link" to="/cart">
                  <MdShoppingCart
                    className="icon"
                    size="1.7rem"
                  ></MdShoppingCart>
                </Link>

                {isUserLogin && (
                  <span className="icon-badges__item">{cartItems?.length}</span>
                )}
              </div>
            </li>
            {isUserLogin && (
              <li className="nav__items">
                <div className="icon-badges">
                  <Link className="nav__items-link" to="/wishlist">
                    <IoIosHeart className="icon" size="1.7rem"></IoIosHeart>
                  </Link>

                  <span className="icon-badges__item">
                    {wishListItems.length}
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>

        {isUserLogin ? (
          <>
            <div className="nav__avatar">
              <span className="nav__avatar-name">
                {userData?.firstName} {userData?.lastName}
              </span>
            </div>
            <button onClick={openDropDownOption} className="nav__dropdown-btn">
              <RiAccountBoxFill />
              <MdArrowDropDown />
            </button>
            {isDropDownModal && (
              <div className="nav__dropdown-option">
                <div className="nav__dropdown-content">
                  <div
                    onClick={() => navigate("/account")}
                    className="nav__dropdown-item"
                  >
                    <RiAccountBoxLine
                      color="#37393a
"
                      className="dropdown__item-icon"
                    />
                    <span className="dropdown__item-name">
                      Account Settings
                    </span>
                  </div>
                  <hr
                    style={{
                      color: "gray",
                      backgroundColor: "gray",
                      height: 2,
                    }}
                  />
                  <span
                    onClick={() => logoutUser()}
                    className="nav__dropdown-item"
                  >
                    <RiLogoutBoxRLine
                      color="#37393a
                      "
                      className="dropdown__item-icon"
                    />

                    <span className="dropdown__item-name">Log out</span>
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div onClick={() => navigate("/login")} className="nav__icon">
            <MdAccountCircle className="icon-ac" />
            <span className="nav__icon-name"> SIGN IN </span>
          </div>
        )}
      </nav>
    </>
  );
}
