import MusicNavbar from "./components/Navbar";
import HomePage from "./components/Home";
import { Routes, Route } from "react-router-dom";
import BrowseMusic from "./components/Browse";
import FavoritesPage from "./components/Favorites";
import PlaySong from "./components/PlaySong";
import React, { useState, useRef } from "react";
import Footer from "./components/Footer";
import UserProfile from "./components/Profile";
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
      <MusicNavbar currentSong={currentSong} setCurrentSong={setCurrentSong} 
      query={query} setQuery={setQuery}
      searchResults={searchResults} setSearchResults={setSearchResults}
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
            />
          }
        />
        <Route path="/favorites" element={<FavoritesPage />} />
        {/* <Route path="/play/:id" element={<div>Play Song Page</div>} /> */}
        <Route path="/browse" element={<BrowseMusic query={query} searchResults={searchResults}
        currentSong={currentSong} setCurrentSong={setCurrentSong} />} />
        <Route path="/user" element={<UserProfile user={dummyUser} />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      {currentSong && (
        <PlaySong
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      )}


{/* <div className="bg-gray-100 min-h-screen pt-4"> */}

      <Footer/>
{/* </div> */}
    </>
  );
}

export default App;
