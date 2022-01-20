export function checkItemInUserWishList(wishlist, productID) {
  return wishlist?.find((item) => (item._id === productID ? true : false));
}

export function getRealPriceAfterDisc(price, discount) {
  return price - (price * discount) / 100;
}

export const brandValues = [
  {
    _id: "Acana_45671",
    name: "Acana",
    checked: false,
  },
  {
    _id: "Tiki_213324",
    name: "Tiki",
    checked: false,
  },
  {
    _id: "Zign_3242313",
    name: "Zignature",
    checked: false,
  },
  {
    _id: "Earth_203840",
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
