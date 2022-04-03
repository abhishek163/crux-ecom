import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { removeCart } from "../../../api";
import { useCart } from "../../../context/cart";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";
import { toast } from "react-toastify";

export function RemoveCartBtn({ userID, token, cartID }) {
  const [removeCartLoading, setRemove] = useState("idle");
  const { cartDispatch } = useCart();
  const [error, setError] = useState("");

  async function removeItemFromCart(userID, token, id) {
    setRemove("pending");
    const cartResponse = await removeCart(userID, token, id);
    if (cartResponse.errMessage) {
      setError(cartResponse.errMessage);
      setRemove("rejected");
    } else {
      setRemove("fulfilled");
      toast.success(" Item remove from cart ", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
      cartDispatch({
        type: "REMOVE_CART_ITEM",
        payload: cartID,
      });
    }
  }

  return (
    <div
      onClick={() => removeItemFromCart(userID, token, cartID)}
      className="cart__remove-btn"
    >
      {removeCartLoading === "pending" && (
        <LoadingSpinner isDefaultCss={false} color="black" size={19} />
      )}
      {removeCartLoading !== "pending" && <TiDeleteOutline size={"1.2rem"} />}
    </div>
  );
}
