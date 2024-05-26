import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Search } from "../components";

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error getting properties:", error);
      });
  }, []); // Add an empty dependency array here

  return (
    <div className="relative lg:px-24 pt-14">
      <div className="flex py-14 justify-between items-center">
        <h1 className="px-2 font-inter text-3xl font-extrabold">
          Properties
        </h1>
        <Search />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {properties.map((property) => (
          <div className="border my-8 p-4 rounded-3xl" key={property.id}>
            <Link to={`/properties/${property.id}`} className="text-lg">
              {/* <img src={property.image} alt={property.street_addr} /> */}
              <h2 className="font-semibold border-b pb-2">{property.street_addr}</h2>
            </Link>
            <p className="pt-2 tracking-tight border-b pb-2">{property.desc}</p>
            <p className="pt-2 ">Price: ${property.rent}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
