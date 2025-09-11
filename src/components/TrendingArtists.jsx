import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TrendingArtists = ({ artistNames, setSingerName }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const results = await Promise.all(
          artistNames.map(async (name) => {
            const res = await fetch(
              `https://saavn.dev/api/search/artists?query=${name}`
            );
            const data = await res.json();
            return data?.data?.results?.[0]; // take first result
          })
        );
        setArtists(results.filter(Boolean));
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [artistNames]);

  return (
    <div className="my-8 pr-4">
      <h2
        className="
    text-xl sm:text-2xl md:text-3xl lg:text-4xl
    font-extrabold mb-4 sm:mb-6
    text-[#e11d48] tracking-tight
  "
      >
        🐱 Trending Artists
      </h2>

      {!loading ? (
        <div className="flex  gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pb-2">
          {artists.map((artist, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSingerName(artist.name);
                navigate(`/artist/${artist.name}`);
              }}
              className="
    relative 
    min-w-[120px] h-[160px] text-sm     /* 📱 Mobile (default) */
    sm:min-w-[140px] sm:h-[190px] sm:text-base  /* bigger phones */
    md:min-w-[160px] md:h-[220px] md:text-lg   /* tablets */
    lg:min-w-[180px] lg:h-[260px] lg:text-xl   /* desktop */
    rounded-2xl cursor-pointer overflow-hidden group shadow-lg
    transition-transform duration-300 
    hover:scale-105 active:scale-105
    
  "
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${artist.image?.[2]?.url})`,
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 w-full text-center p-2 backdrop-blur-md bg-black/30">
                <p
                  className="
    font-semibold text-white
    text-sm sm:text-base md:text-lg lg:text-xl   /* bigger scaling */
    truncate max-w-[120px] sm:max-w-[160px] md:max-w-[200px]  /* prevent overflow */
    sm:group-hover:text-[#e11d48]
    group-hover:text-[#e11d48] 
    transition-colors duration-300
  "
                >
                  {artist.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="
          min-w-[120px] h-[160px]        /* 📱 Mobile */
          sm:min-w-[140px] sm:h-[190px]  /* 📱 Bigger phones */
          md:min-w-[160px] md:h-[220px]  /* 💻 Tablets */
          lg:min-w-[180px] lg:h-[260px]  /* 🖥️ Desktops */
          rounded-2xl bg-gray-800 animate-pulse
        "
              />
            ))}
        </div>
      )}
    </div>
  );
};
