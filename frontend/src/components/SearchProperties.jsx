import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchProperties = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleSearch = (value) => {
    setText(value);
    onSearch(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <span className="flex rounded-2xl border focus-within:ring-2 focus-within:ring-yellow-500 items-center">
      <input
        id="search"
        type="text"
        value={text}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search.."
        className="rounded-2xl w-full pl-3 py-2 focus:outline-none"
      />
      <FiSearch className="fixed-end m-3 text-lg text-gray-500" onClick={handleSearch}/>
    </span>
  );
};

export default SearchProperties;
