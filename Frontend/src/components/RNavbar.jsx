
import { Link } from 'react-router-dom';

import './Navbar.css'
import logo from "../assets/logo.jpg";// Adjust the path to your logo image

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} alt="My Website Logo" className="logo" />
            </div>
           
            <ul className="nav-links">
                <li>
                    <Link to="/rhome">Home</Link>
                </li>
                <li>
                    <Link to="/booking">Bookings</Link>
                </li>
            
                <li>
                    <Link to="/about">About Us</Link>
                </li>
                <li>
                    <Link to="/rlogin">LogOut</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
