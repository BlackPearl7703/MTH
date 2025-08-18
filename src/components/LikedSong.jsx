import { useEffect, useState } from "react";
import "./LikedSong.css";

export const LikedSong = ({
  song,
  isPlaying,
  playSong,
  currentSong,
  className = "",
}) => {
  const [isThisSongPlaying, setIsThisSongPlaying] = useState(false);
  //  const isThisSongPlaying = currentSong?.id === song.id && isPlaying;
  useEffect(() => {
    // console.log(currentSong,song,isPlaying)
    console.log(currentSong?.id === song.id);
    setIsThisSongPlaying(currentSong?.id === song.id);
  }, [currentSong]);
  return (
    <div
      onClick={() => playSong(song)}
      className={`p-2 rounded-xl cursor-pointer bg-transparent hover:bg-[#44403c] transition-all shadow-sm hover:shadow-md overflow-hidden group w-full ${className}`}
    >
      {/* Use aspect ratio for image */}
      <div className="aspect-square overflow-hidden rounded-xl relative">
        <img
          src={song.image?.[song.image.length - 1]?.url}
          alt={song.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {isThisSongPlaying && (
          // ✅ only show when same song & playing
          
            <div className="absolute  bottom-1 left-2 z-20 flex items-end gap-[2px] h-5">
              <span className="w-[3px] h-2 bg-pink-600 animate-wave"></span>
              <span className="w-[3px] h-4 bg-pink-600 animate-wave animation-delay-200"></span>
              <span className="w-[3px] h-3 bg-pink-600 animate-wave animation-delay-400"></span>
            </div>
          
        )}
      </div>

      <div className="pt-2 flex flex-col gap-0.5">
        <p className="text-xs text-[#e7e5e4] truncate">{song.name}</p>
        <p className="text-xs text-[#a8a29e] truncate">
          {song.artists?.primary?.map((a) => a.name).join(", ") ||
            song.primaryArtists}
        </p>
      </div>
    </div>
  );
};
