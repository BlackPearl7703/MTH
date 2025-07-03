import React, { useState, useRef, useEffect } from "react";
import songsStore from "../store/songsStore";

const PlaySong = ({ currentSong, isPlaying, setIsPlaying, audioRef }) => {
  // console.log("Current song in PlaySong:", currentSong);
  //  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  // console.log("favorites", songsStore.favorites);
  const isThisSongInFavorites = (songID) => {
    let favorites = new Set(
      JSON.parse(localStorage.getItem("favorites")) || []
    );
    return favorites.has(songID);
  };

  const addToFavorites = (songID) => {
// Load
// it should be a set
  let favorites = new Set(JSON.parse(localStorage.getItem("favorites")) || []);

// Add a song
favorites.add(songID);

// Save
localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));

// Read again
console.log(localStorage.getItem("favorites"));


console.log("Song added to favorites!");


}

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);
  useEffect(() => {
    // load new song when song changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlayPause = () => {
    if (!currentSong) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  const handleSeek = (e) => {
    const progressBar = e.target;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * currentSong.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = currentSong.duration
    ? (currentTime / currentSong.duration) * 100
    : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-inner px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src={currentSong.image?.[1]?.url || currentSong.image?.[1]?.link}
          alt={currentSong.name}
          className="w-12 h-12 rounded"
        />
        <div>
          <h3 className="text-blue-700 font-medium">{currentSong.name}</h3>
          <p className="text-gray-600 text-sm">
            {currentSong.artists?.primary?.map((a) => a.name).join(", ") ||
              currentSong.primaryArtists}
          </p>

          {/* <i className="fa-solid fa-star"></i>
          <i className="fa-regular fa-star"></i> */}
          {isThisSongInFavorites(currentSong.id) ? (
            <i className="fa-solid fa-heart text-red-500"></i>
          ) : (
            <div className="cursor-pointer" onClick={() => addToFavorites(currentSong.id)}>
              <i className="fa-regular fa-heart"></i>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 w-full md:w-auto md:flex md:items-center md:gap-4">
        <div
          className="h-2 w-full bg-gray-300 rounded cursor-pointer my-2 md:my-0"
          onClick={handleSeek}
        >
          <div
            className="h-2 bg-blue-600 rounded"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600">
          {formatTime(currentTime)} / {formatTime(currentSong.duration)}
        </div>
      </div>

      <button
        onClick={togglePlayPause}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <audio ref={audioRef}>
        <source
          src={
            currentSong.downloadUrl?.[4]?.url ||
            currentSong.downloadUrl?.[4]?.link
          }
        />
      </audio>
    </div>
  );
};

export default PlaySong;
