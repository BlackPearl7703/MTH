export const LikedSongSkeleton = () => {
  return (
    <div className="min-h-[180px] min-w-[180px] p-2 rounded-xl bg-transparent animate-pulse shadow-sm overflow-hidden">
      <div className="rounded-xl bg-gray-700 gap-2 h-44 w-full"></div>

      <div className="py-2 flex flex-col gap-2 w-[180px] animate-pulse">
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};
