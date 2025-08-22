import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar.jsx"

const AdminDashboard = () => {
  return (
    <div>
        <Navbar/>
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      
      <div style={{ width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px 0' }}>
        <div style={{ textAlign: 'center', padding: '15px', borderBottom: '1px solid #34495e', marginBottom: '20px' }}>
          <h2>Admin Panel</h2>
        </div>
        <div style={{ padding: '12px 20px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>📊</div>
          Dashboard
        </div>
        <div style={{ padding: '12px 20px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>📝</div>
          Booking Details
        </div>
        <Link to="/admin" style={{ padding: '12px 20px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
              <div style={{ marginRight: '10px' }}>🍽️</div>
              Food Service
            </Link>
            <Link to="/deco" style={{ padding: '12px 20px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
            <div style={{ marginRight: '10px' }}>🎭</div>
            Decoration Service
          </Link>

        <div style={{ padding: '12px 20px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>⏳</div>
          Pending Bookings
        </div>
        
        
      </div>

      
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Booking Management</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search bookings..."
              style={{
                padding: '8px 15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '250px',
              }}
            />
          </div>
        </div>

        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '10px' }}>TOTAL BOOKINGS</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>128</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '10px' }}>PENDING BOOKINGS</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>23</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '10px' }}>FOOD SERVICES</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>84</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '10px' }}>DECORATION SERVICES</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>67</div>
          </div>
        </div>

       
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <h2>Recent Bookings</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>ID</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Customer</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Date</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Services</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Amount</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Status</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Action</th>
              </tr>
            </thead>
            <tbody>
             
              <tr>
                <td>#BK1235</td>
                <td>Pathum Wijekoon</td>
                <td>2025-04-05</td>
                <td>Food, Decoration</td>
                <td>$1,200</td>
                <td><span style={{ backgroundColor: '#d4edda', color: '#155724', padding: '5px 10px', borderRadius: '20px' }}>Confirmed</span></td>
                <td><button style={{ padding: '6px 12px', border: 'none', borderRadius: '4px', backgroundColor: '#3498db', color: 'white' }}>View</button></td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
