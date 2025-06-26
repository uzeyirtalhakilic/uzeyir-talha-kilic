import React, { useState } from "react";
import { FileSystemItem } from "../../data/filesystem";
import XpErrorWindow from "../XpErrorWindow";

interface XpWindowProps {
  item: FileSystemItem;
  onClose: () => void;
  path?: string; // Adres çubuğu için
}

const XpWindow: React.FC<XpWindowProps> = ({ item, onClose, path }) => {
  const [showError, setShowError] = useState(false);

  const handleItemClick = (child: FileSystemItem) => {
    if (child.disabled) {
      setShowError(true);
    } else {
      // Dosya tıklandığında yapılacak işlemler buraya eklenebilir
      console.log("Clicked:", child.label);
    }
  };

  return (
    <div
      className="absolute top-24 left-1/4 w-[800px] h-[500px] rounded shadow-lg z-20 flex flex-col"
      style={{
        background: "linear-gradient(to right, #edede5 0%, #ede8cd 100%)",
        fontFamily: "Tahoma, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
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

      {/* Address Bar */}
      <div className="flex items-center h-6 bg-white border-b border-[#b5cbe9] px-2 text-xs">
        <span className="mr-2 text-[#3a6ea5] font-semibold">Address</span>
        <input
          className="flex-1 px-2 py-0.5 border border-[#b5cbe9] rounded text-xs bg-[#f8fafc]"
          value={path || "C:\\My Computer"}
          readOnly
          style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
        />
        <button className="ml-2 px-2 py-0.5 border rounded bg-[#e5eefa] border-[#b5cbe9] font-semibold text-[#3a6ea5] shadow">
          Go
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-[#f3f6fb] border-r border-[#b5cbe9] p-2 text-xs">
          <div className="mb-4">
            <div className="font-bold text-[#3a6ea5] mb-1">File and Folder Tasks</div>
            <ul className="ml-2 list-disc">
              <li>Make a new folder</li>
              <li>Share this folder</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-bold text-[#3a6ea5] mb-1">Other Places</div>
            <ul className="ml-2 list-disc">
              <li>My Documents</li>
              <li>My Computer</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-[#3a6ea5] mb-1">Görünüm</div>
            <div className="ml-2">-</div>
          </div>
        </div>
        {/* Klasör içeriği */}
        <div className="flex-1 p-4 bg-white min-h-[200px] flex flex-wrap gap-6">
          {item.type === "folder" && item.children && item.children.length > 0 ? (
            item.children.map((child) => (
              <div 
                key={child.id} 
                className={`flex flex-col items-center w-20 p-1 rounded hover:bg-[#e5eefa] transition-colors duration-150 ${child.disabled ? 'disabled' : 'cursor-pointer'}`}
                onClick={() => handleItemClick(child)}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/icons/foldericon.png" alt={child.label} className="w-8 h-8" />
                </div>
                <span className="mt-1 text-xs text-center">{child.label}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-500">Bu klasör boş.</div>
          )}
        </div>
      </div>
      {showError && <XpErrorWindow message="Application not found" onClose={() => setShowError(false)} />}
    </div>
  );
};

export default XpWindow; 