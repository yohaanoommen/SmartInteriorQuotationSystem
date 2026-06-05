import { useState } from "react";
import "./App.css";
import ComponentCard from "./components/ComponentCard";
import wardrobeImage from "./assets/images/bedroom/wardrobe.jpg";

function App() {
  const [propertyType, setPropertyType] = useState("");
  const [projectType, setProjectType] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState({});
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const goToStep2 = () => {
    if (name.trim() === "") {
      alert("Please enter your full name");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (address.trim() === "") {
      alert("Please enter your address");
      return;
    }

    setStep(2);
  };

  const goToStep3 = () => {
    if (propertyType === "") {
      alert("Please select Property Type");
      return;
    }

    if (projectType === "") {
      alert("Please select Project Type");
      return;
    }

    setStep(3);
  };

  const roomComponents = {
    Kitchen: [
      "Lower Cabinets",
      "Loft Storage",
      "Crockery Unit",
      "Breakfast Counter",
    ],

    "Living Room": [
      "TV Unit With Drawers",
      "Pooja Room",
      "Partition With Jamb Paneling",
      "Vanity Counter",
    ],

    "Master Bedroom": [
      "Wardrobe",
      "Loft Storage",
      "Dressing Table",
      "Cot",
      "Side Table",
    ],

    "Bedroom 2": [
      "Wardrobe",
      "Loft Storage",
      "Dressing Table",
      "Cot",
      "Side Table",
    ],

    "Bedroom 3": [
      "Wardrobe",
      "Loft Storage",
      "Dressing Table",
      "Cot",
      "Side Table",
    ],

    "Dining Section": [],

    "TV Unit": ["TV Unit"],

    "Utility Area": [],
  };

  const getRooms = () => {
    let rooms = [
      "Kitchen",
      "Living Room",
      
    ];

    if (propertyType === "1 BHK") {
      rooms.splice(2, 0, "Master Bedroom");
    }

    if (propertyType === "2 BHK") {
      rooms.splice(
        2,
        0,
        "Master Bedroom",
        "Bedroom 2"
      );
    }

    if (propertyType === "3 BHK") {
      rooms.splice(
        2,
        0,
        "Master Bedroom",
        "Bedroom 2",
        "Bedroom 3"
      );
    }

    return rooms;
  };

  return (
    <div className="container">
      <div className="form-card">

        {/* STEP 1 */}

        {step === 1 && (
          <>
            <h1>
              Get Your Free
              <br />
              <span className="gold">
                Interior Quotation
              </span>
            </h1>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="text"
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>Address</label>

              <textarea
                rows="5"
                placeholder="Enter your address"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
              />
            </div>

            <button
              className="quote-btn"
              onClick={goToStep2}
            >
              Get Free Quotation
            </button>
          </>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <>
            <h1>
              Project
              <br />
              <span className="gold">
                Information
              </span>
            </h1>

            <div className="section-title">
              Property Type
            </div>

            <div className="card-grid">
              <div
                className={`select-card ${
                  propertyType === "1 BHK"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setPropertyType("1 BHK")
                }
              >
                1 BHK
              </div>

              <div
                className={`select-card ${
                  propertyType === "2 BHK"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setPropertyType("2 BHK")
                }
              >
                2 BHK
              </div>

              <div
                className={`select-card ${
                  propertyType === "3 BHK"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setPropertyType("3 BHK")
                }
              >
                3 BHK
              </div>
            </div>

            <div className="section-title">
              Project Type
            </div>

            <div className="card-grid">
              <div
                className={`select-card ${
                  projectType === "New Interior"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setProjectType("New Interior")
                }
              >
                New Interior
              </div>

              <div
                className={`select-card ${
                  projectType === "Renovation"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setProjectType("Renovation")
                }
              >
                Renovation
              </div>
            </div>

            <div className="button-group">
              <button
                className="back-btn"
                onClick={() => setStep(1)}
              >
                Back
              </button>

              <button
                className="quote-btn"
                onClick={goToStep3}
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <>
            <h1>
              Select
              <br />
              <span className="gold">
                Rooms
              </span>
            </h1>

            <div className="card-grid">
              {getRooms().map((room) => (
                <div
                  key={room}
                  className={`select-card ${
                    selectedRooms.includes(room)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      selectedRooms.includes(room)
                    ) {
                      setSelectedRooms(
                        selectedRooms.filter(
                          (r) => r !== room
                        )
                      );
                    } else {
                      setSelectedRooms([
                        ...selectedRooms,
                        room,
                      ]);
                    }
                  }}
                >
                  {room}
                </div>
              ))}
            </div>

            <div className="button-group">
              <button
                className="back-btn"
                onClick={() => setStep(2)}
              >
                Back
              </button>

              <button
                className="quote-btn"
                onClick={() => {
                  if (selectedRooms.length === 0) {
                    alert(
                      "Please select at least one room"
                    );
                    return;
                  }
                  setStep(4);

                  
                }}
              >
                Continue
              </button>
            </div>
          </>
        )}
        {/* STEP 4 */}

{step === 4 && (

<>
  <h1>
    Select
    <br />
    <span className="gold">
      Components
    </span>
  </h1>
  <ComponentCard
   title="Wardrobe"
   image={wardrobeImage}
   selected={false}
/>

  {selectedRooms.map((room) => (

    <div key={room}>

      <div className="section-title">
        {room}
      </div>

      <div className="card-grid">

        {roomComponents[room]?.map((component) => (

          <div
            key={component}
            className={`select-card ${
              selectedComponents[room]?.includes(component)
                ? "active"
                : ""
            }`}
            onClick={() => {

              const current =
                selectedComponents[room] || [];

              let updated;

              if (current.includes(component)) {

                updated = current.filter(
                  item => item !== component
                );

              } else {

                updated = [
                  ...current,
                  component
                ];

              }

              setSelectedComponents({
                ...selectedComponents,
                [room]: updated
              });

            }}
          >
            {component}
          </div>

        ))}

      </div>

    </div>

  ))}

  <div className="button-group">

    <button
      className="back-btn"
      onClick={() => setStep(3)}
    >
      Back
    </button>

    <button
      className="quote-btn"
      onClick={() => {
        console.log(selectedComponents);

        alert(
          "Components Selected Successfully"
        );
      }}
    >
      Continue
    </button>

  </div>

</>

)}
      </div>
    </div>
  );
}

export default App;