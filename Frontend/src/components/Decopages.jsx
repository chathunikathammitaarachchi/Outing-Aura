import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import backgroundImage from '../assets/hotelss.png';
import home_1 from '../assets/party 7.jpg';
import home_2 from '../assets/bi.jpg';
import home_3 from '../assets/party 1.jpg';
import home_4 from '../assets/party 2.jpg';
import './Decopages.css'
import Footer from './Footer.jsx'

const DecoPackage = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(365);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedEvent, selectedDate, selectedTime, selectedDecorationPackage } = location.state || {};  

  const filterOptions = [
    "All",
    "Food",
    "Conference",
    "Meet up",
    "Bride-to-Be",
    "Get Together",
    "Birthday",
    "Decoration",
  ];

  useEffect(() => {
    fetchPackages();
    if (location.state && location.state.selectedEvent) {
      const eventType = location.state.selectedEvent;
      setSelectedFilters([eventType, "decoration"]);
    }
  }, [location.state]);

  const fetchPackages = async () => {
    try {
      const foodPackagesRes = await axios.get("http://localhost:8080/api/packages");
      const decorationPackagesRes = await axios.get("http://localhost:8080/api/decopackages");
      const combinedPackages = [...foodPackagesRes.data, ...decorationPackagesRes.data];
      setPackages(combinedPackages);

      if (location.state && location.state.selectedEvent) {
        const eventType = location.state.selectedEvent;
        const filtered = combinedPackages.filter(pkg =>
          pkg.category.toLowerCase().includes("decoration") &&
          (pkg.name.toLowerCase().includes(eventType.toLowerCase()) || 
           pkg.category.toLowerCase().includes(eventType.toLowerCase()))
        );
        setFilteredPackages(filtered);
      } else {
        setFilteredPackages(combinedPackages);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleFilterChange = (category) => {
    if (category === "All") {
      setSelectedFilters([]);
      setFilteredPackages(packages);
      return;
    }

    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(category)) {
        return prevFilters.filter((filter) => filter !== category);
      } else {
        return [...prevFilters, category];
      }
    });
  };

  useEffect(() => {
    if (selectedFilters.length === 0 || selectedFilters.includes("All")) {
      setFilteredPackages(packages);
    } else {
      setFilteredPackages(
        packages.filter((pkg) =>
          selectedFilters.every(
            (filter) =>
              pkg.category.toLowerCase().includes(filter.toLowerCase()) ||
              pkg.name.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }
  }, [selectedFilters, packages]);

  const handleSelectPackage = (pkg) => {
    navigate("/decoform", {
      state: {
        selectedEvent,
        selectedDate,
        selectedTime,
        selectedDecorationPackage: pkg,
      },
    });
  };

  return (
    <div>
       <Navbar />

  <div className="page-background" style={{ backgroundImage: `url(${backgroundImage})` }} />
  <div
        style={{
         
          height: "150px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h1 style={{ fontSize: "36px", fontWeight: "bold", color:"black" }}>Our Services</h1>
      </div>


      <div className="images-grids">
                              <img src={home_1} alt="Mitchell Grand 1" />
                              <img src={home_2} alt="Mitchell Grand 2" />
                              <img src={home_3} alt="Mitchell Grand 3" />
                              <img src={home_4} alt="Mitchell Grand 4" />
              </div>

      <h1 style={{ textAlign: "center", margin: "40px 0", fontSize: "28px", color: "#333" }}>
        {location.state && location.state.selectedEvent
          ? `Decoration Packages for ${location.state.selectedEvent}`
          : "Available Decoration Packages"}
      </h1>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleFilterChange(option)}
            style={{
              padding: "10px 20px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "20px",
              backgroundColor: selectedFilters.includes(option) ? "#007bff" : "#f1f1f1",
              color: selectedFilters.includes(option) ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
          >
            {option}
          </button>
        ))}
        {selectedFilters.length > 0 && (
          <button
            onClick={() => setSelectedFilters([])}
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "40px" }}>
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg, index) => (
            <div
              key={`${pkg.id}-${pkg.category}-${index}`}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                textAlign: "center",
                transition: "transform 0.3s",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>{pkg.name}</h3>
              {pkg.imageUrl && (
                <img
                  src={`http://localhost:8080${pkg.imageUrl}`}
                  alt={pkg.name}
                  style={{ width: "300px",
                    height: "200px", 
                    objectFit: "cover", 
                    borderRadius: "8px",
                    marginBottom: "15px", }}
                />
              )}
              <p style={{ fontSize: "16px", color: "#007bff" }}>
                Package Price: LKR {pkg.price} / USD {(pkg.price / exchangeRate).toFixed(2)}
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>Package Description: {pkg.description}</p>
              <button
                onClick={() => handleSelectPackage(pkg)}
                style={{
                  padding: "12px 30px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginTop: "15px",
                  transition: "background-color 0.3s",
                }}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
            <p>No decoration packages available for the selected event type.</p>
          </div>
        )}
      </div>
      <br/>
      <br/>
      <Footer/>
    </div>
    
  );
};

export default DecoPackage;
