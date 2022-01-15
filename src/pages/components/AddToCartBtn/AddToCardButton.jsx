import { useState } from "react";
import { addToCart, increaseCartQuantity } from "../../../api";
import { useCart } from "../../../context/cart";
import { useAuth } from "../../../context/auth";
import { LoadingSpinner } from "../Spinner/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddToCardButton.styles.css";
import { useNavigate } from "react-router-dom";

export function AddToCartButton({ btnText, id, fontSize }) {
  const [cartLoading, setCartLoading] = useState("idle");
  const [error, setError] = useState("");
  const { cartItems, cartDispatch } = useCart();

  toast.configure();
  const {
    authState: { userID, token },
  } = useAuth();

  const navigate = useNavigate();
  function checkItemInCart(products, productID) {
    return products?.find((item) =>
      item.product._id === productID ? true : false
    );
  }

  async function addItemInCart(userID, token, productID) {
    setCartLoading("pending");

    const isItemInCart = await checkItemInCart(cartItems, productID);
    if (isItemInCart) {
      if (isItemInCart.quantity >= 12) {
        setCartLoading("fulfilled");
        return toast(" you can not add more quantity ", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          progress: undefined,
        });
      }
      const response = await increaseCartQuantity(
        userID,
        token,
        isItemInCart._id
      );
      if (response.errMessage) {
        setCartLoading("rejected");
        setError(response.errMessage);
      } else {
        setCartLoading("fulfilled");
        cartDispatch({
          type: "INCREASE_QUANTITY",
          payload: isItemInCart._id,
        });
        toast(
          "You have this item in your bag and we have increased the quantity by 1",
          {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            progress: undefined,
          }
        );
      }
    } else {
      const response = await addToCart({ userID, token, productID });
      if (response.errMessage) {
        setCartLoading("rejected");
        setError(response.errMessage);
      } else {
        setCartLoading("fulfilled");
        toast.success("Added to Bag", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          progress: undefined,
        });
        cartDispatch({
          type: "ADD_TO_CART",
          payload: response,
        });
      }
    }
  }

  return (
    <>
      <button
        style={{ fontSize: `${fontSize}` }}
        className="add-cart__btn"
        onClick={() =>
          userID ? addItemInCart(userID, token, id) : navigate("/login")
        }
      >
        {btnText}

        <span className="add-cart__progress">
          {cartLoading === "pending" && (
            <LoadingSpinner isDefaultCss={false} size={"12"} color="fdd686" />
          )}
        </span>
      </button>
    </>
  );
}
