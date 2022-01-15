export function ProductsCartHead() {
  return (
    <div className="cart__head-container cart__head-name">
      <span
        className="cart__products 
          "
      >
        Products
      </span>
      <span className="cart__price">Price</span>
      <span className="cart__quantity">Quantity</span>
      <span className="cart__subtotal">Sub total</span>
    </div>
  );
}
