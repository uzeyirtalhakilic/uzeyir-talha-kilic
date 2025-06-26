import React from "react";

const Sidebar: React.FC = () => (
  <div
    className="w-56 p-2 text-xs border-r border-[#b5cbe9]"
    style={{
      background: "linear-gradient(to bottom, #748aff 0%, #4057d3 100%)",
      color: "#fff",
      fontFamily: "Tahoma, Arial, sans-serif",
    }}
  >
    {/* System Tasks */}
    <div className="mb-4">
      <div className="font-bold mb-1 text-sm">System Tasks</div>
      <ul className="ml-2 list-disc">
        <li>View system information</li>
        <li>Add or remove programs</li>
        <li>Change a setting</li>
      </ul>
    </div>
    {/* Other Places */}
    <div className="mb-4">
      <div className="font-bold mb-1 text-sm">Other Places</div>
      <ul className="ml-2 list-disc">
        <li>My Network Places</li>
        <li>My Documents</li>
        <li>Shared Documents</li>
        <li>Control Panel</li>
      </ul>
    </div>
    {/* Details */}
    <div>
      <div className="font-bold mb-1 text-sm">Details</div>
      <div className="ml-2">-</div>
    </div>
  </div>
);

export default Sidebar; 