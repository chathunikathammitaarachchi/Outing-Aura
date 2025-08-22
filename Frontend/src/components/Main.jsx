import { Link } from 'react-router-dom';
import "./Home.css";
import Navbar from "./Navbar";
import home_1 from '../assets/home_1.jpeg';
import home_2 from '../assets/home_2.jpg';
import home_3 from '../assets/home_3.jpg';
import home_4 from '../assets/home_4.jpeg';
import event_1 from '../assets/Event_1.jpg';
import event_2 from '../assets/events_2.jpg';
import event_3 from '../assets/event_3.jpg';
import cel_1 from '../assets/cel_1.jpg';
import Footer from './Footer';

function Hero() {
  return (
    <div>
      <Navbar />
      <div className="hero">
        
        <div className="hero-content">
          <h1 className="brand-name">OutingAura</h1>
          <p className="tagline">
            "Experience comfort and luxury with exceptional hospitality at Mitchell-Grand—your perfect getaway starts here!"
          </p>
          <p className="deals">Incredible last-minute hotel deals.</p>
          <Link to="/bookingForm">
            <button className="book-now">Book Now</button>
          </Link>
        </div>
      </div>

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
      <Footer/>
    </div>
  );
}

export default Hero;
