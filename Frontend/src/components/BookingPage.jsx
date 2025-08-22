import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookingPage.css';
import Navbar from './Navbar';

const BookingPage = () => {
  const { category } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/packages/category/${category}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [category]);

  const openBookingForm = (pkg) => {
    setSelectedPackage(pkg);
    setDate('');
    setTime('');
    setNotes('');
    setContactNumber('');
    setCustomerName('');
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    const bookingData = {
      userId,
      packageId: selectedPackage._id,
      bookingDate: date,
      bookingTime: time,
      notes,
      customerName,
      contactNumber
    };

    try {
      const response = await fetch('http://localhost:8080/api/rbookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const responseText = await response.text();
      try {
        const data = JSON.parse(responseText);
        console.log("Server JSON:", data);
      } catch {
        console.log("Server Text:", responseText);
      }

      alert(`Booking successful! Package ID: ${selectedPackage._id}`);
      setSelectedPackage(null);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed');
    }
  };

  if (loading) return <div className="loading-spinner">Loading packages...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="booking-page">
        <h2 className="page-title">{category} Packages</h2>

        {packages.length > 0 ? (
          <div className="packages-grid">
        {packages.map((pkg, index) => (
  <div key={pkg._id ?? index} className="package-card">
    <div className="image-container">
      {pkg.imageUrl ? (
        <img
          src={`http://localhost:8080${pkg.imageUrl}`}
          alt={pkg.packageName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      ) : (
        <div className="image-placeholder"><span>No Image</span></div>
      )}
    </div>

    <div className="package-details">
      <h3>{pkg.packageName}</h3>
      <p>{pkg.description}</p>
      <p>Rs {pkg.price.toLocaleString()}</p>
      <button onClick={() => openBookingForm(pkg)} className="book-now-button">
        Book Now
      </button>
    </div>
  </div>
))}

          </div>
        ) : (
          <p className="no-packages">No packages found for {category}</p>
        )}

        {selectedPackage && (
          <div className="booking-modal">
            <div className="booking-form-card">
              <h2>Package Name: {selectedPackage.packageName}</h2>
              <h3>Description: {selectedPackage.description}</h3>
              <h3>Price: Rs {selectedPackage.price.toLocaleString()}</h3>

              <form onSubmit={handleBookingSubmit}>
                <label>Customer Name:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />

                <label>Contact Number:</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />

                <label>Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />

                <label>Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />

                <label>Notes:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional notes..."
                  rows={4}
                />

                <button type="submit" className="submit-booking">Confirm Booking</button>
                <button type="button" onClick={() => setSelectedPackage(null)} className="cancel-button">Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
