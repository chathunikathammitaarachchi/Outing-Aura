import { useLocation } from "react-router-dom";

const BookingConfirmation = ({ onConfirm }) => {
  const location = useLocation();
  const bookingData = location.state;

  if (!bookingData || !bookingData.user) {
    return <div style={{ padding: "20px", color: "red" }}>Error: Booking data is missing.</div>;
  }

  const exchangeRate = 365;
  const totalUSD = (bookingData.totalPrice / exchangeRate).toFixed(2);

  const containerStyle = {
    maxWidth: "800px",
    margin: "20px auto",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    backgroundColor: "#1F2937",
    color: "white",
    padding: "24px",
    textAlign: "center",
  };

  const contentStyle = {
    padding: "24px",
  };

  const infoBoxStyle = {
    backgroundColor: "#F9FAFB",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#10B981",
    color: "white",
    padding: "12px 32px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#059669",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Confirm Your Booking</h2>
      </div>
      <div style={contentStyle}>
        <div style={infoBoxStyle}>
         
          <p><strong>Email:</strong> {bookingData.user?.email}</p>

          <p><strong>Event:</strong> {bookingData.selectedEvent}</p>
          <p><strong>Date:</strong> {bookingData.selectedDate}</p>
          <p><strong>Time:</strong> {bookingData.selectedTime}</p>
          <p><strong>Food Package:</strong> {bookingData.selectedFoodPackage?.name}</p>
          {bookingData.selectedDecorationPackage && (
            <p><strong>Decoration Package:</strong> {bookingData.selectedDecorationPackage?.name}</p>
          )}
          <p><strong>Number of People:</strong> {bookingData.numberOfPeople}</p>
          <p style={{ fontWeight: "bold", fontSize: "18px", marginTop: "12px" }}>
            Total Price: LKR {bookingData.totalPrice} / USD {totalUSD}
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onConfirm}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            style={buttonStyle}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
