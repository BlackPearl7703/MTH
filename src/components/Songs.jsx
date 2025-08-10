import { LikedSongSkeleton } from "./skeletons/LikedSkeleton";
import { LikedSong } from "./LikedSong";
import { NoFavorites } from "./error-handlers/Nofavorites";
export const Song = ({
  songs,
  playSong,
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
        <p className="text-2xl sm:text-3xl text-[#a8a29e] ">
          Hit ❤️ to add here
        </p>
      </div>
    );
  }
  return (
    <div className="grid justify-items-start gap-2  grid-cols-[repeat(auto-fit,minmax(140px,1fr))] ">
      {songs?.length
        ? songs.map((song) => (
            <LikedSong
              key={song.id}
              song={song}
              playSong={playSong}
              className="min-w-[120px] max-w-[140px] sm:min-w-[140px] sm:max-w-[160px]"
            />
          ))
        : Array(10)
            .fill(0)
            .map((_, idx) => <LikedSongSkeleton key={idx} />)}
    </div>
  );
};
