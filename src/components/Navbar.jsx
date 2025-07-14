import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
const MusicNavbar = ({
  songsList,
  setSongsList,
  currentSong,
  setCurrentSong,
  query,
  setQuery,
  // searchResults,
  // setSearchResults,
}) => {
  useEffect(() => {
    console.log("current song is changing");
  }, [currentSong]);
  // curl 'https://saavn.dev/api/search?query=Imagine%20Dragons'
  // https://saavn.dev/api/search/songs?query=
  console.log("currentSong in Navbar:", currentSong);
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
        // add songIndex to each song
        const songs = data.results.map((song, index) => ({
          ...song,
          songIndex: index + 1, // Assigning a 1-based index
        }));
        console.log("Search results with indices:", songs);
        // setSearchResults(songs);
        setQuery(query);
        // setResults(data.results.slice(0, 20));
        setSongsList(songs);
        navigate("/browse");
      } else {
        setSongsList([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSongsList([]);
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="mb-8 w-screen">
        <nav className="backdrop-blur-xl shadow-md fixed top-0 left-0 w-full z-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" flex w-full justify-between h-16 items-center">
              {/* Logo + Search */}
              <div className="flex items-center w-full justify-between md:justify-start">
                <Link
                  to="/"
                  className="flex items-center text-blue-700 font-bold text-xl"
                >
                  <img src="/assets/9973495.png" className="h-10" alt="Logo" />
                  <span className="ml-2">mth</span>
                </Link>

                {/* Mobile menu button */}
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-700 focus:outline-none md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Open menu</span>
                  {mobileMenuOpen ? (
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  ) : (
                    <i className="fa-solid fa-bars text-2xl"></i>
                  )}
                </button>
              </div>

              {/* Search (desktop only) */}
              <div className="w-full hidden md:flex md:flex-1 md:justify-center px-4">
                <div className="w-full md:min-w-md lg:min-w-lg">
                  <SearchBar
                    query={query}
                    setQuery={setQuery}
                    onSearch={handleSearch}
                    placeholder="Search songs or artists..."
                    setSearchResults={setSongsList}
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                  />
                </div>
              </div>

              {/* Desktop navigation links */}
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-solid fa-house text-2xl"></i>
                </Link>
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-solid fa-heart text-2xl"></i>
                </Link>
                <Link
                  to="/user"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-solid fa-user text-2xl"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 px-4 pb-4 space-y-4">
              <div className="w-full">
                <SearchBar
                  query={query}
                  setQuery={setQuery}
                  onSearch={handleSearch}
                  placeholder="Search songs or artists..."
                  setSearchResults={setSongsList}
                  setCurrentSong={setCurrentSong}
                  currentSong={currentSong}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-700 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fa-solid fa-house mr-2"></i> Home
                </Link>
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-blue-700 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fa-solid fa-heart mr-2"></i> Favorites
                </Link>
                <Link
                  to="/user"
                  className="text-gray-700 hover:text-blue-700 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fa-solid fa-user mr-2"></i> Profile
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default MusicNavbar;
