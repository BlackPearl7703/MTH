import React, { useEffect, useState } from "react";
import { LikedSong } from "./LikedSong"; // Import the LikedSong component
import { LikedSongSkeleton } from "./skeletons/LikedSkeleton";
import { Play, Share2, MoreHorizontal, Loader } from "lucide-react";
import { Music } from "lucide-react";
import { singersData } from "../store/singersData";
export const SingersSections = ({
  singerName,
  playSong,
  currentSong,
  setSongsList,
}) => {
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
  setSongsList(songsBySinger);

  return (
    <div className="pt-15">
      <div className="   w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-[#d6d3d1] ">
        {/* Top Section */}
        <div className="pb-5 pt-5 px-4 bg-[#9f1239]  flex flex-col md:flex-row items-center md:items-end gap-6">
          {/* Artist Image */}
          {singerData? (
            <img
              src={singerData[0]?.image[singerData[0]?.image.length - 1]?.url}
              alt={singerName}
              className=" w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
            />
            // <Loader />
          ) : (
            <div
              // src={singerData[0]?.image[singerData[0]?.image.length - 1]?.url}
              // alt={singerName}
              className=" w-40 h-40 bg-white md:w-56 md:h-56 rounded-full object-cover shadow-lg"
            />
          )}

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
                <Play
                  onClick={() => playSong(songsBySinger?.[0])}
                  className="w-7 h-7 text-black"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Popular Songs */}
        <div className="mt-10 px-4">
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
                  <div className="relative">
                    <img
                      src={song.image[0].url}
                      alt={song.name}
                      className={`w-12 h-12 rounded-md object-cover`}
                    />
                    {
                      // {console.log(currentSong?.id==song.id)}
                      currentSong?.id == song.id && (
                        <div className="absolute top-2 right-2 bg-black/60 p-1 rounded-full">
                          <Music className="w-6 h-6 text-[#e11d48] animate-pulse" />
                        </div>
                      )
                    }
                  </div>
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
    </div>
  );
};
