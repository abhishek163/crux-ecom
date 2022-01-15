import { NavBar } from "../components/Navbar/Navbar";
import { useWishList } from "../../context/wishList";
import { WishListHead } from "./component/WishListHead";
import { EmptyBag } from "../components/EmptyBag/EmptyBag";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { WishListOptions } from "./component/WishListOptions";
import {
  btnText,
  callToAction,
  tagline,
  headName,
} from "./utils/wishlist.utils";
import "./wishlist.styles.css";

export function WishList() {
  const { wishListItems } = useWishList();

  return (
    <div className="wishlist-page">
      <NavBar />
      <section className="wishlist-main">
        <WishListHead name={headName} />
        {wishListItems.length === 0 ? (
          <EmptyBag
            tagline={tagline}
            callToAction={callToAction}
            btnText={btnText}
          />
        ) : (
          <div className="wishList-card">
            {wishListItems.map((item) => {
              return (
                <ProductCard 
                key={item._id}
                item={item}>
                  <WishListOptions itemID={item._id} />
                </ProductCard>
              );
            })}
          </div>
        )}
      </section>
      <section className="wishlist__left"></section>
      <section className="wishlist__right"></section>
    </div>
  );
}
