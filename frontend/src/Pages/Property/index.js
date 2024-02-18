import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Property = ({ match }) => {
  const [property, setProperty] = useState(null);
  const propertyId = match.params.id; // Assuming the property ID is passed as a URL parameter

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`https://api.example.com/properties/${propertyId}`);
      const data = response.data;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  return (
    <div className="single-property-page">
      {property ? (
        <>
          {/* Property image */}
          <img src={property.image} alt={property.title} />

          {/* Property details */}
          <div className="property-details">
            <h2>{property.title}</h2>
            <p>Location: {property.location}</p>
            <p>Rent: ${property.rent}/month</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Description: {property.description}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Property;
