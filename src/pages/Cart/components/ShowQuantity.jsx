import { useState } from "react";
import { decreaseCartQuantity, increaseCartQuantity } from "../../../api";
import { useCart } from "../../../context/cart";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";

export function ShowQuantity({ userID, token, cartID, quantity }) {
  const [quanLoading, setQuan] = useState("idle");

  const [error, setError] = useState("");
  const { cartDispatch } = useCart();

  async function decreaseQuantity(userID, token, id) {
    setQuan("pending");
    const response = await decreaseCartQuantity(userID, token, id);
    if (response.errMessage) {
      setQuan("rejected");
      setError(response.errMessage);
    } else {
      setQuan("fulfilled");
      cartDispatch({
        type: "DECREASE_QUANTITY",
        payload: cartID,
      });
    }
  }
  async function increaseQuantity(userID, token, id) {
    setQuan("pending");
    const response = await increaseCartQuantity(userID, token, id);
    if (response.errMessage) {
      setQuan("rejected");
      setError(response.errMessage);
    } else {
      setQuan("fulfilled");
      cartDispatch({
        type: "INCREASE_QUANTITY",
        payload: cartID,
      });
    }
  }

  return (
    <div className="cart__quantity-actions">
      <button
        disabled={quanLoading === "pending"}
        onClick={() => quantity > 1 && decreaseQuantity(userID, token, cartID)}
        className="cart__quantity-btn"
      >
        -
      </button>
      <span className="cart__quantity-info">
        {quanLoading !== "pending" && <>{quantity}</>}
        {quanLoading === "pending" && (
          <LoadingSpinner isDefaultCss={false} color="black" size={13} />
        )}
      </span>
      <button
        disabled={quanLoading === "pending"}
        onClick={() => quantity < 12 && increaseQuantity(userID, token, cartID)}
        className="cart__quantity-btn"
      >
        +
      </button>
    </div>
  );
}
