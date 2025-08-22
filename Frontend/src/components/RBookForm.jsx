import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BookingForm = () => {
  const { packageId } = useParams();
  const location = useLocation();
  const [pkg, setPkg] = useState(location.state?.package || null);

  useEffect(() => {
    // If not passed via state, fetch from backend
    if (!pkg) {
      fetch(`http://localhost:8080/api/packages/${packageId}`)
        .then(res => res.json())
        .then(data => setPkg(data))
        .catch(err => console.error('Error loading package:', err));
    }
  }, [packageId, pkg]);

  if (!pkg) return <div>Loading package info...</div>;

  return (
    <div className="booking-form-container">
      <h2>Booking for: {pkg.packageName}</h2>
      <p>Price: ${pkg.price}</p>
      <p>Description: {pkg.description}</p>
      {/* Add your form fields here (name, date, time, etc.) */}
      <form>
        {/* Example input */}
        <label>Date:
          <input type="date" name="date" required />
        </label>
        <label>Time:
          <input type="time" name="time" required />
        </label>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
