import React from 'react';
import './Contact.css';
import Navbar from './Navbar.jsx'; 
import Footer from './Footer.jsx'



function Contact() {
  return (
    <div>
      <Navbar/>
      <div className="contact-container">
        <div className="contact-left">
          <div className="header">
            <h3 className="get-in-touch">GET IN TOUCH</h3>
            <h1 className="company-name">Outing Aura LK</h1>
          </div>
          
          <p className="description">
            Planning a day outing can be a special event, whether it's for a 
            bride-to-be, a get-together, or a meetup. Just as you'd hire 
            professionals for decorations, food, or photographers, why not 
            let an expert manage the details? From choosing the perfect 
            location to organizing activities, we handle all the logistics, 
            allowing you to relax and enjoy the day while making lasting 
            memories. Let us take care of the planning for you!
          </p>
          <div className="contact-info">
            <div className="info-section">
              <h3 className="info-title">Phone</h3>
              <div className="info-box">
                <p>0112 579 900</p>
              </div>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Email</h3>
              <div className="info-box">
                <p>mitchellgrandhotels@gmail.com</p>
              </div>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Address</h3>
              <div className="info-box address-box">
                <p>No: 107/E2, Arangapolawatta Weliwita, Kaduwela 10640</p>
              </div>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Website</h3>
              <div className="info-box website-box">
                
              </div>
            </div>
          </div>
          </div>
        
        <div className="contact-right">
          <h2 className="form-header">CONTACT FORM</h2>
          <h3 className="feedback-title">Give Your Feedback</h3>
          
          <p className="privacy-notice">
            Your email address will not be published. Required fields are marked
          </p>
          
          <form className="contact-form">
            <div className="form-row">
              <input 
                type="text" 
                id="name" 
                placeholder="Your Name" 
                className="form-input half-width"
              />
              
              <input 
                type="email" 
                id="email" 
                placeholder="Email Address" 
                className="form-input half-width"
              />
            </div>
            <input 
              type="text" 
              id="subject" 
              placeholder="Subject" 
              className="form-input full-width"
            />
            
            <textarea 
              id="message" 
              placeholder="Message Goes here ..." 
              className="form-input full-width message-area"
            ></textarea>
            
            <button type="submit" className="submit-button">
              SUBMIT NOW
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;