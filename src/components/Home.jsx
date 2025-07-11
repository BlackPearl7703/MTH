import React, { useEffect, useState, useRef } from "react";
import PlaySong from "./PlaySong"; // Import the PlaySong component
const apiEndpoint = "https://saavn.dev/api/search/songs?query="; // Example query
import { Link } from "react-router-dom"; // Import Link for navigation

import SongsList from "./SongsList";
import Loader from "./loader/Loader";
import { fetchFavoritesSongsData } from "../helper-functions/fetchFavorites";
const HomePage = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  playSong,
  songsList,
  setSongsList,
  // query,
}) => {
  // const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

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
          // assign o based index to songs 
          const songs = data.data.results.map((song, index) => ({
            ...song,
            songIndex: index + 1, // Assigning a 1-based index
          }));
          setSongsList(songs); // take only a few songs
          console.log("setting songs:", songs);
        }
        // console.log("Fetched songs:", songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
      setLoading(false);
    }
    fetchSongs();
  }, []);

  useEffect(() => {
    setLoading(true);
    const favorites = new Set(
      JSON.parse(localStorage.getItem("favorites")) || []
    );
    const fetchFavorites = async () => {
      setFavLoading(true);
      const fetchedSongs = await fetchFavoritesSongsData(favorites);
  //  add songIndex to each song
      fetchedSongs.forEach((song, index) => {
        song.songIndex = index + 1; // Assigning a 1-based index
      });
      setFavoriteSongs(fetchedSongs);
      setFavLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700
       
        ">Listen again</h1>
      </div>
      <div className="w-full h-600px overflow-x-scroll flex gap-2  ">
        {favoriteSongs.map((song, index) => (
          <div
            key={index}
            onClick={() => playSong(song)}
            className="cursor-pointer min-w-2/12   bg-gray-50 hover:shadow-lg transition rounded-md shadow-md"
          >
            <img
              src={song.image?.[song.image.length - 1]?.url}
              alt={song.name}
              className="w-full h-48 object-cover  mb-2"
            />
            <div className="px-2">

            <h2 className="text-blue-700 font-semibold text-lg truncate">
              {song.name}
            </h2>

            <p className="text-gray-600 text-sm">
               {song.artists?.primary?.map((a) => a.name).join(", ") ||
              song.primaryArtists}
            </p>
            </div>
          </div>
        ))}

        {favLoading && (
          <div className="flex justify-center items-center h-64 w-full">
            <Loader />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center my-8 ">
        <h1 className="text-3xl font-bold text-blue-700">Trending Songs</h1>
        {/* <Link
          to="/favorites"
          className="text-blue-600 hover:underline font-medium"
        >
          View Favorites
        </Link> */}
      </div>

      <SongsList  songs={songsList} playSong={playSong} showIsLiked={true} />

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
