import { useAuth } from "../../../context/auth";
import { getRealPriceAfterDisc } from "../../utils";
import { RemoveCartBtn } from "./RemoveCartBtn";
import { ShowQuantity } from "./ShowQuantity";
import {AddItemInWishList} from "../../components/AddItemInWishlist";

export function ShowCartProducts({
  name,
  cartID,
  price,
  imageUrl,
  quantity,
  subtotal,
  productID,
  discount,
}) {
  const {
    authState: { userID, token },
  } = useAuth();

  const discountedPrice = getRealPriceAfterDisc(price, discount);
  return (
    <>
      <div className="cart__products-show">
        <div className="cart__products">
          <div className="cart__products-info">
            <RemoveCartBtn userID={userID} token={token} cartID={cartID} />
            <img className="cart__product-img" src={imageUrl} alt={name} />
            <span className="cart__products-name">{name}</span>
          </div>
        </div>

        <div className="cart__price">
          <span className="cart__price-info">
            Rs. {parseInt(discountedPrice)}
          </span>
        </div>
        <div className="cart__quantity">
          <ShowQuantity
            quantity={quantity}
            cartID={cartID}
            userID={userID}
            token={token}
          />
        </div>
        <div className="cart__subtotal ">
          <span className="cart__subtotal-info">Rs. {subtotal} /- </span>
        </div>

        <div className="cart__wishlist-link">
          <AddItemInWishList
            userID={userID}
            token={token}
            productID={productID}
          />
        </div>
      </div>
    </>
  );
}
