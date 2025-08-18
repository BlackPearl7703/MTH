export const LikedSongSkeleton = () => {
  return (
    <div className="min-h-[180px] min-w-[180px] p-2 rounded-xl bg-transparent animate-pulse shadow-sm overflow-hidden">
      <div className="rounded-xl bg-gray-700 gap-1 h-35 w-35"></div>

      <div className="py-2 flex flex-col gap-1 w-[180px] animate-pulse">
        <div className="h-3 bg-gray-600 rounded w-3/4"></div>
        <div className="h-2 bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};
