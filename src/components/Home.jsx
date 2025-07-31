import React, { useEffect, useState, useRef } from "react";
import PlaySong from "./PlaySong"; // Import the PlaySong component
const apiEndpoint = "https://saavn.dev/api/search/songs?query="; // Example query
import { Link } from "react-router-dom"; // Import Link for navigation
import { LikedSong } from "./LikedSong";
import SongsList from "./SongsList";
import Loader from "./loader/Loader";
import { SingersSections } from "./SingersSections";
import { fetchFavoritesSongsData } from "../helper-functions/fetchFavorites";
import { singersData } from "../store/singersData";
const HomePage = ({
  userData,
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
    <div className="bg-[#262626] min-h-screen px-6 py-12 mb-12">
      <div className="flex justify-between items-center mt-8 mb-8">
        <div className="flex items-center gap-4 mb-2 ">
          <img
            src={userData?.avatarUrl || "https://i.pravatar.cc/150?img=10"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold text-[#e11d48]">
              Welcome, {userData?.displayName || "Guest"}!
            </h2>
          </div>
        </div>
      </div>
      <p className="text-2xl font-semibold text-[#e11d48] mt-8 mb-4">
        Your Favorite Songs
      </p>
      <div className="flex scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-x-scroll">
        {favoriteSongs.length ? (
          favoriteSongs.map((song, index) => (
            <LikedSong key={index} song={song} playSong={playSong} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center py-20">
            <p className="text-gray-600 text-center">
              No favorites found. Hit thumbs up to add songs to favorites!
            </p>
          </div>
        )}
        {favLoading && (
          <div className="flex justify-center items-center h-64 w-full">
            <Loader />
          </div>
        )}
      </div>

      <div>
        {/* <SingersSections singerName={"kk"} playSong={playSong} /> */}
        {singersData.map((singer, index) => (
          <div key={index} className="mt-8">
            {/* <p className="text-2xl font-bold text-[#e11d48] mb-4">{singer}</p> */}
            {/* Pass the singerName and playSong as props */}
            <SingersSections
              key={index}
              singerName={singer}
              playSong={playSong}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center my-4 ">
        <p className=" text-2xl font-bold text-[#e11d48]">Trending Songs</p>
      </div>

      <SongsList songs={songsList} playSong={playSong} showIsLiked={true} />

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default HomePage;
