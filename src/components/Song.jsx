import { LikedSongSkeleton } from "./skeletons/LikedSkeleton";
export const Song = ({
  songs,
  playSong,
  addToFavorites,
  removeFromFavorites,
  showIsLiked,
  isThisSongInFavorites,
}) => {
  console.log(songs)
  return (
    <div className="justify-items-center grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
  {songs?.length ? (
   songs.map((song, index) => (
      <div
        key={index}
        onClick={() => playSong(song)}
        className="relative flex flex-col justify-center items-center max-w-44 p-2 rounded-xl cursor-pointer bg-transparent hover:bg-[#44403c] transition-all shadow-sm hover:shadow-md overflow-visible group"
      >
        <img
          src={song.image?.[song.image.length - 1]?.url}
          alt={song.name}
          className="rounded-xl w-full h-44 object-cover group-hover:scale-103 transition-transform duration-200"
        />

        <div className="max-w-44 flex flex-col flex-wrap justify-center items-center py-2 gap-1">
          <div className="w-full flex justify-center items-center">
            <p className="text-sm text-[#d6d3d1] truncate w-11/12">
              {song.name}
            </p>
          </div>
          <p className="text-sm text-[#a8a29e] truncate w-11/12">
            {song.artists?.primary?.map((a) => a.name).join(", ") ||
              song.primaryArtists}
          </p>
        </div>
      </div>
    ))
  ) : (
    Array(10)
      .fill(0)
      .map((_, idx) => <LikedSongSkeleton key={idx} />)
  )} 
</div>

  );
};
