import React from "react";

interface ToolbarProps {
  onClose: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClose }) => (
  <div className="flex items-center h-9 bg-[#eaf1fb] border-b border-[#b5cbe9] px-2 shadow-sm select-none">
    <div className="flex-1 flex items-center gap-1">
      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#dbeafe] transition">
        <img src="/icons/back.png" alt="Back" className="w-4 h-4" />
        <span className="text-xs">Back</span>
      </button>
      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#dbeafe] transition">
        <img src="/icons/forward.png" alt="Forward" className="w-4 h-4" />
        <span className="text-xs">Forward</span>
      </button>
      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#dbeafe] transition">
        <img src="/icons/up.png" alt="Up" className="w-4 h-4" />
        <span className="text-xs">Up</span>
      </button>
      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#dbeafe] transition">
        <img src="/icons/refresh.png" alt="Refresh" className="w-4 h-4" />
        <span className="text-xs">Refresh</span>
      </button>
      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#dbeafe] transition">
        <img src="/icons/stop.png" alt="Stop" className="w-4 h-4" />
        <span className="text-xs">Stop</span>
      </button>
      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#dbeafe] transition">
        <img src="/icons/search.png" alt="Search" className="w-4 h-4" />
        <span className="text-xs">Search</span>
      </button>
      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#dbeafe] transition">
        <img src="/icons/foldericon.png" alt="Folders" className="w-4 h-4" />
        <span className="text-xs">Folders</span>
      </button>
    </div>
    <button
      onClick={onClose}
      className="ml-2 flex items-center gap-1 bg-[#e57373] hover:bg-[#d32f2f] text-white rounded px-2 py-1 font-bold shadow border border-[#b71c1c] transition"
      title="Close"
    >
      <img src="/icons/close.png" alt="Close" className="w-4 h-4" />
    </button>
  </div>
);

export default Toolbar; 