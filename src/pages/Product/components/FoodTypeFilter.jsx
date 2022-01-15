import { useEffect, useState } from "react";
import { useProduct } from "../../../context/product";
import { ToggleFilterIcons } from "./ToggleFilterIcons";

export function FoodTypeFilter() {
  const [isFoodTypeVisible, setFoodTypeVisiblity] = useState(false);
  const {
    state: { foodTypeFilters },
    productDispatch,
  } = useProduct();
  const [foodType, setFoodType] = useState("");

  useEffect(() => {
    setFoodType(foodTypeFilters);
  }, [foodTypeFilters]) ;

  function getFoodTypeProduct(e) {
    productDispatch({
      type: "FILTER_FOOD_TYPE",
      payload: e.target.id,
    });
  }

  return (
    <div className="filters">
      <div className="filters__items">
        <span className="filters__name">Food Type</span>

        <button id="foodType" className="filter__button">
          <ToggleFilterIcons
            isVisible={isFoodTypeVisible}
            setVisible={setFoodTypeVisiblity}
          />
        </button>
      </div>
      {isFoodTypeVisible && (
        <div className="filters__type food-type__type">
          <form>
            <div className="filter__dry">
              <input
                onChange={(e) => getFoodTypeProduct(e)}
                id="dry"
                checked={foodType === "dry"}
                value={foodType}
                className="filter__type-input"
                type="radio"
                name="food-type"
              />
              <label className="filter__type-name">Dry Food</label>

              <div className="filter__wet">
                <input
                  onChange={(e) => getFoodTypeProduct(e)}
                  id="wet"
                  value={foodType}
                  checked={foodType === "wet"}
                  className="filter__type-input"
                  type="radio"
                  name="food-type"
                />
                <label className="filter__type-name">Wet Food</label>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
