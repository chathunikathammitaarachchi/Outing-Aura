import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import backgroundImage from '../assets/book.jpg';
import Footer from './Footer.jsx';

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedEvent,
    selectedDate,
    selectedTime,
    selectedFoodPackage,
    selectedDecorationPackage,
    numberOfPeople,
    totalPrice
  } = location.state || {};

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const exchangeRate = 365;
  const totalUSD = (totalPrice / exchangeRate).toFixed(2);

  if (!selectedEvent) {
    return <p>No booking details available.</p>;
  }

  const handleConfirmClick = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    localStorage.setItem("bookingData", JSON.stringify({
      userEmail: email,
      selectedEvent,
      selectedDate,
      selectedTime,
      selectedFoodPackage,
      selectedDecorationPackage,
      numberOfPeople,
      totalPrice
    }));

    fetch("http://localhost:8080/api/rbookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: email,
        selectedEvent,
        selectedDate,
        selectedTime,
        selectedFoodPackage: selectedFoodPackage?.name,
        foodPackagePrice: selectedFoodPackage?.price,
        selectedDecorationPackage: selectedDecorationPackage?.name || null,
        decorationPackagePrice: selectedDecorationPackage?.price || 0,
        numberOfPeople,
        totalPrice,
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to save booking");
        }
        return response.text();
      })
      .then(data => {
        console.log("Booking saved:", data);
        alert("Booking is successfully submitted and is pending. Check your email.");
        navigate("/final");
      })
      .catch(error => {
        console.error("Error saving booking:", error);
        setError("Failed to save booking.");
      });
  };

  return (
    <div>
      <Navbar />

      {/* Background Image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          opacity: 0.9,
        }}
      ></div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h2 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>
            Booking Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '16px', color: '#555' }}>
            <p><strong>Event:</strong> {selectedEvent}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Food Package:</strong> {selectedFoodPackage?.name || 'Not selected'}</p>
            <p><strong>Number of People:</strong> {numberOfPeople}</p>
            <p><strong>Food Package Price:</strong> LKR {selectedFoodPackage?.price} / USD {(selectedFoodPackage?.price / exchangeRate).toFixed(2)}</p>

            {selectedDecorationPackage && (
              <>
                <p><strong>Decoration Package:</strong> {selectedDecorationPackage?.name}</p>
                <p><strong>Decoration Package Price:</strong> LKR {selectedDecorationPackage?.price} / USD {(selectedDecorationPackage?.price / exchangeRate).toFixed(2)}</p>
              </>
            )}

            <p><strong>Total Price:</strong> LKR {totalPrice.toFixed(2)} / USD {totalUSD}</p>

            <label>
              <strong>Email:</strong>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  marginTop: '5px'
                }}
              />
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button
              onClick={handleConfirmClick}
              style={{
                padding: '12px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                width: '100%',
                maxWidth: '200px',
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingSummary;
