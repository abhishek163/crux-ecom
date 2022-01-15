import { useState } from "react";
import { FormInput } from "../components/FormInput/FormInput";
import { OrderSummary } from "./components/OrderSummary";
import { NavBar } from "../components/Navbar/Navbar";
import { ReactComponent as RazorPayIcon } from "../../assets/Razorpay.svg";
import { calTotalPriceAfterDiscount } from "../Cart/utils/cart.utils";
import { addressValues, loadRazorPay } from "./utils/checkout.utils";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import { createOrder, razorpayCreateOrder } from "../../api";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import "./checkout.styles.css";
import { toast } from "react-toastify";

export function Checkout() {
  const { cartItems, cartDispatch } = useCart();
  const {
    authState: { userID, token, userData },
  } = useAuth();
  const navigate = useNavigate();
  const [razorLoading, setRazorLoad] = useState("idle");
  const [address, setAddress] = useState({
    mobile: "",
    pincode: "",
    house_no: "",
    area: "",
    city: "",
  });

  async function checkoutWithRazorPay(e, amount) {
    e.preventDefault();
    setRazorLoad("pending");

    const isRazorPayLoad = await loadRazorPay();
    if (!isRazorPayLoad) {
      console.log("script loading falied");
      return;
    }
    const response = await razorpayCreateOrder(amount);
    if (!response.errMessage) {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: response.info.amount,
        currency: response.info.currency,
        name: "Crux Shop",
        description: "Delivering Happiness for Pets",
        order_id: response.info.id.toString(),
        handler: async function (response) {
          if (response.razorpay_payment_id !== undefined) {
            const order = {
              orderID: response.razorpay_order_id,
              payID: response.razorpay_payment_id,
              userID,
              address,
              amount,
              orderItems: cartItems,
            };
            const responseData = await createOrder({ order, userID, token });
            if (responseData.errMessage) {
            } else {
              toast.success("Thank you for your order", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                progress: undefined,
              });
              cartDispatch({
                type: "EMPTY_CART",
              });

              navigate("/");
            }
          }
        },
        prefill: {
          name: `${userData.firstName} ${userData.lastName}`,
          email: `${userData.email}`,
          contact: address.mobile,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      setRazorLoad("fulfilled");
      rzp1.open();
    }
  }

  function onChangeInput(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const totalPriceOfCartItems =
    cartItems && calTotalPriceAfterDiscount(cartItems);

  return (
    <div className="checkout">
      <NavBar />
      <section className="checkout-main">
        <div className="checkout__head">CheckOut</div>
        <form
          className="checkout__container"
          onSubmit={(e) => checkoutWithRazorPay(e, totalPriceOfCartItems)}
        >
          <div className="checkout__container-left">
            <div className="checkout__address-container">
              <div className="checkout__address-head">
                Enter Your Delivery Address
              </div>

              {addressValues.map((value) => {
                return (
                  <FormInput
                    key={value.id}
                    name={value.name}
                    type={value.type}
                    required={value.required}
                    label={value.label}
                    onChangeInput={onChangeInput}
                    pattern={value.pattern}
                    isErrorMessageVisible={true}
                    {...value}
                  />
                );
              })}
            </div>
          </div>
          {totalPriceOfCartItems && (
            <div className="checkout__container-right">
              <OrderSummary
                totalPrice={totalPriceOfCartItems}
                itemsCount={cartItems.length}
              />
              <button
                disabled={razorLoading === "pending"}
                type="submit"
                className="checkout-btn"
              >
                CheckOut With
                <span className="razorpay-icon">
                  <RazorPayIcon />
                </span>
                {razorLoading === "pending" && (
                  <LoadingSpinner
                    isDefaultCss={false}
                    color={"black"}
                    size={"1.2rem"}
                  />
                )}
              </button>
            </div>
          )}
        </form>
      </section>
      <section className="checkout__left-bar"></section>
      <section className="checkout__right-bar"></section>
    </div>
  );
}
