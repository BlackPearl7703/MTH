import MusicNavbar from "./components/Navbar";
import HomePage from "./components/Home";
import { Routes, Route } from "react-router-dom";
import BrowseMusic from "./components/Browse";
import FavoritesPage from "./components/Favorites";
import PlaySong from "./components/PlaySong";
import { useState, useRef } from "react";
import SignUp from "./components/SignUp";
import UserProfile from "./components/Profile";
import Login from "./components/Login";
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [songsList, setSongsList] = useState([]); // This state is not used in the current code
  console.log("Songs List in App:", songsList);
  const [query, setQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  console.log(query);
  console.log("Current song in App:", currentSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100); // Delay to allow src update
  };
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  const [userData, setUserData] = useState(localStorage.getItem("user")?? null);

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
              userData={userData}
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
        <Route
          path="/favorites"
          element={
            <FavoritesPage
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
          element={isLoggedIn ? <UserProfile user={userData} /> : 
          // <SignUp setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
          <Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
        }
        />
        <Route
          path="/signup"
          element={<SignUp setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />}
        />
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
       </div>
    </>
  );
}

export default App;
