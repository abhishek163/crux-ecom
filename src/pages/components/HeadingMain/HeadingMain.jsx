import "./headingMain.styles.css";

export function HeadingMain({ name }) {
    return (
      <div className="heading__main">
        <h2 className="heading__name">{name}</h2>
      </div>
    );
  }