import React from "react";

interface TxtFileProps {
  title: string;
  content: string;
  onClose: () => void;
}

const TxtFile: React.FC<TxtFileProps> = ({ title, content, onClose }) => {
  return (
    <div className="w-full h-full flex flex-col border border-gray-400" style={{ fontFamily: 'Tahoma, Arial, sans-serif', background: '#ece9d8' }}>

      {/* Menu Bar */}
      <div className="toolbar-section">
        <div className="toolbar-content">
          <div className="toolbar-menu">
            <span>File</span>
            <span>Edit</span>
            <span>Format</span>
            <span>View</span>
            <span>Help</span>
          </div>
        </div>
        <div className="toolbar-windows-icon">
          <img src="/icons/win-xp-icon.png" alt="Windows" width={16} height={16} />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1" style={{ background: 'white', padding: 0 }}>
        <textarea
          className="w-full h-full p-2 text-sm"
          style={{ resize: 'none', border: 'none', outline: 'none', background: 'white', fontFamily: 'Consolas, monospace', color: 'black', minHeight: '100%', minWidth: '100%' }}
          value={content}
          readOnly
        />
      </div>
    </div>
  );
};

export default TxtFile; 