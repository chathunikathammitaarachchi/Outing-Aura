import { useState, useEffect } from 'react';
import axios from 'axios';
import './PackageList.css'; // We'll create this CSS file

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState({});
 

  useEffect(() => {
    const fetchPackages = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:8080/api/packages/user/${userId}`);
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleBook = async (packageId) => {
    try {
      setBookingStatus(prev => ({ ...prev, [packageId]: 'booking' }));
      
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBookingStatus(prev => ({ ...prev, [packageId]: 'booked' }));
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [packageId]: '' }));
      }, 3000);
    } catch (error) {
      console.error('Booking failed:', error);
      setBookingStatus(prev => ({ ...prev, [packageId]: 'error' }));
    }
  };

  if (loading) return (
    <div className="package-loading">
      <div className="loading-spinner"></div>
      <p>Loading your packages...</p>
    </div>
  );

  return (
    <div className="package-list-container">
      <h2 className="package-list-header">Your Packages</h2>
      
      {packages.length === 0 ? (
        <div className="no-packages-message">
          You haven't created any packages yet.
        </div>
      ) : (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              {pkg.imageUrls && pkg.imageUrls.length > 0 && (
                <div className="package-image-container">
                  <img 
                    src={`http://localhost:8080/api/packages/images/${pkg.imageUrls[0]}`} 
                    alt={pkg.packageName}
                    className="package-image"
                  />
                </div>
              )}
              
              <div className="package-content">
                <h3 className="package-title">{pkg.packageName}</h3>
                <p className="package-shop">Shop: {pkg.shopName}</p>
                <p className="package-description">{pkg.description}</p>
                
                <div className="package-footer">
                  <span className="package-price">${pkg.price.toFixed(2)}</span>
                  <span className="package-category">{pkg.category}</span>
                </div>
                
                <button
                  className={`book-button ${bookingStatus[pkg.id] || ''}`}
                  onClick={() => handleBook(pkg.id)}
                  disabled={bookingStatus[pkg.id] === 'booking'}
                >
                  {bookingStatus[pkg.id] === 'booking' ? 'Booking...' : 
                   bookingStatus[pkg.id] === 'booked' ? 'Booked!' : 
                   bookingStatus[pkg.id] === 'error' ? 'Error!' : 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageList;