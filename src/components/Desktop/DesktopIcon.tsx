import React from "react";

interface DesktopIconProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => (
  <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
    <div className="w-12 h-12 bg-white/60 rounded shadow flex items-center justify-center">
      {icon || <span className="text-2xl">📁</span>}
    </div>
    <span className="mt-1 text-xs text-white drop-shadow group-hover:underline">{label}</span>
  </div>
);

export default DesktopIcon; 