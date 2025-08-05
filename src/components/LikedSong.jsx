export const LikedSong = ({ song, playSong, className = '' }) => {
  return (
    <div
      onClick={() => playSong(song)}
      className={`p-2 rounded-xl cursor-pointer bg-transparent hover:bg-[#44403c] transition-all shadow-sm hover:shadow-md overflow-hidden group w-full ${className}`}
    >
      {/* Use aspect ratio for image */}
      <div className="aspect-square overflow-hidden rounded-xl">
        <img
          src={song.image?.[song.image.length - 1]?.url}
          alt={song.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      <div className="pt-2 flex flex-col gap-0.5">
        <h2 className="text-xs text-[#e7e5e4] truncate">{song.name}</h2>
        <p className="text-xs text-[#a8a29e] truncate">
          {song.artists?.primary?.map((a) => a.name).join(", ") ||
            song.primaryArtists}
        </p>
      </div>
    </div>
  );
};
