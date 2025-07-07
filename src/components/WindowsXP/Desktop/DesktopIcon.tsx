import React from "react";
import Image from "next/image";

interface DesktopIconProps {
  icon?: React.ReactNode;
  label: string;
  onDoubleClick?: () => void;
  onHighlight?: () => void;
  highlighted?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onDoubleClick, onHighlight, highlighted }) => (
  <div
    className="desktop-icon flex flex-col items-center group"
    style={{
      cursor: "url('/cursors/default_link.cur'), pointer",
      userSelect: 'none',
    }}
    onClick={onHighlight}
    onDoubleClick={onDoubleClick}
  >
    <div
      className="w-12 h-12 flex items-center justify-center"
      style={highlighted ? { filter: 'drop-shadow(0 0 4px #0b61ff)' } : {}}
    >
      {icon || <Image src="/icons/foldericon.png" alt="folder" className="w-8 h-8" width={32} height={32} style={highlighted ? { opacity: 0.5 } : {}} />}
    </div>
    <span
  style={{
    background: highlighted ? '#0b61ff' : 'transparent',
    color: '#fff',
    border: highlighted ? '1px solid #003399' : '1px solid transparent',
    borderRadius: 0,
    padding: '2px 8px',
    marginTop: 4,
    fontFamily: 'Tahoma, Arial, sans-serif',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 1.2,
    display: 'inline', // <-- DİKKAT! inline-block DEĞİL!
    boxSizing: 'border-box',
    minWidth: 0,
    whiteSpace: 'pre-line',
  }}
>
  {label}
</span>
  </div>
);

export default DesktopIcon; 