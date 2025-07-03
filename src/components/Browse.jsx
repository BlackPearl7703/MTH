import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaySong from "./PlaySong";
import { useRef } from "react";
import Loader from "./loader/Loader"; // Import the Loader component
import SongsList from "./SongsList";
// const apiEndpoint = "https://saavn.me/search/songs?query=";
// const apiEndpoint = "https://saavn.dev/api/search/songs?query=";

const BrowseMusic = ({ query, searchResults , currentSong, setCurrentSong }) => {
  console.log("BrowseMusic query:", query);
  console.log("BrowseMusic searchResults:", searchResults);
  // const [query, setQuery] = useState("");
  // const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);
  // const handleSearch = async () => {

  // useEffect(async () => {
  //   if (query?.trim()) {

  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${apiEndpoint}${encodeURIComponent(query)}`
  //     );
  //     const data1 = await response.json();
  //     const data = data1.data;
  //     console.log("Search results:", data);
  //     if (data.results) {
  //       console.log("Search results:", data.results);
  //       setResults(data.results.slice(0, 20));
  //     } else {
  //       setResults([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //     setResults([]);
  //   }
  //   setLoading(false);
  // }
    
  // }, []);

  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  const toggleFavorite = (song) => {
    const exists = favorites.find((s) => s.id === song.id);
    if (exists) {
      setFavorites(favorites.filter((s) => s.id !== song.id));
    } else {
      setFavorites([...favorites, song]);
    }
  };
  const clickHandler = (song) => {
    setCurrentSong(song);
    console.log("Clicked song:", song);
    // <PlaySong currentSong={song} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />;
  };


  console.log(searchResults)
  

  return (
    <div className="bg-white min-h-screen px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Results for {query}
        </h1>
        <Link
          to="/favorites"
          className="text-blue-600 hover:underline font-medium"
        >
          View Favorites
        </Link>
      </div>

     
     

      {/* Results */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> */}
        {/* {searchResults.map((song) => {
          //   const isFavorite = favorites.some((s) => s.id === song.id);

          return (
            <div
              key={song.id}
              className="bg-gray-50 hover:shadow-lg transition p-4 rounded-lg shadow-md relative"
            >
              <img
                src={song.image?.[song.image.length - 1]?.url}
                alt={song.name}
                className="w-full h-48 object-cover rounded-md mb-2 cursor-pointer"
                onClick={() => clickHandler(song)}
              />
              <h2 className="text-blue-700 font-semibold text-lg truncate">
                {song.name}
              </h2>
              <p className="text-gray-600 text-sm truncate">
                {song.primaryArtists}
              </p>
              <button
                onClick={() => toggleFavorite(song)}
                className="absolute top-2 right-2 text-xl"
              >
                
              </button>
            </div>
          );
        })} */}
        {/* <SongsList  /> */}
        <SongsList
          songs={searchResults}
          playSong={clickHandler}
         
        />
      {/* </div> */}

      {searchResults.length === 0 && !loading && (
        <p className="text-gray-500 mt-8 text-center">
          Start typing a search above to browse music!
        </p>
      )}
      {/* Audio Player */}
      {/* {currentSong && (
        <PlaySong
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      )} */}
      {!searchResults.length > 0 && (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default BrowseMusic;
