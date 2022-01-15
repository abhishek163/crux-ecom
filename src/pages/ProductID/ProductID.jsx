import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useProduct } from "../../context/product";
import { NavBar } from "../components/Navbar/Navbar";
import { AddToCartButton } from "../components/AddToCartBtn/AddToCardButton";
import { AddItemInWishList } from "../components/AddItemInWishlist";
import { useAuth } from "../../context/auth";
import { getProductByID } from "../../api";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import { getRealPriceAfterDisc } from "../utils";
import "./productID.styles.css";



export function ProductID() {

  
  const { productID } = useParams();
  const {
    state: { productItems },
  } = useProduct();
  const [productIDItem, setProductIDItem] = useState([]);
  const [loading, setLoading] = useState("idle");
  const [error, setError] = useState("");

  const {
    authState: { userID, token },
  } = useAuth();

  useEffect(() => {
    setLoading("pending");
    const isProductExist = productItems.find((item) => item._id === productID);
    if (isProductExist === undefined) {
      (async function () {
        const productResponse = await getProductByID(productID);
        if (productResponse.errMessage) {
          setError(productResponse.errMessage);
          setLoading("rejected");
        } else {
          setProductIDItem(productResponse);
          setLoading("fulfilled");
        }
      })();
    } else {
      setProductIDItem(isProductExist);
      setLoading("fulfilled");
    }
  }, [productID, productItems]);

  const discountedPrice = getRealPriceAfterDisc(
    productIDItem.price,
    productIDItem.discount
  );
  return (
    <div className="product-id">
      <NavBar />

      <section className="product-id__main">
        {loading === "pending" && (
          <LoadingSpinner isDefaultCss={true} size={"2rem"} />
        )}

        {loading === "fulfilled" && (
          <>
            <div className="product-id__main-info">
              <div className="product-id__image">
                <img
                  src={productIDItem.imageUrl}
                  placeholder={productIDItem.name}
                  className="product-id__image-url"
                />
              </div>

              <div className="product-id__products">
                <div className="products__info">
                  <h2 className="product-id__brand-name">
                    {productIDItem.brand}
                  </h2>
                  <h3 className="product-id__product-name">
                    {productIDItem.name}
                  </h3>
                  <span className="product-id__type">
                    Food Type : {productIDItem.type}{" "}
                  </span>

                  <span
                    className={
                      productIDItem.inStock
                        ? "product-id__stock"
                        : "product-id__out-stock"
                    }
                  >
                    {productIDItem.inStock ? "In Stock" : "Out of Stock"}
                  </span>

                  <div className="product-id__price-container">
                    <span className="product-id__price ">
                      Rs. {parseInt(discountedPrice)}
                      <s className="product-id__disc ">{productIDItem.price}</s>
                    </span>
                    <span className="product-id__disc-per ">
                      ({productIDItem.discount}% off discount){" "}
                    </span>
                  </div>
                </div>

                <div className="product-id__actions">
                  <div className="product-id__cart">
                    <AddToCartButton
                      fontSize={"1rem"}
                      btnText={`Add to Cart : Rs.${parseInt(discountedPrice)}`}
                      id={productIDItem._id}
                    />
                  </div>

                  <div className="product-id__wishlist">
                    <AddItemInWishList
                      userID={userID}
                      token={token}
                      productID={productIDItem._id}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="product-id__des-container">
              <span className="product-id__des-name">
                Product Description :
              </span>
              <span className="product-id__des">
                {productIDItem.description}
              </span>
            </div>
          </>
        )}
      </section>

      <section className="product-id__left"></section>
      <section className="product-id__right"></section>
    </div>
  );
}
