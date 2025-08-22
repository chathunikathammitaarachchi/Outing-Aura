import React from 'react';
import './AboutUs.css';
import Navbar from './Navbar';
import img1 from '../assets/about1.jpeg';
import img2 from '../assets/about2.jpeg';
import img3 from '../assets/about3.jpeg';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="about-us-container">
        <div className="text-section">
          <h3 className="highlight">WE ARE</h3>
          <h2 className="highlight">Outing Aura LK</h2>
          <p>
            Welcome to Outing Aura LK your ultimate destination for booking perfect day outings!
            Whether you're looking for a relaxing day in nature, an adventure-packed experience,
            or a peaceful retreat with family or friends, we’ve got you covered.
          </p>
          <p>
            At Outing Aura Lk, we make it easy to escape daily life and connect with what truly
            matters through our seamless booking platform. We offer a curated selection of outings,
            including nature hikes, adventure parks, wellness retreats, and family-friendly picnics.
            Partnering with trusted venues and local providers, we ensure high-quality,
            unforgettable experiences for all.
          </p>
          <h4>Our Mission</h4>
          <p>
            Our mission is to make planning your perfect day outing easy and enjoyable, offering
            diverse experiences tailored to your interests. Whether it's a weekend getaway,
            team-building event, or family outing, we prioritize safety and customer satisfaction
            to help you make the most of your time outdoors.
          </p>
        </div>

       <div className="image-container">
  <div className="circle-image image1">
    <img src={img1} alt="Outdoor Event 1" />
  </div>
  <div className="circle-image image2">
    <img src={img2} alt="Outdoor Event 2" />
  </div>
  <div className="circle-image image3">
    <img src={img3} alt="Outdoor Event 3" />
  </div>
</div>

      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
