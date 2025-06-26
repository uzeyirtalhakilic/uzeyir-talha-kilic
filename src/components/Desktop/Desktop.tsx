"use client";

import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import { desktopItems, FileSystemItem } from "../../data/filesystem";
import React, { useState } from "react";
import XpWindow from "./XpWindow";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<FileSystemItem[]>([]);

  const handleOpen = (item: FileSystemItem) => {
    // Aynı pencereyi tekrar açma
    if (!openWindows.find((win) => win.id === item.id)) {
      setOpenWindows((prev) => [...prev, item]);
    }
  };

  return (
    <div className="relative w-screen h-screen min-h-screen overflow-hidden font-sans">
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/wallpapers/xp-bliss-placeholder.jpeg")'
        }}
      />

      <div className="absolute left-6 top-6 flex flex-col gap-4 select-none">
        {desktopItems.map((item) => (
          <DesktopIcon
            key={item.id}
            label={item.label}
            onClick={() => handleOpen(item)}
          />
        ))}
      </div>

      {/* Açık pencereleri göster */}
      {openWindows.map((item) => (
        <XpWindow
          key={item.id}
          item={item}
          onClose={() => setOpenWindows((prev) => prev.filter((w) => w.id !== item.id))}
        />
      ))}

      <Taskbar
        apps={[]}
        focusedAppId={null}
        onMouseDown={() => {}}
        onClickMenuItem={() => {}}
      />
    </div>
  );
} 