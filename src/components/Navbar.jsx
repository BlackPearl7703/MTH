import React from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
const MusicNavbar = ({
  currentSong,
  setCurrentSong,
  query,
  setQuery,
  searchResults,
  setSearchResults,
}) => {
  const apiEndpoint = "https://saavn.dev/api/search/songs?query="; // Example query
  // const [results, setResults] = React.useState([]);
  const navigate = useNavigate();
  const handleSearch = async (query) => {
    try {
      const limitedQuery = `&limit=1000`; // Limit the number of results
      const response = await fetch(
        `${apiEndpoint}${encodeURIComponent(query)}${limitedQuery}`
      );
      const data1 = await response.json();
      const data = data1.data;
      console.log("Search results:", data);
      if (data.results) {
        setSearchResults(data.results.slice(0, 20));
        navigate("/browse");
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  return (
    <>
      <div className="mb-8">
        <nav className="bg-gray-50 shadow-md fixed top-0 left-0 w-full z-50 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo */}
              <a
                href="/"
                className="flex-shrink-0 flex cursor-pointer items-center text-blue-700 font-bold text-xl"
              >
                <i className="fa-solid fa-music"></i>
                 Mehfil
              </a>

              {/* Navigation links */}
              <div className="hidden md:flex items-center space-x-6">
                <SearchBar
                  query={query}
                  setQuery={setQuery}
                  onSearch={handleSearch}
                  placeholder="Search songs or artists..."
                  setSearchResults={setSearchResults}
                  setCurrentSong={setCurrentSong}
                  currentSong={currentSong}
                />
                <a
                  href="/"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-sharp-duotone fa-solid fa-house"></i>
                </a>
                {/* <a href="/browse" className="text-gray-700 hover:text-blue-700 font-medium">
              Browse
            </a> */}
                <a
                  href="/favorites"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-sharp-duotone fa-solid fa-heart"></i>
                </a>
                <a
                  href="/user"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-sharp-duotone fa-solid fa-user"></i>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MusicNavbar;
