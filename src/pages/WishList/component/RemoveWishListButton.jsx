import { useState } from "react";
import { removeWishListItem } from "../../../api";
import { useAuth } from "../../../context/auth";
import { useWishList } from "../../../context/wishList";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";

export function RemoveWishListButton({ id }) {
  const {
    authState: { userID, token },
  } = useAuth();
  const [wishLoading, setWishLoading] = useState("idle");
  const { wishListDispatch } = useWishList();

  async function removeWishList(userID, token, productID) {
    setWishLoading("pending");
    const response = await removeWishListItem(userID, token, productID);
    if (response.errMessage) {
      setWishLoading("rejected");
    } else {
      setWishLoading("fulfilled");
      wishListDispatch({
        type: "REMOVE_ITEM_FROM_WISHLIST",
        payload: productID,
      });
    }
  }
  return (
    <div className="remove__wishlist-container">
      <button
        onClick={() => userID && removeWishList(userID, token, id)}
        className="card__remove-wishlist-btn"
      >
        Remove
      </button>
      <span className="remove__indicator">
        {wishLoading === "pending" && (
          <LoadingSpinner isDefaultCss={false} size={"10"} color="black" />
        )}
      </span>
    </div>
  );
}
