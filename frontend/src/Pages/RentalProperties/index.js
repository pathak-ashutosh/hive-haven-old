import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import Link from 'react-router-dom';

function RentalProperties() {
    const [properties, setProperties] = useState([]);
    
    useEffect(() => {
      fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('/properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error getting properties:', error);
        }
    };

  return (
    <div>
      <h1>Rental Properties</h1>
      {properties.map(property => (
        <div key={property.id}>
          <Link to={`/properties/${property.id}`}>
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

export default RentalProperties;
