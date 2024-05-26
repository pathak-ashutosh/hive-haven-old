import axios from "axios";
import { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const SearchProperties = () => {
  const [text, setText] = useState("");

  const handleSearch = (value) => {
    axios
      .get(`/properties?search=${value}`)
      .then((response) => {
        response.data.length > 0 
          ? response.data.map((property) => console.log(property)) 
          : console.log("No properties found");
      })
      .catch((error) => {
        console.error("Error searching properties:", error);
      });
  }

  return (
    <span className="flex rounded-2xl border focus-within:ring-2 focus-within:ring-yellow-500 items-center">
      <FiSearch className="absolute m-3 text-lg text-gray-400" />
      <input
        id="search"
        type="text"
        value={text}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search.."
        className="rounded-2xl w-full pl-10 py-2 focus:outline-none"
      />
      <FiChevronDown className="mx-2 text-gray-600"/>
    </span>
  );
};

export default SearchProperties;
