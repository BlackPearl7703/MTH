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
   <div className="relative w-full">
  <input
    type="text"
    value={query}
    onChange={handleInputChange}
    onKeyDown={handleKeyPress}
    placeholder={placeholder}
    className="w-full pl-10 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
    <i className="fa-solid fa-magnifying-glass  focus:text-blue-500"></i>
  </span>
</div>

  );
};

export default SearchBar;
