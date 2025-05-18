import React from "react";
import Image from "next/image";

const Taskbar: React.FC = () => (
  <div className="fixed bottom-0 left-0 w-full h-[44px] flex items-center pr-2 z-20 shadow-xl" style={{
    background: "linear-gradient(to top, #245edb 80%, #3a6ea5 100%)",
    borderTop: "2px solid #3a6ea5"
  }}>
    {/* Start Button */}
    <button
      className="flex items-center gap-2 px-4 h-full shadow-md border border-[#1a4c8b] bg-gradient-to-b from-[#4cc14f] to-[#1a7302] hover:brightness-105 active:brightness-95 select-none rounded-r-[18px]"
      style={{ boxShadow: "0 2px 6px 0 #0006, 0 1px 0 0 #fff6 inset" }}
    >
      <Image
        src="/icons/win-xp-icon.png"
        alt="Windows XP Icon"
        width={22}
        height={22}
        className="drop-shadow"
        style={{ marginRight: 4 }}
      />
      <span className="text-white font-bold text-lg font-sans tracking-wide drop-shadow" style={{ textShadow: "1px 1px 2px #0008" }}>Start</span>
    </button>

    {/* Ortadaki mavi bar */}
    <div className="flex-1 h-7 mx-3 rounded bg-[#245edb] flex items-center px-2">
      {/* Buraya açık uygulama veya desen eklenebilir */}
    </div>

    {/* Saat */}
    <div className="flex items-center justify-end min-w-[80px] h-8 px-3 rounded bg-gradient-to-t from-[#3a6ea5] to-[#4db1e2] border border-[#1a4c8b] text-white font-mono text-base shadow" style={{ textShadow: "1px 1px 2px #0008" }}>
      4:34 AM
    </div>
  </div>
);

export default Taskbar; 