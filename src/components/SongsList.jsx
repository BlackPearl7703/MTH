import React from "react";

const SongsList = ({ songs, playSong }) => {
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
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {songs.map((song, index) => (
        <div
          key={index}
          onClick={() => playSong(song)}
          className="cursor-pointer bg-gray-50 hover:shadow-lg transition p-4 rounded-lg shadow-md"
        >
          <img
            src={song.image?.[song.image.length - 1]?.url}
            alt={song.name}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <h2 className="text-blue-700 font-semibold text-lg truncate">
            {song.name}
          </h2>
        
          {/* like */}
          <div
            onClick={() => {
              toggleLike(song.id);
            }}
          >
            {isThisSongInFavorites(song.id) ? (
              <div onClick={() => removeFromFavorites(song.id)}>
                <i className="fa-solid fa-thumbs-up text-red-500"></i>
              </div>
            ) : (
              <div onClick={() => addToFavorites(song.id)}>
                <i className="fa-regular fa-thumbs-up"></i>
              </div>
            )}
          </div>

          {/* <i className="fa-regular fa-heart"></i> */}
          {/* <p className="text-gray-600 text-sm truncate">{song.artists}</p> */}
          <p className="text-gray-600 text-sm">
            {song?.artists?.all?.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SongsList;
