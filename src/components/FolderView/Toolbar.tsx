import React from "react";

interface ToolbarProps {
  onClose: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClose }) => (
  <div className="flex items-center h-8 bg-[#e5eefa] border-b border-[#b5cbe9] px-2">
    <div className="flex-1 flex items-center gap-2">
      <button className="opacity-50 cursor-not-allowed">Back</button>
      <button className="opacity-50 cursor-not-allowed">Forward</button>
      <button>Up</button>
      <span className="ml-2">Search</span>
      <span className="ml-2">Folders</span>
    </div>
    <button
      onClick={onClose}
      className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded px-2 font-bold shadow"
    >
      X
    </button>
  </div>
);

export default Toolbar; 