import React from "react";

const sidebarItems = [
  {
    title: "System Tasks",
    items: [
      { icon: "/icons/MyComputer.png", label: "View system information" },
      { icon: "/icons/refresh.png", label: "Refresh" },
      { icon: "/icons/stop.png", label: "Stop" },
    ],
  },
  {
    title: "Other Places",
    items: [
      { icon: "/icons/mynetworkplaces.ico", label: "My Network Places" },
      { icon: "/icons/folderdocument.png", label: "My Documents" },
      { icon: "/icons/foldericon.png", label: "Shared Documents" },
      { icon: "/icons/restore.ico", label: "Control Panel" },
    ],
  },
  {
    title: "Details",
    items: [
      { icon: "/icons/win-xp-icon.png", label: "-" },
    ],
  },
];

const Sidebar: React.FC = () => (
  <div
    className="w-56 p-3 border-r border-[#3a6ea5] shadow-inner"
    style={{
      background: "linear-gradient(180deg, #eaf1fb 0%, #b5cbe9 100%)",
      color: "#1a237e",
      fontFamily: "Tahoma, Arial, sans-serif",
      minHeight: "100%",
    }}
  >
    {sidebarItems.map((section, idx) => (
      <div key={section.title} className={idx < sidebarItems.length - 1 ? "mb-6" : ""}>
        <div className="font-bold mb-2 text-sm text-[#2050a0] flex items-center">
          <span className="mr-2">{section.title}</span>
        </div>
        <ul className="ml-1">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-center mb-2 hover:bg-[#dbeafe] rounded px-1 cursor-pointer transition">
              <img src={item.icon} alt={item.label} className="w-5 h-5 mr-2" />
              <span className="text-xs">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default Sidebar; 