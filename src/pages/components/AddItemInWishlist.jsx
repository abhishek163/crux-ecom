import { useEffect, useState } from "react";
import { LoadingSpinner } from "./Spinner/LoadingSpinner";
import { checkItemInUserWishList } from "../utils";
import { useNavigate } from "react-router-dom";
import { addInWishlist } from "../../api";
import { useWishList } from "../../context/wishList";
import { toast } from "react-toastify";

export function AddItemInWishList({ userID, token, productID }) {
  const { wishListDispatch, wishListItems } = useWishList();
  const [wishLoading, setWishLoading] = useState("idle");
  const [error, setError] = useState("");
  const [isItemInWishList, setItemInWishlist] = useState(false);
  const navigate = useNavigate();
  toast.configure();

  useEffect(() => {
    const checkItem =
      wishListItems && checkItemInUserWishList(wishListItems, productID);
    checkItem === undefined
      ? setItemInWishlist(false)
      : setItemInWishlist(checkItem);
  }, [wishListItems]);

  async function addItemInWishList(userID, token, id) {
    setWishLoading("pending");
    const wishResponse = await addInWishlist(userID, token, id);
    if (wishResponse.errMessage) {
      setWishLoading("rejected");
      setError(wishResponse.errMessage);
    } else {
      wishListDispatch({
        type: "ADD_ITEM_IN_WISHLIST",
        payload: wishResponse.wishListItems,
      });
      toast.success(" Added to Wishlist", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
      setWishLoading("fulfilled");
    }
  }

  return (
    <>
      {wishLoading === "idle" && !isItemInWishList && (
        <button
          onClick={() => userID && addItemInWishList(userID, token, productID)}
          className="wishlist-link"
        >
          Add to WishList
        </button>
      )}
      {wishLoading === "pending" && (
        <>
          <button className="wishlist-link">Add to WishList</button>
          <LoadingSpinner isDefaultCss={false} color="black" size={12} />
        </>
      )}

      {isItemInWishList && (
        <button
          onClick={() => userID && navigate("/wishlist")}
          className="wishlist-link"
        >
          View Wishlist
        </button>
      )}
    </>
  );
}
