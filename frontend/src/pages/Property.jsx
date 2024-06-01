import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { Loading } from "../components";
import { greenPlantsStaircase } from "../assets/images";

function Property() {
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          console.error("Error getting property: ", error);
        }
        setProperty(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return loading ? (
    <div className="relative flex justify-center items-center min-h-screen">
      <Loading />
    </div>
  ) : (
    <div className="relative lg:px-24 pt-20 max-lg:px-12 min-h-screen">
      <div className="flex flex-col items-center">
        <div>
          <h1 className="font-inter text-3xl font-extrabold">
            {property.street_addr}
          </h1>
        </div>
        <div className="md:py-16 py-8 grid lg:grid-cols-2 gap-12">
          <div>
            <img
              src={greenPlantsStaircase}
              alt={`${property.street_addr}`}
              className="rounded-3xl h-96 w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="pt-2 tracking-tight pb-2">{property.desc}</p>
            <p className="pt-2">Price: ${property.rent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
