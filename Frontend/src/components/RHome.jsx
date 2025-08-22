import { useState, useEffect } from 'react';
import './RHome.css';
import { Link } from 'react-router-dom';

// Import images directly
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';
import image5 from '../assets/5.jpg';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  // Use imported images
  const backgroundImages = [image1, image2, image3, image4, image5];

  const imageChangeInterval = 5000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setFadeState('fade-in');
      }, 1000);
    }, imageChangeInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-page-wrapper1">
      <div 
        className={`background-container ${fadeState}`} 
        style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }} 
      />
      <div className="overlay" />
      <header className="navbar1">
        <div className="logo1">Outing Aura</div>
        <nav className="nav-container1">
          <ul>
           
            <li><Link to="/about">About</Link></li>
            <li><Link to="/rlogin">Login</Link></li>
          </ul>
        </nav>
      </header>
      <div className="content-container1">
        <div className="text-box1">
          <h1 className="animated-heading">Welcome to Our Amazing Service</h1>
          <p className='home-par'>
            At Outing Aura, we specialize in creating unforgettable experiences...
          </p>
          <div className="buttons1">
            <Link to="/user-category" className="cta-button primary">Explore Packages</Link>
            <Link to="/about" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
        <div className="image-indicators">
          {backgroundImages.map((_, index) => (
            <button 
              key={index}
              className={`image-indicator ${currentImageIndex === index ? 'active' : ''}`}
              onClick={() => {
                setFadeState('fade-out');
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setFadeState('fade-in');
                }, 1000);
              }}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;