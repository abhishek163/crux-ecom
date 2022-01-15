import { NavBar } from "../components/Navbar/Navbar";
import { ProductsCartHead } from "./components/ProductsCartHead";
import { ShowCartProducts } from "./components/ShowCartProducts";
import { CartTotalPrice } from "./components/CartTotalPrice";
import { tagline, callToAction, btnText } from "./utils/cart.utils";
import { EmptyBag } from "../components/EmptyBag/EmptyBag";

import {
  calSubTotalPriceAfterDisc,
  calTotalPriceAfterDiscount,
} from "./utils/cart.utils";
import { useCart } from "../../context/cart";
import "./cart.styles.css";

export function Cart() {
  const { cartItems } = useCart();

  const totalPriceOfCartItems =
    cartItems && calTotalPriceAfterDiscount(cartItems);

  return (
    <div className="cart-page">
      <NavBar />

      <section className="cart-main">
        <div className=" cart__head ">Your Shopping Cart</div>

        {cartItems.length === 0 ? (
          <EmptyBag
            tagline={tagline}
            callToAction={callToAction}
            btnText={btnText}
          />
        ) : (
          <div className="cart__container">
            <div className="cart__container-left">
              <div className="cart__products-container">
                <ProductsCartHead />

                {cartItems.map((item) => {
                  const subtotal = calSubTotalPriceAfterDisc({
                    quantity: item.quantity,
                    price: item.product.price,
                    discount: item.product.discount,
                  });
                  return (
                    <ShowCartProducts
                      key={item._id}
                      imageUrl={item.product.imageUrl}
                      name={item.product.name}
                      price={item.product.price}
                      cartID={item._id}
                      productID={item.product._id}
                      quantity={item.quantity}
                      subtotal={subtotal}
                      discount={item.product.discount}
                    />
                  );
                })}
              </div>
            </div>
            <div className="cart__container-right">
              {totalPriceOfCartItems && (
                <CartTotalPrice totalPrice={totalPriceOfCartItems} />
              )}
            </div>
          </div>
        )}
      </section>

      <section className="cart__left-bar"></section>
      <section className="cart__right-bar"></section>
    </div>
  );
}
