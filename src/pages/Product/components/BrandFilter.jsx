import { useState } from "react";
import { useProduct } from "../../../context/product";
import { ToggleFilterIcons } from "./ToggleFilterIcons";

function ShowBrandFilter({ id, checked, name, disptach }) {
  return (
    <div  className="filter__type-brand">
      <input
        onChange={(e) =>
          disptach({
            type: "FILTER_BRAND",
            payload: e.target.id,
          })
        }
        checked={checked}
        className="filter__type-input"
        id={id}
        type="checkbox"
      />
      <label className="filter__type-name">{name}</label>
    </div>
  );
}

export function BrandFilter() {
  const [isBrandVisible, setBrandVisible] = useState(true);
  const {
    state: { brandFilters },
    productDispatch,
  } = useProduct();

  return (
    <div className="filters">
      <div className="filters__items">
        <span className="filters__name">Brand</span>

        <button className="filter__button">
          <ToggleFilterIcons
            isVisible={isBrandVisible}
            setVisible={setBrandVisible}
          />
        </button>
      </div>

      <div hidden={isBrandVisible ? "" : true} className="filters__type">
        {brandFilters.map((item) => (
          <ShowBrandFilter
            key={item._id}
            id={item._id}
            name={item.name}
            checked={item.checked}
            disptach={productDispatch}
          />
        ))}
      </div>
    </div>
  );
}
