import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import bgImage from '../assets/login.jpg'; // New image import
import home_1 from '../assets/home_1.jpeg';
import home_2 from '../assets/home_2.jpg';
import home_3 from '../assets/home_3.jpg';
import home_4 from '../assets/home_4.jpeg';
import event_1 from '../assets/Event_1.jpg';
import event_2 from '../assets/events_2.jpg';
import event_3 from '../assets/event_3.jpg';
import cel_1 from '../assets/cel_1.jpg';
import Footer from './Footer';
import './Home.css'




const BookingForm = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookings, setBookings] = useState([]);

  const events = ['Birthday', 'Conference', 'Bride-to-be', 'Meet up', 'Get Together'];

  const navigate = useNavigate();

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 8; i <= 19; i++) {
      slots.push(`${i}:00 - ${i + 5}:00`);
    }
    return slots;
  };

 const handleSubmit = async () => {
  if (!selectedEvent || !selectedDate || !selectedTime) {
    alert('Please fill all fields before submitting.');
    return;
  }

  // Prevent past date selection
  const today = new Date().toISOString().split('T')[0];
  if (selectedDate < today) {
    alert('Cannot book past dates.');
    return;
  }

  const newBooking = {
    event: selectedEvent,
    date: selectedDate,
    time: selectedTime,
  };

  try {
    await axios.post('http://localhost:8080/api/booking', newBooking, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    alert('Booking saved successfully!');

    setSelectedEvent('');
    setSelectedDate('');
    setSelectedTime('');

    navigate('/package', {
      state: {
        selectedEvent,
        selectedDate,
        selectedTime,
      },
    });
  } catch (error) {
    console.error('Booking failed:', error.response?.data || error.message);
    alert(error.response?.data || 'Booking failed. Please try again.');
  }
};


  return (
    <div>
      <Navbar/>
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        padding: '40px 0',
      }}
    >
     <div
  style={{
    backgroundImage: `url(${bgImage})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>

        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            borderRadius: '8px',
            padding: '30px',
            width: '80%',
            maxWidth: '800px',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '36px' }}>OutingAura</h1>

          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Book Your Event</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Event:</label>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                >
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option key={event} value={event}>
                      {event}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>When:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      marginRight: '10px',
                      width: '100%',
                    }}
                  />
                  <Calendar style={{ color: '#333' }} size={24} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Time:</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                >
                  <option value="">Select Time</option>
                  {generateTimeSlots().map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '12px 30px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          marginTop: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <section className="section-content">
                {/* Mitchell Grand */}
                <div className="section-box">
                  <h2 className="section-title underline-style">Mitchell Grand</h2>
                  <p className="section-text">
                    Looking for the perfect place to relax, celebrate, or host an event? Mitchell Grand offers a luxurious
                    and comfortable setting for all your special moments. Whether you're planning a fun day outing,
                    corporate conference, birthday party, meet-up, or bride-to-be, we have the perfect spaces and services
                    to make your event memorable!
                  </p>
                  <div className="images-grid">
                    <img src={home_1} alt="Mitchell Grand 1" />
                    <img src={home_2} alt="Mitchell Grand 2" />
                    <img src={home_3} alt="Mitchell Grand 3" />
                    <img src={home_4} alt="Mitchell Grand 4" />
                  </div>
                </div>
        
                {/* Meetings & Events */}
                <div className="section-box section-right-align">
                  <div className="text-column">
                    <h2 style={{ marginBottom: '25px' }}>Meetings & Events</h2>
                    <p className="section-text">
                      Achieve more with every meeting and event you plan with us. Create priceless experiences that are engaging and productive.
                    </p>
                  </div>
                  <div className="image-column">
                    <img src={event_1} alt="Event 1" />
                    <img src={event_2} alt="Event 2" />
                  </div>
                </div>
        
                {/* Celebrations - text right, images left */}
                <div className="section-box section-left-image">
                  <div className="image-column">
                    <img src={event_3} alt="Celebration 1" />
                    <img src={cel_1} alt="Celebration 2" />
                  </div>
                  <div className="text-column">
                    <h2 style={{ marginBottom: '25px' }}>...Celebrations...</h2>
                    <p className="section-text">
                      A celebration is more than details, venues and visions—it’s about moments. At Mitchell-Grand we enable amazing experiences,
                      so you can focus on what really matters: the moments shared with family and friends.
                    </p>
                  </div>
                </div>
              </section>
             
      </div>
    </div>
     <Footer/>
    </div>
  );
};

export default BookingForm;
