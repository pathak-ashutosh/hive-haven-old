import React, { useState, useEffect } from 'react';
import './styles.css'; // Import the CSS file
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/properties')
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error('Error getting properties:', error);
      });
  }, []); // Add an empty dependency array here

  return (
    <div className="property-container"> {/* Apply CSS class here */}
      <h1>Rental Properties</h1>
      {properties.map(property => (
        <div className="property" key={property.id}> {/* Apply CSS class here */}
          <Link to={`/properties/${property.id}`} className="property-link"> {/* Apply CSS class here */}
            {/* <img src={property.image} alt={property.street_addr} /> */}
            <h2>{property.street_addr}</h2>
          </Link>
          <p>{property.desc}</p>
          <p>Price: ${property.rent}</p>
        </div>
      ))}
    </div>
  );
}

export default Properties;
