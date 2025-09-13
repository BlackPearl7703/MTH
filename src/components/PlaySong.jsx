import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Progressbar from "./Progressbar";
import {
  Repeat2,
  Download,
  Scissors,
  Heart,
  CirclePlus,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  EllipsisVertical,
} from "lucide-react";

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
  const [isDownloadStarted, setIsDownloadStarted] = useState(false);
  const progressBarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isOnRepeat, setIsOnRepeat] = useState(false);
  // console.log(open, "open");

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

  const playCurrentSong = () => {
    const index = getCurrentIndex();
    console.log("hello from current", index);
    setCurrentSong(songsList[index]);
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
    setIsDownloadStarted(true);
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
    setIsDownloadStarted(false);
  };

  const handleEnded = () => {
    console.log("hello from ended", isOnRepeat);
    isOnRepeat ? playCurrentSong() : playNextSong();
  };

  return (
    <div className=" fixed bottom-0 left-0 right-0 z-50 bg-[#1c1917] backdrop-blur-lg shadow-inner">
      {/* progress bar */}
      <Progressbar
        handleSeek={handleSeek}
        progressPercent={progressPercent}
        progressBarRef={progressBarRef}
      />

      {/* Controls and Info */}
      <div className="flex flex-col md:flex-row items-center justify-between px-3 py-2 gap-3">
        {/* Time Info */}
        <div className="text-xs text-center md:text-left w-full md:w-auto">
          {formatTime(currentTime)} / {formatTime(currentSong.duration)}
        </div>

        {/* Song Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0 w-full md:w-auto">
          <img
            src={currentSong.image?.[1]?.url || currentSong.image?.[1]?.link}
            alt={currentSong.name}
            className="w-12 h-12 rounded flex-shrink-0"
          />
          <div className="overflow-hidden flex-1">
            <h2
              className="text-sm font-medium text-[#d6d3d1]  truncate"
              title={currentSong.name}
            >
              {currentSong.name}
            </h2>
            <p className="text-xs text-[#a8a29e] truncate">
              {currentSong.artists?.primary?.map((a) => a.name).join(", ") ||
                currentSong.primaryArtists}
            </p>
          </div>
        </div>

        {/* Playback Controls + More Options */}
        <div className="flex items-center gap-4 text-[#d6d3d1] w-full md:w-auto justify-center md:justify-end">
          <SkipBack
            className="w-6 h-6 cursor-pointer hover:text-[#e11d48]"
            onClick={playPrevSong}
            aria-label="Previous Song"
          />
          {isPlaying ? (
            <Pause
              className="w-7 h-7 cursor-pointer hover:text-[#e11d48]"
              onClick={togglePlayPause}
              aria-label="Pause"
            />
          ) : (
            <Play
              className="w-7 h-7 cursor-pointer hover:text-[#e11d48]"
              onClick={togglePlayPause}
              aria-label="Play"
            />
          )}
          <SkipForward
            className="w-6 h-6 cursor-pointer hover:text-[#e11d48]"
            onClick={playNextSong}
            aria-label="Next Song"
          />

          {/* More Options (your CSS untouched) */}
          <div className="relative">
            <EllipsisVertical
              className="w-6 h-6 cursor-pointer hover:text-[#e11d48]"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div
                className="px-3 py-3 space-y-2 absolute mb-4 bottom-full right-0  w-auto bg-[#2d2d2d] 
                    rounded-lg shadow-lg overflow-hidden z-100"
              >
                <div className="text-lg md:text-xl flex-shrink-0  hover:text-[#e11d48]">
                  {isThisSongInFavorites(currentSong.id) ? (
                    <div className="relative group">
                      <Heart
                        className="fa-solid fa-heart text-red-500 cursor-pointer"
                        onClick={() => removeFavorites(currentSong.id)}
                      ></Heart>

                      {/* <span
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
           whitespace-nowrap text-xs text-white bg-[#e11d48] px-2 py-1
           rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        remove from favorites
                      </span> */}
                    </div>
                  ) : (
                    <div className="relative group">
                      <CirclePlus
                        className="fa-regular fa-heart cursor-pointer "
                        onClick={() => addToFavorites(currentSong.id)}
                      ></CirclePlus>

                      {/* <span
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
           whitespace-nowrap text-xs text-white bg-[#e11d48] px-2 py-1
           rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        add to favorites
                      </span> */}
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <Download
                    className={`text-xl hover:text-[#e11d48] md:text-2xl cursor-pointer transition-colors
                      ${isDownloadClicked ? "text-red-500" : ""} 
                      ${
                        isDownloadStarted
                          ? "text-red-500 animate-pulse"
                          : "animate-none"
                      }`}
                    onClick={downloadHandler}
                  />

                  {/* <span
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
           whitespace-nowrap text-xs text-white bg-[#e11d48] px-2 py-1
           rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    download
                  </span> */}

                </div>

                <div className="relative group">
                  <Repeat2
                    onClick={() => setIsOnRepeat(!isOnRepeat)}
                    className={`hover:text-[#e11d48] text-lg md:text-xl ${
                      isOnRepeat ? `text-[#e11d48]` : `text-white `
                    } `}
                  />

                  {/* <span
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
           whitespace-nowrap text-xs text-white bg-[#e11d48] px-2 py-1
           rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    toggle repeat
                  </span> */}
                </div>

                <Link to="/trim">
                  <div className="relative group ">
                    <Scissors className="fa-solid fa-scissors hover:text-[#e11d48]  text-lg md:text-xl" />

                    {/* <span
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
           whitespace-nowrap text-xs text-white bg-[#e11d48] px-2 py-1
           rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      trim & download
                    </span> */}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <audio ref={audioRef} onEnded={handleEnded}>
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
