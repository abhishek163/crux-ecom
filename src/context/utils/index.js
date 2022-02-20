import { brandValues } from "../../pages/utils";

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userData: action.payload.userData,
        isUserLogin: true,
        userID: action.payload.userData._id,
        token: action.payload.token,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        userID: null,
        isUserLogin: false,
        userData: null,
        token: null,
      };

    case "REFRESH_USER_DATA":
      return {
        ...state,
        userData: action.payload.userData,
        isUserLogin: true,
        userID: action.payload.userData._id,
        token: action.payload.token,
      };
    case "UPDATE_PROFILE_DATA":
      return {
        ...state,
        userData: action.payload.userData,
      };

    default:
      return state;
  }
}

export function setTokenToLocalStorage(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "INCREASE_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "EMPTY_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export function productReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_PRODUCTS": {
      return {
        ...state,
        productItems: action.payload,
        data: action.payload,
      };
    }
    case "SLIDER_CHANGE_PRICE":
      return {
        ...state,
        sliderValue: action.payload,
      };

    case "FILTER_FOOD_TYPE":
      return {
        ...state,
        foodTypeFilters: action.payload,
      };
    case "FILTER_BRAND": {
      return {
        ...state,
        brandFilters: state.brandFilters.map((item) =>
          item._id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };
    }
    case "FILTER_CATEGORY":
      return {
        ...state,
        categoryFilters: action.payload,
      };
    case "FILTER_INVENTORY":
      return {
        ...state,
        inventoryALLData: !state.inventoryALLData,
      };
    case "SEARCH_ITEMS":
      return {
        ...state,
        searchData: action.payload,
      };
    case "SORT":
      return {
        ...state,
        sortBy: action.payload,
      };
    case "FILTER_DELIVERY":
      return {
        ...state,
        delivery: !state.delivery,
      };
    case "SORT_STOCK":
      return {
        ...state,
        productItems: state.productItems.filter(
          (items) => items.stock === action.payload
        ),
      };
    case "CLEAR_FILTERS": {
      return {
        ...state,
        inventoryALLData: true,
        delivery: false,
        sortBy: "",
        sliderValue: 30000,
        searchData: "",
        foodTypeFilters: "",
        brandFilters: brandValues,
        categoryFilters: " ",
      };
    }
    default:
      return {
        state,
      };
  }
}

export function wishListReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_WISHLIST":
      return {
        ...state,
        wishListItems: action.payload,
      };
    case "REMOVE_ITEM_FROM_WISHLIST":
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "ADD_ITEM_IN_WISHLIST":
      return {
        ...state,
        wishListItems: action.payload,
      };

    default:
      return state;
  }
}
