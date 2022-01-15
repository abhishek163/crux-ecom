import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useProduct } from "../../../context/product";
import { ToggleFilterIcons } from "./ToggleFilterIcons";

export function CategoryFilter() {
  const [isCategoryVisible, setCategoryVisible] = useState(true);
  const [category, setCategory] = useState("");
  const {
    state: { categoryFilters },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    setCategory(categoryFilters);
  }, [categoryFilters])

  function getCategoryProduct(e) {
    if (e.target.id === "dog-category") {
      setCategory("dog");
      productDispatch({
        type: "FILTER_CATEGORY",
        payload: "dog",
      });
    } else {
      setCategory("cat");
      productDispatch({
        type: "FILTER_CATEGORY",
        payload: "cat",
      });
    }
  }

  return (
    <div className="filters">
      <div className="filters__items">
        <span className="filters__name">Category</span>

        <button id="category" className="filter__button category__button">
          <ToggleFilterIcons
            isVisible={isCategoryVisible}
            setVisible={setCategoryVisible}
          />
        </button>
      </div>
      {isCategoryVisible && (
        <div className="filters__type category__type">
          <form>
            <div className="filter__dog">
              <input
                onChange={(e) => getCategoryProduct(e)}
                id="dog-category"
                value={category}
                type="radio"
                name="pet-category"
                checked={category === "dog"}
                className="filter__type-input"
              ></input>
              <label className="filter__type-name">Dog</label>

              <div className="filter__cat">
                <input
                  onChange={(e) => getCategoryProduct(e)}
                  id="cat-category"
                  value={category}
                  type="radio"
                  checked={category === "cat"}
                  name="pet-category"
                  className="filter__type-input"
                ></input>
                <label className="filter__type-name">Cat</label>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
