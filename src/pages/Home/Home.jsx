import { useState } from "react";
import { NavBar } from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import CatImageSlider from "../../assets/HomeSlider/catHomeProfile.png";
import DogImageSlider from "../../assets/HomeSlider/dogHomeProfile.png";
import { useProduct } from "../../context/product";
import { HomeImageSlider } from "./components/HomeImageSlider";
import { HomeBanner } from "../components/HomeBanner/HomeBanner";
import "./home.styles.css";

export function Home() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const { productDispatch } = useProduct();
  const navigate = useNavigate();

  const sliderValues = [
    {
      id: 0,
      name: "dogProfile",
      callToAction: "Shop for Dog",
      imageFor: "dog",
      imagePath: DogImageSlider,
    },
    {
      id: 1,
      name: "catProfile",
      callToAction: "Shop for Cat",
      imageFor: "cat",
      imagePath: CatImageSlider,
    },
  ];

  function changeSlider(sliderDirection) {
    if (sliderDirection === "left") {
      sliderIndex === 0
        ? setSliderIndex(sliderValues.length - 1)
        : setSliderIndex((sliderIndex) => sliderIndex - 1);
    }
    if (sliderDirection === "right") {
      sliderIndex === sliderValues.length - 1
        ? setSliderIndex(0)
        : setSliderIndex((sliderIndex) => sliderIndex + 1);
    }
  }

  return (
    <>
      <HomeBanner />
      <div className="home">
        <NavBar />

        <section className="home__main">
          <div onClick={() => changeSlider("left")} className="slider__left">
            <AiOutlineArrowLeft className="icon-slider" size={"2rem"} />
          </div>

          <div
            style={{
              transform: `translateX(${sliderIndex * -100}%)`,
              transition: "all 1.5s ease",
            }}
            className="home__slider"
          >
            {sliderValues.map((value) => (
              <>
                <HomeImageSlider
                  id={value.id}
                  imageUrl={value.imagePath}
                  imageFor={value.imageFor}
                />
                <button
                  onClick={() => {
                    productDispatch({
                      type: "FILTER_CATEGORY",
                      payload: value.imageFor,
                    });
                    navigate(`/products`);
                  }}
                  className={`slider__action-${value.imageFor} slider__action-btn`}
                >
                  {value.callToAction}
                </button>
              </>
            ))}
          </div>
          <div onClick={() => changeSlider("right")} className="slider__right">
            <AiOutlineArrowRight className="icon-slider" size={"2rem"} />
          </div>
        </section>
      </div>
    </>
  );
}
