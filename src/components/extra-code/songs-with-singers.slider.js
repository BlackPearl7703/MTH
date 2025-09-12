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