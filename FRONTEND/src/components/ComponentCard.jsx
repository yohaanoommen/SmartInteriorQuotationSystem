import { useState, useEffect } from "react";
import "./ComponentCard.css";

function ComponentCard({
  component,
  selected,
  onSelect,
}) {
  const [quantity, setQuantity] = useState("");

  const [selectedVariant, setSelectedVariant] = useState(
    component.variants
      ? component.variants[0]
      : null
  );
  const rate = selectedVariant
    ? selectedVariant.rate
    : component.rate;

  const total =
    quantity === ""
      ? 0
      : Number(quantity) * rate;

  return (
    <div
      className={`component-card ${selected ? "selected" : ""
        }`}

    >
      <img
        src={component.image}
        alt={component.name}
        className="component-image"
      />
      <div className="component-content">
        <h3>{component.name}</h3>

        {component.variants && (

          <div className="variant-box">

            {component.variants.map((variant) => (

              <label key={variant.name}>

                <input
                  type="radio"
                  checked={
                    selectedVariant?.name === variant.name
                  }
                  onChange={() =>
                    setSelectedVariant(variant)
                  }
                />

                {variant.name}

              </label>

            ))}

          </div>

        )}
        <input
          type="number"
          min="1"
          placeholder={
            component.unit === "sq.ft"
              ? "Enter Required Area"
              : "Enter Quantity"
          }
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />
        <p className="helper-text">
          Enter the approximate requirement.
        </p>


        <button
          className={
            selected
              ? "selected-btn"
              : "select-btn"
          }
          onClick={() =>
            onSelect({
              name: component.name,
              variant: selectedVariant?.name || null,
              quantity: Number(quantity),
              unit: component.unit,
              rate,
              total,
            })
          }
        >
          {selected
            ? "✓ Added"
            : "Add Component"}
        </button>
      </div>

    </div>
  );
}

export default ComponentCard;