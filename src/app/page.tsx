"use client";

import DesktopIcon from "../components/Desktop/DesktopIcon";
import Taskbar from "../components/Desktop/Taskbar";

export default function Home() {
  return (
    <div className="relative w-screen h-screen min-h-screen overflow-hidden font-sans">
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/wallpapers/xp-bliss-placeholder.jpeg")'
        }}
      />

      <div className="absolute left-6 top-6 flex flex-col gap-4 select-none">
        <DesktopIcon label="Projects" />
      </div>

      <Taskbar
        onMouseDownApp={() => {}}
        apps={[]}
        focusedAppId={null}
        onMouseDown={() => {}}
        onClickMenuItem={() => {}}
      />
    </div>
  );
}
