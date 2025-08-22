import  { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RBookingForm.css';

const BookingForm = () => {
  const { state } = useLocation();
  const selectedPackage = state?.selectedPackage;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    packageName: selectedPackage?.packageName || '',
    price: selectedPackage?.price || '',
    description: selectedPackage?.description || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", formData);
    alert("Booking Successful!");
    // Add booking API call here if needed
  };

  if (!selectedPackage) return <p>No package selected.</p>;

  return (
    <div className="booking-form-container">
      <h2>Book Your Package</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input type="text" name="name" required onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" required onChange={handleChange} />
        </label>

        <label>
          Event Date:
          <input type="date" name="eventDate" required onChange={handleChange} />
        </label>

        <label>
          Package Name:
          <input type="text" name="packageName" value={formData.packageName} readOnly />
        </label>

        <label>
          Price:
          <input type="text" name="price" value={`Rs ${formData.price}`} readOnly />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} readOnly />
        </label>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
