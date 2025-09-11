const ProgressBar = ({handleSeek, progressPercent,progressBarRef}) => {
  return (
   <div
  ref={progressBarRef}
  className="
    h-2 w-full 
    bg-[#1e293b]  /* dark slate background */
    rounded-full 
    cursor-pointer 
    shadow-inner shadow-black/40
    relative
  "
  onClick={handleSeek}
>
  {/* solid progress bar */}
  <div
    className="
      h-2 
      bg-[#e11d48] /* solid dev pink/red */
      rounded-full 
      relative 
      transition-all duration-200 ease-out
      shadow-[0_0_6px_#e11d48aa]
    "
    style={{ width: `${progressPercent}%` }}
  >
    {/* draggable knob */}
    <div
      className="
        absolute top-1/2 -right-1.5 
        w-3 h-3 
        bg-[#0f172a]  /* dark center like a terminal */
        rounded-full 
        border-2 border-[#e11d48] 
        shadow-[0_0_6px_#e11d48aa] 
        transform -translate-y-1/2
        transition-transform duration-150 ease-out
        hover:scale-110 active:scale-95
      "
    />
  </div>
</div>


  );
};

export default ProgressBar