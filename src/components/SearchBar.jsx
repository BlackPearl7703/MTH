import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SearchBar = ({ onSearch, placeholder = "Search music...", query, setQuery ,setSearchResults}) => {
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setSearchResults([])
      navigate('/browse')
    }
    
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
   <div className="relative w-full bg-gray-50 rounded-full shadow-sm">
  <input
    type="text"
    value={query}
    onChange={handleInputChange}
    onKeyDown={handleKeyPress}
    placeholder={placeholder}
    className="z-20 w-full pl-10 border-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
  />
  <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
    <i className="fa-solid fa-magnifying-glass"></i>
  </span>
</div>

  );
};

export default SearchBar;
