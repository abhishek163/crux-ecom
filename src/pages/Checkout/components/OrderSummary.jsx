export function OrderSummary({ itemsCount, totalPrice }) {
  return (
    <>
      <span className="cart__head-name">Order Summary</span>
      <div className="cart__order-container">
        <div className="cart__items-details">
          <div className="items-count flx-rw-pd height-2">
            <span className="item-container__tag">Item : </span>
            <span className="item-container__focus"> {itemsCount} </span>
          </div>
        </div>

        <div className="order-total flx-rw-pd height-2">
          <span className="price-container__tag"> Order Total : </span>
          <div className="price-container__focus">Rs, {totalPrice} /-</div>
        </div>
      </div>
    </>
  );
}
