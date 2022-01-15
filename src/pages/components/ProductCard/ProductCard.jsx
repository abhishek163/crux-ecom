import { useNavigate } from "react-router-dom";
import { getRealPriceAfterDisc } from "../../utils";
import "./productcard.styles.css";

export function ProductCard({ item, children }) {
  const { imageUrl, brand, discount, name, price, _id } = item;
  const navigate = useNavigate();
  const discountedPrice = getRealPriceAfterDisc(price, discount);
  return (
    <>
      <div
      key={item._id}
      className="card">
        <img
          onClick={() => navigate(`/products/${_id}`)}
          alt={name}
          className="card__image"
          src={imageUrl}
        />

        <span className="card__divider"></span>

        <h4 className="card__brand-name ">{brand}</h4>

        <div>
          <p className="card__product-name">{name}</p>
        </div>
        <div className="card__price-info pd-one-left">
          <span className="card__price ">
            Rs. {parseInt(discountedPrice)}
            <s className="card__disc ">{price}</s>
          </span>

          <span className="card__disc-per ">({discount}% off discount) </span>
        </div>
        {children}
      </div>
    </>
  );
}
