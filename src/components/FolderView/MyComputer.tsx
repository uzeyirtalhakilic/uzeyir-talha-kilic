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
    className="absolute top-24 left-1/4 w-[800px] h-[500px] rounded shadow-lg z-20 flex flex-col"
    style={{
      background: "linear-gradient(to right, #edede5 0%, #ede8cd 100%)",
      fontFamily: "Tahoma, Arial, sans-serif",
      overflow: "hidden",
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