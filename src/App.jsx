import MusicNavbar from "./components/Navbar";
import HomePage from "./components/Home";
import { Routes, Route } from "react-router-dom";
import BrowseMusic from "./components/Browse";
import FavoritesPage from "./components/Favorites";
import PlaySong from "./components/PlaySong";
import { useState, useRef, useEffect } from "react";
import SignUp from "./components/SignUp";
import UserProfile from "./components/Profile";
import Login from "./components/Login";
import AudioTrimmer from "./components/TrimSong";
import SongsList from "./components/SongsList";
import { SingersSections } from "./components/SingersSections";
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [songsList, setSongsList] = useState([]); // This state is not used in the current code

  const [query, setQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [singerName, setSingerName] = useState(null);
  const audioRef = useRef(null);
  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100); // Delay to allow src update
  };
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [userData, setUserData] = useState(() => {
    const user = localStorage.getItem("user");
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error("Failed to parse user data", e);
      return {};
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (currentSong) {
      document.title = `Playing ${currentSong.name}`;
    } else {
      document.title = "MTH - Music that heels";
    }
  }, [currentSong]);

  return (
    <>
      <div className="bg-[#1f2937] min-h-screen text-white">
        <MusicNavbar
          songsList={songsList}
          setSongsList={setSongsList}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          query={query}
          setQuery={setQuery}
          // searchResults={searchResults} setSearchResults={setSearchResults}
        />
        {/* <HomePage /> */}

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setSingerName={setSingerName}
                userData={userData}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                playSong={playSong}
                songsList={songsList}
                setSongsList={setSongsList}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                playSong={playSong}
                songsList={songsList}
                setSongsList={setSongsList}
              />
            }
          />
          {/* <Route path="/play/:id" element={<div>Play Song Page</div>} /> */}
          <Route
            path="/browse"
            element={
              <BrowseMusic
                query={query}
                searchResults={songsList}
                playSong={playSong}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
              />
            }
          />
          <Route
            path="/user"
            element={
              isLoggedIn ? (
                <UserProfile user={userData} />
              ) : (
                // <SignUp setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setUserData={setUserData}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
            }
          />
          <Route
            path="/artist/:singerName"
            element={
              <SingersSections
                // singerName, playSong, currentSong
                singerName={singerName}
                playSong={playSong}
                currentSong={currentSong}
              />
            }
          />
          <Route path="/trim" element={<AudioTrimmer song={currentSong} />} />
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
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </div>
    </>
  );
}

export default App;
