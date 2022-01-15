import { useState } from "react";
import { useProduct } from "../../../context/product";
import { ToggleFilterIcons } from "./ToggleFilterIcons";

export function PriceRangeFilter() {
  const [isPriceRangeVisible, setPriceRange] = useState(false);
  const {
    state: { sliderValue },
    productDispatch,
  } = useProduct();

  return (
    <div className="filters">
      <div className="filters__items">
        <span className="filters__name">Price Range</span>

        <button id="priceRange" className="filter__button">
          <ToggleFilterIcons
            isVisible={isPriceRangeVisible}
            setVisible={setPriceRange}
          />
        </button>
      </div>

      <div hidden={isPriceRangeVisible ? "" : true} className="filters__type">
        <div className="filter__price-range">
          <input
            type="range"
            min="15"
            max="10000"
            value={sliderValue}
            onChange={(e) =>
              productDispatch({
                type: "SLIDER_CHANGE_PRICE",
                payload: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
