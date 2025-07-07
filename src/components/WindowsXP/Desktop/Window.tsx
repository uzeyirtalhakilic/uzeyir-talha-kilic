import React from "react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const Window: React.FC<WindowProps> = ({ title, children, onClose }) => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[95vw] bg-[#e5eefd] border-2 border-[#245edb] rounded shadow-2xl z-10">
    <div className="flex items-center justify-between bg-gradient-to-r from-[#245edb] to-[#3a6ea5] px-4 py-2 rounded-t select-none">
      <span className="text-white font-bold text-sm">{title}</span>
      <button className="w-6 h-6 flex items-center justify-center bg-[#e81123] rounded hover:bg-red-700" onClick={onClose}>
        <span className="text-white font-bold">×</span>
      </button>
    </div>
    <div className="p-6 flex flex-col gap-4">{children}</div>
  </div>
);

export default Window; 