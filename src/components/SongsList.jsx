import React from "react";
import { Song } from "./Songs";

const SongsList = ({ songs,isPlaying, playSong,currentSong, showIsLiked }) => {
  const isThisSongInFavorites = (songID) => {
    let favorites = new Set(
      JSON.parse(localStorage.getItem("favorites")) || []
    );
    return favorites.has(songID);
  };

  const addToFavorites = (songID) => {
    // Load
    // it should be a set
    let favorites = new Set(
      JSON.parse(localStorage.getItem("favorites")) || []
    );

    // Add a song
    favorites.add(songID);

    // Save
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));

    // Read again
    console.log(localStorage.getItem("favorites"));

    console.log("Song added to favorites!");
  };

  const removeFromFavorites = (songID) => {
    // Load
    let favorites = new Set(
      JSON.parse(localStorage.getItem("favorites")) || []
    );

    // Remove a song
    favorites.delete(songID);

    // Save
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));

    // Read again
    console.log(localStorage.getItem("favorites"));

    console.log("Song removed from favorites!");
  };
  return (
    <Song
      // key={songs.id}
      showIsLiked={showIsLiked}
      isThisSongInFavorites={isThisSongInFavorites}
      songs={songs}
      
      currentSong={currentSong}
      playSong={playSong}
      isPlaying={isPlaying}
      // addToFavorites={addToFavorites}
      // removeFromFavorites={removeFromFavorites}
    />
  );
};

export default SongsList;
