export const LikedSong = ({ song, playSong }) => {
  return (
    // <div
    //   key={song.id}
    //   onClick={() => playSong(song)}
    //   className="w-40 flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
    // >
    //   <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex flex-col overflow-hidden h-40">
    //     <img
    //       src={song.image?.[song.image.length - 1]?.url}
    //       alt={song.name || "Album Art"}
    //       className="w-full h-full object-cover"
    //     />
    //   </div>
    //   <div className=" mt-2 text-center px-1 text-[#d6d3d1]">
    //     <span className="text-sm font-medium truncate">{song.name}</span>
    //     {/* <p>
    //       {song.artists?.primary?.map((a) => a.name).join(", ") ||
    //         song.primaryArtists}
    //     </p> */}
    //   </div>
    // </div>
    <div
      key={song.id}
      onClick={() => playSong(song)}
      className="min-w-[180px] p-2 rounded-xl cursor-pointer bg-transparent hover:bg-[#44403c] transition-all  shadow-sm hover:shadow-md overflow-hidden group"
    >
      <img
        src={song.image?.[song.image.length - 1]?.url}
        alt={song.name}
        className=" rounded-xl w-full h-44 object-cover group-hover:scale-103 transition-transform duration-200"
      />

      <div className="py-2 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h2 className=" text-sm text-[#d6d3d1]  truncate w-11/12">
            {song.name}
          </h2>
        </div>
        {/* artists info commenting it for future use */}
        <p className="text-sm text-[#a8a29e] truncate">
          {song.artists?.primary?.map((a) => a.name).join(", ") ||
            song.primaryArtists}
        </p>
      </div>
    </div>
  );
};
