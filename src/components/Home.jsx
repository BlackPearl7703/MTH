import React, { useEffect, useState, useRef } from "react";
import PlaySong from "./PlaySong"; // Import the PlaySong component
const apiEndpoint = "https://saavn.dev/api/search/songs?query="; // Example query
import { Link } from "react-router-dom"; // Import Link for navigation

import SongsList from "./SongsList";
import Loader from "./loader/Loader";
const HomePage = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  playSong
}) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch songs on load
  useEffect(() => {
    async function fetchSongs() {
      setLoading(true);
      try {
        const query = "arijit"; // You can change this to any query you want
        const limitedQuery = `&limit=1000`; // Limit the number of results
        const response = await fetch(`${apiEndpoint}${query}${limitedQuery}`);
        const data = await response.json();
        console.log("Fetched data:", data);
        if (data.data.results && data.data.results.length > 0) {
          setSongs(data.data.results); // take only a few songs
          console.log("setting songs:", data.data.results);
        }
        // console.log("Fetched songs:", songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
      setLoading(false);
    }
    fetchSongs();
  }, []);

  // const playSong = (song) => {
  //   setCurrentSong(song);
  //   setIsPlaying(true);
  //   setTimeout(() => audioRef.current?.play(), 100); // Delay to allow src update
  // };
 

  return (
    <div className="bg-white min-h-screen px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Trending Songs</h1>
        <Link
          to="/favorites"
          className="text-blue-600 hover:underline font-medium"
        >
          View Favorites
        </Link>
      </div>

      <SongsList songs={songs} playSong={playSong} />

      {/* Audio Player */}
      {/* {currentSong && (
        <PlaySong
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      )} */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default HomePage;
