import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import Progressbar from "./Progressbar";

const PlaySong = ({
  setCurrentSong,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songsList,
  favorites,
  setFavorites,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isDownloadClicked, setIsDownloadClicked] = useState(false);
  const progressBarRef = useRef(null);

  // --- Favorites Logic ---
  const isThisSongInFavorites = (songID) => favorites.includes(songID);

  const addToFavorites = (songId) => {
    if (!favorites.includes(songId)) {
      const updated = [...favorites, songId];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const removeFavorites = (songId) => {
    const updated = favorites.filter((id) => id !== songId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    setIsDownloadClicked(false);
  }, [currentSong]);

  // --- Song Navigation ---
  const getCurrentIndex = () =>
    songsList.findIndex((song) => song.id === currentSong?.id);

  const playPrevSong = () => {
    const index = getCurrentIndex();
    if (index === -1) return;
    const prevIndex = (index - 1 + songsList.length) % songsList.length;
    setCurrentSong(songsList[prevIndex]);
  };

  const playNextSong = () => {
    const index = getCurrentIndex();
    if (index === -1) return;
    const nextIndex = (index + 1) % songsList.length;
    setCurrentSong(songsList[nextIndex]);
  };

  // --- MediaSession API ---
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("nexttrack", playNextSong);
      navigator.mediaSession.setActionHandler("previoustrack", playPrevSong);
    }
  }, [currentSong]);

  // --- Audio Event Handlers ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    if (!currentSong || !audioRef.current) return;
    const audio = audioRef.current;
    audio.paused ? audio.play() : audio.pause();
  };

  const handleSeek = (e) => {
    // const rect = e.target.getBoundingClientRect();
    // const clickX = e.clientX - rect.left;
    // const percentage = clickX / rect.width;
    // const newTime = percentage * currentSong.duration;
    // audioRef.current.currentTime = newTime;
    // setCurrentTime(newTime);
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * currentSong.duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const progressPercent = currentSong?.duration
    ? (currentTime / currentSong.duration) * 100
    : 0;

  if (!currentSong) return null;

  const downloadHandler = async () => {
    if (!currentSong || !currentSong.downloadUrl) return;

    const url = currentSong.downloadUrl[currentSong.downloadUrl.length - 1].url;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${currentSong.name || "song"}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
      setIsDownloadClicked(true);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#9ca3af] backdrop-blur-lg shadow-inner">
      {/* Progress Bar */}
      {/* <div
        className="h-2 w-full bg-gray-300 cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="h-2 bg-[#e11d48] relative rounded-b-md"
          style={{ width: `${progressPercent}%` }}
        >
         
        </div>
      </div> */}
      <Progressbar handleSeek={handleSeek} progressPercent={progressPercent} progressBarRef={progressBarRef} />

      {/* Controls and Info */}
      <div className="flex flex-col md:flex-row justify-between items-center px-3 py-2 gap-3">
        {/* Time Info */}
        <div className="text-xs text-center md:text-left w-full md:w-auto">
          {formatTime(currentTime)} / {formatTime(currentSong.duration)}
        </div>

        {/* Song Info + Actions */}
        <div className="flex items-center gap-3 flex-1 w-full md:w-auto min-w-0">
          <img
            src={currentSong.image?.[1]?.url || currentSong.image?.[1]?.link}
            alt={currentSong.name}
            className="w-12 h-12 rounded flex-shrink-0"
          />
          <div className="overflow-hidden flex-1">
            <h2
              className="text-sm font-medium text-black truncate"
              title={currentSong.name}
            >
              {currentSong.name}
            </h2>
            <p className="text-xs text-gray-800 truncate">
              {currentSong.artists?.primary?.map((a) => a.name).join(", ") ||
                currentSong.primaryArtists}
            </p>
          </div>
          {/* Favorite */}
          <div className="text-lg md:text-xl flex-shrink-0">
            {isThisSongInFavorites(currentSong.id) ? (
              <i
                className="fa-solid fa-heart text-red-500 cursor-pointer"
                onClick={() => removeFavorites(currentSong.id)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart cursor-pointer"
                onClick={() => addToFavorites(currentSong.id)}
              ></i>
            )}
          </div>
          {/* Download */}
          <i
            className={`fa-solid fa-circle-down text-xl md:text-2xl cursor-pointer transition-colors ${
              isDownloadClicked ? "text-red-500" : "text-black"
            }`}
            onClick={downloadHandler}
          ></i>
          {/* Trim */}
          <Link to="/trim">
            <i className="fa-solid fa-scissors text-black text-lg md:text-xl"></i>
          </Link>
        </div>

        {/* Playback Controls */}
        <div className="flex text-xl md:text-2xl gap-4 items-center justify-center w-full md:w-auto">
          <i
            className="fa-solid fa-backward-step cursor-pointer"
            onClick={playPrevSong}
            aria-label="Previous Song"
          ></i>
          {isPlaying ? (
            <i
              className="fa-solid fa-pause cursor-pointer"
              onClick={togglePlayPause}
              aria-label="Pause"
            ></i>
          ) : (
            <i
              className="fa-solid fa-play cursor-pointer"
              onClick={togglePlayPause}
              aria-label="Play"
            ></i>
          )}
          <i
            className="fa-solid fa-forward-step cursor-pointer"
            onClick={playNextSong}
            aria-label="Next Song"
          ></i>
        </div>
      </div>

      {/* Hidden Audio Element */}
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
