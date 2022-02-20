import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { useCart } from "../../../../context/cart";
import { useWishList } from "../../../../context/wishList";

export function NavMenuItems({ isUserLogin }) {
  const { cartItems } = useCart();

  const { wishListItems } = useWishList();
  return (
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
            <MdShoppingCart className="icon" size="1.7rem"></MdShoppingCart>
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

            <span className="icon-badges__item">{wishListItems.length}</span>
          </div>
        </li>
      )}
    </ul>
  );
}
