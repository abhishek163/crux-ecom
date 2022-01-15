export function HomeImageSlider({ imageUrl, name, id }) {
  return (
    <div key={id} className="slider__main">
      <div
      key={id}
      className="slider__image-info">
        <img className="slider__image" src={imageUrl} alt={name} />
      </div>
    </div>
  );
}
