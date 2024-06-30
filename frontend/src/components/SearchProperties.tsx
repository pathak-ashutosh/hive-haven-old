import { FC, ChangeEvent, KeyboardEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchPropertiesProps {
  onSearch: (value: string) => void;
}

const SearchProperties: FC<SearchPropertiesProps> = ({ onSearch }) => {
  const [text, setText] = useState<string>("");

  const handleSearch = (value: string) => {
    setText(value);
    onSearch(value);
  };
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value);
    };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(text);
    }
  };

  const handleClick = () => {
    handleSearch(text);
  };

  return (
    <span className="flex rounded-2xl border focus-within:ring-2 focus-within:ring-yellow-500 items-center">
      <input
        id="search"
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Search.."
        className="rounded-2xl w-full pl-3 py-2 focus:outline-none"
      />
      <FiSearch className="fixed-end m-3 text-lg text-gray-500" onClick={handleClick}/>
    </span>
  );
};

export default SearchProperties;
