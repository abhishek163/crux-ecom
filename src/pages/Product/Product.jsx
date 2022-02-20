import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { NavBar } from "../components/Navbar/Navbar";
import { HeadingName } from "./components/HeadingName";
import { useProduct } from "../../context/product.js";
import { getSortedData, getFilteredData } from "./utils/utils.product";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { getProucts } from "../../api";
import { WishListProductOptions } from "./components/WishListOptions";
import { SortOptions } from "./components/Sortoptions";
import "./product.styles.css";

export function ProductPage() {
  const [loading, setLoading] = useState("idle");
  const [error, setError] = useState("");
  const [productData, setProductData] = useState([]);

  const [searchParams] = useSearchParams();
  const getSearchValue = searchParams.get("q");

  useEffect(() => {
    if (getSearchValue) {
      productDispatch({
        type: "SEARCH_ITEMS",
        payload: getSearchValue,
      });
    }
  }, [getSearchValue]);

  const {
    state: {
      productItems,
      delivery,
      sortBy,
      inventoryALLData,
      sliderValue,
      searchData,
      brandFilters,
      foodTypeFilters,

      categoryFilters,
    },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    setLoading("pending");

    (async function () {
      const response = await getProucts();
      if (response.errMessage) {
        setLoading("rejected");
        setError(response.errMessage);
      } else {
        setLoading("fulfilled");
        productDispatch({
          type: "INITIALIZE_PRODUCTS",
          payload: response.products,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (loading === "fulfilled") {
      setProductData(productItems);
    }
  }, [productItems, loading]);

  const sortedData = productData && getSortedData(productData, sortBy);
  const filteredData =
    sortedData &&
    getFilteredData(sortedData, {
      inventoryALLData,
      delivery,
      sliderValue,
      searchData,
      brandFilters,
      foodTypeFilters,
      categoryFilters,
    });
  return (
    <div className="product-page">
      <NavBar />

      <Sidebar />

      <section className="product-page__main">
        <HeadingName name={"Pet Food"} />

        <SortOptions />

        {loading === "pending" && (
          <LoadingSpinner isDefaultCss={true} color={"black"} />
        )}
        {loading === "fulfilled" && productData && (
          <div className="product-card">
            {filteredData?.map((item) => (
              <ProductCard key={item._id} item={item}>
                <WishListProductOptions productID={item._id} />
              </ProductCard>
            ))}
          </div>
        )}

        {loading === "rejected" && (
          <span style={{ color: "red" }}>{error}</span>
        )}
      </section>
    </div>
  );
}
