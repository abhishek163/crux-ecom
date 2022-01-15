import { useProduct } from "../../../context/product";
import { CategoryFilter } from "./CategoryFilter";
import { FoodTypeFilter } from "./FoodTypeFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { StockDeliveryFilter } from "./StockDeliveryFIlter";
import { BrandFilter } from "./BrandFilter";

export function Sidebar() {
  const { productDispatch } = useProduct();

  return (
    <div className="sidebar">
      <div className="sidebar__head-contain">
        <h3 className="sidebar__heading">FILTERS</h3>
        <button
          className="clear-filter__btn"
          onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
        >
          CLEAR ALL
        </button>
      </div>

      <CategoryFilter />

      <FoodTypeFilter />

      <PriceRangeFilter />

      <StockDeliveryFilter />

      <BrandFilter />
    </div>
  );
}
