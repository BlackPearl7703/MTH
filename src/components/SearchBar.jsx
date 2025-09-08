import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = ({
  onSearch,
  placeholder = "Wanna play some music...",
  query,
  setQuery,
  setSearchResults,
}) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);

  console.log(query, "query in search bar");
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const url = `https://mth-backend.onrender.com/suggestion/${value}`;
    axios
      .get(url)
      .then((response) => {
        setSuggestions(response.data);
        console.log("Search suggestions:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching search suggestions:", error);
        setSuggestions([]);
      });
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setSearchResults([]);
      setSuggestions([]);
      navigate("/browse");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion, (query) => handleSearch());
    // handleSearch();
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Input Field with Icon */}
      <div className="flex items-center bg-[#292524] rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:[#e11d48]">
        <div className="text-gray-400 text-lg flex items-center">
          <i className="fa-solid fa-magnifying-glass text-2xl"></i>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          // dynamic placeholder
          placeholder={placeholder}
          className="ml-3 py-1 text-xl flex-1 bg-transparent text-[#a8a29e]  focus:outline-none placeholder:text-gray-500"
        />
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-30 w-full bg-[#1c1917] border border-[#3f3f46] rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto text-white">
          <ul className="divide-y divide-[#3f3f46]">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer px-4 py-2 hover:bg-[#3f3f46] transition"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
