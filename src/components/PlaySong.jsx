import React, { useState, useEffect } from "react";

const PlaySong = ({
  setCurrentSong,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songsList,
  favorites,
  setFavorites
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  // const [favorites, setFavorites] = useState(() => {
  //   return new Set(JSON.parse(localStorage.getItem("favorites")) || []);
  // });

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
    const rect = e.target.getBoundingClientRect();
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

  const progressPercent = currentSong.duration
    ? (currentTime / currentSong.duration) * 100
    : 0;

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#9ca3af] backdrop-blur-lg shadow-inner">
      {/* Progress Bar */}
      <div className="h-2 w-full bg-gray-300 cursor-pointer" onClick={handleSeek}>
        <div
          className="h-2 bg-[#e11d48] relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="h-3 w-3 rounded-full bg-white border border-gray-400 absolute right-0 top-1/2 -translate-y-1/2 shadow" />
        </div>
      </div>

      {/* Controls and Info */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center px-4 py-2 gap-3">
        {/* Time Info */}
        <div className="text-xs w-full md:w-auto text-center">
          {formatTime(currentTime)} / {formatTime(currentSong.duration)}
        </div>

        {/* Song Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img
            src={currentSong.image?.[1]?.url || currentSong.image?.[1]?.link}
            alt={currentSong.name}
            className={`w-12 h-12 rounded `}
          />
          <div className="overflow-hidden">
            <h3 className="text-sm font-medium text-black truncate" title={currentSong.name}>
              {currentSong.name}
            </h3>
            <p className="text-xs text-gray-800 truncate">
              {currentSong.artists?.primary?.map((a) => a.name).join(", ") ||
                currentSong.primaryArtists}
            </p>
          </div>
          <div className="text-xl">
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
        </div>

        {/* Playback Controls */}
        <div className="flex text-2xl md:text-3xl gap-4 items-center">
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
