import React from "react";

interface XpErrorWindowProps {
  title?: string;
  message: string;
  onClose: () => void;
}

const XpErrorWindow: React.FC<XpErrorWindowProps> = ({ title = "C:\\", message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#efefef] border border-[#0a246a] shadow-lg rounded flex flex-col" style={{ width: '300px'}}>
        {/* Title Bar */}
        <div className="flex items-center justify-between bg-[#0a246a] text-white text-xs font-bold px-2 py-1 rounded-t">
          <span>{title}</span>
          <button onClick={onClose} className="text-white hover:bg-red-600 w-4 h-4 flex items-center justify-center">X</button>
        </div>
        {/* Content */}
        <div className="flex items-center p-4">
          {/* Error Icon */}
          <div className="mr-4 text-4xl text-red-600">
            ❌
          </div>
          {/* Message */}
          <div className="flex flex-col text-sm">
            <span>C:\</span>
            <span>{message}</span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-center pb-4">
          <button 
            className="bg-[#e5eefa] border border-[#b5cbe9] rounded px-4 py-1 text-sm font-semibold shadow-sm hover:bg-[#d7e4f5]"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default XpErrorWindow; 