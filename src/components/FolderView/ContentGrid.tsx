import React from "react";

const items = [
  { icon: "/icons/folder.svg", label: "Shared Documents" },
  { icon: "/icons/folder.svg", label: "User's Documents" },
  { icon: "/icons/disk.svg", label: "Local Disk (C:)" },
  { icon: "/icons/cd.svg", label: "CD Drive (D:)" },
];

const ContentGrid: React.FC = () => (
  <div className="flex-1 p-4 bg-white min-h-[200px] flex flex-wrap gap-6">
    {items.map((item, i) => (
      <div key={i} className="flex flex-col items-center w-24">
        <img src={item.icon} alt={item.label} className="w-12 h-12" />
        <span className="mt-1 text-xs text-center font-semibold" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

export default ContentGrid; 