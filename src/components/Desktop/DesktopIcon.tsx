import React from "react";
import Image from "next/image";

interface DesktopIconProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => (
  <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
    <div className="w-12 h-12 flex items-center justify-center">
      {icon || <Image src="/icons/foldericon.png" alt="folder" className="w-8 h-8" width={32} height={32} />}
    </div>
    <span className="mt-1 text-xs text-white drop-shadow group-hover:underline">{label}</span>
  </div>
);

export default DesktopIcon; 