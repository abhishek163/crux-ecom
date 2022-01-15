import { useNavigate } from "react-router-dom";
import "./emptybag.styles.css";

export function EmptyBag({ tagline, btnText, callToAction }) {
  const navigate = useNavigate();

  function routeChangeHandler() {
    return navigate("/products");
  }

  return (
    <div className="empty-bag ">
      <span className="empty-bag__head">
        {tagline}
        <br />
        {callToAction}
      </span>
      <button
        type="button"
        onClick={routeChangeHandler}
        className="route__shop-btn"
      >
        {btnText}
      </button>
    </div>
  );
}
