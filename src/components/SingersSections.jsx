import React, { useEffect, useState } from "react";
import { LikedSong } from "./LikedSong"; // Import the LikedSong component
export const SingersSections = ({ singerName, playSong }) => {
  const [songsBySinger, setSongsBySinger] = useState([]);
  const [singerData,setSingerData]=useState([])
  useEffect(() => {
    const fetchSongs = async () => {
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
      setSingerData(data2.data.results)
      const data = await response.json();
      console.log("Fetched singerdata:", data);
      setSongsBySinger(data.data.results);
    };

    fetchSongs();
  }, []);

  console.log("SingersSections", songsBySinger);
  return (
    <div>
      <div className="flex justify-items-start gap-2">
      <img className="h-10 rounded-full" src={singerData[0]?.image[2]?.url} alt={singerName} />
   <p className="text-2xl font-bold text-[#e11d48] mb-4">{singerName}</p>
      </div>
      <div className="flex scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-x-scroll">
        {songsBySinger?.length ? (
          songsBySinger.map((song, index) => (
            <LikedSong key={index} song={song} playSong={playSong} />
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
  );
};
