import React from "react";

const items = [
  { icon: "/icons/MyComputer.png", label: "My Computer" },
  { icon: "/icons/localdisk.png", label: "Local Disk (C:)" },
  { icon: "/icons/dvd.png", label: "DVD Drive (D:)" },
  { icon: "/icons/folderdocument.png", label: "My Documents" },
  { icon: "/icons/foldericon.png", label: "Shared Documents" },
  { icon: "/icons/mynetworkplaces.ico", label: "My Network Places" },
  { icon: "/icons/recycle.png", label: "Recycle Bin" },
];

const ContentGrid: React.FC = () => (
  <div className="flex-1 p-6 bg-white min-h-[200px] flex flex-wrap gap-8 border-l border-[#b5cbe9]" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
    {items.map((item, i) => (
      <div key={i} className="flex flex-col items-center w-28 select-none cursor-pointer hover:bg-[#eaf1fb] rounded p-2 transition">
        <img src={item.icon} alt={item.label} className="w-12 h-12 drop-shadow" />
        <span className="mt-2 text-xs text-center font-semibold text-[#1a237e]" style={{ textShadow: '0 1px 0 #fff' }}>
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

export default ContentGrid; 