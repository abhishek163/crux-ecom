import { AiFillGithub } from "react-icons/ai";
import "./homebanner.styles.css";

export function HomeBanner() {
  return (
    <div className="home__banner">
      <span className="banner-text">FREE DELIVERY ON ALL ORDERS /- </span>
      <div className="banner__links">
        <a
          href="https://github.com/imukulsaini/Crux-Ecom"
          className="social-link__github"
        >
          About : | <AiFillGithub size="1.5rem" /> |
        </a>
      </div>
    </div>
  );
}
