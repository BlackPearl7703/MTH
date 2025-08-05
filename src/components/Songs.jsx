import { LikedSongSkeleton } from "./skeletons/LikedSkeleton";
import { LikedSong } from "./LikedSong";
export const Song = ({
  songs,
  playSong,
  addToFavorites,
  removeFromFavorites,
  showIsLiked,
  isThisSongInFavorites,
}) => {
  console.log(songs);
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
