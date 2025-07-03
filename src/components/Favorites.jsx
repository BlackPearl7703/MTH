import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const apiEndpoint = "https://saavn.dev/api/songs?ids=";
import PlaySong from "./PlaySong"; // Import the PlaySong component
import Loader from "./loader/Loader";
import songsStore from "../store/songsStore";
import SongsList from "./SongsList";
const FavoritesPage = ({}) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);
  // e.g. load JSON from file or localStorage
  let favorites = new Set(JSON.parse(localStorage.getItem("favorites")) || []);
  console.log("favorites", favorites);

  useEffect(() => {
    if (favorites.size === 0) {
      setFavoriteSongs([]);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      const fetchedSongs = [];

      for (const id of favorites) {
        try {
          console.log(`${apiEndpoint}${encodeURIComponent(id)}`);
          const response = await fetch(
            `${apiEndpoint}${encodeURIComponent(id)}`
          );
          const data1 = await response.json();
          const data = data1.data;
          console.log("Fetched data for favorite:", id, data1);
          if (data.length > 0) {
            // Add the first matching result
            fetchedSongs.push(data[0]);
          }
        } catch (error) {
          console.error("Error fetching favorite:", id, error);
        }
      }

      setFavoriteSongs(fetchedSongs);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  console.log("favoriteSongs", favoriteSongs);

  return (
    <div className="bg-white min-h-screen px-6 py-12">
      {/* {loading && <Loader/>} */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Your Favorite Songs
        </h1>
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          Back to Home
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      )}
      {!loading && favoriteSongs.length === 0 && (
        <p className="text-gray-600">No favorites found.</p>
      )}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> */}

      <SongsList songs={favoriteSongs} playSong={setCurrentSong} />
      {/* </div> */}
      {/* audio player */}
      {currentSong && (
        <PlaySong
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
