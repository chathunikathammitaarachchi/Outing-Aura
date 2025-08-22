import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const DecorationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedEvent, selectedDate, selectedTime, selectedFoodPackage, selectedDecorationPackage } = location.state || {};

  const [numberOfPeople, setNumberOfPeople] = useState(20);
  const [totalPrice, setTotalPrice] = useState(
    (Number(selectedFoodPackage?.price) || 0) + (Number(selectedDecorationPackage?.price) || 0)
  );

  useEffect(() => {
    const decorationPrice = selectedDecorationPackage?.price || 0;
    setTotalPrice(decorationPrice); 
  }, [numberOfPeople, selectedDecorationPackage]);
  
  const exchangeRate = 365;

  const handleFinishBooking = () => {
    navigate("/summary", {
      state: {
        selectedEvent,
        selectedDate,
        selectedTime,
        selectedDecorationPackage,
        totalPrice,
      },
    });
  };

  return (
    <div>
      <Navbar/>
      <div style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#f5f5f5",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{
          maxWidth: "900px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          textAlign: "center",
        }}>
          <h1 style={{
            fontSize: "32px",
            color: "#333",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            Decoration Booking for: {selectedEvent}
          </h1>

          <form onSubmit={(e) => e.preventDefault()} style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 0",
          }}>
            <div style={{
              marginBottom: "30px",
              textAlign: "left",
              padding: "0 20px"
            }}>
              <p style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "600"
              }}><strong>Event:</strong> {selectedEvent}</p>
              <p style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "600"
              }}><strong>Date:</strong> {selectedDate}</p>
              <p style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "600"
              }}><strong>Time:</strong> {selectedTime}</p>
              <p style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "600"
              }}><strong>Decoration Package:</strong> {selectedDecorationPackage?.name}</p>
            </div>

            <div style={{
              marginTop: "20px",
              marginBottom: "20px",
              borderTop: "1px solid #ddd",
              paddingTop: "20px",
              paddingBottom: "20px",
              textAlign: "left",
              padding: "0 20px"
            }}>
              <h3 style={{
                fontSize: "20px",
                color: "#333",
                fontWeight: "600",
                marginBottom: "15px"
              }}>Price Breakdown:</h3>
              {selectedDecorationPackage && (
                <p style={{
                  fontSize: "16px",
                  color: "#555",
                  marginBottom: "10px"
                }}>
                  Decoration Package Price: <strong>LKR {selectedDecorationPackage?.price}</strong> /{' '}
                  <strong>USD {(selectedDecorationPackage?.price / exchangeRate).toFixed(2)}</strong>
                </p>
              )}
            </div>

            <div style={{
              marginTop: "20px",
              paddingTop: "15px",
              borderTop: "1px solid #ddd",
              textAlign: "left",
              padding: "0 20px"
            }}>
              <p style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#333"
              }}>
                Total Price: LKR {totalPrice} /{' '}
                <strong>USD {(totalPrice / exchangeRate).toFixed(2)}</strong>
              </p>
            </div>

            <div style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}>
              <button
                type="button"
                onClick={handleFinishBooking}
                style={{
                  padding: "12px 35px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "18px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  width: "50%",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
              >
                Finish Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DecorationForm;
