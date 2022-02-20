export function getSortedData(productsLists, sortBy) {
  if (sortBy && sortBy === "low-to-high") {
    return productsLists.sort((a, b) => a.price - b.price);
  }
  if (sortBy && sortBy === "high-to-low") {
    return productsLists.sort((a, b) => b.price - a.price);
  }

  return productsLists;
}

export function getFilteredData(
  productsLists,
  {
    inventoryALLData,
    delivery,
    sliderValue,
    searchData,
    brandFilters,
    foodTypeFilters,
    categoryFilters,
  }
) {
  const filterBrandItems = brandFilters.map(
    (item) => item.checked === true && item.name.toLowerCase()
  );
  return productsLists
    .filter((items) => (inventoryALLData ? true : items.inStock))
    .filter((items) => (delivery ? items.delivery : true))
    .filter((items) =>
      items.price > 10 && items.price < sliderValue ? items : null
    )
    .filter((item) =>
      filterBrandItems.every((value) => value === false)
        ? item
        : filterBrandItems.includes(item.brand.toLowerCase())
    )
    .filter((item) => (foodTypeFilters ? item.type === foodTypeFilters : item))
    .filter((item) =>
      categoryFilters === " " ? item : item.category === categoryFilters
    )

    .filter((items) =>
      searchData === ""
        ? items
        : items.name.toLowerCase().includes(searchData.toLowerCase())
    );
}
