import "./ComponentCard.css";

function ComponentCard({
  title,
  image,
  selected,
  onClick,
}) {
  return (
    <div
      className={`component-card ${
        selected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="component-image"
      />

      <div className="component-content">
        <h3>{title}</h3>

        <button
          className={
            selected
              ? "selected-btn"
              : "select-btn"
          }
        >
          {selected
            ? "✓ Selected"
            : "Select"}
        </button>
      </div>
    </div>
  );
}

export default ComponentCard;