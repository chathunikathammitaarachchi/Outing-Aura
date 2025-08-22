import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/offers')
      .then(response => setOffers(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Offers</h2>
      <ul>
        {offers.map(offer => (
          <li key={offer.id}>
            <h4>{offer.title}</h4>
            <p>{offer.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Offers;
