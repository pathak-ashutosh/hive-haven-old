import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [text, setText] = useState("");

  return (
    <span className="flex rounded-2xl border focus:outline-yellow-500">
      <FiSearch className="m-2 text-2xl" />
      <input
        id="search"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search.."
        className="rounded-2xl w-full py-2 focus:outline-none"
      />
    </span>
  );
};

export default Search;
