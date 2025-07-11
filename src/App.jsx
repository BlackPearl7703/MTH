import MusicNavbar from "./components/Navbar";
import HomePage from "./components/Home";
import { Routes, Route } from "react-router-dom";
import BrowseMusic from "./components/Browse";
import FavoritesPage from "./components/Favorites";
import PlaySong from "./components/PlaySong";
import React, { useState, useRef } from "react";

import UserProfile from "./components/Profile";
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [songsList, setSongsList] = useState([]); // This state is not used in the current code
  console.log("Songs List in App:", songsList);
  const [query, setQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  console.log(query)
  console.log("Current song in App:", currentSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100); // Delay to allow src update
  };
  const dummyUser = {
  name: "Ayesha Khan",
  email: "ayesha@example.com",
  avatar: "https://i.pravatar.cc/150?img=3",
  about: "Music enthusiast. Loves Bollywood classics and new indie tracks.",
};
  return (
    <>
      <MusicNavbar 
      songsList={songsList} setSongsList={setSongsList}
      currentSong={currentSong} setCurrentSong={setCurrentSong} 
      query={query} setQuery={setQuery}
      // searchResults={searchResults} setSearchResults={setSearchResults}
      />
      {/* <HomePage /> */}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              audioRef={audioRef}
              playSong={playSong}
              songsList={songsList}
              setSongsList={setSongsList}
            />
          }
        />
        <Route path="/favorites" element={<FavoritesPage playSong={playSong} songsList={songsList} setSongsList={setSongsList} />} />
        {/* <Route path="/play/:id" element={<div>Play Song Page</div>} /> */}
        <Route path="/browse" element={<BrowseMusic query={query} searchResults={songsList}
        playSong={playSong}
        currentSong={currentSong} setCurrentSong={setCurrentSong} />} />
        <Route path="/user" element={<UserProfile user={dummyUser} />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      {currentSong && (
        <PlaySong   
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          songsList={songsList}
        />
      )}



    </>
  );
}

export default App;
