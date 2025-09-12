import { useEffect, useState } from "react";
import "./LikedSong.css";
import { Music } from "lucide-react";

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
          className={`w-full h-full object-cover  transition-transform duration-200 group-hover:scale-105 ${
            isThisSongPlaying ? "opacity-50" : ""
          }`}
        />

        {
          // {console.log(currentSong?.id==song.id)}
          isThisSongPlaying && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                bg-black/60 p-2 rounded-full"
            >
              <Music className="w-4 h-4 sm:w-4 sm:h-4 md:w-8 md:h-8 text-[#e11d48] animate-pulse" />
            </div>
          )
        }
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
