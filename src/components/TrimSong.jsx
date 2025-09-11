import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import './TrimSong.css'
export default function AudioTrimmer({ song }) {
  const audioSizes=song?.downloadUrl.length;
  const audioUrl = song?.downloadUrl[audioSizes-1]?.url;
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const regionsRef = useRef(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !audioUrl) return;

    // Destroy previous instance if any
    if (wsRef.current) wsRef.current.destroy();

    // 1) Create wavesurfer
    const ws = WaveSurfer.create({
      container: containerRef.current,
      height: 96,
      waveColor: "#edf0f5",
      progressColor: "#81838a",
      cursorColor: "#0b51de",
      normalize: true,
      
    });
    wsRef.current = ws;

    // 2) Register regions plugin (v7 way)
    const regions = ws.registerPlugin(
      RegionsPlugin.create({
        // enable click-and-drag to create a new selection
        dragSelection: {
          slop: 10,
          color: "rgba(184, 24, 243, 0.1)",
        },
      })
    );
    regionsRef.current = regions;

    // 3) Load audio
    ws.load(audioUrl);

    // 4) When ready, create a default region (optional)
    ws.on("ready", () => {
      const dur = ws.getDuration();
      const r = regions.addRegion({

        start: dur/20,
        end: dur/5,
        // color: "rgba(123,56,13,0.25)",
        drag: true,
        resize: true,
      });
      setRegion(r);
    });

    // Keep only one region at a time; update state on changes
    regions.on("region-created", (r) => {
      regions.getRegions().forEach((other) => {
        if (other !== r) other.remove();
      });
      setRegion(r);
    });
    regions.on("region-updated", (r) => setRegion(r));
    regions.on("region-removed", (r) => {
      if (region === r) setRegion(null);
    });

    return () => {
      ws.destroy();
      wsRef.current = null;
      regionsRef.current = null;
      setRegion(null);
    };
  }, [audioUrl]);
  const [startTime,setStartTime]=useState(region?.start.toFixed(2))
  const [endTime,setEndTime]=useState(region?.end.toFixed(2))
  useEffect(()=>{
     setStartTime(region?.start.toFixed(2))
     setEndTime(region?.end.toFixed(2))
  },[region])




  const handlePreview = () => {
    if (!wsRef.current || !region) return;
    wsRef.current.play(region.start, region.end); // play only the selection
  };

  const handleTrim = async () => {
    if (!region || !audioUrl) return;
    const { start, end } = region;

    // ⚠️ For remote URLs, the server must allow CORS for fetch to work
    const AC = window.AudioContext || window.webkitAudioContext;
    const ac = new AC();
    const res = await fetch(audioUrl, { mode: "cors" });
    const buf = await res.arrayBuffer();
    const decoded = await ac.decodeAudioData(buf);

    const sr = decoded.sampleRate;
    const startIdx = Math.floor(start * sr);
    const endIdx = Math.floor(end * sr);
    const length = Math.max(0, endIdx - startIdx);
    const out = ac.createBuffer(decoded.numberOfChannels, length, sr);

    for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
      const data = decoded.getChannelData(ch).slice(startIdx, endIdx);
      out.getChannelData(ch).set(data);
    }

    const offline = new OfflineAudioContext(out.numberOfChannels, out.length, out.sampleRate);
    const src = offline.createBufferSource();
    src.buffer = out;
    src.connect(offline.destination);
    src.start();
    const rendered = await offline.startRendering();

    const wavBlob = bufferToWave(rendered, rendered.length);
    const url = URL.createObjectURL(wavBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${song?.name || "trimmed"}.wav`;
    a.click();
    URL.revokeObjectURL(url);
  };

  function bufferToWave(abuffer, len) {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    const sampleRate = abuffer.sampleRate;
    let offset = 0;
    let pos = 0;

    const setUint16 = (d) => { view.setUint16(pos, d, true); pos += 2; };
    const setUint32 = (d) => { view.setUint32(pos, d, true); pos += 4; };

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8);
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt "
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);

    for (let i = 0; i < numOfChan; i++) channels.push(abuffer.getChannelData(i));

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset] || 0));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
    return new Blob([buffer], { type: "audio/wav" });
  }

return (
  <div className="w-screen h-screen flex flex-col justify-center items-center px-3">

    <div className=" w-full max-w-3xl mx-auto p-4 rounded-xl bg-[#475569] shadow-lg">
      {/* Song Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={song?.image?.[song.image.length - 1]?.url}
          alt={song?.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-white">{song?.name}</h2>
          <p className="text-sm text-gray-400">
            {song?.artists?.primary?.map((a) => a.name).join(", ") ||
              song?.primaryArtists}
          </p>
        </div>
      </div>
  
      {/* Waveform */}
      <div ref={containerRef} className="  bg-red-300 rounded-md" />
  
      {/* Start & End Time */}
      {region && (
        <div className="flex justify-between text-sm text-gray-300 mt-2">
          <span>Start: {startTime}s</span>
          <span>End: {endTime}s</span>
        </div>
      )}
  
      {/* Actions */}
      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={handlePreview}
          disabled={!region}
          className="flex-1 px-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition"
        >
           Preview
        </button>
        <button
          onClick={handleTrim}
          disabled={!region}
          className="flex-1 px-2 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium disabled:opacity-50 transition"
        >
            Download
        </button>
      </div>
  
      {/* Tip */}
      <p className="text-xs text-[#e11d48] mt-4 text-center">
        Drag on the waveform to select a region. Adjust edges for fine control.
      </p>
    </div>
  </div>
);

}
