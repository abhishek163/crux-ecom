import { useNavigate } from "react-router-dom";

export function CartTotalPrice({ totalPrice }) {

  const navigate = useNavigate() ;

  return (
    <div className="cart__price-container">
      <span className="cart__head-name">CART TOTALS</span>

      <div className="cart__price-details">
        <div className="shipping flx-rw-pd height-2">
          <span className="price-container__tag">Shipping</span>
          <span className="price-container__focus">Free Shipping </span>
        </div>
        <div className="cart-total flx-rw-pd height-2">
          <span className="price-container__tag">Total</span>
          <div className="price-container__focus">
            Rs, {totalPrice} /-
            <span className="fnt-lght">( includes with taxes)</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="process-buy-btn"
        >
          Proceed To Buy
        </button>
      </div>
    </div>
  );
}
