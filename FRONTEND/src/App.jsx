import { useState } from "react";
import "./App.css";

import ComponentCard from "./components/ComponentCard";
import { componentData } from "./data/componentData";
import { componentPrices } from "./data/pricing";
import { generateQuotation } from "./utils/generateQuotation";
import logo from "./assets/company/logo.png";
function App() {
  // Navigation
  const [step, setStep] = useState(1);

  // Customer Details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Project Details
  const [propertyType, setPropertyType] = useState("");
  const [projectType, setProjectType] = useState("");

  // Room Selection
  const [selectedRooms, setSelectedRooms] = useState([]);

  // Component Selection
  const [selectedComponents, setSelectedComponents] = useState({});

  // Current Room (Step 4)
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const [generatingQuote, setGeneratingQuote] = useState(false);

  const [squareFeet, setSquareFeet] = useState("");

  // -----------------------
  // STEP 1 VALIDATION
  // -----------------------

  const goToStep2 = () => {

    if (name.trim() === "") {
      alert("Enter Full Name");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Enter valid Mobile Number");
      return;
    }

    if (address.trim() === "") {
      alert("Enter Address");
      return;
    }

    setStep(2);
  };

  // -----------------------
  // STEP 2 VALIDATION
  // -----------------------

  const goToStep3 = () => {

    if (propertyType === "") {
      alert("Select Property Type");
      return;
    }

    if (projectType === "") {
      alert("Select Project Type");
      return;
    }
    if (squareFeet === "" || Number(squareFeet) <= 0) {

      alert("Enter Total Property Area");

      return;

    }

    setStep(3);
  };

  // -----------------------
  // STEP 3 VALIDATION
  // -----------------------

  const goToStep4 = () => {

    if (selectedRooms.length === 0) {

      alert("Select at least one room");
      return;

    }

    setCurrentRoomIndex(0);
    setStep(4);
  };

  // -----------------------
  // DYNAMIC ROOMS
  // -----------------------

  const getRooms = () => {

    let rooms = [
      "Kitchen",
      "Living Room"
    ];

    if (propertyType === "1 BHK") {

      rooms.push("Master Bedroom");

    }

    if (propertyType === "2 BHK") {

      rooms.push(
        "Master Bedroom",
        "Bedroom 2"
      );

    }

    if (propertyType === "3 BHK") {

      rooms.push(
        "Master Bedroom",
        "Bedroom 2",
        "Bedroom 3"
      );

    }

    rooms.push(
      "Utility Area"
    );

    return rooms;

  };

  const currentRoom = selectedRooms[currentRoomIndex];

  const toggleComponent = (componentData) => {

    const current = selectedComponents[currentRoom] || [];

    const existingIndex = current.findIndex(
      (item) => item.name === componentData.name
    );

    let updated;

    if (existingIndex !== -1) {

      // Update existing component
      updated = [...current];
      updated[existingIndex] = componentData;

    } else {

      // Add new component
      updated = [...current, componentData];

    }

    setSelectedComponents({
      ...selectedComponents,
      [currentRoom]: updated,
    });

  };

  const nextRoom = () => {

    const currentSelections =
      selectedComponents[currentRoom] || [];

    // Check if at least one component is selected
    if (currentSelections.length === 0) {
      alert("Please select at least one component.");
      return;
    }

    // Check every selected component has a valid quantity
    for (const component of currentSelections) {

      if (
        !component.quantity ||
        Number(component.quantity) <= 0
      ) {
        alert(
          `Please enter the required quantity for ${component.name}.`
        );
        return;
      }

    }

    // Move to next room
    if (currentRoomIndex < selectedRooms.length - 1) {

      setCurrentRoomIndex(currentRoomIndex + 1);

    } else {

      setStep(5);

    }

  };
  const calculateTotal = () => {

    let total = 0;

    Object.values(selectedComponents).forEach((components) => {

      components.forEach((component) => {

        total += component.total || 0;

      });

    });

    return total;

  };
  const previousRoom = () => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1);
    } else {
      setStep(3);
    }
  };
  if (generatingQuote) {
    return (
      <div className="loading-screen">

        <div className="loading-card">

          <img
            src={logo}
            alt="Jeo Interiors"
            className="loading-logo"
          />

          <h2>
            Preparing Your
            <br />
            <span className="gold">
              Professional Quotation
            </span>
          </h2>

          <div className="spinner"></div>

          <p>
            Please wait while we calculate
            your quotation...
          </p>

        </div>

      </div>
    );
  }
  return (
    <div className="container">

      {/* ---------------- STEP 1 ---------------- */}

      {step === 1 && (

        <div className="form-card">

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
              maxLength="10"
              value={phone}
              placeholder="Enter Mobile Number"
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
              rows="4"
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
            Continue
          </button>

        </div>

      )}

      {/* ---------------- STEP 2 ---------------- */}

      {step === 2 && (

        <div className="form-card">

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

            {["1 BHK", "2 BHK", "3 BHK"].map((type) => (

              <div
                key={type}
                className={`select-card ${propertyType === type ? "active" : ""
                  }`}
                onClick={() =>
                  setPropertyType(type)
                }
              >
                {type}
              </div>

            ))}

          </div>

          <div className="section-title">
            Project Type
          </div>

          <div className="card-grid">

            {[
              "New Interior",
              "Renovation"
            ].map((type) => (

              <div
                key={type}
                className={`select-card ${projectType === type ? "active" : ""
                  }`}
                onClick={() =>
                  setProjectType(type)
                }
              >
                {type}
              </div>

            ))}

          </div>
          <div className="form-group">

            <label>Total Property Area (Sq.ft)</label>

            <input
              type="number"
              placeholder="Enter Total Property Area"
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
            />

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

        </div>

      )}

      {/* ---------------- STEP 3 ---------------- */}

      {step === 3 && (

        <div className="form-card">

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

                className={`select-card ${selectedRooms.includes(room)
                  ? "active"
                  : ""
                  }`}

                onClick={() => {

                  if (
                    selectedRooms.includes(room)
                  ) {

                    setSelectedRooms(

                      selectedRooms.filter(
                        r => r !== room
                      )

                    );

                  } else {

                    setSelectedRooms([
                      ...selectedRooms,
                      room
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
              onClick={goToStep4}
            >
              Continue
            </button>

          </div>

        </div>

      )}
      {/* ---------------- STEP 4 ---------------- */}

      {step === 4 && (

        <div className="configurator-page">

          <div className="configurator-card">

            <h1>
              {currentRoom}
              <br />
              <span className="gold">
                Components
              </span>
            </h1>

            <p className="room-counter">
              Room {currentRoomIndex + 1} of {selectedRooms.length}
            </p>

            <div className="progress-wrapper">

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${((currentRoomIndex + 1) /
                      selectedRooms.length) * 100
                      }%`,
                  }}
                ></div>

              </div>

              <p className="progress-text">
                Step {currentRoomIndex + 1} of {selectedRooms.length}
              </p>

            </div>

            <div className="card-grid">

              {componentData[currentRoom]?.map((component) => (

                <ComponentCard
                  key={component.name}
                  component={component}
                  selected={
                    selectedComponents[currentRoom]?.some(
                      (item) => item.name === component.name
                    ) || false
                  }
                  onSelect={toggleComponent}
                />

              ))}

            </div>
            <div className="selected-count">

              Selected Components :

              {selectedComponents[currentRoom]?.length || 0}

            </div>

            <div className="button-group">

              <button
                className="back-btn"
                onClick={previousRoom}
              >
                Previous
              </button>

              <button
                className="quote-btn"
                onClick={nextRoom}
              >
                {currentRoomIndex === selectedRooms.length - 1
                  ? "Finish"
                  : "Next Room"}
              </button>

            </div>
          </div>
        </div>
      )}
      {/* ---------------- STEP 5 ---------------- */}

      {step === 5 && (

        <div className="review-page">

          <div className="review-card">

            <h1>
              Review Your
              <br />
              <span className="gold">
                Quotation
              </span>
            </h1>

            <h2>Customer Details</h2>

            <p><strong>Name:</strong> {name}</p>

            <p><strong>Phone:</strong> {phone}</p>

            <p><strong>Address:</strong> {address}</p>

            <hr />

            <h2>Project Details</h2>

            <p><strong>Property:</strong> {propertyType}</p>

            <p><strong>Project:</strong> {projectType}</p>

            <p>
              <strong>Area:</strong> {squareFeet} sq.ft
            </p>

            <hr />

            <h2>Selected Components</h2>

            {Object.keys(selectedComponents).map((room) => (

              <div key={room}>

                <h3>{room}</h3>

                <ul>

                  {selectedComponents[room].map((component) => (

                    <li key={`${room}-${component.name}`}>

                      ✓ <strong>{component.name}</strong>

                      {component.variant && (
                        <> ({component.variant})</>
                      )}

                      <br />

                      <small>
                        {component.quantity} {component.unit}
                      </small>

                    </li>

                  ))}

                </ul>

              </div>

            ))}
            <hr />



            <div className="button-group">

              <button
                className="back-btn"
                onClick={() => setStep(4)}
              >
                Back
              </button>

              <button
                className="quote-btn"
                onClick={() => {

                  setGeneratingQuote(true);

                  setTimeout(() => {

                    generateQuotation(
                      {
                        name,
                        phone,
                        address,
                      },
                      {
                        propertyType,
                        projectType,
                        squareFeet,
                      },
                      selectedComponents,
                      calculateTotal()
                    );

                    setGeneratingQuote(false);

                    alert(
                      "Quotation Generated Successfully!"
                    );

                  }, 2000);

                }}
              >
                Generate Quotation
              </button>

            </div>

          </div>

        </div>

      )}


    </div>
  );
}

export default App;