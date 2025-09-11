import React, { useEffect, useState } from "react";
import { LikedSong } from "./LikedSong"; // Import the LikedSong component
import { LikedSongSkeleton } from "./skeletons/LikedSkeleton";
import { Play, Share2, MoreHorizontal } from "lucide-react";
export const SingersSections = ({ singerName, playSong, currentSong }) => {
  const [songsBySinger, setSongsBySinger] = useState([]);
  const [singerData, setSingerData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);

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
  console.log("singersData", singerData);
  console.log("SingersSections", songsBySinger);
  return (
    // <div>
    //   {!loading ? (
    //     <div className=" pt-19">
    //       <div className="flex justify-items-start gap-2 ">
    //         <img
    //           className="h-10 rounded-full"
    //           src={singerData[0]?.image[singerData[0]?.image.length-1]?.url}
    //           alt={singerName}
    //         />
    //         <h3 className="text-2xl font-bold text-[#e11d48] mb-4">
    //           {singerName}
    //         </h3>
    //       </div>
    //       <div className="flex scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-x-scroll">
    //         {songsBySinger?.length ? (
    //           songsBySinger.map((song, index) => (
    //             // <LikedSong key={index} song={song} playSong={playSong} />
    //             <LikedSong
    //               key={index}
    //               song={song}
    //               currentSong={currentSong}
    //               playSong={playSong}
    //               className="min-w-[120px] max-w-[140px] sm:min-w-[140px] sm:max-w-[160px]"
    //             />
    //           ))
    //         ) : (
    //           <div className="w-full flex justify-center items-center py-20">
    //             <p className="text-gray-600 text-center">
    //               No favorites found. Hit thumbs up to add songs to favorites!
    //             </p>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="flex flex-col">
    //       <div className="flex items-center gap-2 mb-4 animate-pulse">
    //         {/* Fake profile image */}
    //         <div className="h-10 w-10 rounded-full bg-gray-700" />

    //         {/* Fake singer name bar */}
    //         <div className="h-6 w-32 bg-gray-600 rounded" />
    //       </div>

    //       <div className="flex ">
    //         {Array(10)
    //           .fill(0)
    //           .map((_, idx) => (
    //             <LikedSongSkeleton key={idx} />
    //           ))}
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className=" pt-19 w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-white p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
        {/* Artist Image */}
        <img
          src={singerData[0]?.image[singerData[0]?.image.length - 1]?.url}
          alt={singerName}
          className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
        />

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold">{singerName}</h1>
          <p className="text-gray-300 mt-2">1M monthly listeners</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-4">
            <button className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
              Following
            </button>
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <button className="ml-auto p-4 rounded-full bg-green-500 hover:bg-green-600 transition shadow-lg">
              <Play className="w-7 h-7 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Popular Songs */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Popular</h2>
        <div className="flex flex-col gap-4">
          {songsBySinger.map((song, idx) => (
            <div
              onClick={() => playSong(song)}
              key={idx}
              className="flex items-center justify-between hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <img
                  src={song.image[0].url}
                  alt={song.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{song.name}</p>
                  <p className="text-sm text-gray-400">{song.label} plays</p>
                </div>
              </div>

              {/* More options */}
              <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-white" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
