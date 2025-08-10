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
   <nav className="font-grenzeGotisch fixed top-0 left-0 w-full bg-[#9ca3af] z-50 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link to="/" className="flex items-center text-[#e11d48] font-bold text-xl">
        <img src="/assets/9973495.png" alt="Logo" className="h-10" />
      </Link>

      {/* SearchBar (desktop only) */}
      <div className="hidden md:block flex-1 px-4">
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          setSearchResults={setSongsList}
          setCurrentSong={setCurrentSong}
          currentSong={currentSong}
        />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-[#e11d48]">
          <i className="fa-solid fa-house text-xl" />
        </Link>
        <Link to="/favorites" className="text-gray-700 hover:text-[#e11d48]">
          <i className="fa-solid fa-heart text-xl" />
        </Link>
        <Link to="/user" className="text-gray-700 hover:text-[#e11d48]">
          <i className="fa-solid fa-user text-xl" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-gray-700 hover:text-[#e11d48]"
      >
        <span className="sr-only">Toggle Menu</span>
        {mobileMenuOpen ? (
          <i className="fa-solid fa-xmark text-2xl" />
        ) : (
          <i className="fa-solid fa-bars text-2xl" />
        )}
      </button>
    </div>
  </div>

  {/* Mobile Dropdown */}
  {mobileMenuOpen && (
    <div className="md:hidden bg-transparent shadow-lg px-4 py-4 space-y-4">
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        setSearchResults={setSongsList}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
      />
      <Link to="/" className=" block text-gray-700 hover:text-[#e11d48] text-base" onClick={() => setMobileMenuOpen(false)}>
        <i className="fa-solid fa-house mr-2" /> Home
      </Link>
      <Link to="/favorites" className="block text-gray-700 hover:text-[#e11d48] text-base" onClick={() => setMobileMenuOpen(false)}>
        <i className="fa-solid fa-heart mr-2" /> Favorites
      </Link>
      <Link to="/user" className="block text-gray-700 hover:text-[#e11d48] text-base" onClick={() => setMobileMenuOpen(false)}>
        <i className="fa-solid fa-user mr-2" /> Profile
      </Link>
    </div>
  )}
</nav>

    </>
  );
};

export default MusicNavbar;
