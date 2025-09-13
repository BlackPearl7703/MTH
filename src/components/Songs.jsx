import { LikedSongSkeleton } from "./skeletons/LikedSkeleton";
import { LikedSong } from "./LikedSong";
import { NoFavorites } from "./error-handlers/Nofavorites";
import Loader from "./loader/Loader";
import { LoaderPinwheel } from "lucide-react";
export const Song = ({
  songs,
  playSong,
  currentSong,
  isPlaying,
  // addToFavorites,
  // removeFromFavorites,
  showIsLiked,
  isThisSongInFavorites,
}) => {
  // console.log(songs);
  if (!songs?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-screen text-center space-y-4">
        <NoFavorites />

        <LoaderPinwheel className="animate-spin text-[#a8a29e] h-10 w-10" />
      </div>
    );
  }
  return (
   <div
  className="
    grid justify-items-start gap-2
    [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))]
    sm:[grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]
    md:[grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]
  "
>
  {songs?.length
    ? songs.map((song) => (
        <LikedSong
          key={song.id}
          song={song}
          currentSong={currentSong}
          playSong={playSong}
          isPlaying={isPlaying}
          className="min-w-[120px] max-w-[140px]"
        />
      ))
    : Array(10)
        .fill(0)
        .map((_, idx) => <LikedSongSkeleton key={idx} />)}
</div>

  );
};
