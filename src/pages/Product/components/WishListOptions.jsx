import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addInWishlist, removeWishListItem } from "../../../api";
import { useAuth } from "../../../context/auth";
import { useWishList } from "../../../context/wishList";
import { checkItemInUserWishList } from "../../utils";

export function WishListProductOptions({ productID }) {
  const { wishListItems, wishListDispatch } = useWishList();
  const [wishLoading, setWishLoading] = useState("idle");
  const {
    authState: { userID, token, isUserLogin },
  } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  toast.configure();

  async function removeItemFromWishList(userID, token, id) {
    const response = await removeWishListItem(userID, token, id);

    if (response.errMessage) {
      setWishLoading("rejected");
      setError(response.errMessage);
    } else {
      wishListDispatch({
        type: "REMOVE_ITEM_FROM_WISHLIST",
        payload: id,
      });
      toast.success(" Item remove from wishlist ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
      setWishLoading("fulfilled");
    }
  }

  async function addProductInWishList(userID, token, id) {
    setWishLoading("pending");
    const wishResponse = await addInWishlist(userID, token, id);
    if (wishResponse.errMessage) {
      setWishLoading("rejected");
      setError(wishResponse.errMessage);
    } else {
      setWishLoading("fulfilled");
      toast.success(" Item added in wishlist ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
      wishListDispatch({
        type: "ADD_ITEM_IN_WISHLIST",
        payload: wishResponse.wishListItems,
      });
    }
  }

  const isItemInWishList =
    isUserLogin && checkItemInUserWishList(wishListItems, productID);

  return (
    <>
      {isItemInWishList ? (
        <div
          onClick={() =>
            userID && removeItemFromWishList(userID, token, productID)
          }
          className="card__wishlist-container"
        >
          <AiFillHeart color={"red"} size={"1.9rem"} />
        </div>
      ) : (
        <div
          onClick={() =>
            wishLoading === "idle" &&
            userID &&
            addProductInWishList(userID, token, productID)
          }
          className="card__wishlist-container"
        >
          <AiFillHeart color={"#f1f1f1"} size={"1.9rem"} />
        </div>
      )}
      <div
        onClick={() => navigate(`/products/${productID}`)}
        className="card__view-txt"
      >
        <span className="view-head">Quick View</span>
      </div>
    </>
  );
}
