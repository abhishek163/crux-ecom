import {AddToCartButton} from "../../components/AddToCartBtn/AddToCardButton";
import { RemoveWishListButton } from "./RemoveWishListButton";

export function WishListOptions({ itemID }) {
  return (
    <div className="wishList__option-btn">
      <div className="wishlist__add-cart">
        <AddToCartButton btnText={"Add to Cart"} id={itemID} />
      </div>
      <RemoveWishListButton id={itemID} />
    </div>
  );
}

