import React, { useState, useRef, useEffect } from "react";
import songsStore from "../store/songsStore";

const PlaySong = ({ setCurrentSong,currentSong, isPlaying, setIsPlaying, audioRef,songsList }) => {
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

const playPrevSong = () => {
    if (!currentSong) return;
    const currentIndex = currentSong.songIndex-1; // Assuming songIndex is 1-based
      console.log("Current Index:", currentIndex);
    const prevIndex = (currentIndex - 1 + songsList.length) % songsList.length;
    const prevSong = songsList[prevIndex];
    if (prevSong) {
      setCurrentSong(prevSong);
      // setCurrentTime(0);
      // audioRef.current.src = prevSong.downloadUrl?.[4]?.url || prevSong.downloadUrl?.[4]?.link;
      // audioRef.current.play();
      // setIsPlaying(true);
    }
  };

  // const playNextSong = () => {
  //   if (!currentSong) return;
  //   const currentIndex = currentSong.songIndex-1; // Assuming songIndex is 1-based
  //   console.log("Current Index:", currentIndex);
  //   const nextIndex = (currentIndex+1) % songsList.length;
  //   const nextSong = songsList[nextIndex];
  //   if (nextSong) {
  //     setCurrentSong(nextSong);
  //     // setCurrentTime(0);
  //     // audioRef.current.src = nextSong.downloadUrl?.[4]?.url || nextSong.downloadUrl?.[4]?.link;
  //     // audioRef.current.play();
  //     // setIsPlaying(true);
  //   }
  // };
  const playNextSong = () => {
  if (!currentSong || !songsList?.length) return;

  const currentIndex = songsList.findIndex(
    (song) => song.id === currentSong.id
  );

  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + 1) % songsList.length;
  const nextSong = songsList[nextIndex];

  if (nextSong) {
    setCurrentSong(nextSong);
  }
};
useEffect(() => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('nexttrack', playNextSong);
    navigator.mediaSession.setActionHandler('previoustrack', playPrevSong);
  }
}, [playNextSong, playPrevSong]);



  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
  //     audioRef.current.addEventListener("ended", () => setIsPlaying(false));
  //   }

  //   return () => {
  //     audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
  //   };
  // }, []);
  // useEffect(() => {
  //   // load new song when song changes
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //     audioRef.current.load();
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //   }
  // }, [currentSong]);
  // const handleTimeUpdate = () => {
  //   if (audioRef.current) {
  //     setCurrentTime(audioRef.current.currentTime);
  //   }
  // };

  // const togglePlayPause = () => {
  //   if (!currentSong) return;
  //   if (audioRef.current.paused) {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //   } else {
  //     audioRef.current.pause();
  //     setIsPlaying(false);
  //   }
  // };

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  audio.addEventListener("timeupdate", handleTimeUpdate);
  audio.addEventListener("ended", handleEnded);
  audio.addEventListener("play", handlePlay);
  audio.addEventListener("pause", handlePause);

  return () => {
    audio.removeEventListener("timeupdate", handleTimeUpdate);
    audio.removeEventListener("ended", handleEnded);
    audio.removeEventListener("play", handlePlay);
    audio.removeEventListener("pause", handlePause);
  };
}, []);

useEffect(() => {
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
    // setIsPlaying(true); ← no longer needed here!
  } else {
    audioRef.current.pause();
    // setIsPlaying(false);
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
 <div className=" flex flex-col justify-center items-center fixed bottom-0 left-0 right-0 bg-[#9ca3af] backdrop-blur-xl shadow-inner  overflow-x-hidden ">
  {/* Progress Bar at the very top */}
  <div
    className="h-2 w-full bg-gray-300 rounded cursor-pointer"
    onClick={handleSeek}
  >
    <div
      className="h-2 bg-[#e11d48] rounded"
      style={{ width: `${progressPercent}%` }}
    ></div>
  </div>

  {/* Bottom bar content */}
  <div className="w-full px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Time Info */}
    <div className="text-sm text-black w-full md:w-auto text-center md:text-left">
      {formatTime(currentTime)} / {formatTime(currentSong.duration)}
    </div>

    {/* Song Info + Favorite */}
    <div className="flex items-center gap-4">
      <img
        src={currentSong.image?.[1]?.url || currentSong.image?.[1]?.link}
        alt={currentSong.name}
        className="w-12 h-12 rounded"
      />
      <div>
        <h3 className="text-black font-medium">{currentSong.name}</h3>
        <p className="text-black text-sm">
          {currentSong.artists?.primary?.map((a) => a.name).join(", ") ||
            currentSong.primaryArtists}
        </p>

        {/* {isThisSongInFavorites(currentSong.id) ? (
          <i className="fa-solid fa-heart text-red-500"></i>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => addToFavorites(currentSong.id)}
          >
            <i className="fa-regular fa-heart"></i>
          </div>
        )} */}
      </div>
    </div>

    {/* Playback Controls */}
    <div className="flex text-4xl gap-3 items-center">
      <div className="cursor-pointer" onClick={playPrevSong}>
        <i className="fa-solid fa-backward-step"></i>
      </div>
      <div className="cursor-pointer" onClick={togglePlayPause}>
        {isPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </div>
      <div className="cursor-pointer" onClick={playNextSong}>
      <i className="fa-solid fa-forward-step"></i>
      </div>
    </div>
  </div>

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
