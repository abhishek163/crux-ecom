import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { BiSearch } from "react-icons/bi";
import { useProduct } from "../../../../context/product";

export function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { productDispatch } = useProduct();
  const navigate = useNavigate();

  function clearSearchResult() {
    productDispatch({
      type: "SEARCH_ITEMS",
      payload: "",
    });
    setSearchValue("");
    if (searchParams.has("q")) {
      const token = searchParams.get("q");
      if (token) {
        searchParams.delete("q");
        setSearchParams(searchParams);
      }
    }
  }
  return (
    <div className="search">
      <div className="search__input-container">
        <input
          className="search__input"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue.length > 0 && (
          <button onClick={clearSearchResult} className="search-clear__btn">
            <TiDeleteOutline size="1rem" />
          </button>
        )}
      </div>
      <button
        onClick={() =>
          navigate(
            `/products?${createSearchParams({ q: searchValue.toLowerCase() })}`
          )
        }
        className="search__button"
      >
        <BiSearch />
      </button>
    </div>
  );
}
