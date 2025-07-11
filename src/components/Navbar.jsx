import React, { useEffect } from "react";
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

  return (
    <>
      <div className="mb-8">
        <nav className="backdrop-blur-xl shadow-md fixed top-0 left-0 w-full z-50 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo */}
              <div className="flex flex-row  items-center gap-4 w-full">

              <Link
                to="/"
                className="flex-shrink-0 flex cursor-pointer  items-center text-blue-700 font-bold text-xl"
                >
                <i className="fa-solid fa-music"></i>
                {/* strike line through hurts */}
                <span className="ml-2">mth [music that <s>hurts</s> heals]</span>

              </Link>
              <div className="w-2/4 bg-gray-200 backdrop-blur-xl  border-gray-300 rounded-full ">

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


              {/* Navigation links */}
              <div className="hidden md:flex items-center space-x-6">
                {/* <SearchBar
                  query={query}
                  setQuery={setQuery}
                  onSearch={handleSearch}
                  placeholder="Search songs or artists..."
                  setSearchResults={setSongsList}
                  setCurrentSong={setCurrentSong}
                  currentSong={currentSong}
                /> */}
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-sharp-duotone fa-solid fa-house text-2xl"></i>
                </Link>
                {/* <a href="/browse" className="text-gray-700 hover:text-blue-700 font-medium">
              Browse
            </a> */}
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-sharp-duotone fa-solid fa-heart text-2xl"></i>
                </Link>
                <Link
                  to="/user"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  <i className="fa-sharp-duotone fa-solid fa-user text-2xl"></i>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MusicNavbar;
