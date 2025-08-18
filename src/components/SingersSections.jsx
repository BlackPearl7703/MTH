import React, { useEffect, useState } from "react";
import { LikedSong } from "./LikedSong"; // Import the LikedSong component
import { LikedSongSkeleton } from "./skeletons/LikedSkeleton";
export const SingersSections = ({ singerName, playSong,currentSong }) => {
  const [songsBySinger, setSongsBySinger] = useState([]);
  const [singerData, setSingerData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      // const query = "badshah"; // You can change this to any query you want
      const limitedQuery = `&limit=1000`; // Limit the number of results
      const apiEndpoint = "https://saavn.dev/api/search/songs?query="; // Example query
      const response = await fetch(
        `${apiEndpoint}${singerName}${limitedQuery}`
      );
      const apiEndpoint2 = `https://saavn.dev/api/search/artists?query=${singerName}`;
      const response2 = await fetch(apiEndpoint2);
      const data2 = await response2.json();
      console.log("Fetched artist data:", data2);
      setSingerData(data2.data.results);
      const data = await response.json();
      console.log("Fetched singerdata:", data);
      setSongsBySinger(data.data.results);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  // console.log("SingersSections", songsBySinger);
  return (
    <div>
      {!loading ? (
        <div>
          <div className="flex justify-items-start gap-2">
            <img
              className="h-10 rounded-full"
              src={singerData[0]?.image[2]?.url}
              alt={singerName}
            />
            <h3 className="text-2xl font-bold text-[#e11d48] mb-4">
              {singerName}
            </h3>
          </div>
          <div className="flex scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-x-scroll">
            {songsBySinger?.length ? (
              songsBySinger.map((song, index) => (
                // <LikedSong key={index} song={song} playSong={playSong} />
                <LikedSong
                  key={index}
                  song={song}
                  currentSong={currentSong}
                  playSong={playSong}
                  className="min-w-[120px] max-w-[140px] sm:min-w-[140px] sm:max-w-[160px]"
                />
              ))
            ) : (
              <div className="w-full flex justify-center items-center py-20">
                <p className="text-gray-600 text-center">
                  No favorites found. Hit thumbs up to add songs to favorites!
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4 animate-pulse">
            {/* Fake profile image */}
            <div className="h-10 w-10 rounded-full bg-gray-700" />

            {/* Fake singer name bar */}
            <div className="h-6 w-32 bg-gray-600 rounded" />
          </div>

          <div className="flex ">
            {Array(10)
              .fill(0)
              .map((_, idx) => (
                <LikedSongSkeleton key={idx} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
