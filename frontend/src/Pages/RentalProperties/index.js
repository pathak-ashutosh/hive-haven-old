import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RentalProperties() {
    const [properties, setProperties] = useState([]);
    
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('https://api.example.com/properties');
            const data = response.data;
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

  return (
    <div>
      <h1>Rental Properties</h1>
      {properties.map(property => (
        <div key={property.id}>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <p>Price: ${property.price}</p>
        </div>
      ))}
    </div>
  );
}

export default RentalProperties;
