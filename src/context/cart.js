import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./auth";
import { cartReducer } from "./utils";
const cartContext = createContext();

const initialState = {
  cartItems: [],
};

export default function CartProvider({ children }) {
  const [state, cartDispatch] = useReducer(cartReducer, initialState);
  const {
    authState: { isUserLogin, userData },
  } = useAuth();

  useEffect(() => {
    if (isUserLogin && userData) {
      cartDispatch({
        type: "INITIALIZE_CART",
        payload: userData.cartItems,
      });
    }
  }, [isUserLogin, userData]);

  return (
    <cartContext.Provider value={{ cartItems: state.cartItems, cartDispatch }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  return useContext(cartContext);
}
