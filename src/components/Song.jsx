export const Song = ({
  songs,
  playSong,
  addToFavorites,
  removeFromFavorites,
  showIsLiked,
  isThisSongInFavorites,
}) => {
  return (
    <div className="justify-items-center grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8  ">
      {songs.map((song, index) => (
        <div
          key={index}
          onClick={() => playSong(song)}
          className=" flex flex-col justify-center items-center max-w-44 p-2 rounded-xl cursor-pointer bg-transparent hover:bg-[#44403c] transition-all  shadow-sm hover:shadow-md overflow-visible group"
        >
          <img
            src={song.image?.[song.image.length - 1]?.url}
            alt={song.name}
            className=" rounded-xl w-full h-44 object-cover group-hover:scale-103 transition-transform duration-200"
          />

          <div className="max-w-44 flex flex-col flex-wrap justify-center items-center py-2 gap-1">
            <div className="w-full flex justify-center items-center">
              <p className=" text-sm text-[#d6d3d1] truncate w-11/12">
                {song.name}
              </p>

              {/* {showIsLiked && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent playSong on like click
                    toggleLike(song.id);
                  }}
                  className="text-lg"
                  title={
                    isThisSongInFavorites(song.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {isThisSongInFavorites(song.id) ? (
                    <i
                      className="fa-solid fa-thumbs-up text-blue-600"
                      onClick={() => removeFromFavorites(song.id)}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-thumbs-up text-gray-500 hover:text-blue-600"
                      onClick={() => addToFavorites(song.id)}
                    ></i>
                  )}
                </button>
              )} */}
            </div>
            {/* artists info commenting it for future use */}
            <p className="text-sm text-[#a8a29e] truncate w-11/12">
              {song.artists?.primary?.map((a) => a.name).join(", ") ||
                song.primaryArtists}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
