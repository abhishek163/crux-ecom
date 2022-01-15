import { useProduct } from "../../../context/product";

export function SortOptions() {
  const { productDispatch } = useProduct();

  function changeSort(e) {
    productDispatch({
      type: "SORT",
      payload: e.target.value,
    });
  }

  return (
    <div className="sort__menu">
      <label className="sort__menu-name"> Sort By:</label>
      <form>
        <select
          onChange={(e) => changeSort(e)}
          name="sortChoice"
          id="price-sort"
        >
          <option id="clear">Please choose an option</option>

          <option value="low-to-high" id="low-sort">
            Price , Low to High
          </option>

          <option value="high-to-low" id="high-sort">
            Price , High To Low
          </option>
        </select>
      </form>
    </div>
  );
}
