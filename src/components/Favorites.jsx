import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// const apiEndpoint = "https://saavn.dev/api/songs?ids=";

import Loader from "./loader/Loader";

import SongsList from "./SongsList";
import { fetchFavoritesSongsData } from "../helper-functions/fetchFavorites";
const FavoritesPage = ({ playSong, songsList, setSongsList, favorites }) => {
  // const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  // e.g. load JSON from file or localStorage
  // let favorites = new Set(JSON.parse(localStorage.getItem("favorites")) || []);
  // console.log("favorites", favorites);

  useEffect(() => {
    if (favorites.size === 0) {
      setSongsList([]);

      return;
    }

    const fetchFavorites = async () => {
      if (songsList.size > 0) return;
      setLoading(true);

      const fetchedSongs = await fetchFavoritesSongsData(favorites);
      // add songIndex to each song
      fetchedSongs.forEach((song, index) => {
        song.songIndex = index + 1; // Assigning a 1-based index
      });
      setSongsList(fetchedSongs);
      setLoading(false);
    };
    // if(favorites.size === 0) {
    fetchFavorites();
    // }
  }, []);

  // console.log("favoriteSongs", favoriteSongs);

  return (
    <div className=" min-h-screen px-6 py-12 mt-12">
      {/* {loading && <Loader/>} */}
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-3xl font-bold text-[#e11d48]">Favorites</h1>
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          Back to Home
        </Link>
      </div>

      {/* {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      )} */}
      {/* {!loading && songsList.length === 0 && (
        <p className="text-gray-600">No favorites found.</p>
      )} */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> */}

      <SongsList songs={songsList} playSong={playSong} showIsLiked={true} />
    </div>
  );
};

export default FavoritesPage;
