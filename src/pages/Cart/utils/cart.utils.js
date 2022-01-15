export function calTotalPriceAfterDiscount(prodcuts) {
  const result = prodcuts.reduce(
    (acc, items) =>
      parseInt(acc) +
      parseInt(
        items.quantity *
          (items.product.price -
            (items.product.price * items.product.discount) / 100)
      ),
    0
  );

  return parseInt(result);
}


export function calSubTotalPriceAfterDisc({ quantity, price, discount }) {
  const result = (price - (price * discount) / 100) * quantity;
  return parseInt(result);
}

export const tagline = "Your Cart is Empty !!!";
export const callToAction = " Add something to make me a wish . ";
export const btnText = " Continue Shopping ";
export const headName = "Your Cart";
