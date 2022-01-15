

export function checkItemInUserWishList(wishlist, productID) {
  return wishlist?.find((item) => (item._id === productID ? true : false));
}

export function getRealPriceAfterDisc(price, discount) {
  return price - (price * discount) / 100;
}

export const brandValues = [
  {
    _id: (Math.random() + 1).toString(),
    name: "Acana",
    checked: false,
  },
  {
    _id: (Math.random() + 1).toString(),
    name: "Tiki Dog",
    checked: false,
  },
  {
    _id: (Math.random() + 1).toString(),
    name: "Zignature",
    checked: false,
  },
  {
    _id: (Math.random() + 1).toString(),
    name: "EarthBorn",
    checked: false,
  },
];



export function getTokenFromLocalStorage() {
  return JSON.parse(localStorage?.getItem("token"));
}

export function checkExpToken(exp) {
  if (Date.now() >= exp * 1000) {
    return false;
  }
}
