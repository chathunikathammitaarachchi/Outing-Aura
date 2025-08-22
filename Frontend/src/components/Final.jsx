import React from 'react';
import Navbar from './Navbar';
import bgImage from '../assets/back.jpg';
import Footer from './Footer.jsx';

function Final() {
  return (
    <div>
      <Navbar />

      {/* Background Section */}
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
          fontFamily: 'Arial, sans-serif',
          padding: '40px 20px',
        }}
      >
        {/* Centered Content Box */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '30px 40px',
            borderRadius: '10px',
            maxWidth: '800px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', marginBottom: '20px' }}>
            Thank you for choosing Outing Aura!
          </p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'deeppink', marginBottom: '20px' }}>
            Your booking has been successfully submitted and is pending. Check your email.
          </p>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
            We appreciate your trust in us and look forward to providing you with an unforgettable experience. 
            If you have any special requests or need further assistance, feel free to contact us. 
            Have a great day!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Final;
