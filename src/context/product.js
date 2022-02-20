import { createContext, useContext, useReducer } from "react";
import { brandValues } from "../pages/utils";
import { productReducer } from "./utils";

const productContext = createContext();

const initialState = {
  productItems: [],
  inventoryALLData: true,
  delivery: false,
  sortBy: '',
  sliderValue: 30000,
  searchData: "",
  foodTypeFilters: "",
  brandFilters: brandValues,
  categoryFilters: " ",
};



export default function ProductProvider({ children }) {
  const [state, productDispatch] = useReducer(productReducer, initialState);

  return (
    <productContext.Provider value={{ state, productDispatch }}>
      {children}
    </productContext.Provider>
  );
}

export function useProduct() {
  return useContext(productContext);
}
