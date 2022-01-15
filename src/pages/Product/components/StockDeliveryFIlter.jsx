import { useState } from "react";
import { useProduct } from "../../../context/product";

import { ToggleFilterIcons } from "./ToggleFilterIcons";

export function StockDeliveryFilter() {
  const [isStockVisible, setStock] = useState(false);

  const {
    state: { inventoryALLData, delivery },
    productDispatch,
  } = useProduct();

  return (
    <div className="filters">
      <div className="filters__items">
        <span className="filters__name">Stock & delivery </span>

        <button id="stock" className="filter__button">
          <ToggleFilterIcons isVisible={isStockVisible} setVisible={setStock} />
        </button>
      </div>

      <div hidden={isStockVisible ? "" : true} className="filters__type">
        <div className="filter__stock">
          <input
            checked={inventoryALLData}
            onChange={() =>
              productDispatch({
                type: "FILTER_INVENTORY",
              })
            }
            type="checkbox"
            name="stock"
            id="stockCheck"
          />
          <label className="label-pd">include Out Of Stock</label>
        </div>

        <div className="filter__delivery">
          <input
            type="checkbox"
            name="delivery"
            id="deliveryCheck"
            checked={delivery}
            onChange={() =>
              productDispatch({
                type: "FILTER_DELIVERY",
              })
            }
          />
          <label className="label-pd">Same Day Delivery</label>
        </div>
      </div>
    </div>
  );
}
