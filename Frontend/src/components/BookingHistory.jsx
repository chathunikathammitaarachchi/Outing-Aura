import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar'
import "./AdminBookingHistory.css";

const AdminBookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/rbookings");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateBookingStatus = async (id, status, email, phoneNumber) => {
    let rejectionReason = "";
    if (status === "Rejected") {
      rejectionReason = prompt("Please provide a reason for rejection:");
      if (!rejectionReason) {
        alert("Rejection reason is required.");
        return;
      }
    }

    try {
      await axios.patch(`http://localhost:8080/api/rbookings/${id}`, {
  status,
  rejectionReason,
});



      alert(`Booking status updated to ${status}. Notification sent to ${email}`);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="admin-booking-container">
      <h2 className="admin-heading">Admin Booking History</h2>
      {bookings.map((b) => (
  <div key={b.id} className="booking-card">
    <p><strong>User Email:</strong> {b.userEmail}</p>
    <p><strong>Event:</strong> {b.selectedEvent}</p>
    <p><strong>Date:</strong> {b.selectedDate}</p>
    <p><strong>Time:</strong> {b.selectedTime}</p>
    <p><strong>Number of People:</strong> {b.numberOfPeople}</p>

    <p><strong>Food Package:</strong> {b.selectedFoodPackage || 'Not selected'}</p>
    <p><strong>Food Package Price:</strong> LKR {b.foodPackagePrice}</p>

    {b.selectedDecorationPackage && (
      <>
        <p><strong>Decoration Package:</strong> {b.selectedDecorationPackage}</p>
        <p><strong>Decoration Package Price:</strong> LKR {b.decorationPackagePrice}</p>
      </>
    )}

    <p><strong>Total Price:</strong> LKR {b.totalPrice}</p>

    <p><strong>Status:</strong> 
      <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
    </p>

    {b.status === "Rejected" && b.rejectionReason && (
      <p style={{ color: 'red' }}><strong>Rejection Reason:</strong> {b.rejectionReason}</p>
    )}

    {b.status === "Pending" && (
      <div className="button-group">
        <button
          onClick={() => handleUpdateBookingStatus(b.id, "Accepted", b.userEmail, b.userPhoneNumber)}
          className="btn accept-btn"
        >
          Accept
        </button>
        <button
          onClick={() => handleUpdateBookingStatus(b.id, "Rejected", b.userEmail, b.userPhoneNumber)}
          className="btn reject-btn"
        >
          Reject
        </button>
      </div>
    )}
  </div>
))}

    </div>
    </div>
  );
};

export default AdminBookingHistory;
