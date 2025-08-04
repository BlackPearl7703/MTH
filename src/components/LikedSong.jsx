export const LikedSong = ({ song, playSong }) => {
  return (
    <div
      key={song.id}
      onClick={() => playSong(song)}
      className=" min-w-[180px] p-2 rounded-xl cursor-pointer bg-transparent hover:bg-[#44403c] transition-all  shadow-sm hover:shadow-md overflow-hidden group"
    >
      <img
        src={song.image?.[song.image.length - 1]?.url}
        alt={song.name}
        className=" rounded-xl h-44 object-cover group-hover:scale-103 transition-transform duration-200"
      />

      <div className="py-2 flex flex-col gap-1 w-[180px]">
        <div className="flex justify-between items-start w-full">
          <h2 className=" text-sm text-[#e7e5e4] truncate ">{song.name}</h2>
        </div>
        {/* artists info commenting it for future use */}
        <p className="text-sm text-[#a8a29e] max-w-[180px] truncate">
          {song.artists?.primary?.map((a) => a.name).join(", ") ||
            song.primaryArtists}
        </p>
      </div>
    </div>
  );
};
