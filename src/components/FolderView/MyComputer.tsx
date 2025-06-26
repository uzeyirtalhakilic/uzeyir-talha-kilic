import React from "react";
import Toolbar from "./Toolbar";
import AddressBar from "./AddressBar";
import Sidebar from "./Sidebar";
import ContentGrid from "./ContentGrid";

interface MyComputerProps {
  onClose: () => void;
}

const MyComputer: React.FC<MyComputerProps> = ({ onClose }) => (
  <div
    className="absolute top-24 left-1/4 w-[820px] h-[520px] rounded-xl shadow-2xl z-20 flex flex-col border border-[#b5cbe9]"
    style={{
      background: "linear-gradient(180deg, #f8fafc 0%, #eaf1fb 100%)",
      fontFamily: "Tahoma, Arial, sans-serif",
      overflow: "hidden",
      boxShadow: "0 8px 32px 0 rgba(60, 90, 170, 0.25)",
    }}
  >
    {/* Toolbar */}
    <Toolbar onClose={onClose} />
    {/* Address Bar */}
    <AddressBar />
    {/* İçerik */}
    <div className="flex flex-1 min-h-0">
      <Sidebar />
      <ContentGrid />
    </div>
  </div>
);

export default MyComputer; 