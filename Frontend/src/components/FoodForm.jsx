import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import backgroundImage from '../assets/book.jpg';
import Footer from "./Footer"

const FoodForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedEvent, selectedDate, selectedTime, selectedFoodPackage } = location.state || {};

  const [numberOfPeople, setNumberOfPeople] = useState(20);
  const [totalPrice, setTotalPrice] = useState(20 * (Number(selectedFoodPackage?.price) || 0));
  const [selectedDecorationPackage, setSelectedDecorationPackage] = useState(null);

  const exchangeRate = 365;

  useEffect(() => {
    const foodPrice = selectedFoodPackage?.price || 0;
    const decorationPrice = selectedDecorationPackage?.price || 0;
    setTotalPrice(numberOfPeople * (foodPrice + decorationPrice));
  }, [numberOfPeople, selectedFoodPackage, selectedDecorationPackage]);

  const handlePeopleChange = (e) => {
    const value = Math.max(20, e.target.value);
    setNumberOfPeople(value);
  };

  const handleAddOtherPackages = () => {
    navigate("/deform", {
      state: {
        selectedEvent,
        selectedDate,
        selectedTime,
        selectedCategory: "decoration",
      },
    });
  };

 const handleFinishBooking = () => {
  navigate("/summary", {
    state: {
      selectedEvent,
      selectedDate,
      selectedTime,
      selectedFoodPackage,
      numberOfPeople,
      totalPrice,
    },
  });
};


  return (
    <div >
      <Navbar />
       <div>
            {/* Background image div */}
            <div
              className="page-background"
              style={{
                backgroundImage: `url(${backgroundImage})`
              }}
            />
          
      <div
        style={{
          fontFamily: "Segoe UI, sans-serif",
          padding: "30px",
          maxWidth: "600px",
          margin: "30px auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          opacity: "0.6"
          
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "26px", color: "#222" }}>
          Booking for: {selectedEvent}
        </h1>

        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "20px", lineHeight: "1.6", fontSize: "16px", color: "#333" }}>
            <p><strong>Event:</strong> {selectedEvent}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
          </div>

          <div style={{ marginBottom: "20px", fontSize: "16px", color: "#333" }}>
            <p><strong>Package Name:</strong> {selectedFoodPackage?.name || "Not selected"}</p>
            <p>
              <strong>Price per Person:</strong> LKR {selectedFoodPackage?.price} / USD{" "}
              {(selectedFoodPackage?.price / exchangeRate).toFixed(2)}
            </p>
          </div>

          <label style={{ marginBottom: "20px", color: "#444", fontWeight: "500" }}>
            Number of People:
            <input
              type="number"
              value={numberOfPeople}
              onChange={handlePeopleChange}
              min="20"
              required
              style={{
                padding: "10px",
                fontSize: "15px",
                marginTop: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </label>

          <div style={{ marginBottom: "20px", backgroundColor: "#f7f7f7", padding: "15px", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "10px", color: "#333" }}>Price Breakdown</h3>
            <p style={{ fontSize: "15px" }}>
              Food Package: LKR {selectedFoodPackage?.price} / USD{" "}
              {(selectedFoodPackage?.price / exchangeRate).toFixed(2)}
            </p>
            {selectedDecorationPackage && (
              <p style={{ fontSize: "15px" }}>
                Decoration Package: LKR {selectedDecorationPackage?.price} / USD{" "}
                {(selectedDecorationPackage?.price / exchangeRate).toFixed(2)}
              </p>
            )}
          </div>

          <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "30px", color: "#222" }}>
            Total Price: LKR {totalPrice} / USD {(totalPrice / exchangeRate).toFixed(2)}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <button
              type="button"
              onClick={handleFinishBooking}
              style={{
                padding: "12px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Finish Booking
            </button>

            <button
              type="button"
              onClick={handleAddOtherPackages}
              style={{
                padding: "12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Add Decoration Packages
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
     </div>
  );
};

export default FoodForm;
