import { createContext, useReducer, useContext } from "react";
import { useEffect } from "react";
import { useAuth } from "./auth";
import { wishListReducer } from "./utils";

const wishListContext = createContext();

const initialState = {
  wishListItems: [],
};

export default function WishListProvider({ children }) {
  const {
    authState: { isUserLogin, userData },
  } = useAuth();

  useEffect(() => {
    if (isUserLogin && userData) {
      wishListDispatch({
        type: "INITIALIZE_WISHLIST",
        payload: userData.wishListItems,
      });
    }
  }, [isUserLogin, userData]);

  const [state, wishListDispatch] = useReducer(wishListReducer, initialState);

  return (
    <wishListContext.Provider
      value={{ wishListItems: state.wishListItems, wishListDispatch }}
    >
      {children}
    </wishListContext.Provider>
  );
}

export function useWishList() {
  return useContext(wishListContext);
}
