import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useParams } from 'react-router-dom';

function Property() {
  const [property, setProperty] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.error('Error getting property:', error);
      });
  }, [id]);

  return (
    <div>
      <h1>{property.street_addr}</h1>
      {/* <img src={property.image} alt={property.street_addr} /> */}
      <p>{property.desc}</p>
      <p>Price: ${property.rent}</p>
    </div>
  );
}

export default Property;
